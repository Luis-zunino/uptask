<?php
error_reporting(E_ALL ^ E_NOTICE);

$accion = $_POST["accion"];
$proyecto = $_POST["proyecto"];


if ($accion === 'crear') {
    //importar la conexion
    include '../funciones/coneccion.php';

    try {
        //realizar la consula a la base de datos
        $stmt = $conn->prepare("INSERT INTO proyectos (nombre) VALUES (?) ");
        $stmt->bind_param('s', $proyecto);
        $stmt->execute();
        if ($stmt->affected_rows > 0) {
            /**en vez de ponerle afffected_rows pongo error list me indica que 
             *tipo de error es ademas le agrego "error" => $stmt->error*/
            $respuesta = array(
                'respuesta' => 'correcto',
                'id_insertado' => $stmt->insert_id,
                'tipo' => $accion,
                'nombre_proyecto' => $proyecto
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
