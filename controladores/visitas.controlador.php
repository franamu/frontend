<?php 

class ControladorVisitas{



static public function ctrEnviarIp($ip, $pais , $codigo){

$tabla = "visitaspersonas";
$visita = 1;

$respuestaInsertarIp = null;
$respuestaActualizarIp = null;

if($pais == ""){

	$pais = "Desconocido";
}

/*===========================================
=            BUSCAR IP EXISTENTE            =
===========================================*/

$buscarIpExistente =  ModeloVisitas::mdlSeleccionarIp($tabla , $ip);

if(!$buscarIpExistente){

/*========================================
=            GUARDAR IP NEUVA            =
========================================*/

$respuestaInsertarIp = ModeloVisitas::mdlGuardarNuevaIp($tabla , $ip , $pais , $visita);

/*=====  End of GUARDAR IP NEUVA  ======*/


}else{

	/*========================================================================
	=            SI LA IP EXISTE Y ES OTRO DIA VOLVERLA A GUARDAR            =
	========================================================================*/
	
	date_default_timezone_set('America/Argentina/Cordoba');

    $fechaActual = date('Y-m-d');
	
    foreach ($buscarIpExistente as $key => $value) {
 	
    $compararFecha = substr($value["fecha"],0,10);

 	
 }

 if($fechaActual != $compararFecha){

     $respuestaActualizarIp = ModeloVisitas::mdlGuardarNuevaIp($tabla , $ip , $pais , $visita);
     return $respuestaActualizarIp;

 	}

	/*=====  End of SI LA IP EXISTE Y ES OTRO DIA VOLVERLA A GUARDAR  ======*/
	

}

/*=====  End of BUSCAR IP EXISTENTE  ======*/


   if($respuestaInsertarIp == "ok" ||  $respuestaActualizarIp == "ok"){

    /*=============================================
    ACTUALIZAR NOTIFICACIONES NUEVAS VISITAS
    =============================================*/

    $traerNotificaciones = ControladorNotificaciones::ctrMostrarNotificaciones();

    $nuevaVisita = $traerNotificaciones["nuevasVisitas"] + 1;

    ModeloNotificaciones::mdlActualizarNotificaciones("notificaciones", "nuevasVisitas", $nuevaVisita);

    

    $tablaPais = "visitaspaises";

    /*===========================================================
    =            SELECCIONAR PAIS PARA VER SI EXISTE            =
    ===========================================================*/
    
    $seleccionarPais = ModeloVisitas::mdlSeleccionarPais($tablaPais, $pais);

    if(!$seleccionarPais){
    
     $cantidad = 1;
     $insertarPais = ModeloVisitas::mdlInsertarPais($tablaPais  , $pais , $codigo , $cantidad);

    }else{

     $actualizarCantidad = $seleccionarPais["cantidad"] + 1;
     $actualizarPais = ModeloVisitas::mdlActualizarPais($tablaPais  , $pais , $actualizarCantidad);

    }
    
    /*=====  End of SELECCIONAR PAIS PARA VER SI EXISTE  ======*/
    

   

   }



}


/*=============================================
=            MOSTRAR TOTAL VISITAS            =
=============================================*/

static public function ctrMostrarTotalVisitas(){


$tabla = "visitaspaises";

$respuesta = ModeloVisitas::mdlMostrarTotalVisitas($tabla);

return $respuesta;


}

/*=====  End of MOSTRAR TOTAL VISITAS  ======*/


/*======================================
=            MOSTRAR PAISES            =
======================================*/

static public function ctrMostrarPaises(){


$tabla = "visitaspaises";
$respuesta = ModeloVisitas::mdlMostrarPaises($tabla);

return $respuesta;


}

/*=====  End of MOSTRAR PAISES  ======*/



}