// Caso 1: se ingresa un número mediante prompt, y si es mayor a 100, generá un mensaje vía console.log

let datouno = parseInt(prompt("Ingrese un número"));
if (datouno > 100) {
    console.log("El número " + datouno + " es mayor que 100")
}
else{
    console.log("El número " + datouno + " no es mayor que 100");
}

// Caso 2: se ingresa una palabra, y si es igual a "Hola", generá un mensaje vía console.log

let datodos = prompt("Ingrese la palabra hola con la primer letra mayusucula");
if (datodos == "Hola") {
    console.log("La palabra fue ingresada correctamente");
}
else{
    console.log("La palabra no fue ingresada correctamente");
}

// Caso 3: se ingresa un número, y si está en el rango entre 10 y 50, generará un mensaje vía console.log

let datotres = parseInt(prompt("Ingrese un número"));
if (datotres > 50) {
    console.log("El número " + datotres + " es mayor que 50");
}
else if (datotres < 10) {
    console.log("El número " + datotres + " es menor que 10");
}
else{
    console.log("El número " + datotres + " está en el rango entre 10 y 50, ambos inclusive");
}