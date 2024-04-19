document.addEventListener("DOMContentLoaded", function() {
    let carrito = [];

    // Cargar datos de las velas desde el archivo JSON
    fetch("./json/data.json")
        .then(response => response.json())
        .then(data => {
            mostrarVelas(data);
        });

    // Mostrar las velas en el DOM
    function mostrarVelas(velas) {
        const decorativasContainer = document.getElementById("decorativas");
        const bandejasContainer = document.getElementById("bandejas");
        const caramelerasContainer = document.getElementById("carameleras");

        velas.decorativas.forEach(v => {
            const velaDiv = crearVelaDiv(v);
            decorativasContainer.appendChild(velaDiv);
        });

        velas.bandejas.forEach(v => {
            const velaDiv = crearVelaDiv(v);
            bandejasContainer.appendChild(velaDiv);
        });

        velas.carameleras.forEach(v => {
            const velaDiv = crearVelaDiv(v);
            caramelerasContainer.appendChild(velaDiv);
        });

        // Cargar el carrito guardado en el almacenamiento local
        cargarCarritoLocalStorage();
    }

    // Crear elemento de vela en el DOM
    function crearVelaDiv(vela) {
        const velaDiv = document.createElement("div");
        velaDiv.classList.add("vela");
        velaDiv.innerHTML = `
            <img src="${vela.imagen}" alt="${vela.nombre}">
            <h3>${vela.nombre}</h3>
            <p>$${vela.precio}</p>
            <button class="agregar" data-id="${vela.id}">Agregar al Carrito</button>
        `;
    
        velaDiv.querySelector('.agregar').addEventListener("click", () => {
            agregarAlCarrito(vela);
        });
    
        return velaDiv;
    }

    // Agregar vela seleccionada al carrito
    function agregarAlCarrito(vela) {
        const index = carrito.findIndex(item => item.id === vela.id);
        if (index !== -1) {
            carrito[index].cantidad++;
        } else {
            carrito.push({ ...vela, cantidad: 1 });
        }
        mostrarCarrito();
        guardarCarritoLocalStorage();
    }
    
    // Mostrar el contenido del carrito en el DOM
    function mostrarCarrito() {
        const resumenDiv = document.getElementById("resumen");
        resumenDiv.innerHTML = "";

        carrito.forEach(vela => {
            const velaDiv = document.createElement("div");
            velaDiv.innerHTML = `
                <span>${vela.nombre} - $${vela.precio}</span>
                <button class="agregar" data-id="${vela.id}">+</button>
                <span>${vela.cantidad}</span>
                <button class="quitar" data-id="${vela.id}">-</button>
            `;
            resumenDiv.appendChild(velaDiv);

            // Agregar evento para agregar una unidad al artículo
            velaDiv.querySelector('.agregar').addEventListener('click', () => {
                aumentarCantidad(vela.id);
            });

            // Agregar evento para quitar una unidad al artículo
            velaDiv.querySelector('.quitar').addEventListener('click', () => {
                disminuirCantidad(vela.id);
            });
        });

        
        mostrarTotalCompra(); // Mostrar el total de la compra
    }


    // Calcular el total de la compra
    function calcularTotalCompra() {
        let total = 0;
        carrito.forEach(vela => {
            total += vela.precio * vela.cantidad;
        });
        return total;
    }

    // Mostrar el total de la compra en el DOM
    function mostrarTotalCompra() {
        const totalCompraDiv = document.getElementById("total-compra");
        const total = calcularTotalCompra();
        totalCompraDiv.textContent = `Su compra es: $${total}`;
    }

    // Aumentar la cantidad de un artículo en el carrito
    function aumentarCantidad(id) {
        const index = carrito.findIndex(item => item.id === id);
        if (index !== -1) {
            carrito[index].cantidad++;
            mostrarCarrito();
        }
    }

    // Disminuir la cantidad de un artículo en el carrito
    function disminuirCantidad(id) {
        const index = carrito.findIndex(item => item.id === id);
        if (index !== -1) {
            if (carrito[index].cantidad > 1) {
                carrito[index].cantidad--;
            } else {
                carrito.splice(index, 1); // Si la cantidad es 1, eliminar el artículo del carrito
            }
            mostrarCarrito();
        }
    }

     // Guardar el carrito en el almacenamiento local
     function guardarCarritoLocalStorage() {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    // Cargar el carrito desde el almacenamiento local
    function cargarCarritoLocalStorage() {
        if (localStorage.getItem('carrito')) {
            carrito = JSON.parse(localStorage.getItem('carrito'));
            mostrarCarrito(); // Mostrar el carrito guardado al cargar la página
        }
    }
     // Limpiar el carrito
     document.getElementById("limpiar-carrito").addEventListener("click", () => {
        carrito.splice(0, carrito.length);
        mostrarCarrito();
        guardarCarritoLocalStorage(); // Guardar el carrito vacío
    });

// Finalizar la compra 
document.getElementById("finalizar-compra").addEventListener("click", () => {
    if (carrito.length === 0) {
        // Mostrar alerta de carrito vacío con SweetAlert
        Swal.fire({
            title: '¡Espera!',
            text: 'Te has olvidado de agregar una hermosa vela a tu carrito.',
            icon: 'warning',
            confirmButtonText: 'Aceptar'
        });
    } else {
        Swal.fire({
            title: '¿Llevamos mas velitas o confirmamos el pedido?',
            text: 'Confirmar para finalizar la compra.',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                // Si el usuario confirma, mostrar mensaje de éxito y restablecer carrito
                Swal.fire({
                    title: '¡Agradecemos su compra!',
                    text: '¡Inzara lo espera pronto!!!',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                }).then(() => {
                    resetearCarrito(); // Llama a la función para restablecer el carrito
                });
            }
        });
    }
});


     // Función para restablecer el carrito a cero
     function resetearCarrito() {
        carrito = [];
        mostrarCarrito();
        guardarCarritoLocalStorage(); 
    }
});


