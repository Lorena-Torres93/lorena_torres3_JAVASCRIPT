document.addEventListener("DOMContentLoaded", function () {
   // Galería de imágenes y modal
const imagenes = document.querySelectorAll(".imagen-galeria");
const modal = document.getElementById("modal");
const imagenAmpliada = document.getElementById("imagen-ampliada");
const cerrar = document.querySelector(".cerrar");
const btnAnterior = document.getElementById("anterior");
const btnSiguiente = document.getElementById("siguiente");

let indiceActual = 0;

// Abrir modal al hacer clic en una imagen
imagenes.forEach((imagen, index) => {
    imagen.addEventListener("click", () => {
        modal.style.display = "flex"; // Usamos flex en lugar de block para asegurarnos de que se centre
        modal.setAttribute("aria-hidden", "false");
        modal.setAttribute("tabindex", "-1");
        modal.focus();

        imagenAmpliada.src = imagen.src;
        indiceActual = index;
    });
});

// Cerrar modal
const cerrarModal = () => {
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
};

cerrar.addEventListener("click", cerrarModal);

// Cambiar de imagen
const cambiarImagen = (direccion) => {
    if (imagenes.length === 0) return;
    indiceActual = (indiceActual + direccion + imagenes.length) % imagenes.length;
    imagenAmpliada.src = imagenes[indiceActual].src;
};

btnAnterior.addEventListener("click", () => cambiarImagen(-1));
btnSiguiente.addEventListener("click", () => cambiarImagen(1));

// Cerrar modal al hacer clic fuera de la imagen
modal.addEventListener("click", (e) => {
    if (e.target === modal) cerrarModal();
});

// Navegación con teclado
document.addEventListener("keydown", (e) => {
    if (modal.style.display === "flex") { // Usamos "flex" en lugar de "block"
        if (e.key === "Escape") cerrarModal();
        if (e.key === "ArrowRight") cambiarImagen(1);
        if (e.key === "ArrowLeft") cambiarImagen(-1);
    }
});


    // Cargar noticias desde el archivo JSON
    const contenedorNoticias = document.getElementById('contenedor-noticias');

    const cargarNoticias = () => {
        fetch('./noticias.json')
            .then(response => {
                if (!response.ok) throw new Error('Error de red');
                return response.json();
            })
            .then(data => {
                contenedorNoticias.innerHTML = ''; // Limpiar contenido previo

                if (data.noticias && data.noticias.length > 0) {
                    data.noticias.forEach(noticia => {
                        const noticiaElement = document.createElement('a');
                        noticiaElement.classList.add('noticia');
                        noticiaElement.href = noticia.enlace;
                        noticiaElement.target = "_blank";
                        noticiaElement.rel = "noopener noreferrer";

                        noticiaElement.innerHTML = `
                            <h3>${noticia.titulo}</h3>
                            <p>${noticia.descripcion}</p>
                        `;

                        contenedorNoticias.appendChild(noticiaElement);
                    });
                } else {
                    contenedorNoticias.innerHTML = '<p>No hay noticias disponibles en este momento.</p>';
                }
            })
            .catch(error => {
                console.error('Error al cargar las noticias:', error);
                contenedorNoticias.innerHTML = `
                    <p>No se pudieron cargar las noticias. Por favor, intenta nuevamente más tarde.</p>
                    <button id="reintentar">Reintentar</button>
                `;
                document.getElementById('reintentar').addEventListener('click', cargarNoticias);
            });
    };

    cargarNoticias();
});
