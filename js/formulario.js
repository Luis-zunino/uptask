eventListeners();

function eventListeners() {
    /*estamos esperando a que el usuario use el submit en el boton */
    document.querySelector('#formulario').addEventListener('submit', validarRegistro);
}

function validarRegistro(e) {
    e.preventDefault();

    var usuario = document.querySelector("#usuario").value,
        password = document.querySelector("#password").value;
    console.log(usuario + " " + password);

    if (usuario === "" || password === "") {

        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ambos campos son obligatorios!',
        })
    }

}