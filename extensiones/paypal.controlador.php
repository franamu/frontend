<?php  
require_once "../modelos/rutas.php";
require_once "../modelos/carrito.modelo.php";

use PayPal\Api\Amount;
use PayPal\Api\Details;
use PayPal\Api\Item;
use PayPal\Api\ItemList;
use PayPal\Api\Payer;
use PayPal\Api\Payment;
use PayPal\Api\RedirectUrls;
use PayPal\Api\Transaction;

class Paypal{



static public function mdlPagoPaypal($datos){
require __DIR__ . '/bootstrap.php';

$tituloArray = explode("," , $datos["tituloArray"]);
$cantidadArray = explode("," , $datos["cantidadArray"]);
$valorItemArray = explode("," , $datos["valorItemArray"]);
$idProductos = str_replace(",","-" , $datos["idProductoArray"]);
$cantidadProductos = str_replace(",","-" , $datos["cantidadArray"]);
$tituloTest =  str_replace(",","/" , $datos["tituloArray"]);
$tituloTest =  str_replace(" ","-" , $tituloTest);
$titulo = preg_replace("/[^a-zA-Z0-9\/_|+ -]/",'',iconv('UTF-8','ASCII//TRANSLIT',strip_tags($tituloTest)));


//seleccionamos q el metodo de pago va a ser paypal
$payer = new Payer();
$payer->setPaymentMethod("paypal");

$item = array();
$variosItem = array();
//paypal necesita el precio por unidad, despues paypal se encarga de multiplicar el precio por la cantidad de productos q le mando

for ($i=0; $i < count($tituloArray) ; $i++) { 
	$item[$i] = new Item();
	$item[$i]->setName($tituloArray[$i])
    ->setCurrency($datos["divisa"])
    ->setQuantity($cantidadArray[$i])
    ->setPrice($valorItemArray[$i]/$cantidadArray[$i]);

    array_push($variosItem, $item[$i]);
}


//agrupamos los items en una lista de items
$itemList = new ItemList();
$itemList->setItems($variosItem);

//detalles de pago

$details = new Details();
$details->setShipping($datos["envio"])
    ->setTax($datos["impuesto"])
    ->setSubtotal($datos["subtotal"]);



//definimos el pago total con sus detalles

$amount = new Amount();
$amount->setCurrency($datos["divisa"])
    ->setTotal($datos["total"])
    ->setDetails($details);


//agregamos las caracteristicas de la transaccion

$transaction = new Transaction();
$transaction->setAmount($amount)
    ->setItemList($itemList)
    ->setDescription("Descripción del Pago")
    ->setInvoiceNumber(uniqid());

//urls de respuesta en caso de exito o fracaso
//el metodo getBase Url te toma la pagina q pusiste en la api, esto es para q sea automatico sin embargo tarda 3 horas aprox en configurarse desde q se carga en la api, por lo q se hace manual    
/*$baseUrl = getBaseUrl();
var_dump($baseUrl);*/
$servidor = Ruta::ctrRutaServidor();
$url = Ruta::ctrRuta();
$pago = $datos["subtotal"];
$redirectUrls = new RedirectUrls();
$redirectUrls->setReturnUrl("$url/index.php?ruta=finalizar-compra&paypal=true&productos=".$idProductos."&cantidad=".$cantidadProductos."&titulo=".$titulo."&pago=".$pago)
    ->setCancelUrl("$url/carrito-de-compras");

//características del pago
$payment = new Payment();
$payment->setIntent("sale")
    ->setPayer($payer)
    ->setRedirectUrls($redirectUrls)
    ->setTransactions(array($transaction));

//tratar de ejecutar un proceso y si falla ejecutar una rutina de error

try {
    $payment->create($apiContext);
    
   
} catch (PayPal\Exception\PayPalConnectionException $ex) {
   
   echo $ex->getCode();
   echo $ex->getData();
   die($ex);
   return "$url/error";
}


foreach ($payment->getLinks() as $link) {
	
	if($link->getRel() == "approval_url"){

        $redirectUrl = $link->getHref();


	}
}

return $redirectUrl;

}


}