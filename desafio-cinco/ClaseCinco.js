/* Para el calculo de retenciones de ganancias, existen 2 maneras: hacerlo de manera anual o de manera mensual. Para hacerlo de manera mensual, se requiere 
de cargar la información mes a mes. En este punto se introduce los objetos, donde cada mes va a ser un objeto.
 */

//Se define un objeto que es la información que contendra cada mes, así como las tareas que debe realizar si o si (metodos)

function Mes(sueldo, esposa, hijos, medico, alquiler, ret) {
    // Datos a ingresar para cada objeto
    this.sueldo = sueldo;
    this.esposa = esposa;
    this.hijos = hijos;
    this.medico = medico;
    this.alquiler = alquiler;
    // Esta es una variable que no se necesita de la carga de info, pero que va a ser utilizada en uno de los metodos
    this.ret = 0;
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

/* Aqui se inician 3 meses (enero, febrero y marzo) para que el empleado cargue su recibo de sueldo de cada mes
y le vaya informando cual debió ser su retención mensual.
Inicialmente se me ocurrió generar un for () para que el usuario ingrese la cantidad de meses que transcurrieron del año,
entonces el for () correria hasta llegar al limite de cantidad de meses, generando un nuevo objeto (es decir, un nuevo mes)
por cada iteración. Lo termine descartando debido a que no sabía como cambiar los nombres de los objetos cada vez que 
se generaba uno nuevo, al correr una nueva iteración. Al no saber como cambiar el nombre, cada vez que se ejecutara una
iteración, me iba a pisar el objeto anterior (por tener el mismo nombre), y la idea era conservar los objetos anteriores.
*/
/* En cada objeto se ingresarán los datos necesarios del mismo, ejecutará los 2 metodos asociados al objeto, para establecer
el valor de la deducción por la esposa y para calcular la retención, y posteriomente mostrará el resultado por consola
*/
const mesUno = new Mes(parseInt(prompt("Ingrese su sueldo bruto mensual de Enero: ")), prompt("Indique SI o NO si posee esposa o esposo con ingresos brutos anuales inferiores a $50.000: "), parseInt(prompt("Ingrese la cantidad de hijos que tiene en número. En caso de no tener, ingrese 0: ")), parseInt(prompt("Ingrese el monto de gastos medicos que tuvo en el mes: ")), parseInt(prompt("Ingrese el monto de alquiler que tuvo en el mes: ")));
mesUno.dedEsposa();
mesUno.retencion();
console.log("La retención correspondiente a Enero es de " + mesUno.ret);
const mesDos = new Mes(parseInt(prompt("Ingrese su sueldo bruto mensual de Febrero: ")), prompt("Indique SI o NO si posee esposa o esposo con ingresos brutos anuales inferiores a $50.000: "), parseInt(prompt("Ingrese la cantidad de hijos que tiene en número. En caso de no tener, ingrese 0: ")), parseInt(prompt("Ingrese el monto de gastos medicos que tuvo en el mes: ")), parseInt(prompt("Ingrese el monto de alquiler que tuvo en el mes: ")));
mesDos.dedEsposa();
mesDos.retencion();
console.log("La retención correspondiente a Febrero es de " + mesDos.ret);
const mesTres = new Mes(parseInt(prompt("Ingrese su sueldo bruto mensual de Marzo: ")), prompt("Indique SI o NO si posee esposa o esposo con ingresos brutos anuales inferiores a $50.000: "), parseInt(prompt("Ingrese la cantidad de hijos que tiene en número. En caso de no tener, ingrese 0: ")), parseInt(prompt("Ingrese el monto de gastos medicos que tuvo en el mes: ")), parseInt(prompt("Ingrese el monto de alquiler que tuvo en el mes: ")));
mesTres.dedEsposa();
mesTres.retencion();
console.log("La retención correspondiente a Marzo es de " + mesTres.ret);

/* Casos de ejemplo 
1) 
Sueldo: 100.000
Esposa: si
Hijos: 2
Gastos medicos: 5.000
Alquiler: 25.000
Retención que debería dar según Excel: 5.800

2) 
Sueldo: 20.000
Esposa: si
Hijos: 4
Gastos medicos: 5.000
Alquiler: 0
Retención que debería dar según Excel: 0
*/