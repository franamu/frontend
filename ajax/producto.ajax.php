<?php 

require_once "../controladores/productos.controlador.php";
require_once "../modelos/productos.modelo.php";


class AjaxProductos
{
    
    public $valor;
    public $item;
    public $ruta;

	public function ajaxVistaProducto()
	{
		
        $valor1 = $this->valor;
	    $item1 = $this->item;

	    $valor2 = $this->ruta;
	    $item2 = "ruta";
		$respuesta = ControladorProductos::ctrActualizarProducto($item1 , $valor1 , $item2 , $valor2);
		echo json_encode($respuesta);
	}

    public $id;
    public $cantidad;

	public function ajaxVerificarStock(){  

      $idProducto = $this->id;
      $cantidad = $this->cantidad;

      $respuesta = ControladorProductos::ctrVerificarStock($idProducto);
      
      if($cantidad <= $respuesta["stock"]) 
      {
        $sasa = array("respuesta" => "ok");
        echo json_encode($sasa);

      }else{
        
        $sasa = array("respuesta" => "no");
        echo json_encode($sasa); 

      }

      

	}
}


if(isset($_POST["valor"])){

	$vista = new AjaxProductos();
	$vista -> valor = $_POST["valor"];
	$vista -> item = $_POST["item"];
	$vista -> ruta = $_POST["ruta"];
    $vista -> ajaxVistaProducto();

}

if(isset($_POST["verificarStock"])){


   $stock = new AjaxProductos();
   $stock -> id = $_POST["id"];
   $stock -> cantidad = $_POST["cantidad"];
   $stock -> ajaxVerificarStock();

}


 ?>