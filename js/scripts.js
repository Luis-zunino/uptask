eventListeners();
//lista de proyecto
var listaProyectos = document.querySelector("ul#proyectos");

function eventListeners() {
    //boton para crear proyecto
    document.querySelector(".crear-proyecto a").addEventListener("click", nuevoProyecto);
}

function nuevoProyecto(e) {
    e.preventDefault();
    console.log("Presionaste en nuevo proyecto");
    //crea un <input> para el nombre del nuevo proyecto
    var nuevoProyecto = document.createElement("li");
    nuevoProyecto.innerHTML = '<input type="text" id="nuevo-proyecto">';
    listaProyectos.appendChild(nuevoProyecto);
    //seleccionar el id con el nuevoProyecto
    var inputNuevoProyecto = document.querySelector("#nuevo-proyecto");
    //al presionar enter crea el proyecto
    inputNuevoProyecto.addEventListener("keypress", function (e) {
        var tecla = e.which || e.keyCode;
        if (tecla === 13) {
            guardarProyectoDB(inputNuevoProyecto.value);
            //quiero que el imput desaparezca al momento de crear un nuevo proyecto
            listaProyectos.removeChild(nuevoProyecto);
        }
    });
}

function guardarProyectoDB(nombreProyecto) {
    /*inyectar el html
    var nuevoProyecto = document.createElement("li");
    nuevoProyecto.innerHTML = ` 
    <a href="#">
    ${nombreProyecto}
    </a>`
    ;
    listaProyectos.appendChild(nuevoProyecto);*/
    //crear llamado ajax
    var xhr = new XMLHttpRequest();

    //enviar datos por formdata
    var datos = new FormData();
    datos.append("proyecto", nombreProyecto);
    datos.append("accion", "crear");
    //abrir la conexion
    xhr.open("POST", "inc/modelos/modelo-proyecto.php", true);
    //en la carga
    xhr.onload = function () {
        if (this.status === 200) {
            //obtener/leer datos de la respesta
            var respuesta = JSON.parse(xhr.responseText); /*esto me va a dar acceso a las variables id_insertado nombre_proyecto, respuesta, tipo*/
            var proyecto = respuesta.nombre_proyecto,
                id_proyecto = respuesta.id_insertado,
                tipo = respuesta.tipo,
                resultado = respuesta.respuesta;
            //comprobar la insercion
            if (resultado === "correcto") {
                /*fue exitoso, en esta parte es donde validamos
                 si fue de tipo crear o no*/
                if (tipo === "crear") {
                    //se creo un nuevo proyecto
                    //inyectar en el HTML
                    var nuevoProyecto = document.createElement("li");
                    nuevoProyecto.innerHTML = `
                    <a href="index.php?id_proyecto${id_proyecto}" id="${id_proyecto}">
                    ${proyecto}
                    </a>
                    `;
                    /* se enlaza a index.php le agrega un query string
                     y le agrega el ide del proyecto, nos va a permitir 
                     tener enlaces hacia los distintos proyectos basados 
                     en el id
                     id_respuesta es un parametro*/

                    //agregar al HTML
                    listaProyectos.appendChild(nuevoProyecto);
                    //enviar alerta
                    Swal.fire({
                            title: "Proyecto Creado",
                            text: 'El proyecto: ' + proyecto + ' se creó correctamente',
                            icon: "success"
                        })
                        .then(resultado => {
                            //redireccionar a la nueva URL

                            if (resultado.value) {
                                window.location.href = "index.php?id_proyecto=" + id_proyecto;
                            }
                        })
                } else {
                    //se actualizo o se elimino el proyecto

                }

            } else {
                //hubo un error
                Swal.fire({
                    title: "Error",
                    text: "Oh no! Hubo un error!",
                    icon: "error"
                })
            }
        }
    }
    //enviar el request
    xhr.send(datos);
}