//Declaramos la url que vamos a usar para el GET
const URLGET = "https://jsonplaceholder.typicode.com/posts"
//Agregamos un botón con jQuery
$("body").prepend('<button id="btn1">GET</button>');
//Escuchamos el evento click del botón agregado
$("#btn1").click(() => {
    $.get(URLGET, function (respuesta, estado) {
        if (estado === "success") {
            let misDatos = respuesta;
            for (const dato of misDatos) {
                $("body").prepend(`<div>
                                    <h3>${dato.title}</h3>
                                    <p> ${dato.body}</p>
                                    </div>`);
            }
        }
    });
})

//Declaramos la url que vamos a usar para el GET
const URLGET2 = "http://hp-api.herokuapp.com/api/characters/students"
//Agregamos un botón con jQuery
$("body").append('<button id="btn2">GET2</button>');
//Escuchamos el evento click del botón agregado
$("#btn2").click(() => {
    $.get(URLGET2, function (respuesta, estado) {
        if (estado === "success") {
            let misDatos = respuesta;
            console.log(respuesta);
            for (const dato of misDatos) {
                $("body").append(`<div>
                                    <h3>${dato.name}</h3>
                                    <p> ${dato.species}</p>
                                    <p> ${dato.gender}</p>
                                    <p> ${dato.house}</p>
                                    <p> ${dato.dateOfBirth}</p>
                                    </div>`);
            }
        }
    });
})

//Declaramos la url que vamos a usar para el GET
const URLGET3 = "https://dog.ceo/api/breeds/image/random";

//Agregamos un botón con jQuery
$("body").append('<button id="btn3">GET3</button>');
//Escuchamos el evento click del botón agregado
$("#btn3").click(() => {
    $.get(URLGET3, function (respuesta, estado) {
        if (estado === "success") {
            let misDatos = respuesta;
            console.log(respuesta);
            $("body").append(`<img class="fotos" src="${misDatos.message}">`);
            
        }
    });
})
