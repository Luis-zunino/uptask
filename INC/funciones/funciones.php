<?php
//obtiene la pagina actual que se ejecuta
function obtenerPaginaActual()
{
    /*vamos a obtener el archivo en el al cual estamos llamando esta funcion
    server lo que va a hacer es aceder a los archivos en los que esta opedado*/
    $archivo = basename($_SERVER["PHP_SELF"]);
    /*str_replace remplaza una parte de un str con otra*/
    $pagina = str_replace(".php", "", $archivo);
    return $pagina;
}
/*consultas*/


/**obtener todos los proyectos */
function obtenerProyectos()
{
    include "coneccion.php";
    try {
        return $conn->query("SELECT  id, nombre FROM proyectos");
    } catch (Exception $e) {
        echo "Error! : " . $e->getMessage();
        return false;
    }
}
//obtener el nombre del proyecto
function obtenerNombreProyecto($id = null){
    include "coneccion.php";

    try {
    return $conn->query("SELECT nombre FROM proyectos WHERE id = {$id}");
    } catch (Exception $e) {
        echo "Error! : " . $e->getMessage();
        return false;
    }
}
//obtener las clases del Proyecto
function obtenerTareasProyecto($id = null){
    include "coneccion.php";

    try {
    return $conn->query("SELECT id, nombre, estado FROM tareas WHERE id_proyecto = {$id}");
    } catch (Exception $e) {
        echo "Error! : " . $e->getMessage();
        return false;
    }
}






