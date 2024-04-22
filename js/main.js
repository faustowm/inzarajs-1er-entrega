document.addEventListener("DOMContentLoaded", function() {
	let carrito = [];

	// Cargar datos de las velas desde el archivo JSON
	cargarDatos("./json/data.json")
		.then(velas => {
			mostrarVelas(velas);
		})
		.catch(error => {
			console.error('Error al cargar los datos:', error);
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

	// Función para cargar los datos
	function cargarDatos(url) {
		return new Promise((resolve, reject) => {
			fetch(url)
				.then(response => {
					if (!response.ok) {
						throw new Error('Error al obtener los datos');
					}
					return response.json();
				})
				.then(data => {
					resolve(data);
				})
				.catch(error => {
					reject(error);
				});
		});
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

	function mostrarMensajeFlotante(mensaje) {
		const mensajeDiv = document.createElement("div");
		mensajeDiv.classList.add("mensaje-flotante");
		mensajeDiv.textContent = mensaje;
		document.body.appendChild(mensajeDiv);

		setTimeout(() => {
			mensajeDiv.remove();
		}, 1000);
	}

	// Agregar vela seleccionada al carrito
	function agregarAlCarrito(vela) {
		const index = carrito.findIndex(item => item.id === vela.id);
		if (index !== -1) {
			carrito[index].cantidad++;
		} else {
			carrito.push({...vela,
				cantidad: 1
			});
		}
		mostrarCarrito();
		guardarCarritoLocalStorage();
		actualizarContadorCarrito();
		mostrarMensajeFlotante("Agregaste una velita!!!");


	}

	// Función para mostrar/ocultar el carrito
	function toggleCarrito() {
		const carritoDiv = document.getElementById("carrito");
		if (carritoDiv.style.display === "block") {
			carritoDiv.style.display = "none";
		} else {
			carritoDiv.style.display = "block";
		}
	}
	document.getElementById("toggle-carrito").addEventListener("click", toggleCarrito);

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

		mostrarTotalCompra();
		actualizarContadorCarrito();

	}

	function actualizarContadorCarrito() {
		const contadorCarrito = document.getElementById("contador-carrito");
		const totalCarrito = carrito.reduce((total, item) => total + item.cantidad, 0);
		contadorCarrito.textContent = totalCarrito.toString();
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
			guardarCarritoLocalStorage();
			actualizarContadorCarrito();
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
					Swal.fire({
						title: '¡Agradecemos su compra!',
						text: '¡Inzara lo espera pronto!!!',
						icon: 'success',
						confirmButtonText: 'Aceptar'
					}).then(() => {
						resetearCarrito();
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


document.addEventListener("DOMContentLoaded", function() {

	mostrarHoraActual();
	setInterval(mostrarHoraActual, 1000);
});

// Hora actual
function mostrarHoraActual() {
	obtenerHoraActual()
		.then(horaActual => {
			const horaActualCarritoDiv = document.getElementById("hora-actual-carrito");
			horaActualCarritoDiv.textContent = horaActual;
		})
		.catch(error => {
			console.error('Error al obtener la hora:', error);
		});
}


function obtenerHoraActual() {
	return new Promise((resolve, reject) => {
		const horaActual = new Date().toLocaleString("es-ES", {
			timeZone: "America/Buenos_Aires"
		});
		resolve(horaActual);
	});
}git 