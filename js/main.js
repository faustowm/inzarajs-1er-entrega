// Validar el nombre del usuario
function validarNombre(nombre) {
    return nombre && nombre.trim() !== ''; // Valida que se haya cargado si o si un nombre
}

// Validar la cantidad ingresada 
function validarCantidad(cantidad) {
    return !isNaN(cantidad) && parseInt(cantidad) > 0; // Valida que sea un numero entero
}

// Nombre de usuario
let nombreUsuario;
do {
    nombreUsuario = prompt("Bienvenidos a Inzara Aromas, ¿cuál es su nombre?");
} while (!validarNombre(nombreUsuario));

// Objeto que almacenará las cantidades de velas seleccionadas por el usuario
let velasSeleccionadas = {};

// Ciclo para elegri velas y cantidades a comprar.
do {
    let tipoVela = prompt("Elija qué tipo de velas necesita: Velas, Velitas, Velotas").toLowerCase();
    let cantidadVela;
    do {
        cantidadVela = prompt(`¿Cuántas velas ${tipoVela} necesita?`);
    } while (!validarCantidad(cantidadVela));

    velasSeleccionadas[tipoVela] = parseInt(cantidadVela);

    // Pregunta al usuario si quiere agregar más velas
    let agregarMas = confirm("¿Desea agregar más velas?");
    if (!agregarMas) {
        break; // Salir del bucle si el usuario no quiere agregar más velas
    }
} while (true);

// Calcular el costo total de todas las velas seleccionadas
let costoTotal = 0;
for (let tipo in velasSeleccionadas) {
    if (velasSeleccionadas.hasOwnProperty(tipo)) {
        if (tipo === 'velas') {
            costoTotal += 500 * velasSeleccionadas[tipo];
        } else if (tipo === 'velitas') {
            costoTotal += 900 * velasSeleccionadas[tipo];
        } else if (tipo === 'velotas') {
            costoTotal += 1500 * velasSeleccionadas[tipo];
        }
    }
}

// Costo total de las velas.
alert(`El costo total de su pedido es: $${costoTotal}. \n\n¡Muchas gracias por su compra, ${nombreUsuario}! ¡Vuelva pronto!`);
