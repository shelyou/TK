const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Function to update a JSON file
function updateJsonFile(filePath, data) {
    fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
        if (err) {
            console.error('Error writing to file', err);
            return false;
        }
    });
    return true;
}

// Endpoint to update item prices
app.post('/updatePrice', (req, res) => {
    const { group, itemNo, priceField, newPrice } = req.body;

    // Determine file path based on group
    const filePath = group === 'Kue' ? 'kue.json' : 'plastik.json';
    
    // Read the existing data from the appropriate JSON file
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading JSON file');
        }
        
        let jsonData = JSON.parse(data);

        // Find the item and update the price
        const item = jsonData[group].find(g => g.items.some(i => i.no === itemNo)).items.find(i => i.no === itemNo);
        if (item) {
            item[priceField] = newPrice;
            
            // Update the JSON file with the new data
            if (updateJsonFile(filePath, jsonData)) {
                res.send('Price updated successfully');
            } else {
                res.status(500).send('Error saving data');
            }
        } else {
            res.status(404).send('Item not found');
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
