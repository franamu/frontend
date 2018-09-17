<?php  
$url = Ruta::ctrRuta();

if(!isset($_SESSION["validarSesion"])){

echo '<script>window.location = "'.$url.'";</script>';

exit();

}


require_once 'extensiones/bootstrap.php';
require_once "modelos/carrito.modelo.php";
require_once "controladores/usuarios.controlador.php";
require_once "modelos/usuarios.modelo.php";


use PayPal\Api\Payment;
use PayPal\Api\PaymentExecution;


/*===================================
=            PAGO PAYPAL            =
===================================*/

if(isset($_GET['paypal']) && $_GET['paypal'] === 'true'){


$productos = explode("-" , $_GET['productos']);
$cantidad = explode("-" , $_GET['cantidad']);
$titulo = explode("/" , $_GET['titulo']);
$pago = $_GET['pago'];

$paymentId = $_GET["paymentId"];
$payment = Payment::get($paymentId , $apiContext);

//creamos la ejecucion de pago, invoca la clase PaymentExecution y extraemos el id del pagador
$execution = new PaymentExecution();
$execution->setPayerId($_GET['PayerID']);
//validamos con las credenciales que el id del pagador si coincida
$payment->execute($execution,$apiContext);
$datosTransaccion = $payment->toJSON();


$datosUsuario = json_decode($datosTransaccion);

$emailComprador = $datosUsuario->payer->payer_info->email;

$dir = $datosUsuario->payer->payer_info->shipping_address->line1;

$ciudad = $datosUsuario->payer->payer_info->shipping_address->city;

$estado = $datosUsuario->payer->payer_info->shipping_address->state;

$codigoPostal = $datosUsuario->payer->payer_info->shipping_address->postal_code;

$pais = $datosUsuario->payer->payer_info->shipping_address->country_code;


$direccion = $dir . ", " . $ciudad . ", " . $estado . ", " . $codigoPostal;
//actualizamos la base de datos

for ($i=0; $i < count($productos); $i++) { 
	
	$datos = array("idUsuario"=>$_SESSION["id"],
		"idProducto"=>$productos[$i],
		"metodo"=>"paypal",
		"email"=>$emailComprador,
		"direccion"=>$direccion,
        "titulo"=> $titulo[$i],
       "cantidad"=>$cantidad[$i],
		"pais"=>$pais,
       "pago"=>$pago

    );

   $respuesta = ControladorCarrito::ctrNuevasCompras($datos);
   
   $ordenar = "id";
   $item = "id";
   $valor = $productos[$i];
   $productosCompra = ControladorProductos::ctrListarProductos($ordenar , $item , $valor);

   foreach($productosCompra as $key => $value){
   	
   	$valor1 = $value["ventas"] + $cantidad[$i];
    $item1 = "ventas";

    $item2 = "id";
    $valor2 =  $value["id"];

   	$actualizarCompra = ControladorProductos::ctrActualizarProducto($item1 , $valor1 , $item2 , $valor2);

   	//hay que insertar un vallor nullo a la base de datos en parte de comentarios sino me trae nullos

     
    $datos2 = array( "idUsuario"=>$_SESSION["id"],
    	"idProducto"=>$value["id"],
    	"comentario"=>"",
    	"calificacion" => 0.0


    );
 
    $insertarNuevoComentario = ControladorUsuarios::ctrInsertarComentarioNuevaCompra($datos2);
 
  

   }
  
   if($respuesta == "ok" && $actualizarCompra == "ok" && $insertarNuevoComentario == "ok" ){

    //enviar correo electronico de confirmacion (sabiendo que paypal tambien envia email tanto al vendedor como al comprador)

   	echo '<script>

    localStorage.removeItem("listaProductos");
    localStorage.removeItem("cantidadCesta");
    localStorage.removeItem("sumacesta");
    window.location = "'.$url.'perfil";
   	</script>';
   }
   

}
/*=====  End of PAGO PAYPAL  ======*/


}

/*=============================================
ADQUISICIONES GRATUITAS
=============================================*/
else if(isset( $_GET['gratis']) && $_GET['gratis'] === 'true'){

   $producto = $_GET['producto'];
   $titulo = $_GET['titulo'];

   $datos = array(  "idUsuario"=>$_SESSION["id"],
                    "idProducto"=>$producto,
                    "metodo"=>"gratis",
                    "email"=>$_SESSION["email"],
                    "direccion"=>"",
                    "pais"=>"",
                    "pago"=>0);

   $respuesta = ControladorCarrito::ctrNuevasCompras($datos);

   $ordenar = "id";
   $item = "id";
   $valor = $producto;

   $productosGratis = ControladorProductos::ctrListarProductos($ordenar, $item, $valor);

   foreach ($productosGratis as $key => $value) {
    
         $item1 = "ventasGratis";
         $valor1 = $value["ventasGratis"] + 1;
         $item2 = "id";
         $valor2 =$value["id"];

         $actualizarSolicitud = ControladorProductos::ctrActualizarProducto($item1, $valor1, $item2, $valor2);
   }

   if($respuesta == "ok" && $actualizarSolicitud == "ok"){

      echo '<script>
         
            window.location = "'.$url.'ofertas/aviso";

         </script>';

   }

}else{

   echo '<script>window.location = "'.$url.'cancelado";</script>';


}