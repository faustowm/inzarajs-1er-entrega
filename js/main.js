// Objeto para manejar los tipos y precios de las velas
const preciosVelas = {
    decorativas: 500,
    bandejas: 900,
    carameleras: 1500
};

// Objeto que almacenará las cantidades de velas seleccionadas por el usuario
class VentaVelas {
    constructor() {
        this.velasSeleccionadas = {};
    }

    agregarVela(tipo, cantidad) {
        if (this.velasSeleccionadas[tipo]) {
            this.velasSeleccionadas[tipo] += cantidad;
        } else {
            this.velasSeleccionadas[tipo] = cantidad;
        }
    }

    restarVela(tipo, cantidad) {
        if (this.velasSeleccionadas[tipo]) {
            this.velasSeleccionadas[tipo] -= cantidad;
            if (this.velasSeleccionadas[tipo] <= 0) {
                delete this.velasSeleccionadas[tipo];
            }
        }
    }

    calcularCostoTotal() {
        let costoTotal = 0;
        for (let tipo in this.velasSeleccionadas) {
            if (this.velasSeleccionadas.hasOwnProperty(tipo)) {
                costoTotal += preciosVelas[tipo] * this.velasSeleccionadas[tipo];
            }
        }
        return costoTotal;
    }
}

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
            alert("¡Atención! Si desea comprar más de 10 velas, por favor comuníquese con nosotros para obtener precios al por mayor.");
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

// Objeto para la venta de velas
let venta = new VentaVelas();

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

    venta.agregarVela(tipoVela, parseInt(cantidadVela));

    let continuar;
    do {
        continuar = prompt("¿Desea agregar más velas o quitar algunas? (AGREGAR/QUITAR/NO)").toUpperCase();
    } while (continuar !== "AGREGAR" && continuar !== "QUITAR" && continuar !== "NO");

    if (continuar === "NO") {
        break; // Salir del bucle si el usuario no quiere agregar ni quitar más velas.
    } else if (continuar === "QUITAR") {
        let cantidadQuitar;
        do {
            cantidadQuitar = prompt(`¿Cuántas velas ${tipoVela} desea quitar?`);
        } while (!validarCantidad(cantidadQuitar));

        venta.restarVela(tipoVela, parseInt(cantidadQuitar));
    }
} while (true);

// Calcular el costo total de todas las velas seleccionadas
let costoTotal = venta.calcularCostoTotal();

// Costo total de las velas.
alert(`El costo total de su pedido es: $${costoTotal}. \n\n¡Muchas gracias por su compra, ${nombreUsuario}! ¡Vuelva pronto!`);


