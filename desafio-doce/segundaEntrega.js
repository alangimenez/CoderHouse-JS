let mesesMax = 0;
let mesesMin = 0;
let montoMax = 0;
let montoMin = 0;
const datosDePrestamo = [];
let datoSession = 0;

let tipoPrestamo = document.getElementById("tipoPrestamo");
tipoPrestamo.onchange = () => { cambiar() };

//para cambiar descripción del prestamo según lo seleccionado.
function cambiar() {
    let valor = document.getElementById("tipoPrestamo").value;
    switch (valor) {
        case "0":
            document.getElementById("caracteristica").innerHTML = "Prestamo personal, a una tasa de interes del x%, con un plazo mínimo de 3 meses y máximo de 60 meses, pudiendo solicitar un mínimo de 500 UVAs y un máximo de 10.000 UVAs"
            break;
        case "1":
            document.getElementById("caracteristica").innerHTML = "Prestamo hipotecario, a una tasa de interes del x%, con un plazo mínimo de 60 meses y máximo de 360 meses, pudiendo solicitar un mínimo de 10.000 UVAs y un máximo de 150.000 UVAs"
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
    switch (tipoPrestamo) { //setea los parametros limite de cada tipo de prestamo según lo seleccionado
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
    if (capital == "" || plazo == "") { //controla posibles errores y los marca en el HTML
        document.getElementById("msjError").innerHTML = "Ud no ha ingresado datos en ambos campos. Por favor, reintentelo.";
        document.getElementById("msjError").style.color = "red";
        document.getElementById("capitalH").style.boxShadow = "0px 0px 5px 5px rgba(255,0,0,0.75)"
        document.getElementById("plazoH").style.boxShadow = "0px 0px 5px 5px rgba(255,0,0,0.75)"
    } else if (capital < montoMin || capital > montoMax) {
        document.getElementById("msjError").innerHTML = "El capital ingresado esta fuera de lo permitido, el monto mínimo a solicitar es de " + montoMin + ", mientras que el máximo es de " + montoMax + ". Por favor, reintentelo.";
        document.getElementById("msjError").style.color = "red";
        document.getElementById("capitalH").style.boxShadow = "0px 0px 5px 5px rgba(255,0,0,0.75)";
        document.getElementById("plazoH").style.boxShadow = "0px 0px 0px 0px rgba(255,0,0,0.75)";
    } else if (plazo < mesesMin || plazo > mesesMax) {
        document.getElementById("msjError").innerHTML = "El plazo ingresado esta fuera de lo permitido, el plazo mínimo a solicitar es de " + mesesMin + ", mientras que el máximo es de " + mesesMax + ". Por favor, reintentanlo";
        document.getElementById("msjError").style.color = "red";
        document.getElementById("plazoH").style.boxShadow = "0px 0px 5px 5px rgba(255,0,0,0.75)";
        document.getElementById("capitalH").style.boxShadow = "0px 0px 0px 0px rgba(255,0,0,0.75)";
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
            intereses: (capital * 0.01),
            capitalPostInt: capital * 1.01,
            cuota: (capital * 1.01) / plazo,
            saldoRem: capital - (capital / plazo)
        });
        capital = (capital * 1.01) - ((capital * 1.01) / plazo);
    }
    controlCuadro();
    console.log(datosDePrestamo[0].capital);
}

//genera cuadro de marcha progresiva en HTML
function construirTabla() {
    let tabla = document.createElement("table");
    let body = document.getElementById("cuerpo");
    body.appendChild(tabla);
    tabla.setAttribute("id", "table");
    let trhead = document.createElement("tr");
    tabla.appendChild(trhead);
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
    let prestamo = datosDePrestamo.length;
    for (let i = 0; i < prestamo; i++) {
        let tr1 = document.createElement("tr");
        tabla.appendChild(tr1);
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
}

//funcion para redondear numeros aparte
function redondear(numero) {
    let num = parseFloat(numero).toFixed(2);
    return (num);
}

//guarda datos de un prestamo calculado en sessionStorage
let contador = 0;
function guardar() {
    sessionStorage.setItem(datoSession, JSON.stringify(datosDePrestamo));
    if (contador == 0) {
        console.log(document.getElementById("boton"));
        let boton = document.createElement("button");
        let body = document.getElementById("cuerpo");
        body.appendChild(boton);
        boton.innerHTML = "Recuperar info guardada";
        boton.setAttribute("id", "boton")
        boton.setAttribute("onclick", "recuperarInfo()");
        contador = contador + 1;
    }
}

//recupera la info del sessionStorage y la refleja en una tabla (elimina la tabla anterior que figure en el HTML)
function recuperarInfo() {
    eliminarInfo();
    console.log(sessionStorage.getItem(datoSession));
    const parsear = sessionStorage.getItem(datoSession);
    const parseado = JSON.parse(parsear);
    console.log(parseado);
    nuevaTabla();


    function nuevaTabla() {
        let tabla = document.createElement("table");
        let body = document.getElementById("cuerpo");
        body.appendChild(tabla);
        tabla.setAttribute("id", "table");
        let trhead = document.createElement("tr");
        tabla.appendChild(trhead);
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
        let prestamo = parseado.length;
        for (let i = 0; i < prestamo; i++) {
            let tr1 = document.createElement("tr");
            tabla.appendChild(tr1);
            let info = document.createElement("td");
            info.innerHTML = redondear(parseado[i].capital);
            tr1.appendChild(info);
            let info4 = document.createElement("td");
            info4.innerHTML = redondear(parseado[i].intereses);
            tr1.appendChild(info4);
            let info5 = document.createElement("td");
            info5.innerHTML = redondear(parseado[i].capitalPostInt);
            tr1.appendChild(info5);
            let info2 = document.createElement("td");
            info2.innerHTML = redondear(parseado[i].cuota);
            tr1.appendChild(info2);
            let info3 = document.createElement("td");
            info3.innerHTML = redondear(parseado[i].saldoRem);
            tr1.appendChild(info3);
        }
    }


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

//elimina el cuadro de marcha progresiva
function eliminarInfo() {
    let eliminar = document.getElementById("table");
    eliminar.parentNode.removeChild(eliminar);
}

const datosGuar = [];
let rut = 0;
$("#botonTipoDos").click(function () {
    console.log(this.id);
    console.log($("#capitalH").val());
    console.log($("#plazoH").val());
    console.log($("#tipoPrestamo").val());
    rut = rut + 1;
    datosGuar.push({
        identificacion: rut,
        tipoPrestamo: $("#tipoPrestamo").val(), // 0 personal, 1 hipotecario, 2 prendario
        capital: $("#capitalH").val(),
        plazo: $("#plazoH").val(),
    });
    $("#destino").append(`<button id='btn${datosGuar[rut - 1].identificacion}'>Prestamo `+clasificacion(datosGuar[rut - 1].tipoPrestamo)+ ` Capital ${datosGuar[rut - 1].capital} Plazo ${datosGuar[rut - 1].plazo} meses</button>`)
    console.log(datosGuar);
    $(`#btn${datosGuar[rut - 1].identificacion}`).click( function () {
/*         let prueba = JSON.stringify($(`#btn${datosGuar[rut-1].identificacion}`));
        console.log(prueba);
        console.log("Aprete el boton "+ $(`#btn${datosGuar[rut-1].identificacion}`)) */
        eliminarInfo();
        nuevaTabla();
        function nuevaTabla() {
            let tabla = document.createElement("table");
            let body = document.getElementById("cuerpo");
            body.appendChild(tabla);
            tabla.setAttribute("id", "table");
            let trhead = document.createElement("tr");
            tabla.appendChild(trhead);
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
            let tiempo = datosGuar[rut - 1].plazo;
            let valor = datosGuar[rut - 1].capital;
            const nuevaTabla = [];
            for (tiempo; tiempo > 0; tiempo--) {
                nuevaTabla.push({
                    capital: valor,
                    intereses: (valor * 0.01),
                    capitalPostInt: valor * 1.01,
                    cuota: (valor * 1.01) / tiempo,
                    saldoRem: valor - (valor / tiempo)
                });
                valor = (valor * 1.01) - ((valor * 1.01) / tiempo);
            }
            tiempo = datosGuar[rut - 1].plazo;
            for (let j = 0; j < tiempo; j++) {
                let tr1 = document.createElement("tr");
                tabla.appendChild(tr1);
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
        }    
    });
})

//devuelve que tipo de prestamo es para los botones
function clasificacion(numero) {
    let salida = "hola";
    switch(numero) {
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
    return(salida);
}