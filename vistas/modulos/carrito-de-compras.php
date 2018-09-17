<?php 

$servidor = Ruta::ctrRutaServidor();
$url = Ruta::ctrRuta();

 ?>
<!--==============================================
=            BREADCRUMB INFOPRODUCTOS            =
===============================================-->

<div class="container-fluid well well-sm">
	
	<div class="container">
		<div class="row">
			<ul class="breadcrumb fondoBreadcrumb text-uppercase">
				<li><a href="<?php echo $url; ?>">CARRITO DE COMPRAS</a></li>
      	        <li class="active pagActive"><?php echo $rutas[0]; ?></li>
			</ul>
		</div>
	</div>

</div>


<!--====  End of BREADCRUMB INFOPRODUCTOS  ====-->

<!--==============================================
=            TABLA CARRITO DE COMPRAS            =
===============================================-->

<div class="container-fluid">
	<div class="container">
		<div class="panel panel-default">
			<!--=================================================
			=            CABECERA CARRITO DE COMPRAS            =
			==================================================-->
			
			<div class="panel-heading cabeceraCarrito">
				<div class="col-md-6 col-sm-7 col-xs-12 text-center">
					<h3>
						<small>PRODUCTO</small>
					</h3>
				</div>
				<div class="col-md-2 col-sm-1 col-xs-0 text-center">
					<h3>
						<small>PRECIO</small>
					</h3>
				</div>
				<div class="col-md-2 col-xs-12 text-center">
					<h3>
						<small>CANTIDAD</small>
					</h3>
				</div>
				<div class="col-md-2 col-xs-12 text-center">
					<h3>
						<small>SUBTOTAL</small>
					</h3>
				</div>
			</div>
			
			<!--====  End of CABECERA CARRITO DE COMPRAS  ====-->
			
			<!--====================================
			=            CUERPO CARRITO            =
			=====================================-->
			
			<div class="panel-body cuerpoCarrito">

				
					


			</div>
			
			<!--====  End of CUERPO CARRITO  ====-->
			
		
                 <div class="panel-body sumaCarrito">
                 	<div class="col-md-4 col-sm-6 col-xs-12 pull-right well">
                 		
                 		<div class="col-xs-6">
                 			<h4>TOTAL:</h4>
                 		</div>

                 		<div class="col-xs-6">
                 			<h4 class="sumaSubTotal">
                 			
                 		</h4>
                 		</div>

                 	</div>
                 </div>
                  

                  <!--=====================================
                  =            BOTON CHECKOOUT            =
                  ======================================-->
                  
                  <div class="panel-heading cabeceraCheckout">
                  	<?php 
                        
                        if(isset($_SESSION["validarSesion"])){
                        	if($_SESSION["validarSesion"] == "ok"){

                        		echo '<a id="btnCheckout" idUsuario="'.$_SESSION["id"].'" href="#modalCheckout" data-toggle="modal"> <button class="btn btn-default backColor btn-lg pull-right btnP">PAGAR</button></a>';
                        	}
                        }else{

                        	echo '<a href="#modalIngreso" data-toggle="modal"><button class="btn btn-default backColor btn-lg pull-right btnP">PAGAR</button></a>';
                        }

                  	 ?>
                  	
                  </div>
                  
                  <!--====  End of BOTON CHECKOOUT  ====-->
                  

		</div>
	</div>
</div>

<!--====  End of TABLA CARRITO DE COMPRAS  ====-->

<!--=================================================
=            VENTANA MODAL PARA CHECKOUT            =
==================================================-->

<div id="modalCheckout" class="modal fade modalFormulario" role= "dialog">
	
<div class="modal-content modal-dialog">
	<div class="modal-body modalTitulo">
		<button type="button" class="close" data-dismiss="modal" >&times;</button>
         <h3 class="backColor">REALIZAR PAGO</h3>
          
          <?php 
            
            $respuesta = ControladorCarrito::ctrMostrarTarifas();

           echo '<input type="hidden" id="impuesto" value="'.$respuesta["impuesto"].'">
                 <input type="hidden" id="envioNacional" value="'.$respuesta["envioNacional"].'">
                 <input type="hidden" id="envioInternacional" value="'.$respuesta["envioInternacional"].'">
                 <input type="hidden" id="tasaMinimaNal" value="'.$respuesta["tasaMinimaNal"].'">
                 <input type="hidden" id="tasaMinimaInt" value="'.$respuesta["tasaMinimaInt"].'">
                 <input type="hidden" id="tasaPais" value="'.$respuesta["pais"].'">

           ';

            ?>
                
          <div class="contenidoCheckout">


          	<div class="formEnvio row">
          		<h4 class="text-center well text-muted text-uppercase">Información de Envío</h4>

          		<div class="col-xs-12 seleccionePais">
          			
          		</div>
          	</div>
          	<br>

          	<div class="formPago row">
          	      <input type="hidden" id="idUsuario2" value="<?php echo $_SESSION["id"];?>">
          		<h4 class="text-center well text-muted text-uppercase">Elige una forma de pago</h4>
              <?php 

              if($respuesta["estadoPayPal"] == 1){
                
                echo '<figure class="col-xs-6">
                <center>
                  <input type="radio" id="checkPaypal"  name="pago" value="paypal" checked>
                </center>
                  <img src="'.$url.'vistas/img/plantilla/paypal.jpg" class="img-thumbnail">
                
              </figure>';

              } 
          		
             if($respuesta["estadoPayu"] == 1){

              echo '  <figure class="col-xs-6">
                <center>
                  <input type="radio" id="checkPayu"  name="pago" value="payu" >
                </center>
                  <img src="'.$url.'vistas/img/plantilla/payu.jpg" class="img-thumbnail">
                
              </figure>';

             } 

             
             if($respuesta["estadoPayPal"] == 0 && $respuesta["estadoPayu"] == 0 ){
             
             echo '<div class="well">Lo sentimos no hay procesador de pago disponible.</div> ';
             echo '<input type="hidden" id="metodoPagoInput" value="sinMetodo"> ';

             }


             ?>



          	
          	</div>
			<br>


            <div class="listaProductos row">
            	<h4 class="text-center well text-muted text-uppercase">Productos a comprar</h4>
            	<table class=" table table-striped tablaProductos">
            		<thead>
            			<tr>
            				<th>Producto</th>
            				<th>Cantidad</th>
            				<th>Precio</th>
            			</tr>
            		</thead>
            		<tbody>
            			
            		</tbody>
            	</table>

               <div class="col-sm-6 col-xs-12 pull-right">
               	<table class="table table-striped tablaTasas">
               		<tbody>
               			<tr>
               				<th>Subtotal</th>
               				<th><span class="cambioDivisa">USD</span> $<span class="valorSubTotal" valor="0">0</span></th>
               			</tr>
               			<tr>
               				<th>Envío</th>
               				<th><span class="cambioDivisa">USD</span> $ <span class="valorTotalEnvio" valor="0">0</span></th>
               			</tr>
               			<tr>
               				<th>Impuesto</th>
               				<th><span class="cambioDivisa">USD</span> $<span class="valorTotalImpuesto" valor="0">0</span></th>
               			</tr>
               			<tr>
               				<th><strong>Total</strong></th>
               				<th><span class="cambioDivisa">USD</span> $<span class="valorTotalCompra" valor="0"></span></th>
               			</tr>
               		</tbody>
               	</table>

               <div class="divisa">
               	<select class="form-control" id="cambiarDivisa" name="divisa">
               		<option value="USD">USD</option>
               	</select>
               	<br>
               </div>

               </div>

               <div class="clearfix"></div>
                
                <form method="post" class="formPayu" action="https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/" style="display:none">
  <input name="merchantId"    type="hidden"  value=""   >
  <input name="accountId"     type="hidden"  value="" >
  <input name="description"   type="hidden"  value=""  >
  <input name="referenceCode" type="hidden"  value="" >
  <input name="amount"        type="hidden"  value=""   >
  <input name="tax"           type="hidden"  value=""  >
  <input name="taxReturnBase" type="hidden"  value="" >
  <input name="shipmentValue" type="hidden"  value="" >
  <input name="currency"      type="hidden"  value="" >
  <input name="lng"      type="hidden"  value="es" >
  <input name="signature"     type="hidden"  value=""  >
  <input name="test"          type="hidden"  value="" >
  <input name="responseUrl"    type="hidden"  value="" >
  <input name="declinedResponseUrl"    type="hidden"  value="" >
  <input name="confirmationUrl"    type="hidden"  value="" >
  <input name="displayShippingInformation"          type="hidden"  value="NO" >
  <input name="Submit"  class="btn btn-block btn-lg btn-default backColor"      type="submit"  value="Pagar" >
</form>
               
               <?php if($respuesta["estadoPayPal"] == 0 && $respuesta["estadoPayu"] == 0 ){
                 
                 

               }else{

                 echo '<button class="btn btn-block btn-lg btn-default backColor btnPagar">Pagar</button>';
               } ?>

               

            </div>
          

		  </div>


     </div>
		 
		
 </div>
</div>



<!--====  End of VENTANA MODAL PARA CHECKOUT  ====-->
