var my_url = "https://www.taykuku.de/npmod1000/vol1/ngabebugle.php";
var my_url_g = "https://www.taykuku.de/npmod1000/vol1/guarda_stock.php";
var g_tit = "En Stock Panamá";
var opt = "inventario";
var datatable_fat;
var bandera = 0;
//~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*
$(document).keydown(function(e) {

	if (e.keyCode === 8 ) {
		var element = e.target.nodeName.toLowerCase();
		if ((element != 'input' && element != 'textarea') || $(e.target).attr("readonly")) {
			return false;
		}
	}
});

//~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*	
$(document).ready(function(){
	
	ComServidor("https://taykuku.de/npmod1000/index.php","","text", function(text){
		alert(text);
	});	

	$('.btn-expand-collapse').click(function(e) {
		$('.navbar-primary').toggleClass('collapsed');
	});
		
	$('#co_quitar').click(function(e) {

		
		if($.trim($( "#lst_item option:selected" ).text())!='')
		{
			$( "#lst_item option:selected" ).remove();
			fn_mensaje_boostrap("Item Eliminado de la lista!", g_tit, $(""));
		}
		else
			fn_mensaje_boostrap("Debe seleccionar un material, de la lista de arriba!", g_tit, $(""));

	});
	
	$('#co_leer').click(function(e) {

		var options = $('#lst_item option');
		var selitem = "";
		var values = options.map(function() { return $(this).val()+"|"+$(this).text();}).get();
		options.map(function() {
			selitem = selitem + $(this).val()+"|"+$(this).text()+"¬";
			});

		if($.trim($('#tx_celular').val())=='') {fn_mensaje_boostrap("Escriba su celular, por favor!", g_tit, $("#tx_celular"));return false;}						
		if($.trim($('#tx_correo').val())=='') {fn_mensaje_boostrap("Escriba su correo, por favor!", g_tit, $("#tx_correo"));return false;}
		if($.trim($('#tx_nombre').val())=='') {fn_mensaje_boostrap("Escriba su nombre, por favor!", g_tit, $("#tx_nombre"));return false;}
		if($.trim($('#tx_obs').val())=='') {fn_mensaje_boostrap("Escriba una observación, por favor!", g_tit, $("#tx_obs"));return false;}
		if($.trim(values)=='') {fn_mensaje_boostrap("Seleccione al menos un material, por favor!", g_tit, $(""));return false;}
		
		/*var parameters = {
			"Bandera":"pedidoclie",
			"Telefono":$('#tx_celular').val(),
			"Correo":$('#tx_correo').val(),
			"Nombre":$('#tx_nombre').val(),
			"Producto":selitem.toString(),
			"Obs":$('#tx_obs').val()+";"+values
			};
		
		 ComServidor(my_url_g,parameters,"text", function(text){
			 fn_limpiar();
			 fn_mensaje_boostrap(text, g_tit, $(""));
		});*/
	
	});
	
	
	$('#co_guardar').click(function(e) {

		if($.trim($('#tx_espaniol').val())=='') {fn_mensaje_boostrap("Escriba Nombre del producto, por favor!", g_tit, $("#tx_espaniol"));return false;}						
		if($.trim($('#tx_ngabere').val())=='') {fn_mensaje_boostrap("Escriba su descripción, por favor!", g_tit, $("#tx_ngabere"));return false;}
		//if($.trim($('#tx_pro_cantidad').val())=='') {fn_mensaje_boostrap("Escriba la cantidad, por favor!", g_tit, $("#tx_pro_cantidad"));return false;}
		//if($.trim($('#tx_pro_precio').val())=='') {fn_mensaje_boostrap("Escriba una observación, por favor!", g_tit, $("#tx_pro_precio"));return false;}
		//if($.trim($('#tx_pro_suc').val())=='') {fn_mensaje_boostrap("Escriba las sucursales, por favor!", g_tit, $("#tx_pro_suc"));return false;}
		//if($.trim($('#tx_pro_provee').val())=='') {fn_mensaje_boostrap("Escriba los proveedores, por favor!", g_tit, $("#tx_pro_provee"));return false;}
		//if($.trim($('#tx_pro_obs').val())=='') {fn_mensaje_boostrap("Escriba una observación, por favor!", g_tit, $("#tx_pro_obs"));return false;}
		//	"Precio":$('#tx_pro_precio').val(),
		//	"Sucursal":$('#tx_pro_suc').val(),
		//	"Proveedor":$('#tx_pro_provee').val(),
		//	"Usuario":fn_get_param("userweb"),
		//	"Obs":$('#tx_pro_obs').val()	
		//	"Cantidad":$('#tx_pro_cantidad').val(),		
		var parameters = {
			"Bandera":opt,
			"Idem":$('#tx_id_producto').val(),
			"ngabere":$('#tx_ngabere').val(),
			"espaniol":$('#tx_espaniol').val()
			};
		
		 ComServidor(my_url_g,parameters,"text", function(text){
			 fn_limpiar2();
			 fn_mensaje_boostrap(text, g_tit, $(""));
		});
	
	});
	
	$('#co_cerrar1').click(function(e) {
		
		fn_limpiar();

	});
	
	$('#co_cerrar2').click(function(e) {
		
		fn_limpiar2();

	});
 	setTimeout(function(){
		fn_gridPanel();
	}, 0);	

});

//~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*	
function fn_gridPanel()
{

	 $("#dv_lista").slideDown();
	 $("#dv_form").slideUp();
	 $("#dv_form_pedido").slideUp();
	if(bandera == 1) datatable_fat.destroy();
	 
	$("#bookContainer").empty();

	var parameters = {"Usuario":fn_get_param("userweb")};
	
	 ComServidor(my_url,parameters,"json", function(text){
		 $("#bookTemplate").tmpl(text).appendTo("#bookContainer");
	});
	
	fn_ini_datatable();
	bandera = 1;
	$('.imgpopop').click(function(e) {
		$('#bts_img').attr('src', $(this).attr('rel'));
		$('#div_img_bts').modal('show');
	});	
}

//~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*	
function fn_ord_reg() {
	 $("#dv_lista").slideUp();
	 $("#dv_form").slideDown();
	 $("#dv_form_pedido").slideUp();
	 opt = "inventario";
}

//~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*	
function fn_ord_solclient() {
	//window.location = "http://stockpanama.unaux.com/cedi_adm/index.html?userweb="+fn_get_param("userweb");
	 $("#dv_lista").slideUp();
	 $("#dv_form").slideUp();
	 $("#dv_form_pedido").slideDown();
}

//~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*	
function formatPrice(precio) {
	return "$" + precio.toFixed(2);
}

//~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*	
function ComServidor(servidor,parametros,tipofile,CallBack)
{
    var respuestaJSON="";

    $.ajax({
        url: servidor,
        data: parametros,
        async: false,
        dataType: tipofile,
        type: "POST",  
        cache: false,
        error: function(jqErr, err_stat, err_str) // ERROR EN EL ASP
        {
			fn_mensaje_boostrap(jqErr.responseText, g_tit, $(""));
        },
		success: function(DevuelveDatos)
        {
            respuestaJSON=DevuelveDatos;
            return CallBack(respuestaJSON);
        }
    });
}

//~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*	
function fn_ini_datatable()
{
	setTimeout(function(){
		
		datatable_fat = $('#example').DataTable({"language":{
			"sProcessing":     "Procesando...",
			"sLengthMenu":     "Mostrar _MENU_ registros",
			"sZeroRecords":    "No se encontraron resultados",
			"sEmptyTable":     "Ningún dato disponible en esta tabla",
			"sInfo":           "Registros del _START_ al _END_ de un total de _TOTAL_ registros",
			"sInfoEmpty":      "Registros del 0 al 0 de un total de 0 registros",
			"sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
			"sInfoPostFix":    "",
			"sSearch":         "Buscar:",
			"sUrl":            "",
			"sInfoThousands":  ",",
			"sLoadingRecords": "Cargando...",
			"oPaginate": {
				"sFirst":    "Primero",
				"sLast":     "Último",
				"sNext":     "Siguiente",
				"sPrevious": "Anterior"
			},
			"oAria": {
				"sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
				"sSortDescending": ": Activar para ordenar la columna de manera descendente"
			}
		},"pageLength": 10,"bLengthChange": false, "info": false, "searching": true
		}
		);
		
		$('#tx_busca').on( 'keyup', function () {
			datatable_fat.search( this.value ).draw();
		} );
	}, 0);	
}

//~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*	
function add_item(id)
{
	
	var label_item = $("#td_"+id+" > label").text();
	var x = document.getElementById("lst_item");
	var option = document.createElement("option");
	option.value = id;
	option.innerHTML = label_item;
	x.options.add(option);
	//fn_mensaje_boostrap("Adiciono un material a la cesta!", g_tit, $(""));
	//$("#lst_item").append("<tr id='"+id+"'><td >"+label_item+"</td><td></td></tr>");
	//$("#lst_item").append("<option value='"+id+"'>"+label_item+"</option>");
}


//~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*	
function chek_item(id)
{
	$("#dv_lista").slideUp();
	$("#dv_form").slideDown();
	$("#dv_form_pedido").slideUp();
	 opt = "actualizar";
	$('#tx_id_producto').val(id);
	
	var parameters = {
		"Bandera":"individual",
		"Item":id
		};
	
	 ComServidor(my_url_g,parameters,"text", function(text){
		 
		 var valores = text.split("¬");
		 
		$("#tx_espaniol").val(valores[0]);
		$("#tx_ngabere").val(valores[1]);
		/*$("#tx_pro_cantidad").val(valores[2]);
		$("#tx_pro_precio").val(valores[3]);
		$("#tx_pro_suc").val(valores[4]);
		$("#tx_pro_provee").val(valores[5]);
		$("#tx_pro_obs").val(valores[6]);*/
		 //fn_limpiar2();
		 //fn_mensaje_boostrap(text, g_tit, $(""));
	});
}

//~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*	
function fn_limpiar()
{
	$("#tx_celular").val("");
	$("#tx_correo").val("");
	$("#tx_nombre").val("");
	$("#lst_item").html("");
	$("#tx_obs").val("");
	$("#dv_lista").slideDown();
	$("#dv_form").slideUp();
	$("#dv_form_pedido").slideUp();
}

//~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*	
function fn_limpiar2()
{
	$("#tx_espaniol").val("");
	$("#tx_ngabere").val("");
/*	$("#tx_pro_cantidad").val("");
	$("#tx_pro_precio").val("");
	$("#tx_pro_suc").val("");
	$("#tx_pro_provee").val("");
	$("#tx_pro_obs").val("");
	$('#tx_id_producto').val("");*/
	$("#dv_lista").slideDown();
	$("#dv_form").slideUp();
	$("#dv_form_pedido").slideUp();
}
//~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*	
function fn_mensaje_boostrap(p_mensaje, p_titulo, p_objeto)
{
	$(".modal-header h4.modal-title").html(p_titulo);
	$(".modal-body div.form-group div.form-control-label").html(p_mensaje);
	
	$("#div_msg_bts").modal({backdrop: "static",keyboard:false});
	$("#div_msg_bts").on("shown.bs.modal", function () {
		$(".modal-footer button").focus();
		//Aplicar trabajo cuando esta visible el objeto	
	});
	
	$("#div_msg_bts").on("hidden.bs.modal", function () {
		//Aplicar trabajo cuando esta invisible el objeto	
		if($.trim(p_objeto)!="") p_objeto.focus();
	});
}

//~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*	
function ver_foto(tdsel)
{
	
	$("#div_img_bts > div.modal-dialog div.modal-content .modal-header h4.modal-title").html("IMAGEN");
	$("#div_img_bts > div.modal-dialog div.modal-content .modal-body div.form-group div.form-control-label").html("");
 	setTimeout(function(){
			//var modalImg = document.getElementById("bts_img");
			$("#bts_img").attr("src",$.trim($("#"+tdsel).attr("rel")));
	}, 5);	
	$("#div_img_bts").modal({backdrop: "static",keyboard:false});

	$("#div_img_bts").on("shown.bs.modal", function () {

		$(".modal-footer button").focus();
		//Aplicar trabajo cuando esta visible el objeto	
	});
	
	//$("#div_img_bts").on("hidden.bs.modal", function () {

	//});
}
//~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*	
function fn_get_param(variable){
	
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i=0;i<vars.length;i++) {
		   var pair = vars[i].split("=");
		   if(pair[0] == variable){return pair[1];}
	}
	return(false);	
	
}