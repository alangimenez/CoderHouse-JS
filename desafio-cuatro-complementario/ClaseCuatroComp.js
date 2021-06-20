//Cálculo de IVA teniendo en cuenta si es energía electrica o no (si es energía electríca, la alícuota de IVA es 27%)

//1) Se pide el neto de la factura (impNeto es global)

let impNeto
function neto () {
    impNeto = parseInt(prompt("Ingrese el neto de su factura: "));
}

//2) Se pide confirmación de si se trata de energía electrica o no, para definir la alícuota de IVA (porcIVA global, datoUno local)

let porcIVA;
function iva () {
    let datoUno = prompt("Confirme con SI o NO si la factura es de energía electrica: ");
    if (datoUno == "SI" || datoUno == "si" || datoUno == "Si") {
        porcIVA = 0.27;
    }
    else {
        porcIVA = 0.21;
    }
}

//3) Calculamos el IVA (acordarse de asignar la funcion a una variable porque se usa return, o va a dar error)

function calculoiva(one, two) {
    return one + (one*two);
}

//4) Mostramos el resultado (se puede poner el parametro de la funcion printR como en el segundo caso o directamente colocar la función calculoiva())

function printR (three) {
    if (porcIVA == 0.27) {
    alert("El importe bruto correspondiente a esta factura es de " + calculoiva(impNeto, porcIVA) + " aplicando la alícuota de 27%, atento a que se trata de una factura de energía");
    }
    else {
        alert("El importe bruto correspondiente a esta factura es de " + three + " aplicando la alícuota de 21%, atento a que no se trata de una factura de energía");
    }
}

//La funcion calculoiva() si o si debe estar con una variable, porque pusimos el return, y esa variable va como parametro en printR()

neto ();
iva ();
let final = calculoiva (impNeto, porcIVA);
printR (final);