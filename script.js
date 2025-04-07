// URL de la hoja de Google Sheets (hacerla pública)
const sheetUrl = "https://spreadsheets.google.com/feeds/list/11XTW_qTny1ZoG1WcxZdWzBcqOLDbRwwoMT_8li0HLRs/od6/public/values?alt=json";

// Función para obtener los productos desde Google Sheets
async function fetchProducts() {
    const response = await fetch(sheetUrl);
    const data = await response.json();
    const products = data.feed.entry;

    // Mostrar los productos en la página
    displayProducts(products);
}

// Función para mostrar los productos en la página
function displayProducts(products) {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    products.forEach(product => {
        const productName = product.gsx$nombre.$t;
        const productDescription = product.gsx$descripcion.$t;
        const productImage = product.gsx$imagen.$t;
        const productCode = product.gsx$código.$t;

        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        productCard.innerHTML = `
            <img src="${productImage}" alt="${productName}">
            <h2>${productName}</h2>
            <p>${productDescription}</p>
            <a href="https://wa.me/591[NUMERO]?text=¡Hola! Quiero más información sobre el producto ${productName}" class="whatsapp-btn" target="_blank">Contactar por WhatsApp</a>
        `;
        
        productList.appendChild(productCard);
    });
}

// Función de búsqueda de productos (solo en la columna B - nombre)
function searchProducts() {
    const searchTerm = document.getElementById("search").value.toLowerCase();
    const productCards = document.querySelectorAll(".product-card");

    productCards.forEach(card => {
        const productName = card.querySelector("h2").textContent.toLowerCase();

        if (productName.includes(searchTerm)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

// Cargar los productos cuando se carga la página
fetchProducts();