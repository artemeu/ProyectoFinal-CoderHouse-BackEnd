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
                alert('Carrito vacío exitosamente');
                location.reload(); // Recargar la página para reflejar los cambios
            } else {
                alert('Error al vaciar el carrito');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un problema al vaciar el carrito');
        });
}

// Función para eliminar el carrito
function deleteCart(cartId) {
    fetch(`/api/carts/${cartId}/empty`, {
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
                alert('Carrito eliminado exitosamente');
                window.location.href = '/products'; // Redirige a la página principal
            } else {
                alert('Error al eliminar el carrito');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un problema al eliminar el carrito');
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
                alert('Producto eliminado exitosamente');
                location.reload();
            } else {
                alert('Error al eliminar el producto');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un problema al eliminar el producto');
        });
}
