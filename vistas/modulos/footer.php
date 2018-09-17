<!--=============================
=            FOOTER             =
==============================-->

<footer class="container-fluid">

	<div class="container">

		<div class="row">
			
			<!--=================================================
			=            CATEGORIAS Y SUB CATEGORIAS            =
			==================================================-->
			
			<div class="col-lg-5 col-md-6 col-xs-12 footerCategorias">


              <?php 

              $url = Ruta::ctrRuta();   
              $item = null;
              $valor = null;
              $categorias = ControladorProductos::ctrMostrarCategorias($item , $valor);

              foreach ($categorias as $key => $value) {

           if($value["estado"] != 0){

              echo '<div class="col-lg-6  col-xs-12">
					<h4><a href="'.$url.$value["ruta"].'" class="pixelSubCategorias" titulo="'.$value["categoria"].'">'.$value["categoria"].'</a></h4>
                     <hr>
					<ul>';

			    $item = "id_categoria";
                $valor = $value["id"];
                $subcategorias = ControladorProductos::ctrMostrarSubcategorias($item , $valor);
                
                foreach ($subcategorias as $key => $value) {


                	if($value["estado"] != 0){
						echo '<li>
							<a href="'.$url.$value["ruta"].'" class="pixelSubCategorias" titulo="'.$value["subcategoria"].'">'.$value["subcategoria"].'</a>
						</li>
					
                     
					';

				}

                 }


                 echo '</ul>
                 </div>';

                }
              }


               ?>

			
			</div>
			
			
			<!--====  End of CATEGORIAS Y SUB CATEGORIAS  ====-->
			
			<!--====================================
			=            DATOS CONTACTO            =
			=====================================-->
			
			<div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 text-left infoContacto">
				
				<h5>Contacto</h5>
				<br>
				<h5>
					<i class="fa fa-phone-square" aria-hidden="true"></i>456123
					<br><br>
                    
                    <i class="fa fa-envelope" aria-hidden="true"></i> fran@gmail.com
                    <br><br>

                    <i class="fa fa-map-marker" aria-hidden="true"></i> Calle Pencales 2517 Barrio Parque Capital

                    <br><br>

                    Córdoba || Argentina
                    
                    

				</h5>


              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2024.099381510241!2d-64.21896416311542!3d-31.43847804858231!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9432a26adaf0157d%3A0x95445c434f4daac!2sPencales+2517%2C+C%C3%B3rdoba!5e0!3m2!1ses!2sar!4v1521752868852" width="100%" height="200" frameborder="0" style="border:0" allowfullscreen></iframe>

			</div>
			
			<!--====  End of DATOS CONTACTO  ====-->
			
			<!--============================================
			=            FORMULAIRO CONTACTENOS            =
			=============================================-->
			
			<div class="col-lg-4 col-md-3 col-sm-6 col-xs-12 formContacto">
				
				<h4>Resuelva su inquietud</h4>
				<form role="form" method="post"  onsubmit="return validarContactenos()">
					<input type="text" id="nombreContactenos" name="nombreContactenos" class="form-control" placeholder="Nombre" required>
					<br>
					<input type="email" id="emailContactenos" name="emailContactenos" class="form-control" placeholder="E-mail" required>
					<br>
					<textarea id="mensajeContactenos" name="mensajeContactenos" class="form-control" placeholder="Mensaje" row="5" required></textarea>
					<br>
					<input type="submit" value="Enviar" id="enviar" class="btn btn-default backColor pull-right">
					<br>

				</form>

				<?php 

                $contactenos = new ControladorUsuarios();
                $contactenos->ctrFormularioContactenos();

				?>

			</div>
			
			<!--====  End of FORMULAIRO CONTACTENOS  ====-->
			

		</div>

	</div>

</footer>

<!--====  End of FOOTER   ====-->

<!--===========================
=            FINAL            =
============================-->

<div class="container-fluid final">
	
	<div class="container">
		<div class="row">
			<div class="col-sm-6 col-xs-12 text-left text-muted">
				<h5>&copy; 2018 Todos los derechos reservados. Sitio elaborado por Ammu</h5>
			</div>
			<div class="col-sm-6 col-xs-12 text-right social">
				<ul>
					<?php 

             $social = ControladorPlantilla::ctrEstiloPlantilla();
             $jsonRedesSociales = json_decode($social["redesSociales"], true);
             //var_dump($jsonRedesSociales);

             foreach ($jsonRedesSociales as $key => $value) {
               
               echo ' <li>
                    <a href="'. $value["url"] .'" target ="_blank">
                      <i class="fa '. $value["red"] .' redSocial '. $value["url"] .' " aria-hidden="true"></i>
                    </a>
               </li>';
             }

					 ?>
				</ul>
			</div>
		</div>
	</div>

</div>

<!--====  End of FINAL  ====-->
