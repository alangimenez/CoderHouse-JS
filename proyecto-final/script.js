let mesesMax = 0;
let mesesMin = 0;
let montoMax = 0;
let montoMin = 0;
const datosDePrestamo = [];
let datoSession = 0;
let tasaInteres = 0;
let controlSaveInfo = 0;

let tipoPrestamo = document.getElementById("tipoPrestamo");
tipoPrestamo.onchange = () => { cambiar() };

//cambia descripción del prestamo según lo seleccionado.
function cambiar() {
    let valor = document.getElementById("tipoPrestamo").value;
    switch (valor) {
        case "0":
            document.getElementById("caracteristica").innerHTML = "Prestamo personal, a una tasa de interes del 12%, con un plazo mínimo de 3 meses y máximo de 60 meses, pudiendo solicitar un mínimo de 500 UVAs y un máximo de 10.000 UVAs"
            break;
        case "1":
            document.getElementById("caracteristica").innerHTML = "Prestamo hipotecario, a una tasa de interes del 3.5%, con un plazo mínimo de 60 meses y máximo de 360 meses, pudiendo solicitar un mínimo de 10.000 UVAs y un máximo de 150.000 UVAs"
            break;
        case "2":
            document.getElementById("caracteristica").innerHTML = "Prestamo prendario, a una tasa de interes del 6%, con un plazo mínimo de 6 meses y máximo de 96 meses, pudiendo solicitar un mínimo de 1.000 UVAs y un máximo de 15.000 UVAs"
            break;
    }
}

function calculoHipotecario() { //inicia proceso de calculos para el prestamo
    controlSaveInfo = controlSaveInfo + 1;
    let capital = document.getElementById("capitalH").value;
    let plazo = document.getElementById("plazoH").value;
    let tipoPrestamo = document.getElementById("tipoPrestamo").value;
    switch (tipoPrestamo) { //setea los parametros limite de cada tipo de prestamo según lo seleccionado
        case "0": // personal
            mesesMax = 60;
            mesesMin = 3;
            montoMax = 10000;
            montoMin = 500;
            tasaInteres = 0.12 / 12;
            break;
        case "1": // hipotecario
            mesesMax = 360;
            mesesMin = 60;
            montoMax = 150000;
            montoMin = 10000;
            tasaInteres = 0.035 / 12;
            break;
        case "2": // prendario
            mesesMax = 96;
            mesesMin = 6;
            montoMax = 25000;
            montoMin = 1000;
            tasaInteres = 0.06 / 12;
            break;
    }
    if (capital == "" || plazo == "") { //controla posibles errores y los marca en el HTML
        document.getElementById("msjError").innerHTML = "Ud no ha ingresado datos en ambos campos. Por favor, reintentelo.";
        document.getElementById("capitalH").style.boxShadow = "0px 0px 5px 5px rgba(255,0,0,0.75)"
        document.getElementById("plazoH").style.boxShadow = "0px 0px 5px 5px rgba(255,0,0,0.75)"
        $("#msjError").fadeIn("slow");
    } else if (capital < montoMin || capital > montoMax) {
        document.getElementById("msjError").innerHTML = "El capital ingresado esta fuera de lo permitido, el monto mínimo a solicitar es de " + montoMin + ", mientras que el máximo es de " + montoMax + ". Por favor, reintentelo.";
        document.getElementById("msjError").style.color = "red";
        document.getElementById("capitalH").style.boxShadow = "0px 0px 5px 5px rgba(255,0,0,0.75)";
        document.getElementById("plazoH").style.boxShadow = "0px 0px 0px 0px rgba(255,0,0,0.75)";
        $("#msjError").fadeIn("slow");
    } else if (plazo < mesesMin || plazo > mesesMax) {
        document.getElementById("msjError").innerHTML = "El plazo ingresado esta fuera de lo permitido, el plazo mínimo a solicitar es de " + mesesMin + ", mientras que el máximo es de " + mesesMax + ". Por favor, reintentanlo";
        document.getElementById("msjError").style.color = "red";
        document.getElementById("plazoH").style.boxShadow = "0px 0px 5px 5px rgba(255,0,0,0.75)";
        document.getElementById("capitalH").style.boxShadow = "0px 0px 0px 0px rgba(255,0,0,0.75)";
        $("#msjError").fadeIn("slow");
    } else {
        document.getElementById("msjError").innerHTML = "";
        document.getElementById("capitalH").style.boxShadow = "0px 0px 0px 0px rgba(255,0,0,0.75)";
        document.getElementById("plazoH").style.boxShadow = "0px 0px 0px 0px rgba(255,0,0,0.75)";
        prestamoObject(capital, plazo);
    }
}

//genera un array con el cuadro de marcha progresivo, a su vez valida que no haya datos previamente cargados (si los hay, lo elimina)
function prestamoObject(capital, plazo) {
    if (datosDePrestamo.length > 0) {
        datosDePrestamo.length = 0;
    }
    for (plazo; plazo > 0; plazo--) {
        datosDePrestamo.push({
            capital: capital,
            intereses: (capital * tasaInteres),
            capitalPostInt: capital * (1 + tasaInteres),
            cuota: (capital * (1 + tasaInteres)) / plazo,
            saldoRem: (capital * (1 + tasaInteres)) - ((capital * (1 + tasaInteres)) / plazo),
        });
        capital = (capital * (1 + tasaInteres)) - ((capital * (1 + tasaInteres)) / plazo);
    }
    controlCuadro();
}

//controla que a la hora de generar un cuadro desde cero, no haya un cuadro anterior (si lo hay, lo elimina)
let orden = 0;
function controlCuadro() {
    if (orden == 0) {
        construirTabla();
        orden++;
    } else {
        eliminarInfo();
        construirTabla();
        orden++;
    }
}

// fn para eliminar table y button
function eliminarInfo() {
    let eliminar = document.getElementById("table");
    eliminar.parentNode.removeChild(eliminar);
    let botonEliminar = document.getElementById("solicitarPrestamo");
    botonEliminar.parentNode.removeChild(botonEliminar);
}

//genera cuadro de marcha progresiva en HTML
function construirTabla() {
    let tabla = document.createElement("table");
    let body = document.getElementById("paraTablas");
    body.appendChild(tabla);
    tabla.setAttribute("id", "table");
    tabla.setAttribute("class", "table table-hover");
    let trheadcabeza = document.createElement("thead");
    tabla.appendChild(trheadcabeza);
    trheadcabeza.setAttribute("class", "tabla_primerFila");
    let trhead = document.createElement("tr");
    trheadcabeza.appendChild(trhead);
    let tdhead0 = document.createElement("td");
    tdhead0.innerHTML = "Número de cuota";
    trhead.appendChild(tdhead0);
    let tdhead1 = document.createElement("td");
    tdhead1.innerHTML = "Saldo pendiente al inicio";
    trhead.appendChild(tdhead1);
    let tdhead2 = document.createElement("td");
    tdhead2.innerHTML = "Intereses sobre saldo";
    trhead.appendChild(tdhead2);
    let tdhead3 = document.createElement("td");
    tdhead3.innerHTML = "Saldo con intereses";
    trhead.appendChild(tdhead3);
    let tdhead4 = document.createElement("td");
    tdhead4.innerHTML = "Cuota a pagar";
    trhead.appendChild(tdhead4);
    let tdhead5 = document.createElement("td");
    tdhead5.innerHTML = "Remanente post pago";
    trhead.appendChild(tdhead5);
    let tbody = document.createElement("tbody");
    tabla.appendChild(tbody);
    let prestamo = datosDePrestamo.length;
    for (let i = 0; i < prestamo; i++) {
        let tr1 = document.createElement("tr");
        tbody.appendChild(tr1);
        let info0 = document.createElement("td");
        info0.innerHTML = i + 1;
        tr1.appendChild(info0);
        let info = document.createElement("td");
        info.innerHTML = redondear(datosDePrestamo[i].capital);
        tr1.appendChild(info);
        let info4 = document.createElement("td");
        info4.innerHTML = redondear(datosDePrestamo[i].intereses);
        tr1.appendChild(info4);
        let info5 = document.createElement("td");
        info5.innerHTML = redondear(datosDePrestamo[i].capitalPostInt);
        tr1.appendChild(info5);
        let info2 = document.createElement("td");
        info2.innerHTML = redondear(datosDePrestamo[i].cuota);
        tr1.appendChild(info2);
        let info3 = document.createElement("td");
        info3.innerHTML = redondear(datosDePrestamo[i].saldoRem);
        tr1.appendChild(info3);
    }
    $("#paraTablas").append(`<button id="solicitarPrestamo" class="btn btn-dark btn-align btn-margin" onclick="solicitarPrestamo()">Solicitar prestamo</button>`)
    $(".tablaa").fadeIn("slow");
}

// desplega el formulario para ingresar datos personales y confirmar prestamo
function solicitarPrestamo() {
    $("#datosPersonales").fadeIn("slow");
}

// verificar errores en los datos personales antes de enviar info
$("form").submit(function (e) {
    e.preventDefault();
    let nombre = $("#nombre").val();
    let apellido = $("#apellido").val();
    let dni = $("#dni").val();
    let telefono = $("#telefono").val();
    let email = $("#email").val();
    let email2 = $("#email2").val();
    if (nombre == "" || apellido == "" || dni == "" || telefono == "" || email == "" || email2 == "" || email != email2) {
        let error = "Por favor, verifique los siguiente errores";
        $(".errores").remove();
        if (nombre == "") {
            $("#datosPersonales").append(`<p class="errores">El campo nombre esta vacio</p>`)
        }
        if (apellido == "") {
            $("#datosPersonales").append(`<p class="errores">El campo apellido esta vacio</p>`)
        }
        if (dni == "") {
            $("#datosPersonales").append(`<p class="errores">El campo DNI esta vacio</p>`)
        }
        if (telefono == "") {
            $("#datosPersonales").append(`<p class="errores">El campo telefono esta vacio</p>`)
        }
        if (email == "") {
            $("#datosPersonales").append(`<p class="errores">El campo email esta vacio</p>`)
        }
        if (email2 == "") {
            $("#datosPersonales").append(`<p class="errores">El campo Confirme email esta vacio</p>`)
        }
        if (email != email2) {
            $("#datosPersonales").append(`<p class="errores">Los emails proporcionados no son coincidentes</p>`)
        }
        $("#error").text(error);

    } else {
        alert("Su prestamo ha sido preaprobado. Le enviaremos las indicaciones al mail proporcionado para que proporcione la documentación correspondiente.")
        location.reload();
    }
})

// fn para guardar calculos previos (se recuperan via botones)
const datosGuar = [];
let rut = 0;
$("#saveInformacion").click(function () {
    let capital = document.getElementById("capitalH").value;
    let plazo = document.getElementById("plazoH").value;
    let tipoPrestamo = document.getElementById("tipoPrestamo").value;
    if (controlSaveInfo == 0) {
        document.getElementById("msjError").innerHTML = "Para guardar un prestamo, primero debe previsualizarlo.";
        document.getElementById("capitalH").style.boxShadow = "0px 0px 5px 5px rgba(255,0,0,0.75)"
        document.getElementById("plazoH").style.boxShadow = "0px 0px 5px 5px rgba(255,0,0,0.75)"
        $("#msjError").fadeIn("slow");
    } else if (capital < montoMin || capital > montoMax) {
        document.getElementById("msjError").innerHTML = "El capital ingresado esta fuera de lo permitido, el monto mínimo a solicitar es de " + montoMin + ", mientras que el máximo es de " + montoMax + ". Por favor, reintentelo.";
        document.getElementById("msjError").style.color = "red";
        document.getElementById("capitalH").style.boxShadow = "0px 0px 5px 5px rgba(255,0,0,0.75)";
        document.getElementById("plazoH").style.boxShadow = "0px 0px 0px 0px rgba(255,0,0,0.75)";
        $("#msjError").fadeIn("slow");
    } else if (plazo < mesesMin || plazo > mesesMax) {
        document.getElementById("msjError").innerHTML = "El plazo ingresado esta fuera de lo permitido, el plazo mínimo a solicitar es de " + mesesMin + ", mientras que el máximo es de " + mesesMax + ". Por favor, reintentanlo";
        document.getElementById("msjError").style.color = "red";
        document.getElementById("plazoH").style.boxShadow = "0px 0px 5px 5px rgba(255,0,0,0.75)";
        document.getElementById("capitalH").style.boxShadow = "0px 0px 0px 0px rgba(255,0,0,0.75)";
        $("#msjError").fadeIn("slow");
    } else {
        document.getElementById("msjError").innerHTML = "";
        document.getElementById("capitalH").style.boxShadow = "0px 0px 0px 0px rgba(255,0,0,0.75)";
        document.getElementById("plazoH").style.boxShadow = "0px 0px 0px 0px rgba(255,0,0,0.75)";
        rut = rut + 1;
        datosGuar.push({
            identificacion: rut,
            tipoPrestamo: $("#tipoPrestamo").val(), // 0 personal, 1 hipotecario, 2 prendario
            capital: $("#capitalH").val(),
            plazo: $("#plazoH").val(),
        });
        $("#destinoGuardado").append(`<button id="` + rut + `" onclick="correr(this)" class="btn btn-dark botton"> Prestamo ` + clasificacion(datosGuar[rut - 1].tipoPrestamo) + ` Capital ${datosGuar[rut - 1].capital} Plazo ${datosGuar[rut - 1].plazo} meses</button>`)

        // eliminar data y reestablecer valores
        if (rut == 1) {
            $("#destinoBorrar").append(`<button id="eliminarGuardados" onclick="limpiarInfo()" class="btn btn-dark botton">Eliminar información guardada</button>`);
        }
    }
})

//devuelve que tipo de prestamo es para los botones que se generan
function clasificacion(numero) {
    let salida = "hola";
    switch (numero) {
        case "0":
            salida = " Personal "
            break;
        case "1":
            salida = " Hipotecario "
            break;
        case "2":
            salida = " Prendario "
            break;

    }
    return (salida);
}

// fn para limpiar datos guardados (y eliminar botones)
function limpiarInfo() {
    for (let i = datosGuar.length; i > 0; i--) {
        datosGuar.pop();
    }
    rut = 0;
    $(".botton").remove();
}

// fn para los botones que recuperan prestamos guardados
let version = 0;
function correr(comp) {
    version = comp.id;
    console.log(version);
    eliminarInfo();
    nuevaTabla();
    function nuevaTabla() {
        let tabla = document.createElement("table");
        let body = document.getElementById("paraTablas");
        body.appendChild(tabla);
        tabla.setAttribute("id", "table");
        tabla.setAttribute("class", "table table-hover");
        let trheadcabeza = document.createElement("thead");
        tabla.appendChild(trheadcabeza);
        trheadcabeza.setAttribute("class", "tabla_primerFila");
        let trhead = document.createElement("tr");
        trheadcabeza.appendChild(trhead);
        let tdhead0 = document.createElement("td");
        tdhead0.innerHTML = "Número de cuota";
        trhead.appendChild(tdhead0);
        let tdhead1 = document.createElement("td");
        tdhead1.innerHTML = "Saldo pendiente al inicio";
        trhead.appendChild(tdhead1);
        let tdhead2 = document.createElement("td");
        tdhead2.innerHTML = "Intereses sobre saldo";
        trhead.appendChild(tdhead2);
        let tdhead3 = document.createElement("td");
        tdhead3.innerHTML = "Saldo con intereses";
        trhead.appendChild(tdhead3);
        let tdhead4 = document.createElement("td");
        tdhead4.innerHTML = "Cuota a pagar";
        trhead.appendChild(tdhead4);
        let tdhead5 = document.createElement("td");
        tdhead5.innerHTML = "Remanente post pago";
        trhead.appendChild(tdhead5);
        let tbody = document.createElement("tbody");
        tabla.appendChild(tbody);
        let tiempo = datosGuar[version - 1].plazo;
        let valor = datosGuar[version - 1].capital;
        let tipoDePrestamo = datosGuar[version - 1].tipoPrestamo;
        let interesAplicable = 0;
        switch (tipoDePrestamo) {
            case "0":
                interesAplicable = 0.12 / 12;
                break;
            case "1":
                interesAplicable = 0.035 / 12;
                break;
            case "2":
                interesAplicable = 0.06 / 12;
                break;
        }
        const nuevaTabla = []; // genera un nuevo array para volver a calcular el cuadro de marcha progresiva 
        for (tiempo; tiempo > 0; tiempo--) { // pushea toda el cuadro de marcha progresiva al array
            nuevaTabla.push({
                capital: valor,
                intereses: (valor * interesAplicable),
                capitalPostInt: valor * (1 + interesAplicable),
                cuota: (valor * (1 + interesAplicable)) / tiempo,
                saldoRem: (valor * (1 + interesAplicable)) - (valor * (1 + interesAplicable)) / tiempo
            });
            valor = (valor * 1.01) - ((valor * 1.01) / tiempo);
        }
        tiempo = datosGuar[version - 1].plazo;
        for (let j = 0; j < tiempo; j++) {
            let tr1 = document.createElement("tr");
            tbody.appendChild(tr1);
            let info0 = document.createElement("td");
            info0.innerHTML = j + 1;
            tr1.appendChild(info0);
            let info = document.createElement("td");
            info.innerHTML = redondear(nuevaTabla[j].capital);
            tr1.appendChild(info);
            let info4 = document.createElement("td");
            info4.innerHTML = redondear(nuevaTabla[j].intereses);
            tr1.appendChild(info4);
            let info5 = document.createElement("td");
            info5.innerHTML = redondear(nuevaTabla[j].capitalPostInt);
            tr1.appendChild(info5);
            let info2 = document.createElement("td");
            info2.innerHTML = redondear(nuevaTabla[j].cuota);
            tr1.appendChild(info2);
            let info3 = document.createElement("td");
            info3.innerHTML = redondear(nuevaTabla[j].saldoRem);
            tr1.appendChild(info3);
        }
        $("#paraTablas").append(`<button id="solicitarPrestamo" onclick="solicitarPrestamo()" class="btn btn-dark btn-margin">Solicitar prestamo</button>`)
    }
}

// consulta api para buscar 
const dolar = "https://www.dolarsi.com/api/api.php?type=valoresprincipales";
//Agregamos un botón con jQuery
$("body").append('<button id="btn2">GET2</button>');
//Escuchamos el evento click del botón agregado
$(document).ready(function(){
    $.get(dolar, function (respuesta, estado) {
        if (estado === "success") {
            let datoUno = redondear(respuesta[4].casa.compra);
            let datoDos = redondear(respuesta[4].casa.venta);
            $(".cotizaciones").append(`<div>
                                <p>${respuesta[0].casa.nombre} ${respuesta[0].casa.compra} / ${respuesta[0].casa.venta}</p>
                                <p>${respuesta[3].casa.nombre} ${respuesta[3].casa.compra} / ${respuesta[3].casa.venta}</p>
                                <p>${respuesta[4].casa.nombre} `+ datoUno + ` / `+ datoDos + `</p>
                                </div>`);
        }
    });
})

//funcion para redondear numeros aparte
function redondear(numero) {
    let num = parseFloat(numero).toFixed(2);
    return (num);
}