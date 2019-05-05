/*==========================================
=            VISUALIZAR LOS PRODUCTOS EN LA PÁGINA DE CARRITO DE COMPRAS            =
==========================================*/
if(localStorage.getItem("cantidadCesta") != null){

$(".cantidadCesta").html(localStorage.getItem("cantidadCesta"));
 $(".sumaCesta").html(localStorage.getItem("sumaCesta"));


}else{

$(".cantidadCesta").html("0");
$(".sumaCesta").html("0");
}


if(localStorage.getItem("listaProductos") == null){
var listaCarrito = [];
$(".cuerpoCarrito").html('<div class="well">Aún no hay productos en el carrito</div>');
$(".sumaCarrito").hide();
$(".cabeceraCheckout").hide();

}else{
 

 listaCarrito = JSON.parse(localStorage.getItem("listaProductos"));

 listaCarrito.forEach(functionForEach);

 function functionForEach(item, index){


  $(".cuerpoCarrito").append('<div class="row itemCarrito">' + '<div class="col-sm-1 col-xs-12">' + '<br>' + '<center>' + '<button class="btn btn-default backColor quitarItemCarrito" idProducto="' + item.idProducto + '"  tipo="' + item.tipo + '" peso="' + item.peso + '" ">' + '<i class="fa fa-times"></i>' + '</button>' + '</center>' + '</div>' + '<div class="col-sm-1 col-xs-12">' + '<figure>' + '<img src="' + item.imagen + '" class="img-thumbnail">' + '</figure>' + '</div>' + '<div class="col-sm-4 col-xs-12">' + '<br>' + '<p class="tituloCarritoCompra text-left">' + item.titulo + '</p> <span class="label label-success fontSize enStock">En Stock</span>' + '</div>' + '<div class="col-md-2 col-sm-1 col-xs-12">' + '<br>' + '<p class="text-center precioCarritoCompra">ARS $ <span>' + item.precio + '</span></p>' + '</div>' + '<div class="col-md-2 col-sm-3 col-xs-8">' + '<br>' + '<div class="col-xs-8">' + '<center>' + '<input type="number" class="form-control cantidadItem" min="1" value="' + item.cantidad + '" tipo="' + item.tipo + '" precio="' + item.precio + '" idProducto="' + item.idProducto + '"  >' + '</center>' + '</div>' + '</div>' + '<div class="col-md-2 col-sm-1 col-xs-4">' + '<br>' + '<p class="subTotal' + item.idProducto + ' subtotales">' + '<strong>ARS $ <span>' + item.precio + '</span></strong>' + '</p>' + '</div>' + '</div>' + '<div class="clearfix"></div>' + '<hr>');
        /*========================================================================
        =            EVITAR MANIPULAR CANTIDAD DE PRODUCTOS VIRTUALES            =
        ========================================================================*/
        $(".cantidadItem[tipo='virtual']").attr("readonly", "true");
        /*=====  End of EVITAR MANIPULAR CANTIDAD DE PRODUCTOS VIRTUALES  ======*/

       /*=======================================
    =            VERIFICAR STOCK            =
    =======================================*/
    var datos = new FormData();
    datos.append("id", item.idProducto);
    datos.append("cantidad" , item.cantidad);
    datos.append("verificarStock", true);
    $.ajax({
        
        url:rutaOculta+"ajax/producto.ajax.php",
        method: "POST",
        data: datos,
        cache: false,
        contentType: false,
        processData: false,
        success:function(respuesta){
          
            var respuesta = JSON.parse(respuesta).respuesta;
            if(respuesta == "ok"){

               
                $(".enStock").removeClass( "label-danger" ).addClass( "label-success" );
                $(".enStock").html("En stock");

            }else if(respuesta == "no"){
              
                $(".enStock").removeClass( "label-success" ).addClass( "label-danger" );
                $(".enStock").html("Sin stock");
                estadoTotalStock = false;
                 $(".btnP").hide();
                

            }

        }

    })
    
    /*=====  End of VERIFICAR STOCK  ======*/
       

 }

}


/*==========================================
=            AGREGAR AL CARRITO            =
==========================================*/

$(".agregarCarrito").click(function() {
	console.log('me ejecuto');
	var idProducto = $(this).attr("idProducto");
	var imagen = $(this).attr("imagen");
	var titulo = $(this).attr("titulo");
	var precio = $(this).attr("precio");
	var tipo = $(this).attr("tipo");
	var peso = $(this).attr("peso");
	var agregarAlCarrito = true;	

	/*=============================================
	ALMACENAR EN EL LOCALSTARGE LOS PRODUCTOS AGREGADOS AL CARRITO
	=============================================*/

	if(agregarAlCarrito) {

		/*=============================================
		RECUPERAR ALMACENAMIENTO DEL LOCALSTORAGE
		=============================================*/

		if(localStorage.getItem("listaProductos") == null){

			listaCarrito = [];

		}else{

			listaCarrito.concat(localStorage.getItem("listaProductos"));

		}

		listaCarrito.push({"idProducto":idProducto,
						   "imagen":imagen,
						   "titulo":titulo,
						   "precio":precio,
					       "tipo":tipo,
				           "peso":peso,
				           "cantidad":"1"});

		localStorage.setItem("listaProductos", JSON.stringify(listaCarrito));
        
		/*=============================================
		ACTUALIZAR LA CESTA
		=============================================*/

		var cantidadCesta = Number($(".cantidadCesta").html()) + 1;
		var sumaCesta = Number($(".sumaCesta").html()) + Number(precio);

		$(".cantidadCesta").html(cantidadCesta);
		$(".sumaCesta").html(sumaCesta);

		localStorage.setItem("cantidadCesta", cantidadCesta);
		localStorage.setItem("sumaCesta", sumaCesta);
		
		/*=============================================
		MOSTRAR ALERTA DE QUE EL PRODUCTO YA FUE AGREGADO
		=============================================*/

		swal({
			  title: "",
			  text: "¡Se ha agregado un nuevo producto al carrito de compras!",
			  type: "success",
			  showCancelButton: true,
			  confirmButtonColor: "#DD6B55",
			  cancelButtonText: "¡Continuar comprando!",
			  confirmButtonText: "¡Ir a mi carrito de compras!",
			  closeOnConfirm: false
			},
			function(isConfirm){
				if (isConfirm) {	   
					 window.location = rutaOculta+"carrito-de-compras";
				} 
		});

	}

});

/*=====  End of AGREGAR AL CARRITO  ======*/


/*=====================================================
=            QUITRAR PRODUCTOS DEL CARRITO            =
=====================================================*/

$(".quitarItemCarrito").click(function(){

$(this).parent().parent().parent().remove();

var idProducto = $(".cuerpoCarrito button");
var imagen = $(".cuerpoCarrito img");
var titulo = $(".cuerpoCarrito .tituloCarritoCompra");
var precio = $(".cuerpoCarrito .precioCarritoCompra span");
var cantidad = $(".cuerpoCarrito .cantidadItem");

/*==================================================================================
=            Si aun quedan productos volver a agregarlo a local storage            =
==================================================================================*/

listaCarrito = [];

if(idProducto.length != 0){

	for (var i = 0; i < idProducto.length; i++) {

	var idProductoArray = $(idProducto[i]).attr("idProducto");
    var imagenArray = $(imagen[i]).attr("src");
    var tituloArray = $(titulo[i]).html();
    var tipoArray = $(cantidad[i]).attr("tipo");
    var pesoArray = $(idProducto[i]).attr("peso");
    var precioArray = $(precio[i]).html();
    var cantidadArray = $(cantidad[i]).val();

	listaCarrito.push({"idProducto":idProductoArray,
						   "imagen":imagenArray,
						   "titulo":tituloArray,
						   "precio":precioArray,
					       "tipo":tipoArray,
				           "peso":pesoArray,
				           "cantidad":cantidadArray});

		
	}

	localStorage.setItem("listaProductos", JSON.stringify(listaCarrito));

	sumaSubTotales();
	cestaCarrito(listaCarrito.length);

}else{


	localStorage.removeItem("listaProductos");

	localStorage.setItem("cantidadCesta" , "0");

	localStorage.setItem("sumaCesta" , "0");
   
    $(".cantidadCesta").html("0");
    $(".sumaCesta").html("0");


	$(".cuerpoCarrito").html('<div class="well">Aún no hay productos en el carrito</div>');
    $(".sumaCarrito").hide();
    $(".cabeceraCheckout").hide();

}

/*=====  End of Si aun quedan productos volver a agregarlo a local storage  ======*/



})


/*=====  End of QUITRAR PRODUCTOS DEL CARRITO  ======*/


/*====================================================================
=            GENERAR SUBTOTAL DESPUES DE CAMBIAR CANTIDAD            =
====================================================================*/

$(".cantidadItem").change(function(){

var cantidad = $(this).val();
var cantidadFinal = $(this).val();
var precio = $(this).attr("precio");
var idProducto = $(this).attr("idProducto");


$(".subTotal"+idProducto).html('<strong>ARS $ <span>'+(cantidad*precio)+'</span></strong>');

/*=========================================================
=            ACTUALIZAR CANTIDAD LOCAL STORAGE            =
=========================================================*/

var idProducto = $(".cuerpoCarrito button");
var imagen = $(".cuerpoCarrito img");
var titulo = $(".cuerpoCarrito .tituloCarritoCompra");
var precio = $(".cuerpoCarrito .precioCarritoCompra span");
var cantidad = $(".cuerpoCarrito .cantidadItem");

/*=====  End of ACTUALIZAR CANTIDAD LOCAL STORAGE  ======*/

    listaCarrito = [];

	for (var i = 0; i < idProducto.length; i++) {

	var idProductoArray = $(idProducto[i]).attr("idProducto");
    var imagenArray = $(imagen[i]).attr("src");
    var tituloArray = $(titulo[i]).html();
    var tipoArray = $(cantidad[i]).attr("tipo");
    var pesoArray = $(idProducto[i]).attr("peso");
    var precioArray = $(precio[i]).html();
    var cantidadArray = $(cantidad[i]).val();

	listaCarrito.push({"idProducto":idProductoArray,
						   "imagen":imagenArray,
						   "titulo":tituloArray,
						   "precio":precioArray,
					       "tipo":tipoArray,
				           "peso":pesoArray,
				           "cantidad":cantidadArray});

		
	}

localStorage.setItem("listaProductos", JSON.stringify(listaCarrito));

sumaSubTotales();
cestaCarrito(listaCarrito.length);

/*=======================================
    =            VERIFICAR STOCK            =
    =======================================*/
    var datos = new FormData();
    datos.append("id", $(this).attr("idProducto"));
    datos.append("cantidad" , cantidadFinal);
    datos.append("verificarStock", true);
    $.ajax({
        
        url:rutaOculta+"ajax/producto.ajax.php",
        method: "POST",
        data: datos,
        cache: false,
        contentType: false,
        processData: false,
        success:function(respuesta){
          
          var respuesta = JSON.parse(respuesta).respuesta;
            if(respuesta == "ok"){

                console.log("hay stock");
                $(".enStock").removeClass( "label-danger" ).addClass( "label-success" );
                $(".enStock").html("En stock");
                $(".btnP").show();

            }else if(respuesta == "no"){

                console.log("no hay stock");
                $(".enStock").removeClass( "label-success" ).addClass( "label-danger" );
                $(".enStock").html("Sin stock");
                $(".btnP").hide();

            }

        }

    })
    
    /*=====  End of VERIFICAR STOCK  ======*/

})

/*=====  End of GENERAR SUBTOTAL DESPUES DE CAMBIAR CANTIDAD  ======*/


/*===========================================
=            ACTUALIZAR SUBTOTAL            =
===========================================*/

var precioCarritoCompra = $(".cuerpoCarrito .precioCarritoCompra span");
var cantidadItem = $(".cuerpoCarrito .cantidadItem");

for (var i = 0; i < precioCarritoCompra.length; i++) {

var precioCarritoCompraArray = 	$(precioCarritoCompra[i]).html();
var cantidadItemArray = $(cantidadItem[i]).val();
var idProductoArray = $(cantidadItem[i]).attr("idProducto");

$(".subTotal"+idProductoArray).html('<strong>ARS $ <span>'+(precioCarritoCompraArray*cantidadItemArray)+'</span></strong>');

sumaSubTotales();
cestaCarrito(precioCarritoCompra.length);

}

/*=====  End of ACTUALIZAR SUBTOTAL  ======*/


/*=======================================
=            SUMA SUBTOTALES            =
=======================================*/

function sumaSubTotales(){

var subtotales = $(".subtotales span");
var arraySumaSubTotales = [];


for (var i = 0; i < subtotales.length; i++) {
	
	var subtotalesArray = $(subtotales[i]).html();
    arraySumaSubTotales.push(Number(subtotalesArray));
}

function sumaArraySubtotales(total , numero){

return total + numero;

}

var sumaTotal = arraySumaSubTotales.reduce(sumaArraySubtotales);
$(".sumaSubTotal").html('<strong>ARS $ <span>'+sumaTotal+' </span></strong>');
 $(".sumaCesta").html(sumaTotal);

 localStorage.setItem("sumaCesta" , sumaTotal);
}

/*=====  End of SUMA SUBTOTALES  ======*/


/*============================================================
=            ACTUALIZAR CESTA AL CAMBIAR CANTIDAD            =
============================================================*/

function cestaCarrito(cantidadProductos){

if(cantidadProductos != 0){

var cantidadItem = $(".cuerpoCarrito .cantidadItem");
var arraySumaCantidades = [];

for (var i = 0; i < cantidadItem.length; i++) {
	
	var cantidadItemArray = $(cantidadItem[i]).val();
    arraySumaCantidades.push(Number(cantidadItemArray));
}

function sumaArrayCantidades(total , numero){

return total + numero;

}

var sumaTotalCantidades = arraySumaCantidades.reduce(sumaArrayCantidades);

$(".cantidadCesta").html(sumaTotalCantidades);
localStorage.setItem("cantidadCesta" , sumaTotalCantidades);

}



}


/*=====  End of ACTUALIZAR CESTA AL CAMBIAR CANTIDAD  ======*/


/*================================
=            CHECKOUT            =
================================*/

$("#btnCheckout").click(function(){
$(".listaProductos table.tablaProductos tbody").html("");

$("#checkPaypal").prop("checked" , false);
$("#checkPayu").prop("checked" , true);

 var idUsuario = $(this).attr("idUsuario");
 var peso = $(".cuerpoCarrito button , .comprarAhora button");
 var titulo = $(".cuerpoCarrito .tituloCarritoCompra , .comprarAhora .tituloCarritoCompra");
 var cantidad = $(".cuerpoCarrito .cantidadItem , .comprarAhora .cantidadItem");
 var subtotal = $(".cuerpoCarrito .subtotales span , .comprarAhora .subtotales span");
 var cantidadPeso = [];
 var tipoArray = [];

/*=====================================
=            SUMA SUBTOTAL            =
=====================================*/

 var sumaSubTotal = $(".sumaSubTotal span").html();
 $(".valorSubTotal").html(sumaSubTotal);
 $(".valorSubTotal").attr("valor", sumaSubTotal);

/*=====  End of SUMA SUBTOTAL  ======*/


 /*=========================================
 =            TASAS DE IMPUESTO            =
 =========================================*/
 
 var impuestoTotal = ($(".valorSubTotal").html() * $("#impuesto").val()) / 100;
 $(".valorTotalImpuesto").html(impuestoTotal.toFixed(2));
  $(".valorTotalImpuesto").attr("valor", impuestoTotal.toFixed(2));

 
 /*=====  End of TASAS DE IMPUESTO  ======*/
 

/*=====================================
=            funcion total            =
=====================================*/

sumaTotalDefinitiva();

/*=====  End of funcion total  ======*/



for (var i = 0; i < peso.length; i++) {

    var pesoArray = $(peso[i]).attr("peso");
    var tituloArray = $(titulo[i]).html();
    var cantidadArray = $(cantidad[i]).val();
    var subtotalArray = $(subtotal[i]).html();
    

     /*=============================================================================
     =            EVALUAR EL PESO DE ACUERDO A LA CANTIDAD DE PRODUCTOS            =
     =============================================================================*/
     
     cantidadPeso[i] = pesoArray * cantidadArray;
     
     function sumaArrayPeso(total , numero){

       return total + numero;

       }

       var sumaTotalPeso = cantidadPeso.reduce(sumaArrayPeso);
       
          
     /*=====  End of EVALUAR EL PESO DE ACUERDO A LA CANTIDAD DE PRODUCTOS  ======*/
     

    /*===================================================
    =            mostrar productos a comprar            =
    ===================================================*/
    
    $(".listaProductos table.tablaProductos tbody").append('<tr>'+
                                                            '<td class="valorTitulo">'+tituloArray+'</td>'+
                                                            '<td class="valorCantidad">'+cantidadArray+'</td>'+
                                                            '<td>$<span class="valorItem" valor="'+subtotalArray+'">'+subtotalArray+'</span></td>'+
                                                            '</tr>'
    	);
    
    /*=====  End of mostrar productos a comprar  ======*/

    /*==========================================================================
    =            SELECCIONAR PAIS DE ENVIO SI HAY PRODUCTOS FÍSICOS            =
    ==========================================================================*/
    
    
    tipoArray.push($(cantidad[i]).attr("tipo"));
  

    function checkTipo(tipo){
    	return tipo == "fisico";
    }

   

   

    /*=====  End of SELECCIONAR PAIS DE ENVIO SI HAY PRODUCTOS FÍSICOS  ======*/
    
    
}

if(tipoArray.find(checkTipo) == "fisico") {

  	/*$(".seleccionePais").html('<select class="form-control" id="seleccionarPais" required>'+
		'<option value="">Seleccione país</option>'+
		'</select>');

   $(".formEnvio").show();

   $(".btnPagar").attr("tipo" , "fisico");

        $.ajax({
       	url:rutaOculta+"vistas/js/plugins/countries.json",
       	type:"GET",
       	cache:false,
       	contentType:false,
       	processData:false,
       	dataType:"json",
       	success: function(respuesta){
       		
       		respuesta.forEach(seleccionarPais);

       		function seleccionarPais(item, index){

       			var pais = item.name;
       			var codPais = item.code;

       			$("#seleccionarPais").append('<option value="'+codPais+'">'+pais+'</option>');
       		}
       	}

    })*/


  /*==============================================
  =            EVALUAR TASAS DE ENVIO            =
  ==============================================*/

  $("#seleccionarPais").change(function(){

$(".alert").remove();	

$("#cambiarDivisa").val("ARS");

$(".cambioDivisa").html("ARS");

 $(".valorSubTotal").html((1 * Number($(".valorSubTotal").attr("valor"))).toFixed(2));
		$(".valorTotalEnvio").html((1 * Number($(".valorTotalEnvio").attr("valor"))).toFixed(2));
		$(".valorTotalImpuesto").html((1 * Number($(".valorTotalImpuesto").attr("valor"))).toFixed(2));
		$(".valorTotalCompra").html((1 * Number($(".valorTotalCompra").attr("valor"))).toFixed(2));


		var valorItem = $(".valorItem");

		for (var i = 0; i < valorItem.length; i++) {
		 $(valorItem[i]).html((1 * Number($(valorItem[i]).attr("valor"))).toFixed(2));
		}


  var pais = $(this).val();
  var tasaPais = $("#tasaPais").val();
  $(".alert").remove();

  if(pais == tasaPais){
   
  var resultadoPeso =  sumaTotalPeso * $("#envioNacional").val();
  if(resultadoPeso < $("#tasaMinimaNal").val())
  {
  	$(".valorTotalEnvio").html($("#tasaMinimaNal").val());
  	$(".valorTotalEnvio").attr("valor", $("#tasaMinimaNal").val());
  }else{
  	$(".valorTotalEnvio").html(resultadoPeso);
  	$(".valorTotalEnvio").attr("valor", resultadoPeso);
  }

  }else {

  var resultadoPeso =  sumaTotalPeso * $("#envioInternacional").val();


  if(resultadoPeso < $("#tasaMinimaInt").val())
  {
  	$(".valorTotalEnvio").html($("#tasaMinimaInt").val());
  	$(".valorTotalEnvio").attr("valor",$("#tasaMinimaInt").val());
  }else{
  	$(".valorTotalEnvio").html(resultadoPeso);
  	$(".valorTotalEnvio").attr("valor",resultadoPeso);
  }
 

  }

  sumaTotalDefinitiva();
  //pagarConPayu();

  })
  
  
  /*=====  End of EVALUAR TASAS DE ENVIO  ======*/
  



  }else
  {
   	 
   	 $(".formEnvio").hide();
   	 $(".btnPagar").attr("tipo" , "virtual");

   }




})

/*=====  End of CHECKOUT  ======*/


/*======================================
=            CALCULAR TOTAL            =
======================================*/

function sumaTotalDefinitiva(){

var sumaTotalTasas = Number($(".valorSubTotal").html())+Number($(".valorTotalEnvio").html())+Number($(".valorTotalImpuesto").html());

$(".valorTotalCompra").html(sumaTotalTasas.toFixed(2));
$(".valorTotalCompra").attr("valor", sumaTotalTasas.toFixed(2));

}

/*=====  End of CALCULAR TOTAL  ======*/



/*============================================================
=            MÈTODO DE PAGO PARA CAMBIO DE DIVISA            =
============================================================*/



var metodoPago = "payu";
divisas(metodoPago);


$("input[name='pago']").change(function(){
    var productosToString = idProductoArray.toString();
    var productos = productosToString.replace(/,/g, "-");
 metodoPago = $(this).val();

divisas(metodoPago);

if(metodoPago == "payu"){

	$(".btnPagar").hide();
	$(".formPayu").show();
	$("#checkPaypal").prop("checked" , false);
	$("#checkPayu").prop("checked" , true);

	pagarConPayu();
}else{


	$(".btnPagar").show();
	$(".formPayu").hide();
	$("#checkPaypal").prop("checked" , true);
	$("#checkPayu").prop("checked" , false);
}

})


function divisas(metodoPago){
    $("#cambiarDivisa").html("");
	if(metodoPago == "paypal"){

		$("#cambiarDivisa").append('<option value="USD">USD</option>'+
			                       '<option value="EUR">EUR</option>'+
			                       '<option value="GBP">GBP</option>'+
			                       '<option value="MXN">MXN</option>'+
			                       '<option value="JPY">JPY</option>'+
			                       '<option value="CAD">CAD</option>'+
			                       '<option value="BRL">BRL</option>');
	}else{

		$("#cambiarDivisa").append('<option value="ARS">ARS</option>'+
			                       '<option value="PEN">PEN</option>'+
			                       '<option value="COP">COP</option>'+
			                       '<option value="MXN">MXN</option>'+
			                       '<option value="CLP">CLP</option>'+
			                       '<option value="USD">USD</option>'+
			                       '<option value="BRL">BRL</option>');

	}
}

/*=====  End of MÈTODO DE PAGO PARA CAMBIO DE DIVISA  ======*/


/*========================================
=            CAMBIO DE DIVISA            =
========================================*/

$("#cambiarDivisa").change(function(){


/*if($("#seleccionarPais").val() == ""){

	$("#cambiarDivisa").after('<div class="alert alert-warning">No ah seleccionado el país de envío</div>');
	return;
}*/


var divisaBase = "ARS";

var divisa = $(this).val();

$.ajax({
	url:"https://free.currencyconverterapi.com/api/v5/convert?q="+divisaBase+"_"+divisa+"&compact=y",
	type:"GET",
	cache:false,
	contentType:false,
	processData:false,
	dataType:"jsonp",
	success: function(respuesta){

		var divisaString = JSON.stringify(respuesta);
		var conversion = divisaString.substr(18,4);

        if(divisa == "ARS"){

        	conversion = 1;
        }

		$(".cambioDivisa").html(divisa);

		$(".valorSubTotal").html((Number(conversion) * Number($(".valorSubTotal").attr("valor"))).toFixed(2));
		$(".valorTotalEnvio").html((Number(conversion) * Number($(".valorTotalEnvio").attr("valor"))).toFixed(2));
		$(".valorTotalImpuesto").html((Number(conversion) * Number($(".valorTotalImpuesto").attr("valor"))).toFixed(2));
		$(".valorTotalCompra").html((Number(conversion) * Number($(".valorTotalCompra").attr("valor"))).toFixed(2));


		var valorItem = $(".valorItem");

		for (var i = 0; i < valorItem.length; i++) {
		 $(valorItem[i]).html((Number(conversion) * Number($(valorItem[i]).attr("valor"))).toFixed(2));
		}
   
   //pagarConPayu();

	}
})

})

/*=====  End of CAMBIO DE DIVISA  ======*/



/*=============================
=          BOTÓN  PAGAR            =
=============================*/

$(".btnPagar").click(function() {
    console.log('hola');
    if($("#metodoPagoInput").val() === "sinMetodo"){
        
       alert("lo sentimos no hay metodos de pago disponibles");

    	return;
    }

    var tipo = $(this).attr("tipo");

    if(tipo === "fisico") {
    	$(".btnPagar").after('<div class="alert alert-warning">No ah seleccionado el país de envío</div>');
    	return;
    }


    var divisa = $("#cambiarDivisa").val();
    console.log('divisa: ', divisa);
    var total = $(".valorTotalCompra").html();
    console.log('total: ', total);
    var impuesto = $(".valorTotalImpuesto").html();
    console.log('impuesto', impuesto);
    var envio = $(".valorTotalEnvio").html();
    console.log('envio', envio);
    var subtotal = Number($(".valorSubTotal").html());
    console.log('subtotal:', subtotal);
    var titulo = $(".valorTitulo");
    console.log('titulo:', titulo);
    var cantidad = $(".valorCantidad");
    console.log('cantidad:', cantidad);
    var valorItem = $(".valorItem");
    console.log('valorItem:', valorItem);
    var idProducto = $(".cuerpoCarrito button , .comprarAhora button");
    console.log('idProducto:', idProducto);

    var tituloArray = [];
    var cantidadArray = [];
    var valorItemArray = [];
    var idProductoArray = [];

    for (var i = 0; i < titulo.length; i++) {

    	 tituloArray[i] = $(titulo[i]).html();

         cantidadArray[i] = $(cantidad[i]).html();

         valorItemArray[i] = $(valorItem[i]).html();

         idProductoArray[i] = $(idProducto[i]).attr("idProducto");

    	
    }



    var datos = new FormData();
    datos.append('metodoPago', 'payu');
    datos.append("divisa" , divisa);
    datos.append("total",total);
    datos.append("impuesto", impuesto);
    datos.append("envio",envio);
    datos.append("subtotal", subtotal);
    datos.append("tituloArray", tituloArray);
    datos.append("cantidadArray",cantidadArray);
    datos.append("valorItemArray", valorItemArray);
    datos.append("idProductoArray", idProductoArray);

    $.ajax({

    	url:rutaOculta+"ajax/carrito.ajax.php",
    	method:"POST",
    	data:datos,
    	cache:false,
    	contentType:false,
    	processData:false,
    	success:function(respuesta){
            pagarConPayu();
    	}

    });

});

/*=====  End of PAGAR  ======*/

/*======================================
=            PAGAR CON PAYU            =
======================================*/

function pagarConPayu() {

	/*if($("#seleccionarPais").val() === ""){
		console.log('elige payulatam');
		$('.alert-warning').remove();
		$(".formPayu").after('<div class="alert alert-warning">No ha seleccionado el país de envío</div>');
		
		$(".formPayu input[name='Submit']").attr("type","button");

		return;

	} else {
		$(".formPayu input[name='Submit']").removeAttr('type');
	}
*/
	var divisa = $("#cambiarDivisa").val();
	console.log('la divisa con la q payu va a trabajar es: ', divisa);
	var total = $(".valorTotalCompra").html();
	var impuesto = $(".valorTotalImpuesto").html();
	var envio = $(".valorTotalEnvio").html();
	var subtotal = $(".valorSubtotal").html();
	var titulo = $(".valorTitulo");
	var cantidad = $(".valorCantidad");
	var valorItem = $(".valorItem");
	var idProducto = $('.cuerpoCarrito button, .comprarAhora button');
	var idUsuario = $("#idUsuario2").val();

	console.log('sigo perfecto');
	var tituloArray = [];
	var cantidadArray = [];
	var idProductoArray = [];

	for(var i = 0; i < titulo.length; i++){

		tituloArray[i] = $(titulo[i]).html();
		cantidadArray[i] = $(cantidad[i]).html();
		idProductoArray[i] = $(idProducto[i]).attr("idProducto");

	}

    var datos = new FormData();
    datos.append('metodoPago', 'payu');

	$.ajax({
      url:rutaOculta+"ajax/carrito.ajax.php",
      method:"POST",
      data: datos,
      cache: false,
      contentType: false,
      processData: false,
      success:function(respuesta){
          
          var merchantId = JSON.parse(respuesta).merchantIdPayu;
          var accountId = JSON.parse(respuesta).accountIdPayu;
          var apiKey = JSON.parse(respuesta).apiKeyPayu;
          var modo = JSON.parse(respuesta).modoPayu;
          var descriptionToString = tituloArray.toString();
          var description = descriptionToString.replace(/ /g, "+");
          var referenceCode = (Number(Math.ceil(Math.random()*1000000))+Number(total).toFixed());
          var productosToString = idProductoArray.toString();
          var productos = productosToString.replace(/,/g, "-");
          var cantidadToString = cantidadArray.toString();
          var cantidad = cantidadToString.replace(/,/g, "-");
          var signature = hex_md5(apiKey+"~"+merchantId+"~"+referenceCode+"~"+total+"~"+divisa);
       

          if(divisa == "COP"){

          	var taxReturnBase = (total - impuesto).toFixed(2)

          }else{

          	var taxReturnBase = 0;

          }        

          if(modo == "sandbox"){
          	console.log('if si es sandox', modo);
            var url = "https://sandbox.gateway.payulatam.com/ppp-web-gateway/";
            var test = 1;

      	  }else{

      	  	var url = "https://gateway.payulatam.com/ppp-web-gateway/";
      	  	var test = 0;

      	  }

      	 var tipoEnvio = "YES";

      	  console.log('merchantId' , merchantId);
      	  console.log('accountId', accountId);
      	  console.log('descriptionToString', descriptionToString);
      	  console.log('referenceCode', referenceCode);
      	  console.log('total', total);
      	  console.log('impuesto', impuesto);
      	  console.log('taxReturnBase', taxReturnBase);
      	  console.log('envio',envio);
      	  console.log('divisa', divisa);
      	  console.log('confirmation url', rutaOculta+"index.php?ruta=finalizar-compra-payu&payu=true&idUsuario="+idUsuario+"&productos="+productos+"&cantidad="+cantidad+"&pago="+total+"&description="+description);
      	  console.log('responseUrl',rutaOculta+"index.php?ruta=perfil" );
      	  console.log('declinedResponseUrl', rutaOculta+"index.php?ruta=carrito-de-compras");
      	  console.log('displayShippingInformation', tipoEnvio);
      	  console.log('test', test);
      	  console.log('signature', signature);

           $(".formPayu").attr("method","POST");
           $(".formPayu").attr("action",url);
		   $(".formPayu input[name='merchantId']").attr("value", merchantId);
		   $(".formPayu input[name='accountId']").attr("value", accountId);
		   $(".formPayu input[name='description']").attr("value", descriptionToString);
		   $(".formPayu input[name='referenceCode']").attr("value", referenceCode);
		   $(".formPayu input[name='amount']").attr("value", total);
		   $(".formPayu input[name='tax']").attr("value", impuesto);
		   $(".formPayu input[name='taxReturnBase']").attr("value", taxReturnBase);
		   $(".formPayu input[name='shipmentValue']").attr("value", envio);
		   $(".formPayu input[name='currency']").attr("value", divisa);
		   $(".formPayu input[name='confirmationUrl']").attr("value", rutaOculta+"index.php?ruta=finalizar-compra-payu&payu=true&idUsuario="+idUsuario+"&productos="+productos+"&cantidad="+cantidad+"&pago="+total+"&description="+description);
		   $(".formPayu input[name='responseUrl']").attr("value", rutaOculta+"index.php?ruta=perfil");
		   $(".formPayu input[name='declinedResponseUrl']").attr("value", rutaOculta+"index.php?ruta=carrito-de-compras");
		   $(".formPayu input[name='displayShippingInformation']").attr("value", tipoEnvio);
		   $(".formPayu input[name='test']").attr("value", test);
		   $(".formPayu input[name='signature']").attr("value", signature);

		   /*=============================================
			GENERADOR DE TARJETAS DE CRÉDITO
			http://www.elfqrin.com/discard_credit_card_generator.php
			=============================================*/
         $('.formPayu').submit();   
      }

  })
	
}

/*=====  End of PAGAR CON PAYU  ======*/


/*================================================
=            AGREGAR PRODUCTOS GRATIS            =
================================================*/

$(".agregarGratis").click(function(){


	var idProducto = $(this).attr("idProducto");
	var idUsuario = $(this).attr("idUsuario");
	var tipo = $(this).attr("tipo");
	var titulo = $(this).attr("titulo");
	var agregarGratis = false;

/*====================================================================
=            VERIFICAR QUE NO TENGA EL PRODUCTO ADQUIRIDO            =
====================================================================*/

	var datos = new FormData();

	datos.append("idProducto", idProducto);
	datos.append("idUsuario", idUsuario);
	datos.append("tipo", tipo);
	$.ajax({

	    url:rutaOculta+"ajax/carrito.ajax.php",
		method:"POST",
		data:datos,
		cache:false,
		contentType:false,
		processData:false,

	    success:function(respuesta) {


			console.log("respuesta",respuesta);
			if(respuesta != false) {

	     		swal({
					title: "Usted ya adquirió este producto",
					text: "",
					type: "warning",
					showCancelButton: false,
					confirmButtonColor: "#DD6B55",
					confirmButtonText: "Regresar",
					closeOnConfirm: false
				});

		   		if(agregarGratis) {
		   			window.location = rutaOculta+"index.php?ruta=finalizar-compra&gratis=true&producto="+idProducto+"&titulo="+titulo;
		    	}
        	}
     	}
    });
});

/*=====  End of AGREGAR PRODUCTOS GRATIS  ======*/
