<?php  
require_once "../extensiones/paypal.controlador.php";

require_once "../controladores/carrito.controlador.php";
require_once "../modelos/carrito.modelo.php";

class AjaxCarrito{


/*=====================================
=            MÈTODO PAYPAL            =
=====================================*/

public $divisa;
public $total;
public $impuesto;
public $envio;
public $subtotal;
public $tituloArray;
public $cantidadArray;
public $valorItemArray;
public $idProductoArray;


public function ajaxEnviarPaypal(){

$datos = array(

         "divisa"=>$this->divisa,
         "total"=>$this->total,
         "impuesto"=>$this->impuesto,
         "envio"=>$this->envio,
         "subtotal"=>$this->subtotal,
         "tituloArray"=>$this->tituloArray,
         "cantidadArray"=>$this->cantidadArray,
         "valorItemArray"=>$this->valorItemArray,
         "idProductoArray"=>$this->idProductoArray,

);

$respuesta = Paypal::mdlPagoPaypal($datos);

echo $respuesta;




}


/*=====  End of MÈTODO PAYPAL  ======*/


/*===================================
=            METODO PAYU            =
===================================*/

public function ajaxTraerComercioPayu(){

$respuesta = ControladorCarrito::ctrMostrarTarifas();

echo json_encode($respuesta);

}

/*=====  End of METODO PAYU  ======*/


/*====================================================================
=            verificar que no tenga el producto adquirido            =
====================================================================*/

public $idUsuario;
public $idProducto;

public function ajaxVerificarProducto(){

$datos = array(

         "idUsuario"=>$this->idUsuario,
         "idProducto"=>$this->idProducto
     
);

$respuesta = ControladorCarrito::ctrVerificarProducto($datos);
if($respuesta == false){
	$resp = false;
}else{
	$resp = true;
}
echo $resp; 
}


/*=====  End of verificar que no tenga el producto adquirido  ======*/



}


if(isset($_POST["divisa"])){

$paypal = new AjaxCarrito();
$paypal->divisa = $_POST["divisa"];
$paypal->total = $_POST["total"];
$paypal->impuesto = $_POST["impuesto"];
$paypal->envio = $_POST["envio"];
$paypal->subtotal = $_POST["subtotal"];
$paypal->tituloArray = $_POST["tituloArray"];
$paypal->cantidadArray = $_POST["cantidadArray"];
$paypal->valorItemArray = $_POST["valorItemArray"];
$paypal->idProductoArray = $_POST["idProductoArray"];
$paypal-> ajaxEnviarPaypal();


}

if(isset($_POST["metodoPago"]) && $_POST["metodoPago"] == "payu"){
 
 $payu = new AjaxCarrito();
 $payu-> ajaxTraerComercioPayu();	
}


/*====================================================================
=            VERIFICAR QUE NO TENGA EL PRODUCTO ADQUIRIDO            =
====================================================================*/

if(isset($_POST["idProducto"])){
 
 $producto = new AjaxCarrito();	
 $producto ->idUsuario = $_POST["idUsuario"];
 $producto ->idProducto = $_POST["idProducto"];
 $producto -> ajaxVerificarProducto();
}

/*=====  End of VERIFICAR QUE NO TENGA EL PRODUCTO ADQUIRIDO  ======*/
