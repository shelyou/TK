// Supabase Client
const { createClient } = supabase;

const supabaseUrl = 'https://zawkghhxfdlhilzpqyah.supabase.co'; // URL Supabase Anda
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inphd2tnaGh4ZmRsaGlsenBxeWFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU5MDc2MjAsImV4cCI6MjA1MTQ4MzYyMH0.P3fXK_8clo1SjeRtRkcekID9vPrO2eqzjfQJOQtg8Z0';
const supabase = createClient(supabaseUrl, supabaseKey);

// Function to load JSON data dynamically from a file
async function loadJsonData(file) {
    const response = await fetch(file);
    const data = await response.json();
    return data;
} 

// Function to generate table rows dynamically
function generateTableRows(data, tableId) {
    const tbody = document.getElementById(tableId);
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

// Function to update price in Supabase
async function updatePriceInSupabase(group, no, priceField, newPrice) {
    let tableName = group === 'Kue' ? 'kue_table' : 'plastik_table'; // Ganti dengan nama tabel yang sesuai di Supabase

    const { data, error } = await supabase
        .from(tableName)
        .update({ [priceField]: newPrice }) // Update kolom harga
        .eq('no', no); // Update berdasarkan nomor item

    if (error) {
        console.error('Error updating price in Supabase:', error);
        alert("Failed to update price in Supabase.");
    } else {
        console.log('Price updated successfully in Supabase:', data);
    }
}

// Edit Price function
async function editPrice(priceField, no, group) {
    const newPrice = prompt(`Enter new price for ${priceField.replace('_', ' ')}:`);

    if (newPrice && !isNaN(newPrice)) {
        // Find the item and update the price
        const item = jsonData[group].find(g => g.items.some(i => i.no === no)).items.find(i => i.no === no);
        item[priceField] = parseInt(newPrice);

        // Update in Supabase
        await updatePriceInSupabase(group, no, priceField, parseInt(newPrice));

        // Re-generate the table rows after the update
        document.getElementById(group === 'Kue' ? 'kueBody' : 'plastikBody').innerHTML = '';
        generateTableRows(jsonData[group], group === 'Kue' ? 'kueBody' : 'plastikBody');
    } else {
        alert("Invalid price input.");
    }
}

// Loading and populating the data for both tables
async function populateTables() {
    const kueData = await loadJsonData('k.json');
    const plastikData = await loadJsonData('p.json');

    generateTableRows(kueData.Kue, "kueBody");
    generateTableRows(plastikData.Plastik, "plastikBody");
}

// Initialize tables
populateTables();
