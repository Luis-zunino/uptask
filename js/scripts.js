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
    console.log(nombreProyecto);
}