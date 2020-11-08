<?php function obtenerPaginaActual(){
    /*vamos a obtener el archivo en el al cual estamos llamando esta funcion
    server lo que va a hacer es aceder a los archivos en los que esta opedado*/
    $archivo = basename($_SERVER["PHP_SELF"]);
    /*str_replace remplaza una parte de un str con otra*/
    $pagina = str_replace(".php", "", $archivo);
    return $pagina;
}
