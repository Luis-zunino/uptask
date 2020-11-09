eventListeners();

function eventListeners() {
    /*estamos esperando a que el usuario use el submit en el boton */
    document.querySelector('#formulario').addEventListener('submit', validarRegistro);
}

function validarRegistro(e) {
    e.preventDefault();

    console.log("aqui vamos");
}

console.log("aqui");