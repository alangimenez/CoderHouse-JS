/* El proyecto va a ser una calculadora de Retenciones de Ganancias para empleados en relación de dependencia.
Dado que es algo bastante técnico y hacerlo de manera real es algo complejo, aca hice un inicio de lo que podría ser.
Para entender rápido la mecanica de liquidación, se parte del sueldo bruto anual, al cual se le debe restar las deducciones, 
que en este caso solo son minimo no imponible (MNI), hijos, esposa, gastos médicos y alquiler. Si el sueldo es mayor a la suma de todas las
deducciones, correspondera una retención sobre el remanente del 10%. Si el sueldo es menor a la suma de todas las deducciones,
no corresponde ninguna retención.

Como ejemplo rápido, si mi sueldo fue de $1.000, y mis deducciones de $900, corresponde que me retengan un 10% sobre 
$100 (que es el remanente del sueldo despues de las deducciones). Es decir, corresponde una retención de $10.

En la vida real, las deducciones posibles son muchisimas mas, y las alícuotas son variadas y progresivas. A su vez, 
existen situaciones particulares, como el SAC, o bonos. Por eso se va a armar de a poco, dado que los posibles escenarios
son muchisimos.

*/

//Definimos las variables a utilizar durante el proceso

let sueldo, hijos, esposa, medico, alquiler, dedEsposa, ret;
let MNI = 300000;
let dedHijos = 25000;

//Definimos una función que releve toda la información para realizar la liquidación

function relevar() {
    sueldo = parseInt(prompt("Ingrese su sueldo anual bruto del año 2020: "));
    hijos = parseInt(prompt("Ingrese la cantidad de hijos/as que tiene en número (si no tiene, ingrese 0): "));
    esposa = prompt("Ingrese si posee esposa o concubina que tenga ingresos anuales menores a $50.000 durante 2020 (conteste SI o NO): ");
    medico = parseInt(prompt("Ingrese el monto de gastos médicos que tuvo durante el año 2020: "));
    alquiler = parseInt(prompt("Ingrese el monto total de alquileres abonado durante el año 2020:"));
}

function ctrlUno() {
    if (esposa == "SI" || esposa == "Si" || esposa == "si") {
        dedEsposa = 30000;
    }
    else {
        dedEsposa = 0;
    }
}

function calculo() {
    if (sueldo < MNI + (hijos * dedHijos) + dedEsposa + medico + alquiler) {
        alert("Usted no debió sufrir retenciones del Impuesto a las Ganancias durante el año 2020");
    }
    else {
        ret = (sueldo - (hijos * dedHijos) - MNI - dedEsposa - medico - alquiler) * 0.10;
        alert("Usted debio sufrir retenciones por un total de $" + ret);
    }
}

relevar();
ctrlUno();
calculo();

