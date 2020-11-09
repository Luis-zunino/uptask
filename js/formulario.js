eventListeners();

function eventListeners() {
    /*estamos esperando a que el usuario use el submit en el boton */
    document.querySelector('#formulario').addEventListener('submit', validarRegistro);
}

function validarRegistro(e) {
    e.preventDefault();

    var usuario = document.querySelector("#usuario").value,
        password = document.querySelector("#password").value,
        tipo = document.querySelector("#tipo").value;
    console.log(usuario + " " + password);

    if (usuario === "" || password === "") {
        //la validacion fallo
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ambos campos son obligatorios!',
        })
    } else {
        //ambos datos son correctos
        Swal.fire({
            icon: 'success',
            title: 'Correcto',
            text: 'Ingreso correcto!'
        })
        //AJAX, VAMOS A CONSULTAR LA BASE DE DATOS, MANDAR A LLAMAR CON AJAX CON FORMDATA
        var datos = new FormData(); // nos va a permitir estructurar nuestro llamado a ajax darle una llave y un valor y enviar esos datos con ajax
        datos.append("usuario", usuario);
        datos.append("password", password);
        datos.append("accion", tipo);
        //CREAR LLAMADO A AJAX
        var xhr = new XMLHttpRequest();
        //abrir la coneccion
        xhr.open("POST", "inc/modelos/modelo-admin.php", true);
        //retorno de datos
        xhr.onload = function(){
            if(this.status === 200){
                console.log(xhr.responseText);
            }
        }
        //enviar la peticion
        xhr.send(datos);
    } /**AJAX nos va a permitir leer los datos que se encuentren en el archivo javascript lo que es el usuario y el password, etc y lo va a comunicar con los archivos de php */

}