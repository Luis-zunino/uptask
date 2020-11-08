<script src="js/sweetalert2.all.min.js"></script>
<?php
/*tambien tenemos que cargar el fomrulario
a lo que la funcion obtenerPaginaActual retorna un valor vamos a asignarlo a $actual*/
$actual = obtenerPaginaActual();
if ($actual === "crear-cuenta" || $actual === "login") {
    echo '<script src="js/formulario.js"></script>';
}
?>


</body>

</html>