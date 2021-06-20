/* 

// Controla número de cuotas dentro del máximo
function controlPrestamo() {
    let cuotas = document.getElementById("cuotas").value;
    if (cuotas > 36) {
        document.getElementById("resultado").innerHTML = "La cantidad máxima de cuotas es de 12. Reintentelo nuevamente.";
        document.getElementById("resultado").style.color = "red";
    } else {
        enviarPrestamo();
        controlCuadro();
    }
}

// Otorga información al hacer click
function enviarPrestamo() {
    let capital = document.getElementById("capital").value;
    let cuotas = document.getElementById("cuotas").value;
    let montoCuota = capital / cuotas;
    document.getElementById("resultado").innerHTML = "El importe final de la cuota será de " + montoCuota;
}

// Elimina la tabla anterior
function eliminarInfo() {
    let eliminar = document.getElementById("table");
    eliminar.parentNode.removeChild(eliminar);
}

// Controla si ya existe una tabla para elminarla (si no, se acumularia la información)
let orden = 0;
function controlCuadro() {
    if (orden == 0) {
        generarCuadro();
        orden++;
    } else {
        eliminarInfo();
        generarCuadro();
        orden++;
    }
}

// Genera el cuadro de marcha progresiva
function generarCuadro() {
    let cuotas = parseInt(document.getElementById("cuotas").value);
    let saldo = parseFloat(document.getElementById("capital").value);
    let tabla = document.createElement("table");
    let body = document.getElementById("cuerpo");
    body.appendChild(tabla);
    tabla.setAttribute("id", "table");
    let trhead = document.createElement("tr");
    body.appendChild(trhead);
    let tdhead1 = document.createElement("td");
    tdhead1.innerHTML = "Saldo pendiente al inicio";
    tabla.appendChild(tdhead1);
    let tdhead2 = document.createElement("td");
    tdhead2.innerHTML = "Intereses sobre saldo";
    tabla.appendChild(tdhead2);
    let tdhead3 = document.createElement("td");
    tdhead3.innerHTML = "Saldo con intereses";
    tabla.appendChild(tdhead3);
    let tdhead4 = document.createElement("td");
    tdhead4.innerHTML = "Cuota a pagar";
    tabla.appendChild(tdhead4);
    let tdhead5 = document.createElement("td");
    tdhead5.innerHTML = "Remanente post pago";
    tabla.appendChild(tdhead5);
    for (cuotas; cuotas > 0; cuotas--) {
        let tr1 = document.createElement("tr");
        tabla.appendChild(tr1);
        let info = document.createElement("td");
        info.innerHTML = saldo.toFixed(2);
        tr1.appendChild(info);
        let interes = saldo * 0.01;
        let interesDec = interes.toFixed(2);
        let info4 = document.createElement("td");
        info4.innerHTML = interesDec;
        tr1.appendChild(info4);
        saldo = saldo + interes;
        let saldoDec = saldo.toFixed(2);
        let info5 = document.createElement("td");
        info5.innerHTML = saldoDec;
        tr1.appendChild(info5);
        let montoCuotas = saldo / cuotas;
        let montoCuotasDec = montoCuotas.toFixed(2)
        let info2 = document.createElement("td");
        info2.innerHTML = montoCuotasDec;
        tr1.appendChild(info2);
        saldo = saldo - montoCuotas;
        saldoDec = saldo.toFixed(2);
        let info3 = document.createElement("td");
        info3.innerHTML = saldoDec;
        tr1.appendChild(info3);
    }
}

let botonTipoUno = document.getElementById("botonTipoUno");
botonTipoUno.addEventListener("click", controlPrestamo);
botonTipoUno.addEventListener("mouseover", cambioColor);
botonTipoUno.addEventListener("mouseout", vueltaColor);

function cambioColor () {
    botonTipoUno.style.color = "white";
    botonTipoUno.style.background = "black";
}

function vueltaColor () {
    botonTipoUno.style.color = "black";
    botonTipoUno.style.background = "white";
}

let botonTipoDos = document.getElementById("botonTipoDos");
botonTipoDos.onclick = () => prestamoObject();
botonTipoDos.onmouseover = () => cambioColorx2();
botonTipoDos.onmouseout = () => vueltaColorx2();

function cambioColorx2 () {
    botonTipoDos.style.color = "white";
    botonTipoDos.style.background = "black";
}

function vueltaColorx2 () {
    botonTipoDos.style.color = "black";
    botonTipoDos.style.background = "white";
}
 */
let mesesMax = 0;
let mesesMin = 0;
let montoMax = 0;
let montoMin = 0;

let tipoPrestamo = document.getElementById("tipoPrestamo");
tipoPrestamo.onchange = () => { cambiar() };

function cambiar() {
    let valor = document.getElementById("tipoPrestamo").value;
    switch (valor) {
        case "0":
            document.getElementById("caracteristica").innerHTML = "Prestamo personal, a una tasa de interes del x%, con un plazo mínimo de 6 meses y máximo de 96 meses, pudiendo solicitar un mínimo de 1.000 UVAs y un máximo de 15.000 UVAs"
            break;
        case "1":
            document.getElementById("caracteristica").innerHTML = "Prestamo hipotecario, a una tasa de interes del x%, con un plazo mínimo de 6 meses y máximo de 96 meses, pudiendo solicitar un mínimo de 1.000 UVAs y un máximo de 15.000 UVAs"
            break;
        case "2":
            document.getElementById("caracteristica").innerHTML = "Prestamo prendario, a una tasa de interes del x%, con un plazo mínimo de 6 meses y máximo de 96 meses, pudiendo solicitar un mínimo de 1.000 UVAs y un máximo de 15.000 UVAs"
            break;
    }
}



function calculoHipotecario() {
    let capital = document.getElementById("capitalH").value;
    let plazo = document.getElementById("plazoH").value;
    let tipoPrestamo = document.getElementById("tipoPrestamo").value;
    switch (tipoPrestamo) {
        case "0":
            console.log("Personal");
            mesesMax = 60;
            mesesMin = 3;
            montoMax = 10000;
            montoMin = 500;
            console.log(mesesMax, mesesMin, montoMax, montoMin);
            break;
        case "1":
            console.log("Hipotecario");
            mesesMax = 360;
            mesesMin = 60;
            montoMax = 150000;
            montoMin = 10000;
            console.log(mesesMax, mesesMin, montoMax, montoMin);
            break;
        case "2":
            console.log("Prendario");
            mesesMax = 96;
            mesesMin = 6;
            montoMax = 25000;
            montoMin = 1000;
            console.log(mesesMax, mesesMin, montoMax, montoMin);
            break;
    }
    if (capital == "" || plazo == "") {
        document.getElementById("msjError").innerHTML = "Ud no ha ingresado datos en ambos campos. Por favor, reintentelo.";
    } else if (capital < montoMin || capital > montoMax) {
        document.getElementById("msjError").innerHTML = "El capital ingresado esta fuera de lo permitido, por favor, reintentelo.";
    } else if (plazo < mesesMin || plazo > mesesMax) {
        document.getElementById("msjError").innerHTML = "El plazo ingresado esta fuera de lo permitido, por favor, reintentanlo";
    }
    else {
        document.getElementById("msjError").innerHTML = "";
        prestamoObject(capital, plazo);
    }
}

function prestamoObject(capital, plazo) {
    const datosDePrestamo = [];
    for (plazo; plazo > 0; plazo--) {
        datosDePrestamo.push({
            capital: capital,
            intereses: (capital * 0.01),
            capitalPostInt: capital * 1.01,
            cuota: (capital * 1.01) / plazo,
            saldoRem: capital - (capital / plazo)
        });
        capital = (capital * 1.01) - ((capital * 1.01) / plazo);
    }
    console.log(datosDePrestamo);
}