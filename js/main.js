// Validar el nombre del usuario
function validarNombre(nombre) {
    return nombre && nombre.trim() !== ''; // Valida que se haya cargado si o si un nombre
}

// Validar la cantidad ingresada
function validarCantidad(cantidad) {
    if (!isNaN(cantidad) && parseInt(cantidad) > 0) {
        if (parseInt(cantidad) <= 10) {
            return true; // Si es un número entero positivo y no excede 10, retorna true
        } else {
            alert("¡Atención! Si desea comprar más de 10 velas, por favor comuníquese con nosotros para obtener precios al por mayor..");
            return false;
        }
    } else {
        alert("¡Error! Por favor ingrese un número entero positivo para la cantidad de velas.");
        return false; // Si no es un número entero positivo, muestra una alerta y retorna false
    }
}

// Nombre de usuario
let nombreUsuario;
do {
    nombreUsuario = prompt("Bienvenidos a Inzara Aromas, ¿Cuál es su nombre?");
} while (!validarNombre(nombreUsuario));

// Objeto que almacenará las cantidades de velas seleccionadas por el usuario
let velasSeleccionadas = {};

// Ciclo 
do {
    let tipoVela = prompt(`${nombreUsuario}, elija qué tipo de velas necesita: Decorativas, Bandejas, Carameleras`).toLowerCase();
    
    // Validar el tipo de vela ingresado
    if (tipoVela !== 'decorativas' && tipoVela !== 'bandejas' && tipoVela !== 'carameleras') {
        alert("¡Error! Por favor ingrese un tipo de vela válido.");
        continue; // Vuelve al inicio del bucle para que el usuario ingrese nuevamente el tipo de vela
    }
    
    let cantidadVela;
    do {
        cantidadVela = prompt(`¿Cuántas velas ${tipoVela} necesita?`);
    } while (!validarCantidad(cantidadVela));

    velasSeleccionadas[tipoVela] = parseInt(cantidadVela);

    let agregarMas;
    do {
        agregarMas = prompt("¿Desea agregar más velas? (SI/NO)").toUpperCase();
    } while (agregarMas !== "SI" && agregarMas !== "NO");

    if (agregarMas === "NO") {
        break; // Salir del bucle si el usuario no quiere agregar más velas.
    }
} while (true);

// Calcular el costo total de todas las velas seleccionadas
let costoTotal = 0;
for (let tipo in velasSeleccionadas) {
    if (velasSeleccionadas.hasOwnProperty(tipo)) {
        if (tipo === 'decorativas') {
            costoTotal += 500 * velasSeleccionadas[tipo];
        } else if (tipo === 'bandejas') {
            costoTotal += 900 * velasSeleccionadas[tipo];
        } else if (tipo === 'carameleras') {
            costoTotal += 1500 * velasSeleccionadas[tipo];
        }
    }
}

// Costo total de las velas.
alert(`El costo total de su pedido es: $${costoTotal}. \n\n¡Muchas gracias por su compra, ${nombreUsuario}! ¡Vuelva pronto!`);
