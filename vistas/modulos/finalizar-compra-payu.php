<?php

/*=============================================
PAGO PAYU
=============================================*/

if(isset($_POST["response_code_pol"]) && isset( $_GET['payu']) && $_GET['payu'] === 'true'){ 

   $productos = explode("-", $_GET['productos']);
   $cantidad = explode("-", $_GET['cantidad']);
   $titulo = explode("," , $_GET['description']);
   $pago = $_GET['pago'];
   $idUsuario = $_GET["idUsuario"];

   #Actualizamos la base de datos
   for($i = 0; $i < count($productos); $i++){

      $datos = array("idUsuario"=>$idUsuario,
                     "idProducto"=>$productos[$i],
                     "metodo"=>"payu",
                     "email"=>$_POST['email_buyer'],
                     "titulo"=> $titulo[$i],
                     "direccion"=>$_POST["shipping_address"],
                     "pais"=>$_POST["shipping_country"],
                     "cantidad"=>$cantidad[$i],
                     "pago"=>$pago);

      $respuesta = ControladorCarrito::ctrNuevasCompras($datos);

      $ordenar = "id";
      $item = "id";
      $valor = $productos[$i];

      $productosCompra = ControladorProductos::ctrListarProductos($ordenar, $item, $valor);

      foreach ($productosCompra as $key => $value) {

          $item1 = "ventas";
         $valor1 = $value["ventas"] + $cantidad[$i];
         $item2 = "id";
         $valor2 =$value["id"];

         $actualizarCompra = ControladorProductos::ctrActualizarProducto($item1, $valor1, $item2, $valor2);

          $item1 = "stock";
         $valor1 = $value["stock"] -  $cantidad[$i];
         if($valor1 < 0){$valor1 = 0;}
         $item2 = "id";
         $valor2 = $value["id"];
    
         $respuesta2 = ControladorProductos::ctrActualizarProducto($item1 , $valor1 , $item2 , $valor2);

        
         
        $datos2 = array( "idUsuario"=>$idUsuario,
      "idProducto"=>$value["id"],
      "comentario"=>"",
      "calificacion" => 0.0


    );

    $insertarNuevoComentario = ControladorUsuarios::ctrInsertarComentarioNuevaCompra($datos2);
         
      }

   }


}