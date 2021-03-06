<?php
error_reporting(E_ALL ^ E_NOTICE);

$accion = $_POST["accion"];
$id_proyecto = (int) $_POST["id_proyecto"];
$tarea = $_POST["tarea"];
$estado = $_POST["estado"];
$id_tarea = (int) $_POST["id"];


if ($accion === 'crear') {
    //importar la conexion
    include '../funciones/coneccion.php';

    try {
        //realizar la consula a la base de datos
        $stmt = $conn->prepare("INSERT INTO tareas (nombre, id_proyecto) VALUES (?, ?) ");
        $stmt->bind_param('si', $tarea, $id_proyecto);
        $stmt->execute();
        if ($stmt->affected_rows > 0) {
            /**en vez de ponerle afffected_rows pongo error list me indica que 
             *tipo de error es ademas le agrego "error" => $stmt->error*/
            $respuesta = array(
                'respuesta' => 'correcto',
                'id_insertado' => $stmt->insert_id,
                'tipo' => $accion,
                'tarea' => $tarea
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
if ($accion === "actualizar") {
    //importar la conexion
    include '../funciones/coneccion.php';

    try {
        //realizar la consula a la base de datos
        $stmt = $conn->prepare("UPDATE tareas SET estado = ? WHERE id = ?");
        $stmt->bind_param('ii', $estado, $id_tarea);
        $stmt->execute();
        if ($stmt->affected_rows > 0) {
            /**en vez de ponerle afffected_rows pongo error list me indica que 
             *tipo de error es ademas le agrego "error" => $stmt->error*/
            $respuesta = array(
                'respuesta' => 'Correcta actualización',
            );
        } else {
            $respuesta = array(
                'respuesta' => 'Error al Actualizar'
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
if ($accion === "eliminar") {
    //importar la conexion
    include '../funciones/coneccion.php';

    try {
        //realizar la consula a la base de datos
        $stmt = $conn->prepare("DELETE FROM tareas WHERE id = ?");
        $stmt->bind_param('i', $id_tarea);
        $stmt->execute();
        if ($stmt->affected_rows > 0) {
            /**en vez de ponerle afffected_rows pongo error list me indica que 
             *tipo de error es ademas le agrego "error" => $stmt->error*/
            $respuesta = array(
                'respuesta' => 'Correcta actualización',
            );
        } else {
            $respuesta = array(
                'respuesta' => 'Error al Actualizar'
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
