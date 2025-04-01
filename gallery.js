document.addEventListener("DOMContentLoaded", () => {
    const galleryItems = document.querySelectorAll(".gallery img, .gallery video"); // Imágenes y videos de la galería
    const viewer = document.querySelector(".image-viewer"); // Contenedor del visor
    const viewerMedia = viewer.querySelector(".viewer-media"); // Contenedor de medios (imagen/video)
    const closeBtn = viewer.querySelector(".close-btn");
    const prevBtn = viewer.querySelector(".prev-btn");
    const nextBtn = viewer.querySelector(".next-btn");
    const darkModeToggle = document.getElementById("dark-mode-toggle"); // Botón de modo oscuro
    
    let touchStartY = 0;
    let currentIndex = 0; // Índice del elemento actual

    // Mostrar imagen o video en grande al hacer clic
    galleryItems.forEach((item, index) => {
        item.addEventListener("click", () => {
            viewerMedia.innerHTML = ""; // Limpiar contenido previo
            currentIndex = index;

            if (item.tagName === "IMG") {
                const img = document.createElement("img");
                img.src = item.src;
                viewerMedia.appendChild(img);
            } else if (item.tagName === "VIDEO") {
                const video = document.createElement("video");
                video.src = item.src;
                video.controls = true;
                video.autoplay = true;
                video.muted = true; // Silenciar el video
                video.addEventListener("click", () => {
                    if (video.paused) {
                        video.play();
                    } else {
                        video.pause();
                    }
                });
                viewerMedia.appendChild(video);
            }
            
            viewer.classList.add("active");
        });
    });

    // Función para cerrar el visor y pausar el video si es necesario
    function closeViewer() {
        const video = viewerMedia.querySelector("video");
        if (video) {
            video.pause(); // Pausar el video al cerrar
        }
        viewer.classList.remove("active");
    }

    // Cerrar visor solo cuando se hace clic fuera del contenido
    viewer.addEventListener("click", (e) => {
        if (!viewerMedia.contains(e.target) && !e.target.classList.contains('nav-btn')) {
            closeViewer();
        }
    });

    // Cambiar al elemento anterior
    prevBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex === 0) ? galleryItems.length - 1 : currentIndex - 1;
        galleryItems[currentIndex].click();
    });

    // Cambiar al elemento siguiente
    nextBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex === galleryItems.length - 1) ? 0 : currentIndex + 1;
        galleryItems[currentIndex].click();
    });

    // Detectar gestos táctiles en móviles
    viewer.addEventListener("touchstart", (e) => {
        touchStartY = e.touches[0].clientY;
    });

    viewer.addEventListener("touchmove", (e) => {
        let touchEndY = e.touches[0].clientY;
        if (touchEndY - touchStartY > 50) { // Si desliza hacia abajo, cierra la imagen/video
            closeViewer();
        }
    });

});
