<?php 
require_once "../controladores/usuarios.controlador.php";
require_once "../modelos/usuarios.modelo.php";

class AjaxUsuarios{


  /*===============================================
  =            VALIDAR EMAIL EXISTENTE            =
  ===============================================*/
  public $validarEmail;
  public function ajaxValidarEmail(){
  	$datos = $this->validarEmail;
  	$respuesta = ControladorUsuarios::ctrMostrarUsuario("email" , $datos);
    
    if($respuesta == false){

      echo json_encode($respuesta);
    }else{
    
    echo json_encode($respuesta);

    }
      
  }


/*=======================================
=            INGRESO FACEBOK            =
=======================================*/

public $email;
public $nombre;
public $foto;

public function ajaxRegistroFacebook(){

$datos = array("nombre" => $this->nombre, 
               "email" => $this->email,
               "foto" => $this->foto,
               "password" => "null",
               "modo" => "facebook",
               "verificacion" => 0,
               "emailEncriptado" => "null"
              );

     $respuesta = ControladorUsuarios::ctrRegistroRedesSociales($datos);

     echo $respuesta;

}

/*=====  End of INGRESO FACEBOK  ======*/


/*=================================================
=            AGREGAR A LISTA DE DESEOS            =
=================================================*/
public $idUsuario;
public $idProducto;

public function ajaxAgregarDeseo(){
 
$datos = array("idUsuario" => $this->idUsuario,
               "idProducto" => $this->idProducto
               );

$respuesta = ControladorUsuarios::ctrAgregarDeseo($datos);

echo $respuesta;

}

/*=====  End of AGREGAR A LISTA DE DESEOS  ======*/


/*==============================================
=            QUITAR LSITA DE DESEOS            =
==============================================*/

public $idDeseo;

public function ajaxQuitarDeseo(){
 
$datos = $this->idDeseo;
$respuesta = ControladorUsuarios::ctrQuitarDeseo($datos);

echo $respuesta;

}

/*=====  End of QUITAR LSITA DE DESEOS  ======*/



}


if(isset($_POST["validarEmail"])){
  $valEmail = new AjaxUsuarios();
  $valEmail -> validarEmail = $_POST["validarEmail"];
  $valEmail -> ajaxValidarEmail();
}


/*===================================================
=            OBJETO DE REGISTRO FACEBOOK            =
===================================================*/

if(isset($_POST["email"])){
  $regFacebook = new AjaxUsuarios();
  $regFacebook -> email = $_POST["email"];
   $regFacebook -> nombre = $_POST["nombre"];
    $regFacebook -> foto = $_POST["foto"];
  $regFacebook -> ajaxRegistroFacebook();
}

/*=====  End of OBJETO DE REGISTRO FACEBOOK  ======*/


/*=================================================
=            AGREGAR A LISTA DE DESEOS            =
=================================================*/


if(isset($_POST["idUsuario"])){

  $deseo = new AjaxUsuarios();
  $deseo -> idUsuario = $_POST["idUsuario"];
  $deseo -> idProducto = $_POST["idProducto"];
  $deseo -> ajaxAgregarDeseo();
  

}

/*=====  End of AGREGAR A LISTA DE DESEOS  ======*/

/*=====================================================
=            OBJETO QUITAR LISTA DE DESEOS            =
=====================================================*/


if(isset($_POST["idDeseo"])){

  $deseo = new AjaxUsuarios();
  $deseo -> idDeseo = $_POST["idDeseo"];
  $deseo -> ajaxQuitarDeseo();
  

}

/*=====  End of OBJETO QUITAR LISTA DE DESEOS  ======*/
