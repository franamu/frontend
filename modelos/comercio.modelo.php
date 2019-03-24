<?php 
include("conexion.php");

class ModeloComercio{


static public function mdlSeleccionarComercio($tabla){

 $stmt = Conexion::conectar()->prepare("SELECT * FROM $tabla");

 $stmt->execute();

 return $stmt->fetch();

 $stmt = null;

}


}


 ?>