<?php $conn = new mysqli("localhost", "root","", "uptask");
 /*echo "<pre>";
 var_dump($conn->ping());
como comprobar que una conecion es estable y esta enviando informacion
echo "</pre>";
*/
if($conn->connect_error){
    echo $conn->connect_error;
}
?>