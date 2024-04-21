// Selecciona el contenedor donde se mostrarán los productos
const productosContainer = document.getElementById('contenido-json');

// URL del archivo JSON
const urlJson = '../json/proximamente.json';

// Realiza la petición Fetch para obtener el contenido del archivo JSON
fetch(urlJson)
    .then(response => {
        // Verifica si la respuesta es exitosa
        if (!response.ok) {
            throw new Error('No se pudo cargar el archivo JSON');
        }
        // Parsea la respuesta a formato JSON
        return response.json();
    })
    .then(data => {
        // Itera sobre las categorías y sus elementos
        for (const categoria in data) {
            const productos = data[categoria];
            // Crea un contenedor para la categoría
            const categoriaContainer = document.createElement('div');
            categoriaContainer.classList.add('categoria-container');
            // Crea un título para la categoría
            const categoriaTitle = document.createElement('h2');
            categoriaTitle.textContent = categoria.charAt(0).toUpperCase() + categoria.slice(1);
            categoriaContainer.appendChild(categoriaTitle);
            // Itera sobre los productos de la categoría
            productos.forEach(producto => {
                // Crea una tarjeta para cada producto
                const card = document.createElement('div');
                card.classList.add('card');
                // Agrega la imagen del producto
                const imagen = document.createElement('img');
                // Corregimos la ruta de la imagen
                imagen.src = `${producto.imagen}`;
                card.appendChild(imagen);
                // Agrega el nombre del producto
                const nombre = document.createElement('p');
                nombre.textContent = producto.nombre;
                card.appendChild(nombre);
                // Agrega la tarjeta al contenedor de la categoría
                categoriaContainer.appendChild(card);
            });
            // Agrega el contenedor de la categoría al contenedor principal de productos
            productosContainer.appendChild(categoriaContainer);
        }
    })
    .catch(error => {
        // Maneja los errores en caso de que ocurran
        console.error('Error al cargar el archivo JSON:', error);
    });
