<?php 

class ControladorPlantilla
{
  /*=============================================
  =            LLAMAMOS LA PLANTILLA            =
  =============================================*/
  
  static public function plantilla()
	{
		include "vistas/plantilla.php";
	}
  
  /*=====  End of LLAMAMOS LA PLANTILLA  ======*/
  
  /*=====================================================================
  =            TRAEMOS LOS ESTILOS DINAMICOS DE LA PLANTILLA            =
  =====================================================================*/
  
 static  public function ctrEstiloPlantilla()
  {
  	$tabla = "plantilla";
  	$respuesta = ModeloPlantilla::mdlEstiloPlantilla($tabla);
  	return $respuesta;
  }
  
  /*=====  End of TRAEMOS LOS ESTILOS DINAMICOS DE LA PLANTILLA  ======*/
  

/*=============================================
=            TRAEMOS LAS CABECERAS            =
=============================================*/

 static public function ctrTraerCabeceras($ruta){


$tabla = "cabeceras";

  $respuesta = ModeloPlantilla::mdlTraerCabeceras($tabla , $ruta);
    return $respuesta;

}

/*=====  End of TRAEMOS LA CABECERAS  ======*/



}

 ?>