document.getElementById('register-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = new URLSearchParams(formData);

    fetch('/api/sessions/register', {
        method: 'POST',
        body: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
        .then(response => response.json())
        .then(result => {
            if (result.status === 'success' && result.payload.message === 'Usuario creado') {
                Toastify({
                    text: "Registro exitoso!",
                    duration: 3000,
                    backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)"
                }).showToast();
                setTimeout(() => {
                    window.location.href = '/products';
                }, 3000);
            } else {
                Toastify({
                    text: result.message || "Error al registrar!",
                    duration: 3000,
                    backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)"
                }).showToast();
            }
        })
        .catch(error => {
            console.error('Error:', error);
            Toastify({
                text: "Error en la conexión!",
                duration: 3000,
                backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)"
            }).showToast();
        });
});
