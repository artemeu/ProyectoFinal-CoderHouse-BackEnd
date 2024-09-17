document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = new URLSearchParams(formData);

    fetch('/api/sessions/login', {
        method: 'POST',
        body: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
        .then(response => {
            return response.json();
        })
        .then(result => {
            if (result.status === 'success' && result.payload.message === 'Login exitoso') {
                Toastify({
                    text: "Inicio de sesión exitoso!",
                    duration: 3000,
                    backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)"
                }).showToast();
                setTimeout(() => {
                    window.location.href = '/products';
                }, 3000);
            } else {
                Toastify({
                    text: result.payload.message || "Error al iniciar sesión!",
                    duration: 3000,
                    backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)"
                }).showToast();
            }
        })
        .catch(error => {
            Toastify({
                text: "Error en la conexión!",
                duration: 3000,
                backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)"
            }).showToast();
        });
});

