eventListeners();
//lista de proyecto
var listaProyectos = document.querySelector("ul#proyectos");

function eventListeners() {
    //boton para crear proyecto
    document.querySelector(".crear-proyecto a").addEventListener("click", nuevoProyecto);
}
//Boton para una nueva tarea
document.querySelector(".nueva-tarea").addEventListener("click", agregarTarea);

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
                        });
                } else {
                    //se actualizo o se elimino el proyecto

                }

            } else {
                //hubo un error
                Swal.fire({
                    title: "Error",
                    text: "Oh no! Hubo un error!",
                    icon: "error"
                });
            }
        }
    }
    //enviar el request
    xhr.send(datos);
}

//agregar una nueva tarea al proyecto actual

function agregarTarea(e) {
    e.preventDefault();
   
    var nombreTarea = document.querySelector('.nombre-tarea').value
    // Validar que el campo tenga algo escrito
   
    if (nombreTarea === '') {
      swal({
        title: 'Error',
        text: 'Una tarea no puede ir vacia',
        type: 'error',
      })
    } else {
      // la tarea tiene algo, insertar en PHP
   
      // crear llamado a ajax
      var xhr = new XMLHttpRequest()
   
      // crear formdata
      var datos = new FormData()
      datos.append('tarea', nombreTarea)
      datos.append('accion', 'crear')
      datos.append('id_proyecto', document.querySelector('#id_proyecto').value)
   
      // Abrir la conexion
      xhr.open('POST', 'inc/modelos/modelo-tareas.php', true)
   
      // ejecutarlo y respuesta
      xhr.onload = function () {
        if (this.status === 200) {
          // todo correcto
          var respuesta = JSON.parse(xhr.responseText)
          // asignar valores
   
          var resultado = respuesta.respuesta,
            tarea = respuesta.tarea,
            id_insertado = respuesta.id_insertado,
            tipo = respuesta.tipo
   
          if (resultado === 'correcto') {
            // se agregó correctamente
            if (tipo === 'crear') {
              // lanzar la alerta
              Swal.fire({
                icon: 'success',
                title: 'Tarea creada!',
                text: 'La tarea: ' + tarea + 'se creó correctamente!',
              })
   
              // seleccionar el parrafo con la lista vacia
   
              var parrafoListaVacia = document.querySelectorAll('.lista-vacia')
              if (parrafoListaVacia.length > 0) {
                document.querySelector('.lista-vacia').remove()
              }
   
              // construir el template
              var nuevaTarea = document.createElement('li')
   
              // agregamos el ID
              nuevaTarea.id = 'tarea:' + id_insertado
   
              // agregar la clase tarea
              nuevaTarea.classList.add('tarea')
   
              // construir el html
              nuevaTarea.innerHTML = `
                              <p>${tarea}</p>
                              <div class="acciones">
                                  <i class="far fa-check-circle"></i>
                                  <i class="fas fa-trash"></i>
                              </div>
                         `
   
              // agregarlo al HTML
              var listado = document.querySelector('.listado-pendientes ul')
              listado.appendChild(nuevaTarea)
   
              // Limpiar el formulario
              document.querySelector('.agregar-tarea').reset()
            }
          } else {
            // hubo un error
            Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: 'Oh no! Hubo un error!',
            })
          }
        }
      }
      // Enviar la consulta
      xhr.send(datos)
    }
  }