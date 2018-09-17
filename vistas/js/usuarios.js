/*=======================================
=            CAPTURA DE RUTA            =
=======================================*/

var rutaActual = location.href;

$(".btnIngreso , .facebook , .google").click(function(){
	localStorage.setItem("rutaActual" , rutaActual);
})


/*=====  End of CAPTURA DE RUTA  ======*/

/*==============================================
=            VALIDAR EMAIL REPETIDO            =
==============================================*/

var validarEmailRepetido = false;

$("#regEmail").change(function(){

	var email = $("#regEmail").val();

	var datos = new FormData();
	datos.append("validarEmail", email);

	$.ajax({

		url:rutaOculta+"ajax/usuarios.ajax.php",
		method: "POST",
		data: datos,
		cache: false,
		contentType: false,
		processData: false,
		success:function(respuesta){
			
			if(!JSON.parse(respuesta)){

				$(".alert").remove();
				validarEmailRepetido = false;

			}else{

				var modo = JSON.parse(respuesta).modo;
				
				if(modo == "directo"){

					modo = "esta página";
				}

				$("#regEmail").parent().before('<div class="alert alert-warning"><strong>ERROR:</strong> El correo electrónico ya existe en la base de datos, fue registrado a través de '+modo+', por favor ingrese otro diferente</div>')

					validarEmailRepetido = true;
					
				

			}

		}

	})

})

/*=====  End of VALIDAR EMAIL REPETIDO  ======*/

/*=============================================
VALIDAR EL REGISTRO DE USUARIO
=============================================*/
function registroUsuario(){

	/*=============================================
	VALIDAR EL NOMBRE
	=============================================*/

	var nombre = $("#regUsuario").val();

	if(nombre != ""){

		var expresion = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*$/;

		if(!expresion.test(nombre)){
            
			$("#regUsuario").parent().before('<div class="alert alert-warning"><strong>ERROR:</strong> No se permiten números ni caracteres especiales</div>')

			return false;

		}


	}else{

		$("#regUsuario").parent().before('<div class="alert alert-warning"><strong>ATENCIÓN:</strong> Este campo es obligatorio</div>')

		return false;
	}

	/*=============================================
	VALIDAR EL EMAIL
	=============================================*/

	var email = $("#regEmail").val();

	if(email != ""){

		var expresion = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

		if(!expresion.test(email)){

			$("#regEmail").parent().before('<div class="alert alert-warning"><strong>ERROR:</strong> Escriba correctamente el correo electrónico</div>')

			return false;

		}

		if(validarEmailRepetido){
          $(".alert").remove();
			$("#regEmail").parent().before('<div class="alert alert-danger"><strong>ERROR:</strong> El correo electrónico ya existe en la base de datos, por favor ingrese otro diferente</div>')

			return false;

		}

	}else{

		$("#regEmail").parent().before('<div class="alert alert-warning"><strong>ATENCIÓN:</strong> Este campo es obligatorio</div>')

		return false;
	}


	/*=============================================
	VALIDAR CONTRASEÑA
	=============================================*/

	var password = $("#regPassword").val();

	if(password != ""){

		var expresion = /^[a-zA-Z0-9]*$/;

		if(!expresion.test(password)){

			$("#regPassword").parent().before('<div class="alert alert-warning"><strong>ERROR:</strong> No se permiten caracteres especiales</div>')

			return false;

		}

	}else{

		$("#regPassword").parent().before('<div class="alert alert-warning"><strong>ATENCIÓN:</strong> Este campo es obligatorio</div>')

		return false;
	}

	/*=============================================
	VALIDAR POLÍTICAS DE PRIVACIDAD
	=============================================*/

	var politicas = $("#regPoliticas:checked").val();
	
	if(politicas != "on"){

		$("#regPoliticas").parent().before('<div class="alert alert-warning"><strong>ATENCIÓN:</strong> Debe aceptar nuestras condiciones de uso y políticas de privacidad</div>')

		return false;

	}

	return true;
}


/*====================================
=            CAMBIAR FOTO            =
====================================*/

$("#btnCambiarFoto").click(function(){

$("#imgPerfil").toggle();

$("#subirImagen").toggle();



})

$("#datosImagen").change(function(){
	var imagen = this.files[0];
	console.log(imagen);

	if(imagen["type"] != "image/jpeg"){

		$("#datosImagen").val("");
    
swal("Lo sentimos", "Solo aceptamos imágenes jpg", "error");

       

	}else if(Number(imagen["size"]) > 2000000){
      
      $("#datosImagen").val("");

      swal("Lo sentimos", "La imágen no debe pesar más de 2 MB", "error");
      $(".previsualizar").attr("src" , null);
	}else{


       var datosImagen = new FileReader;
       datosImagen.readAsDataURL(imagen);

       $(datosImagen).on("load" , function(event){
          
          var rutaImagen = event.target.result;
          $(".previsualizar").attr("src" , rutaImagen);
       })

	}
 
})


/*=====  End of CAMBIAR FOTO  ======*/


/*=====  End of VALIDAR REGISTRO DE USUARIO  ======*/


/*===================================
=            COMENTARIOS            =
===================================*/

$(".calificarProducto").click(function(){

	var idComentario = $(this).attr("idComentario");
	$("#idComentario").val(idComentario);

})


$("input[name='puntaje']").change(function(){

	var puntaje = $(this).val();

	switch(puntaje){

    case "0.5":
    $("#estrellas").html('<i class="fa fa-star-half-o text-success" aria-hidden="true"></i> '+
                                   '<i class="fa fa-star-o text-success" aria-hidden="true"></i> '+
                                   '<i class="fa fa-star-o text-success" aria-hidden="true"></i> '+
                                   '<i class="fa fa-star-o text-success" aria-hidden="true"></i> '+
                                   '<i class="fa fa-star-o text-success" aria-hidden="true"></i> ');
    break;

    case "1.0":
    $("#estrellas").html('<i class="fa fa-star text-success" aria-hidden="true"></i> '+
                                   '<i class="fa fa-star-o text-success" aria-hidden="true"></i> '+
                                   '<i class="fa fa-star-o text-success" aria-hidden="true"></i> '+
                                   '<i class="fa fa-star-o text-success" aria-hidden="true"></i> '+
                                   '<i class="fa fa-star-o text-success" aria-hidden="true"></i> ');
    break;

        case "1.5":
    $("#estrellas").html('<i class="fa fa-star text-success" aria-hidden="true"></i> '+
                                   '<i class="fa fa-star-half-o text-success" aria-hidden="true"></i> '+
                                   '<i class="fa fa-star-o text-success" aria-hidden="true"></i> '+
                                   '<i class="fa fa-star-o text-success" aria-hidden="true"></i> '+
                                   '<i class="fa fa-star-o text-success" aria-hidden="true"></i> ');
    break;

        case "2.0":
    $("#estrellas").html('<i class="fa fa-star text-success" aria-hidden="true"></i> '+
                                   '<i class="fa fa-star text-success" aria-hidden="true"></i> '+
                                   '<i class="fa fa-star-o text-success" aria-hidden="true"></i> '+
                                   '<i class="fa fa-star-o text-success" aria-hidden="true"></i> '+
                                   '<i class="fa fa-star-o text-success" aria-hidden="true"></i> ');
    break;

        case "2.5":
    $("#estrellas").html('<i class="fa fa-star text-success" aria-hidden="true"></i> '+
                                   '<i class="fa fa-star text-success" aria-hidden="true"></i> '+
                                   '<i class="fa fa-star-half-o text-success" aria-hidden="true"></i> '+
                                   '<i class="fa fa-star-o text-success" aria-hidden="true"></i> '+
                                   '<i class="fa fa-star-o text-success" aria-hidden="true"></i> ');
    break;

        case "3.0":
    $("#estrellas").html('<i class="fa fa-star text-success" aria-hidden="true"></i> '+
                                   '<i class="fa fa-star text-success" aria-hidden="true"></i> '+
                                   '<i class="fa fa-star text-success" aria-hidden="true"></i> '+
                                   '<i class="fa fa-star-o text-success" aria-hidden="true"></i> '+
                                   '<i class="fa fa-star-o text-success" aria-hidden="true"></i> ');
    break;

        case "3.5":
    $("#estrellas").html('<i class="fa fa-star text-success" aria-hidden="true"></i> '+
                                   '<i class="fa fa-star text-success" aria-hidden="true"></i> '+
                                   '<i class="fa fa-star text-success" aria-hidden="true"></i> '+
                                   '<i class="fa fa-star-half-o text-success" aria-hidden="true"></i> '+
                                   '<i class="fa fa-star-o text-success" aria-hidden="true"></i> ');
    break;

    case "4.0":
    $("#estrellas").html('<i class="fa fa-star text-success" aria-hidden="true"></i> '+
                                   '<i class="fa fa-star text-success" aria-hidden="true"></i> '+
                                   '<i class="fa fa-star text-success" aria-hidden="true"></i> '+
                                   '<i class="fa fa-star text-success" aria-hidden="true"></i> '+
                                   '<i class="fa fa-star-o text-success" aria-hidden="true"></i> ');
    break;

        case "4.5":
    $("#estrellas").html('<i class="fa fa-star text-success" aria-hidden="true"></i> '+
                                   '<i class="fa fa-star text-success" aria-hidden="true"></i> '+
                                   '<i class="fa fa-star text-success" aria-hidden="true"></i> '+
                                   '<i class="fa fa-star text-success" aria-hidden="true"></i> '+
                                   '<i class="fa fa-star-half-o text-success" aria-hidden="true"></i> ');
    break;

      case "5.0":
    $("#estrellas").html('<i class="fa fa-star text-success" aria-hidden="true"></i> '+
                                   '<i class="fa fa-star text-success" aria-hidden="true"></i> '+
                                   '<i class="fa fa-star text-success" aria-hidden="true"></i> '+
                                   '<i class="fa fa-star text-success" aria-hidden="true"></i> '+
                                   '<i class="fa fa-star text-success" aria-hidden="true"></i> ');
    break;


	}
})

/*=====  End of COMENTARIOS  ======*/

/*======================================================
=            COMENTARIOS VALIDAR COMENTARIO            =
======================================================*/

function validarComentario(){

 var comentario = $("#comentario").val();

 if(comentario != ""){

 var expresion = /^[¡\\¿\\?\\!\\,\\.\\a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ ]*$/;

 if(!expresion.test(comentario)){

 	$("#comentario").parent().before('<div class="alert alert-danger"><strong>ERROR:</strong> No se permiten caracteres especiales como por ejemplo $%&/[]*</div>');

 	return false;
 }

 }else{	

 		$("#comentario").parent().before('<div class="alert alert-warning"><strong>ERROR:</strong> Campo obligatorio</div>');

 	return false;
 }

}

/*=====  End of COMENTARIOS VALIDAR COMENTARIO  ======*/

/*=======================================
=            LISTA DE DESEOS            =
=======================================*/

$(".deseos").click(function(){
  
  var idProducto = $(this).attr("idProducto");
  var idUsuario = localStorage.getItem("usuario");
 
  if(idUsuario == null){

  
     swal("Necesitas ingresar", "Para agregar este item a tu lista de deseos debes ingresar al sistema", "warning");

  }else{
    
   $(this).addClass("btn-danger");
   var datos = new FormData();
   datos.append("idUsuario" , idUsuario);
   datos.append("idProducto" , idProducto);

   $.ajax({
   	url:rutaOculta+"ajax/usuarios.ajax.php",
   	method: "POST",
	data: datos,
	cache: false,
	contentType: false,
	processData: false,
	success:function(respuesta){
     
   

	}

   })


  }

})


/*=====  End of LISTA DE DESEOS  ======*/

/*==========================================================
=            BORRAR PRODUCTO DE LISTA DE DESEOS            =
==========================================================*/

$(".quitarDeseo").click(function(){

var idDeseo = $(this).attr("idDeseo");

$(this).parent().parent().parent().remove();

   var datos = new FormData();
   datos.append("idDeseo" , idDeseo);

    $.ajax({
   	url:rutaOculta+"ajax/usuarios.ajax.php",
   	method: "POST",
	data: datos,
	cache: false,
	contentType: false,
	processData: false,
	success:function(respuesta){
     
     console.log("respuesta" , respuesta);

	}

   })


})

/*=====  End of BORRAR PRODUCTO DE LISTA DE DESEOS  ======*/

/*========================================
=            ELIMINAR USUARIO            =
========================================*/

$("#eliminarUsuario").click(function(){

  var id = $("#idUsuario").val();

  if($("#modoUsuario").val() == "directo"){

  	if($("#fotoUsuario").val() != ""){

  		var foto = $("#fotoUsuario").val();
  	}
  }

   swal({
                title: "¿Estás seguro/a de querer eliminar la cuenta?",
                text: "Si borras la cuenta perderás la información perteneciente a la misma",
                type:"warning",
                showCancelButton: true,
                confirmButtonColor: "DD6B55",
                confirmButtonText: "Si, borrar",       
                closeOnConfirm: false
              },

              function(isConfirm){

                if(isConfirm){
                  window.location = "index.php?ruta=perfil&id="+id+"&foto="+foto;
                }
            });

})

/*=====  End of ELIMINAR USUARIO  ======*/

/*=========================================================
=            VALIDACION FORMULARIO CONTACTENOS            =
=========================================================*/

function validarContactenos(){

 var nombre = $("#nombreContactenos").val();
  var email = $("#emailContactenos").val();
  var mensaje = $("#mensajeContactenos").val();

  /*=============================================
  VALIDACIÓN DEL NOMBRE
  =============================================*/ 

  if(nombre == ""){

    $("#nombreContactenos").before('<h6 class="alert alert-danger">Escriba por favor el nombre</h6>');

    return false;
    
  }else{

    var expresion = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*$/; 

    if(!expresion.test(nombre)){

      $("#nombreContactenos").before('<h6 class="alert alert-danger">Escriba por favor sólo letras sin caracteres especiales</h6>');

      return false;

    }

  }

  /*=============================================
  VALIDACIÓN DEL EMAIL
  =============================================*/ 

  if(email== ""){

    $("#emailContactenos").before('<h6 class="alert alert-danger">Escriba por favor el email</h6>');
    
    return false;

  }else{

    var expresion = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

    if(!expresion.test(email)){
      
      $("#emailContactenos").before('<h6 class="alert alert-danger">Escriba por favor correctamente el correo electrónico</h6>');
      
      return false;
    } 

  }

  /*=============================================
  VALIDACIÓN DEL MENSAJE
  =============================================*/ 

  if(mensaje == ""){

    $("#mensajeContactenos").before('<h6 class="alert alert-danger">Escriba por favor un mensaje</h6>');
    
    return false;

  }else{

    var expresion = /^[,\\.\\a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ ]*$/;

    if(!expresion.test(mensaje)){
      
      $("#mensajeContactenos").before('<h6 class="alert alert-danger">Escriba el mensaje sin caracteres especiales</h6>');
      
      return false;
    } 

  }

  return true;


}

/*=====  End of VALIDACION FORMULARIO CONTACTENOS  ======*/

