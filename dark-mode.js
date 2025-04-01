document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.getElementById("dark-mode-toggle");
    const body = document.body;

    // Función para cambiar el modo oscuro
    function toggleDarkMode() {
        body.classList.toggle("dark-mode");
        // Guarda la preferencia en localStorage
        localStorage.setItem("darkMode", body.classList.contains("dark-mode") ? "enabled" : "disabled");
    }

    // Comprobar si el usuario ya tiene una preferencia guardada
    if (localStorage.getItem("darkMode") === "enabled") {
        body.classList.add("dark-mode");
    }

    // Evento para cambiar el modo oscuro cuando el usuario haga clic en el botón
    if (toggleButton) {
        toggleButton.addEventListener("click", toggleDarkMode);
    }
});

    // Boton de home

document.getElementById("home-button").addEventListener("click", () => {
    window.location.href = "index.html"; // Cambia "index.html" por la URL de tu página de inicio
});


