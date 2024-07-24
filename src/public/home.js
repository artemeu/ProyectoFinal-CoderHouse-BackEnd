const socket = io();

const productList = document.getElementById('product-list');

socket.emit('requestProducts');

// Manejar la recepción de productos del servidor
socket.on('getProducts', (products) => {
    productList.innerHTML = '';
    products.forEach(product => {
        productList.innerHTML += `
            <div>
              <h2>${product.title}</h2>
              <p>${product.description}</p>
              <p>${product.category}</p>
              <p class="price">Precio: $${product.price}</p>
            </div>
        `;
    });
});
