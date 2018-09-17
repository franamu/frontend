<?php 

class ControladorProductos
{  

  /*=======================================
   =            VERIFICAR STOCK            =
   =======================================*/
   
   static public function ctrVerificarStock($id){

   $tabla = "productos";

   $respuesta = ModeloProductos::mdlVerificarStock($tabla, $id);

   return $respuesta;

   }
   
   /*=====  End of VERIFICAR STOCK  ======*/


	/*==========================================
	=            OBTENGO CATEGORIAS            =
	==========================================*/
	
	static public function ctrMostrarCategorias($item , $valor)
	{
		$tabla = "categorias";

		$respuesta = ModeloProductos::mdlMostrarCategorias($tabla ,$item , $valor);

		return $respuesta;
	}
	
	/*=====  End of OBTENGO CATEGORIAS  ======*/
	

	
    /*=============================================
    =            OBTENGO SUBCATEGORIAS            =
    =============================================*/
    
     static public function ctrMostrarSubcategorias($item , $valor)
   {
       $tabla = "subcategorias";

		$respuesta = ModeloProductos::mdlMostrarSubCategorias($tabla , $item , $valor);

		return $respuesta;
   }
    
    /*=====  End of OBTENGO SUBCATEGORIAS  ======*/
    
 
/*=========================================
=            MOSTRAR PRODUCTOS            =
=========================================*/

     static public function ctrMostrarProductos($ordenar , $item , $valor , $base , $tope , $modo){

     	$tabla ="productos";

     	$respuesta = ModeloProductos::mdlMostrarProductos($tabla , $ordenar , $item , $valor , $base , $tope , $modo);

     	return $respuesta;
     }

/*=====  End of MOSTRAR PRODUCTOS  ======*/

  
  /*=============================================
  =            MOSTRAR INFO PRODUCTO            =
  =============================================*/
  
      static public function ctrMostrarInfoProducto($item , $valor){
        
        $tabla ="productos";

     	$respuesta = ModeloProductos::mdlMostrarInfoProductos($tabla , $item , $valor);

     	return $respuesta;

      }
  
  /*=====  End of MOSTRAR INFO PRODUCTO  ======*/
  
  /*========================================
  =            LISTAR PRODUCTOS            =
  ========================================*/
  
   static public function ctrListarProductos($ordenar , $item , $valor){

   $tabla = "productos";

   $respuesta = ModeloProductos::mdlListarProductos($tabla , $ordenar , $item , $valor );

   return $respuesta;
  }
  
  
  /*=====  End of LISTAR PRODUCTOS  ======*/
  

/*======================================
=            MOSTRAR BANNER            =
======================================*/

  static public function ctrMostrarBanner($ruta)
  {
    $tabla = "banner";

    $respuesta = ModeloProductos::mdlMostrarBanner($tabla , $ruta);

    return $respuesta;
  }

/*=====  End of MOSTRAR BANNER  ======*/

/*================================
=            BUSCADOR            =
================================*/

   static public function ctrBuscarProductos($busqueda, $ordenar ,  $modo , $base , $tope ){
  
    $tabla = "productos";

    $respuesta = ModeloProductos::mdlBuscarProductos($tabla ,$busqueda, $ordenar ,  $modo , $base , $tope );

    return $respuesta;

  }

/*=====  End of BUSCADOR  ======*/

/*=================================================
=            LISTAR PRODUCTOS BUSCADOR            =
=================================================*/

   static public function ctrListarProductosBusqueda($busqueda){

   $tabla = "productos";

   $respuesta = ModeloProductos::mdlListarProductosBusqueda($tabla , $busqueda );

   return $respuesta;
  }
  

/*=====  End of LISTAR PRODUCTOS BUSCADOR  ======*/


/*=================================================
=            ACTUALIZAR VISTA PRODUCTO            =
=================================================*/

    static public function ctrActualizarProducto($item1 , $valor1 , $item2 , $valor2){
  
    $tabla = "productos"; 

    $respuesta = ModeloProductos::mdlActualizarProducto($tabla , $item1 , $valor1 , $item2 , $valor2);

    return $respuesta;   

    }

/*=====  End of ACTUALIZAR VISTA PRODUCTO  ======*/


}


