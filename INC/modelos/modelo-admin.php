<?php
/*$arreglo = array(
    "respuesta" => "desde modelo"
);
die(json_encode($_POST));
die(json_encode($arreglo));
/* die es como un echo, die(json_encode($arreglo)) es
  lo que va a ser la respuesta a xhr.responseText
json encode nos va a permitir convertir un arreglo a json, json es 
un formato intermedio entre javascript y php que se comunican bien ambos,
 es un formato de transporte
 */

/**die(json_encode($_POST)); es la forma recomendada de asegurarte de que tus 
datos del formdata estan siendo recibidos en tus archivos de php */
error_reporting(E_ALL ^ E_NOTICE);

$accion = $_POST['accion'];
$password = $_POST['password'];
$usuario = $_POST['usuario'];

if ($accion === 'crear') {
    //codigo para crear los administradores

    //hashear passwords
    $opciones = array(
        'cost' => 12
    );
    $hash_password = password_hash($password, PASSWORD_BCRYPT, $opciones);
    //importar la conexion
    include '../funciones/coneccion.php';

    try {
        //realizar la consula a la base de datos
        $stmt = $conn->prepare("INSERT INTO usuarios (usuario, password) VALUES (?, ?) ");
        $stmt->bind_param('ss', $usuario, $hash_password);
        $stmt->execute();
        if ($stmt->affected_rows > 0) {
            /**en vez de ponerle afffected_rows pongo error list me indica que 
             *tipo de error es ademas le agrego "error" => $stmt->error*/
            $respuesta = array(
                'respuesta' => 'correcto',
                'id_insertado' => $stmt->insert_id,
                'tipo' => $accion
            );
        } else {
            $respuesta = array(
                'respuesta' => 'error'
            );
        }
        $stmt->close();
        $conn->close();
    } catch (Exception $e) {
        // En caso de un error, tomar la exepcion
        $respuesta = array(
            'error' => $e->getMessage()
        );
    }
    echo json_encode($respuesta);
}

if ($accion === 'login') {
    //escribir codigo que loguee a los administradores
    include '../funciones/coneccion.php';

    try {
        // Seleccionar el administrador de la base de datos
        $stmt = $conn->prepare("SELECT usuario, id, password FROM usuarios WHERE usuario = ?");
        $stmt->bind_param('s', $usuario);
        $stmt->execute();
        // Loguear el usuario
        $stmt->bind_result($nombre_usuario, $id_usuario, $pass_usuario);
        $stmt->fetch();
        if ($nombre_usuario) {
            // El usuario existe, verificar el password
            if (password_verify($password, $pass_usuario)) {
                // Iniciar la sesion
                session_start();
                $_SESSION['nombre'] = $usuario;
                $_SESSION['id'] = $id_usuario;
                $_SESSION['login'] = true;
                // Login correcto
                $respuesta = array(
                    'respuesta' => 'correcto',
                    'nombre' => $nombre_usuario,
                    'tipo' => $accion
                );
            } else {
                // Login incorrecto, enviar error
                $respuesta = array(
                    'resultado' => 'Password Incorrecto'
                );
            }
        } else {
            $respuesta = array(
                'error' => 'Usuario no existe'
            );
        }
        $stmt->close();
        $conn->close();
    } catch (Exception $e) {
        // En caso de un error, tomar la exepcion
        $respuesta = array(
            'error' => $e->getMessage()
        );
    }

    echo json_encode($respuesta);
}

