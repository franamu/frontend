<?php 

class Conexion 
{
	static public function conectar()
	{
		$link = new PDO("mysql:host=localhost;dbname=ecommerce" , 
			            "root",
			            "",
			             array(PDO::ATTR_ERRMODE =>PDO::ERRMODE_EXCEPTION,
			                   PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8" )
			         );
		return $link;
	}
}


/*el array que esta en la conexion link, es para que me traiga los valores latinos almacenados en la base de datos sin ningun problema*/
 ?>