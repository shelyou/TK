let jsonData = {
    Kue: [],
    Plastik: []
};

// Function to load JSON data dynamically from a file or localStorage
async function loadJsonData(file) {
    let data;
    if (localStorage.getItem(file)) {
        data = JSON.parse(localStorage.getItem(file));  // Load from localStorage if available
    } else {
        const response = await fetch(file);
        data = await response.json();
        localStorage.setItem(file, JSON.stringify(data)); // Save the fetched data to localStorage
    }
    return data;
}

// Function to generate table rows dynamically
function generateTableRows(data, tableId) {
    const tbody = document.getElementById(tableId);
    tbody.innerHTML = ''; // Clear previous table rows
    data.forEach(group => {
        // Group Header
        const groupRow = document.createElement("tr");
        groupRow.classList.add("table-subtitle");
        groupRow.innerHTML = `<td colspan="4"></td><td colspan="4">${group.group}</td><td colspan="3"></td>`;
        tbody.appendChild(groupRow);

        // Items Rows
        group.items.forEach(item => {
            const row = document.createElement("tr");
            if (tableId === "plastikBody") {
                row.innerHTML = `
                    <td>${item.no}</td>
                    <td>${item.ukuran}</td>
                    <td>${item.kode_gudang}</td>
                    <td>${item.kode_toko}</td>
                    <td class="money" onclick="editPrice('harga_dus', ${item.no}, 'Plastik')">${item.harga_dus}</td>
                    <td class="money" onclick="editPrice('harga_1_pak', ${item.no}, 'Plastik')">${item.harga_1_pak}</td>
                    <td class="money" onclick="editPrice('harga_1_pis', ${item.no}, 'Plastik')">${item.harga_1_pis}</td>
                    <td class="money" onclick="editPrice('harga_1_ons', ${item.no}, 'Plastik')">${item.harga_1_ons}</td>
                    <td class="money" onclick="editPrice('harga_1000_gram', ${item.no}, 'Plastik')">${item.harga_1000_gram}</td>
                    <td class="money" onclick="editPrice('harga_500_gram', ${item.no}, 'Plastik')">${item.harga_500_gram}</td>
                    <td class="money" onclick="editPrice('harga_250_gram', ${item.no}, 'Plastik')">${item.harga_250_gram}</td>
                    <td>${item.stok_gudang}</td>
                    <td>${item.stok_toko}</td>
                    <td>${item.masuk}</td>
                    <td>${item.keluar}</td>
                `;
            } else {
                row.innerHTML = `
                    <td>${item.no}</td>
                    <td>${item.nama_barang}</td>
                    <td>${item.kode_gudang}</td>
                    <td>${item.kode_toko}</td>
                    <td class="money" onclick="editPrice('harga_dus', ${item.no}, 'Kue')">${item.harga_dus}</td>
                    <td class="money" onclick="editPrice('harga_1000_gram', ${item.no}, 'Kue')">${item.harga_1000_gram}</td>
                    <td class="money" onclick="editPrice('harga_500_gram', ${item.no}, 'Kue')">${item.harga_500_gram}</td>
                    <td class="money" onclick="editPrice('harga_250_gram', ${item.no}, 'Kue')">${item.harga_250_gram}</td>
                    <td>${item.stok_gudang}</td>
                    <td>${item.stok_toko}</td>
                    <td>${item.masuk}</td>
                    <td>${item.keluar}</td>
                `;
            }
            tbody.appendChild(row);
        });
    });
}

// Edit Price function
function editPrice(priceField, no, group) {
    const newPrice = prompt(`Enter new price for ${priceField.replace('_', ' ')}:`);

    if (newPrice && !isNaN(newPrice)) {
        // Find the item and update the price
        const groupData = jsonData[group];
        const item = groupData.find(g => g.items.some(i => i.no === no)).items.find(i => i.no === no);
        
        if (item) {
            item[priceField] = parseInt(newPrice);

            // Save the updated data to localStorage
            localStorage.setItem(group === 'Kue' ? 'k.json' : 'p.json', JSON.stringify(groupData));

            // Re-generate the table rows after the update
            document.getElementById(group === 'Kue' ? 'kueBody' : 'plastikBody').innerHTML = '';
            generateTableRows(groupData, group === 'Kue' ? 'kueBody' : 'plastikBody');
        } else {
            alert("Item not found.");
        }
    } else {
        alert("Invalid price input.");
    }
}

// Loading and populating the data for both tables
async function populateTables() {
    jsonData.Kue = await loadJsonData('k.json');
    jsonData.Plastik = await loadJsonData('p.json');

    generateTableRows(jsonData.Kue, "kueBody");
    generateTableRows(jsonData.Plastik, "plastikBody");
}

// Initialize tables
populateTables();
