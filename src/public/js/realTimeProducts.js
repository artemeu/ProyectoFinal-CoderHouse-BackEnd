const socket = io();

const addProductForm = document.getElementById('add-product-form');
const productList = document.getElementById('product-list');

// Mapa de nombres de campos a etiquetas
const fieldLabels = {
    title: 'Título',
    description: 'Descripción',
    price: 'Precio',
    category: 'Categoría',
    code: 'Código',
    stock: 'Stock'
};

// Enviar nuevos productos al servidor
addProductForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(addProductForm);
    const newProduct = {};
    let missingFields = [];

    formData.forEach((value, key) => {
        newProduct[key] = value;
        if (!value) {
            missingFields.push(key);
        }
    });

    if (missingFields.length > 0) {
        Swal.fire({
            icon: 'error',
            title: 'Campos incompletos',
            text: `Por favor complete el/los campo(s): ${missingFields.join(', ')}`,
            allowOutsideClick: false, // Desactiva el cierre al hacer clic fuera
            allowEscapeKey: false, // Desactiva el cierre al presionar la tecla Esc
        });
    } else {
        socket.emit('addProduct', newProduct, (response) => {
            if (response.error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al agregar producto',
                    text: response.error,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                });
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Producto agregado',
                    text: `El producto "${response.title}" ha sido agregado exitosamente.`,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                });
                addProductForm.reset();
            }
        });
    }
});

// Eliminar productos
productList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const productId = e.target.dataset.id;
        const productName = e.target.dataset.name;

        socket.emit('deleteProduct', productId);

        Swal.fire({
            icon: 'success',
            title: 'Producto Eliminado',
            text: `El producto "${productName}" ha sido eliminado.`,
            allowOutsideClick: false,
            allowEscapeKey: false,
        });
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
              <button class="delete-btn" data-id="${product.id}" data-name="${product.title}">Eliminar</button>
            </div>
        `;
    });
});
