function addToCart(productId) {
    // Crea un carrito nuevo 
    fetch('/api/carts', { method: 'POST' })
        .then(response => response.json())
        .then(cartData => {
            if (cartData.error) {
                console.error('Error al crear el carrito:', cartData.error);
                alert('Error al crear el carrito');
                return;
            }
            const cartId = cartData._id;
            // Agregar el producto al carrito recién creado
            return fetch(`/api/carts/${cartId}/products/${productId}`, { method: 'POST' });
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error('Error al agregar el producto al carrito:', data.error);
                alert('Error al agregar el producto al carrito');
            } else {
                alert('Producto agregado al carrito. ID del carrito: ' + data._id);
            }
        })
        .catch(error => console.error('Error:', error));
}
