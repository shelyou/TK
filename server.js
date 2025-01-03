const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware untuk parsing JSON
app.use(express.json());

// Rute untuk mendapatkan data "Kue"
app.get('/api/kue', (req, res) => {
    const filePath = path.join(__dirname, 'c', 'k.json');
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) return res.status(500).send('Gagal membaca data');
        res.json(JSON.parse(data));
    });
});

// Rute untuk mendapatkan data "Plastik"
app.get('/api/plastik', (req, res) => {
    const filePath = path.join(__dirname, 'c', 'p.json');
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) return res.status(500).send('Gagal membaca data');
        res.json(JSON.parse(data));
    });
});

// Rute untuk memperbarui harga
app.post('/api/update-price', (req, res) => {
    const { group, itemNo, priceField, newPrice } = req.body;

    if (!group || !itemNo || !priceField || !newPrice) {
        return res.status(400).send('Data tidak lengkap');
    }

    const filePath = path.join(__dirname, 'c', `${group.toLowerCase()}.json`);
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) return res.status(500).send('Gagal membaca data');

        const jsonData = JSON.parse(data);
        const groupData = jsonData[group];
        const item = groupData.find(g => g.items.some(i => i.no === itemNo))
            ?.items.find(i => i.no === itemNo);

        if (!item) {
            return res.status(404).send('Item tidak ditemukan');
        }

        item[priceField] = newPrice;

        fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), err => {
            if (err) return res.status(500).send('Gagal menyimpan data');
            res.send('Harga berhasil diperbarui');
        });
    });
});

// Jalankan server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
