const socket = io();

const addProductForm = document.getElementById('add-product-form');
const productList = document.getElementById('product-list');

// Enviar nuevos productos al servidor
addProductForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(addProductForm);
    const newProduct = {};
    formData.forEach((value, key) => {
        newProduct[key] = value;
    });

    socket.emit('addProduct', newProduct);
    addProductForm.reset();
});

// Eliminar productos
productList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const productId = e.target.dataset.id;
        socket.emit('deleteProduct', productId);
    }
});

// Actualizar la lista de productos en tiempo real
socket.on('updateProducts', (products) => {
    productList.innerHTML = '';
    products.forEach(product => {
        productList.innerHTML += `
            <div>
              <h2>${product.title}</h2>
              <p>${product.description}</p>
              <p>${product.category}</p>
              <p class="price">Precio: $${product.price}</p>
              <button class="delete-btn" data-id="${product.id}">Eliminar</button>
            </div>
        `;
    });
});
