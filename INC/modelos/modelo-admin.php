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
$accion = $_POST["accion"];
$password = $_POST["password"];
$usuario = $_POST["usuario"];

if ($accion === "crear") {
    //codigo para crear los administradores

    //hashear passwords
    $opciones = array(
        "cost" => 12
    );
    $hash_password = password_hash($password, PASSWORD_BCRYPT, $opciones);
    //importar la conexion
    include "../funciones/coneccion.php";
    try {
        //realizar la consula a la base de datos
        $stmt = $conn->prepare(" INSERT INTO usuarios (usuario, password) VALUES (?, ?) ");
        $stmt->bind_param("ss", $usuario, $hash_password);
        $stmt->execute();
        if ($stmt->affected_rows) {
            /**en vez de ponerle afffected_rows pongo error list me indica que 
             *tipo de error es ademas le agrego "error" => $stmt->error*/
            $respuesta = array(
                "respuesta" => "correcto",
                "id_insertado" => $stmt->insert_id,
                "tipo" => $accion
            );
        }


        $stmt->close();
        $conn->close();
    } catch (\Exception $e) {
        //en caso de un error, tomar la exepcion
        $respuesta = array(
            "pass" => $e->getMessage()
        );
    }
    echo json_encode($respuesta);
}

if ($accion === "login") {
    //escribir codigo que loguee a los administradores
}
