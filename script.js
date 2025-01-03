document.addEventListener("DOMContentLoaded", () => {
    function searchTable() {
        const input = document.getElementById("searchInput").value.toLowerCase();
        document.querySelectorAll("table tbody tr").forEach(row => {
            const isVisible = Array.from(row.cells).some(cell =>
                cell.textContent.toLowerCase().includes(input)
            );
            row.style.display = isVisible ? "" : "none";
        });
    }

    function disableCellEditing() {
        document.querySelectorAll("table td").forEach(cell => {
            cell.setAttribute("contenteditable", "false");
        });
    }

    const floatingButton = document.querySelector(".floating-button");
    const softButtons = document.querySelectorAll(".soft-button");
    floatingButton.addEventListener("click", () => {
        softButtons.forEach(button => button.classList.toggle("visible"));
        floatingButton.classList.add("rotate");
        setTimeout(() => {
            floatingButton.classList.remove("rotate");
        }, 500);
    });

    document.querySelector(".soft-button").addEventListener("click", () => {
        window.location.href = 'ambilbarang.html';
    });

    document.getElementById("searchInput").addEventListener("keyup", searchTable);
    disableCellEditing();
});