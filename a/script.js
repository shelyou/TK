// Memuat data JSON dari API
async function loadJsonData(apiEndpoint) {
    const response = await fetch(apiEndpoint);
    return await response.json();
}

// Mengisi tabel secara dinamis
async function populateTables() {
    const kueData = await loadJsonData('/api/kue');
    const plastikData = await loadJsonData('/api/plastik');

    generateTableRows(kueData.Kue, 'kueBody');
    generateTableRows(plastikData.Plastik, 'plastikBody');
}

// Fungsi untuk mengedit harga
function editPrice(priceField, no, group) {
    const newPrice = prompt(`Masukkan harga baru untuk ${priceField.replace('_', ' ')}:`);

    if (newPrice && !isNaN(newPrice)) {
        fetch('/api/update-price', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                group,
                itemNo: no,
                priceField,
                newPrice: parseInt(newPrice)
            })
        })
        .then(response => response.text())
        .then(message => {
            alert(message);
            populateTables();
        })
        .catch(err => {
            console.error('Gagal memperbarui harga:', err);
            alert('Gagal menyimpan data.');
        });
    } else {
        alert('Input harga tidak valid.');
    }
}

// Panggil populateTables saat halaman dimuat
populateTables();
