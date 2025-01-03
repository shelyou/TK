import { createClient } from '@supabase/supabase-js';

// Supabase Client
const supabaseUrl = 'https://zawkghhxfdlhilzpqyah.supabase.co'; // URL Supabase Anda
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inphd2tnaGh4ZmRsaGlsenBxeWFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU5MDc2MjAsImV4cCI6MjA1MTQ4MzYyMH0.P3fXK_8clo1SjeRtRkcekID9vPrO2eqzjfQJOQtg8Z0';
const supabase = createClient(supabaseUrl, supabaseKey);

// Function to update price in Supabase
async function updatePriceInSupabase(group, no, priceField, newPrice) {
    let tableName = group === 'Kue' ? 'kue_table' : 'plastik_table'; // Ganti dengan nama tabel Anda

    const { data, error } = await supabase
        .from(tableName)
        .update({ [priceField]: newPrice })
        .eq('no', no);

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
        // Update data in Supabase
        await updatePriceInSupabase(group, no, priceField, parseInt(newPrice));

        // Update local data (manual trigger)
        document.getElementById(group === 'Kue' ? 'kueBody' : 'plastikBody').innerHTML = '';
        populateTables(); // Refresh data
    } else {
        alert("Invalid price input.");
    }
}

export { editPrice };
