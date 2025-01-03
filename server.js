const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware untuk parsing JSON
app.use(express.json());

// Function to get file path dynamically based on group
const getFilePath = (group) => {
    if (group === 'Kue') {
        return path.join(__dirname, 'k.json');
    } else if (group === 'Plastik') {
        return path.join(__dirname, 'p.json');
    }
    return null;
};

// Endpoint untuk mengambil data (GET)
app.get('/api/data/:group', (req, res) => {
    const group = req.params.group;
    const filePath = getFilePath(group);

    if (!filePath) {
        return res.status(400).json({ error: 'Grup tidak valid.' });
    }

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Gagal membaca file data.' });
        }
        res.json(JSON.parse(data));
    });
});

// Endpoint untuk memperbarui data (POST)
app.post('/api/update', (req, res) => {
    const { group, itemNo, priceField, newPrice } = req.body;
    const filePath = getFilePath(group);

    if (!filePath) {
        return res.status(400).json({ error: 'Grup tidak valid.' });
    }

    // Baca file JSON
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Gagal membaca file data.' });
        }

        let jsonData = JSON.parse(data);
        let updated = false;

        // Cari dan perbarui data
        jsonData.forEach(itemGroup => {
            const item = itemGroup.items.find(i => i.no === itemNo);
            if (item) {
                item[priceField] = newPrice;
                updated = true;
            }
        });

        if (!updated) {
            return res.status(404).json({ error: 'Data tidak ditemukan.' });
        }

        // Simpan kembali ke file
        fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), err => {
            if (err) {
                return res.status(500).json({ error: 'Gagal menyimpan file data.' });
            }
            res.json({ message: 'Data berhasil diperbarui.' });
        });
    });
});

// Jalankan server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
