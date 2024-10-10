function addToCart(productId) {
    fetch('/api/sessions/current', { method: 'GET' })
        .then(response => {
            if (!response.ok) {
                if (response.status === 401) {
                    window.location.href = '/login';
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(userData => {
            if (userData?.payload?.user) {
                const cartId = userData.payload.user.cart;
                if (!cartId) {
                    throw new Error('No se encontró un carrito asociado al usuario.');
                }
                return fetch(`/api/carts/${cartId}/products/${productId}`, { method: 'POST' });
            } else {
                throw new Error('No se pudo obtener la información del usuario.');
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.error) {
                Toastify({
                    text: 'Error al agregar el producto al carrito',
                    duration: 3000,
                    backgroundColor: 'linear-gradient(to right, #ff5f6d, #ffc371)',
                }).showToast();
            } else {
                Toastify({
                    text: 'Producto agregado al carrito.',
                    duration: 3000,
                    backgroundColor: 'linear-gradient(to right, #00b09b, #96c93d)',
                }).showToast();
            }
        })
        .catch(error => {
            console.error('Error:', error);
            Toastify({
                text: 'Hubo un problema al agregar el producto al carrito',
                duration: 3000,
                backgroundColor: 'linear-gradient(to right, #ff5f6d, #ffc371)',
            }).showToast();
        });
}
