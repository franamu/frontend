<?php 

$servidor = Ruta::ctrRutaServidor();
$url      = Ruta::ctrRuta();



 ?>

<!--========================================
=            BREADCRUMB OFERTAS            =
=========================================-->

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


<!--====  End of BREADCRUMB OFERTAS  ====-->

<?php 

if(isset($rutas[1])){

if($rutas[1] == "aviso"){

echo '<div class="container-fluid">
	
	<div class="container">
		<div class="jumbotron">
			<button type="button" class="close cerrarOfertas" style="margin-top:-50px;"><h1>&times;</h1></button>
			<h1 class="text-center">¡Hola!</h1>
			<p class="text-center">
				Tu artículo ah sido asignado a tus compras, pero antes queremos presentarte las siguientes ofertas, si no lo deseas haz click en el siguiente botón:
               <br>
               <br>
				<a href="'.$url.'perfil"><button class="btn btn-default backColor btn-lg">
					VER ARTÍCULOS COMPRADOS
				</button></a>
				<a href="#moduloOfertas"><button class="btn btn-default btn-lg">
					VER OFERTAS
				</button></a>
			</p>
		</div>
	</div>

</div>';

}


}

 ?>

<div class="container-fluid">

  <div class="container">
    <div class="row" id="moduloOfertas">
      
    
    <?php 
    $item = null;
    $valor = null;
    date_default_timezone_set('America/Argentina/Cordoba');
    $fecha = date('Y-m-d');
    $hora = date('H:i:s');
    $fechaActual = $fecha . ' ' . $hora;
    /*=========================================================
    =            TRAEMOS LAS OFERTAS DE CATEGORIAS            =
    =========================================================*/
  
    $respuesta = ControladorProductos::ctrMostrarCategorias($item , $valor);

    foreach ($respuesta as $key => $value) {

       if($value["estado"] != 0){ 

    	  if($value["oferta"] == 1){
            
            $datetime1 = new DateTime($value["finOferta"]);
            $datetime2 = new DateTime($fechaActual);
            $interval = date_diff($datetime1, $datetime2);
            
            $finOferta = $interval->format('%a');
       

    	   if($value["finOferta"] > $fecha)	{
        
        echo '<div class="col-md-4 col-sm-6 col-xs-12">  
          
          <div class="ofertas">
           
           <h3 class="text-center text-uppercase">
              ¡OFERTA ESPECIAL EN <br> '.$value["categoria"].'!
           </h3>
           <figure>
            <img class="img-responsive" src="'.$servidor.$value["imgOferta"].'" width="100%">

            <div class="sombraSuperior">
            ';
             
             if($value["descuentoOferta"] != 0){

             echo '<h1 class="text-center text-uppercase">'.$value["descuentoOferta"].'% OFF</h1>';

             }else{


             echo '<h1 class="text-center text-uppercase">$'.$value["precioOferta"].'</h1>';

             }

          echo  '<h1 class="text-center text-uppercase"></h1>
            </div>
           </figure>';

           if($finOferta == 0){
           
           echo '<h4 class="text-center">La oferta termina hoy</h4>';

           }else if($finOferta == 1 ){
            echo '<h4 class="text-center">La oferta termina en '.$finOferta.' día</h4>';

           }else{
           
           echo '<h4 class="text-center">La oferta termina en '.$finOferta.' días </h4>';


           } 

          echo '
             
             <center><div class="countdown" finOferta="'.$value["finOferta"].'"></div>  
               
               <a href="'.$url.$value["ruta"].'" class="pixelOferta" titulo="'.$value["categoria"].'">
               <button class="btn backColor btn-lg text-uppercase">Ir a la Oferta</button>
               </a>

             </center>

          </div>

        </div> ';

    	 }
      }
     }
    }


    /*=========================================================
    =            TRAEMOS LAS OFERTAS DE SUBCATEGORIAS            =
    =========================================================*/
  
    $respuesta = ControladorProductos::ctrMostrarSubcategorias($item , $valor);

    foreach ($respuesta as $key => $value) {

      if($value["estado"] != 0){

      	if($value["oferta"] == 1 && $value["ofertadoPorCategoria"] == 0){
            
            $datetime1 = new DateTime($value["finOferta"]);
            $datetime2 = new DateTime($fechaActual);
            $interval = date_diff($datetime1, $datetime2);
            
            $finOferta = $interval->format('%a');
       

    	   if($value["finOferta"] > $fecha)	{
        
        echo '<div class="col-md-4 col-sm-6 col-xs-12">  
          
          <div class="ofertas">
           
           <h3 class="text-center text-uppercase">
              ¡OFERTA ESPECIAL EN <br> '.$value["subcategoria"].'!
           </h3>
           <figure>
            <img class="img-responsive" src="'.$servidor.$value["imgOferta"].'" width="100%">

            <div class="sombraSuperior">
            ';
             
             if($value["descuentoOferta"] != 0){

             echo '<h1 class="text-center text-uppercase">'.$value["descuentoOferta"].'% OFF</h1>';

             }else{


             echo '<h1 class="text-center text-uppercase">$'.$value["precioOferta"].'</h1>';

             }

          echo  '<h1 class="text-center text-uppercase"></h1>
            </div>
           </figure>';

           if($finOferta == 0){
           
           echo '<h4 class="text-center">La oferta termina hoy</h4>';

           }else if($finOferta == 1 ){
            echo '<h4 class="text-center">La oferta termina en '.$finOferta.' día</h4>';

           }else{
           
           echo '<h4 class="text-center">La oferta termina en '.$finOferta.' días </h4>';


           } 

          echo '
             
             <center><div class="countdown" finOferta="'.$value["finOferta"].'"></div>  
               
               <a href="'.$url.$value["ruta"].'" class="pixelOferta" titulo="">
               <button class="btn backColor btn-lg text-uppercase">Ir a la Oferta</button>
               </a>

             </center>

          </div>

        </div> ';

    	 }
      }

     }
    }
    
    /*=====  End of TRAEMOS LAS OFERTAS DE SUBCATEGORIAS  ======*/


     /*=========================================================
    =            TRAEMOS LAS OFERTAS DE PRODUCTOS            =
    =========================================================*/

    $ordenar = "id";
  
    $respuestaProductos = ControladorProductos::ctrListarProductos($ordenar ,$item , $valor);

    foreach ($respuestaProductos as $key => $value) {

     if($value["estado"] != 0){

    	 if($value["oferta"] == 1 && $value["ofertadoPorCategoria"] == 0 && $value["ofertadoPorSubCategoria"] == 0 ){
            
            $datetime1 = new DateTime($value["finOferta"]);
            $datetime2 = new DateTime($fechaActual);
            $interval = date_diff($datetime1, $datetime2);
            
            $finOferta = $interval->format('%a');
       

    	   if($value["finOferta"] > $fecha)	{
        
        echo '<div class="col-md-4 col-sm-6 col-xs-12">  
          
          <div class="ofertas">
           
           <h3 class="text-center text-uppercase">
              ¡OFERTA ESPECIAL EN <br> '.$value["titulo"].'!
           </h3>
           <figure>
            <img class="img-responsive" src="'.$servidor.$value["imgOferta"].'" width="100%">

            <div class="sombraSuperior">
            ';
             
             if($value["descuentoOferta"] != 0){

             echo '<h1 class="text-center text-uppercase">'.$value["descuentoOferta"].'% OFF</h1>';

             }else{


             echo '<h1 class="text-center text-uppercase">$'.$value["precioOferta"].'</h1>';

             }

          echo  '<h1 class="text-center text-uppercase"></h1>
            </div>
           </figure>';

           if($finOferta == 0){
           
           echo '<h4 class="text-center">La oferta termina hoy</h4>';

           }else if($finOferta == 1 ){
            echo '<h4 class="text-center">La oferta termina en '.$finOferta.' día</h4>';

           }else{
           
           echo '<h4 class="text-center">La oferta termina en '.$finOferta.' días </h4>';


           } 

          echo '
             
             <center><div class="countdown" finOferta="'.$value["finOferta"].'"></div>  
               
               <a href="'.$url.$value["ruta"].'" class="pixelOferta">
               <button class="btn backColor btn-lg text-uppercase">Ir a la Oferta</button>
               </a>

             </center>

          </div>

        </div> ';

    	  }
      }
     }
    }
    
    /*=====  End of TRAEMOS LAS OFERTAS DE PRODUCTOS  ======*/   

     ?>
    

    </div>
  </div>

</div>