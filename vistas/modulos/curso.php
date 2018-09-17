<?php  

/*=====================================
=            VALIDAR CURSO            =
=====================================*/


if(!isset($_SESSION["validarSesion"])){


echo '<script>window.location = "'.$url.'"</script>';

exit();

}

/*=====  End of VALIDAR CURSO  ======*/
?>

<!--==============================================
=            BREADCRUMB CURSO            =
===============================================-->

<div class="container-fluid well well-sm">

  <div class="container">
    <div class="row">
      <ul class="breadcrumb fondoBreadcrumb text-uppercase">
        <li><a href="<?php echo $url; ?>">INICIO</a></li>
                <li class="active pagActive"><?php echo $rutas[0]; ?></li>
      </ul>
    </div>
  </div>

</div>


<!--====  End of BREADCRUMB INFOPRODUCTOS  ====-->



<!--=================================
=            TRAER CURSO            =
==================================-->

<?php  

if(isset($rutas[1]) && isset($rutas[2]) && isset($rutas[3])){
$item = "id";
$valor = $rutas[1];
$idUsuario = $rutas[2];
$idProducto = $rutas[3];

$confirmarCompra = ControladorUsuarios::ctrMostrarCompras($item , $valor);

if($confirmarCompra[0]["id_usuario"] == $idUsuario && $confirmarCompra[0]["id_producto"] == $idProducto ){

	echo "<h1>BIENVENIDO AL CURSO</h1>";
}else{

	echo '<div class="col-12-xs text-center error404">
			
			<h1>¡Oops!</h1>
			
			<h2>No tienes acceso a este producto</h2>

		</div>';
}

}else{
 
echo '<div class="col-12-xs text-center error404">
			
			<h1>¡Oops!</h1>
			
			<h2>No tienes acceso a este producto</h2>

		</div>';

}


