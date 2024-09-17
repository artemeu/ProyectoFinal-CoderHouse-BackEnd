// Función para vaciar el carrito
function clearCart(cartId) {
    fetch(`/api/carts/${cartId}`, {
        method: 'DELETE',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            return response.json();
        })
        .then(data => {
            if (data.status === 'success') {
                Toastify({
                    text: "Carrito vacío exitosamente",
                    duration: 3000,
                    backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)"
                }).showToast();
                setTimeout(() => location.reload(), 3000);
            } else {
                Toastify({
                    text: "Error al vaciar el carrito",
                    duration: 3000,
                    backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)"
                }).showToast();
            }
        })
        .catch(error => {
            console.error('Error:', error);
            Toastify({
                text: "Hubo un problema al vaciar el carrito",
                duration: 3000,
                backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)"
            }).showToast();
        });
}

// Función para eliminar un producto del carrito
function removeProduct(cartId, productId) {
    fetch(`/api/carts/${cartId}/products/${productId}`, {
        method: 'DELETE',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            return response.json();
        })
        .then(data => {
            if (data.status === 'success') {
                Toastify({
                    text: "Producto eliminado exitosamente",
                    duration: 3000,
                    backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)"
                }).showToast();
                setTimeout(() => location.reload(), 3000);
            } else {
                Toastify({
                    text: "Error al eliminar el producto",
                    duration: 3000,
                    backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)"
                }).showToast();
            }
        })
        .catch(error => {
            console.error('Error:', error);
            Toastify({
                text: "Hubo un problema al eliminar el producto",
                duration: 3000,
                backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)"
            }).showToast();
        });
}
