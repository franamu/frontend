/*======================================
=            BOTON FACEBOOK            =
======================================*/

$(".facebook").click(function(){

	FB.login(function(response){
		validarUsuario();

	}, {scope: 'public_profile , email'})

})


/*=====  End of BOTON FACEBOOK  ======*/

/*=======================================
=            VALIDAR INGRESO            =
=======================================*/

function validarUsuario(){

	FB.getLoginStatus(function(response){

		statusChangeCallback(response);
	})
}

/*=====  End of VALIDAR INGRESO  ======*/

/*===============================================================
=            VALIDAR EL CAMBIO DE ESTADO EN FACEBOOK            =
===============================================================*/

function statusChangeCallback(response){

	if(response.status === 'connected'){
		testApi();
	}else{

		swal({
                    title: "¡ERROR!",
                    text: "¡Ha ocurrido un problema al registrarse con Facebook, vuelve a intentarlo!",
                    type:"error",
                    confirmButtonText: "Cerrar",
                    closeOnConfirm: false
                  },

                  function(isConfirm){

                    if(isConfirm){
                      window.location = localStorage.getItem("rutaActual");
                    }
                });
	}
}

/*=====  End of VALIDAR EL CAMBIO DE ESTADO EN FACEBOOK  ======*/


/*=======================================================
=            INGRESAMOS A LA API DE FACEBOOK            =
=======================================================*/

function testApi(){

 
 FB.api('/me?fields=id,name,email,picture' , function(response){

   if(response.email == null){
    
    swal({
                    title: "¡ERROR!",
                    text: "¡Para poder ingresar al sistema debe proporcionar la información del correo electrónico!",
                    type:"error",
                    confirmButtonText: "Cerrar",
                    closeOnConfirm: false
                  },

                  function(isConfirm){

                    if(isConfirm){
                      window.location = localStorage.getItem("rutaActual");
                    }
                });

   }else{

      var email = response.email;
      var nombre = response.name;
      //tambien se puede capturar poniendo response.picture; pero no lo hacemos así para capturar la foto grande type=large
      var foto = "http://graph.facebook.com/"+response.id+"/picture?type=large";
      var datos = new FormData();
      datos.append("email", email);
      datos.append("nombre", nombre);
      datos.append("foto", foto);
      

      $.ajax({
         
         url:rutaOculta+"ajax/usuarios.ajax.php",
         method: "POST",
         data: datos,
         cache: false,
         contentType:false,
         processData:false,
         success:function(respuesta){
         var resp = JSON.parse(respuesta);
         var se = resp.respuesta;
         if(se == "ok"){

         	window.location = localStorage.getItem("rutaActual");
         }else{

         	 swal({
                    title: "¡ERROR!",
                    text: "¡El correo electrónico "+ email +" ya está registrado con un método diferente a Facebook!",
                    type:"error",
                    confirmButtonText: "Cerrar",
                    closeOnConfirm: false
                  },

                  function(isConfirm){

                    if(isConfirm){
                      
                      //En el caso que el usuario intente iniciar sesion con facebook pero ya este registrado por otro metodo, tenemos que avisarle que no pudo iniciar sesion con facebook y que lo intente con otro metodo por ende la api de facebook hay que cerrarla porque sino queda coenctada.


	                      FB.getLoginStatus(function(response){

		                  if(response.status === "connected"){
		                  	FB.logout(function(response){
                                
                                deletedCookie("fblo_384518475315800");
                                setTimeout(function(){

                                	window.location=rutaOculta+"salir";

                                } , 100)

		                  	});

		                  	function deletedCookie(name){

		                  		document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';

		                  	}

		                  }//cierre status


	                      })

                    }
                });


         }

         }

      })


   }

 })


}

/*=====  End of INGRESAMOS A LA API DE FACEBOOK  ======*/

/*=========================================
=            SALIR DE FACEBOOK            =
=========================================*/

$(".salir").click(function(e){

  e.preventDefault();

   FB.getLoginStatus(function(response){

     if(response.status === 'connected'){     
     
      FB.logout(function(response){

        deleteCookie("fblo_384518475315800");



        setTimeout(function(){

          window.location=rutaOculta+"salir";

        },500)

      });

      function deleteCookie(name){
         document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';

      }

     }

   })

})

/*=====  End of SALIR DE FACEBOOK  ======*/
