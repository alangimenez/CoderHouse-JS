//Caso 1: pedir numero mediante prompt y sumarle otro número en cada repetición, realizando una salida por cada resultado

let datouno = parseInt(prompt("Ingrese un número:"));
for (i = 1; i < 7; i++) {
    console.log(datouno);
    datouno = datouno + 5;
}

//Caso 2: pedir un texto mediante prompt, concatenar el valor en cada repetición, realizando una salida por cada resultado, hasta que se ingresa "esc"

let datodos = 0;
let datotres = "";
do {
    datodos = prompt("Ingrese un texto: ");
    datotres = datotres + " " + datodos;
    console.log (datotres);

} while (datodos != "esc")

//Caso 3: pedir un número por prompt, repetir la salida del mensaje "hola" la cantidad de veces ingresadas

let datocuatro = parseInt(prompt("Ingrese un valor: "));
for (i = 1; i <= datocuatro; i++) {
    alert("Hola");
    console.log("Hola");
}