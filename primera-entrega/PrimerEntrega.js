/* En vista de la calculadora de ganancias, el usuario va cargando la información mes por mes, y la calculadora deberá totalizar la información para calcular 
la retención anual que corresponda. Para ir acumulando la información mes a mes, se utiliza un array de objetos, donde el objeto releva la información 
propia de cada mes (sueldo y deducciones) y el array almacena la info de cada mes. 
Luego se usa un for para totalizar parte de la información (los valores númericos esencialmente) y que informe el valor de eso por consola.
 */

//Se define un objeto que es la información que contendra cada mes.

function Mes(sueldo, esposa, hijos, medico, alquiler, ret) {
    // Datos a ingresar para cada objeto
    this.sueldo = sueldo;
    this.esposa = esposa;
    this.hijos = hijos;
    this.medico = medico;
    this.alquiler = alquiler;

    /* Asignamos un valor a la deducción esposa dependiendo de la respuesta ingresada.
    En este caso, el valor númerico se asigna a la misma variable donde se ingresó SI o NO. 
    Se hizo así por comodidad, pero también se podría haber puesto el valor númerico en otra variable sin información
    previa. 
    */
    this.dedEsposa = function () {
        if (this.esposa == "SI" || this.esposa == "Si" || this.esposa == "si") {
            this.esposa = 5000;
        } else {
            this.esposa = 0;
        }
    }
    /* Calculamos la retención en función de su sueldo y las retenciones ingresadas. La deducción de los hijos
    viene dada númericamente, pero se podría cargar una variable para no tener que poner el número de manera directa.
    El if() ayuda en darle un valor de 0 a la retención en el caso de que las deducciones sean superiores al sueldo.
    */
    this.retencion = function () {
        this.ret = this.sueldo - this.esposa - (this.hijos * 3500) - this.medico - this.alquiler;
        this.ret = this.ret * 0.10;
        if (this.ret < 0) {
            this.ret = 0;
        }
    }
}

// Se ingresa el número de periodos cobrados hasta el momento
let periodosCobrados = parseInt(prompt("Ingrese la cantidad de meses cobrados: "));

// Se genera el array y el do-while para el ingreso de objetos en el mismo hasta el limite de periodos cobrados.
const meses = [];
do{
    meses.push (new Mes(parseInt(prompt("Ingrese su sueldo bruto mensual de Enero: ")), prompt("Indique SI o NO si posee esposa o esposo con ingresos brutos anuales inferiores a $50.000: "), parseInt(prompt("Ingrese la cantidad de hijos que tiene en número. En caso de no tener, ingrese 0: ")), parseInt(prompt("Ingrese el monto de gastos medicos que tuvo en el mes: ")), parseInt(prompt("Ingrese el monto de alquiler que tuvo en el mes: "))));
} while (meses.length < periodosCobrados)

// Se declaran variables totalizadoras
let sueldoAcumulado = 0;
let alquilerAcumulado = 0;
let medicoAcumulado = 0;
let esposaAcumulado = 0;
let retencionAcumulado = 0;
let hijosAcumulado = 0;

// Se totaliza la información cargada en el array, y se convierten los datos que no son númericos en númericos para totalizarlos.
for (const dato of meses) {
    sueldoAcumulado = sueldoAcumulado + dato.sueldo;
    alquilerAcumulado = alquilerAcumulado + dato.alquiler;
    medicoAcumulado = medicoAcumulado + dato.medico;
    dato.dedEsposa ();
    esposaAcumulado = esposaAcumulado + dato.esposa;
    dato.retencion ();
    retencionAcumulado = retencionAcumulado + dato.ret;
    hijosAcumulado = hijosAcumulado + (dato.hijos * 3500);
}

// Se expone resultados por consola
console.log(sueldoAcumulado);
console.log(alquilerAcumulado);
console.log(medicoAcumulado);
console.log(esposaAcumulado);
console.log(retencionAcumulado);
console.log(hijosAcumulado);
console.log("El sueldo acumulado es de " + sueldoAcumulado + " mientras que la retención acumulada correspondiente es de " + retencionAcumulado + ".")