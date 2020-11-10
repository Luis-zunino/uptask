eventListeners();
//lista de proyecto
var listaProyectos = document.querySelector("ul#proyectos");
function eventListeners(){
    //boton para crear proyecto
    document.querySelector(".crear-proyecto a").addEventListener("click", nuevoProyecto);
}

function nuevoProyecto(e){
    e.preventDefault();
    console.log("Presionaste en nuevo proyecto");
    //crea un <input> para el nombre del nuevo proyecto
    var nuevoProyecto = document.createElement("li");
    nuevoProyecto.innerHTML = '<input type="text" id="nuevo-proyecto">';
    listaProyectos.appendChild(nuevoProyecto);
}