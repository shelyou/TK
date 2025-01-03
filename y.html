// Fungsi untuk mengedit harga
function editPrice(priceField, no, group) {
    const newPrice = prompt(`Masukkan harga baru untuk ${priceField.replace('_', ' ')}:`);

    if (newPrice && !isNaN(newPrice)) {
        // Kirim permintaan POST ke server untuk menyimpan data
        fetch('/updatePrice', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                group: group,
                itemNo: no,
                priceField: priceField,
                newPrice: parseInt(newPrice)
            })
        })
        .then(response => response.text())
        .then(message => {
            alert(message || 'Harga berhasil diperbarui');

            // Perbarui tabel setelah harga diubah
            populateTables();
        })
        .catch(error => {
            console.error('Gagal memperbarui harga:', error);
            alert('Gagal menyimpan data');
        });
    } else {
        alert("Input harga tidak valid.");
    }
}
