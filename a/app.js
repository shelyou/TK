import { db } from './firebase-config.js';
import { doc, updateDoc } from "firebase/firestore";

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

// Edit Price function
async function editPrice(priceField, no, group) {
    const newPrice = prompt(`Enter new price for ${priceField.replace('_', ' ')}:`);

    if (newPrice && !isNaN(newPrice)) {
        const itemId = `${group.toLowerCase()}_${no}`;
        await savePriceToFirestore(group, itemId, priceField, parseInt(newPrice));
        alert("Price updated!");
    } else {
        alert("Invalid price input.");
    }
}

// Save updated price to Firestore
async function savePriceToFirestore(group, itemId, priceField, newPrice) {
    const collectionName = group === "Plastik" ? "plastik" : "kue";
    const docRef = doc(db, collectionName, itemId);

    try {
        await updateDoc(docRef, { [priceField]: newPrice });
        console.log(`Updated ${priceField} for ${itemId}`);
    } catch (error) {
        console.error("Error saving data to Firestore:", error);
    }
}

// Initialize tables
async function populateTables() {
    const kueData = await loadJsonData('k.json');
    const plastikData = await loadJsonData('p.json');

    generateTableRows(kueData.Kue, "kueBody");
    generateTableRows(plastikData.Plastik, "plastikBody");
}

populateTables();
