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

if($accion === "crear"){
    //codigo para crear los administradores

    //hashear passwords
    $opciones = array(
"cost"=>12
    );
    $hash_password = password_hash($password, PASSWORD_BCRYPT, $opciones);
    $respuesta = array(
        "pass" => $hash_password
    );
}

if($accion === "login"){
    //escribir codigo que loguee a los administradores
}