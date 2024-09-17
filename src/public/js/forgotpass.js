document.getElementById('forgot-password-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = new URLSearchParams(formData);

    fetch('/api/sessions/forgotpass', {
        method: 'POST',
        body: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
        .then(response => response.json())
        .then(result => {
            const message = result.payload.message;
            if (message === 'Contraseña actualizada con éxito') {
                Toastify({
                    text: "Contraseña actualizada exitosamente!",
                    duration: 3000,
                    backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)"
                }).showToast();
                setTimeout(() => {
                    window.location.href = '/login';
                }, 3000);
            } else {
                Toastify({
                    text: message || "Error al actualizar la contraseña!",
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
