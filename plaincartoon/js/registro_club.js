var my_url = "cons_pago.php";
var $grid1;

//~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*
$(document).keydown(function(e) {

	if (e.keyCode == 8 ) {
		var element = e.target.nodeName.toLowerCase();
		if ((element != 'input' && element != 'textarea') || $(e.target).attr("readonly")) {
			return false;
		}
	}
});


//~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*
$(document).ready(function() {
    
    // PARA ELIMINAR EL SUBMIT
	//$("button").on("click", function(){return false;});
   
   $("#co_close_e").on("click", function (e) {
        $('#div_editar_bts').modal('hide'); 
    });

  /* $("#co_edit_aceptar").on("click", function (e) {
	   
	   
	   
	   
	   
        //$('#div_editar_bts').modal('hide'); 
    });*/
 
});

//~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*	
function fn_Muestra_Filtro()
{
    $("#div_editar_bts").modal({backdrop: "static",keyboard:false});
	$("#div_editar_bts").on("shown.bs.modal", function () {
		$("#tx_name").focus();
	});
}

//~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*	
function fn_limpiar_editar()
{
    $("#div_editar_bts :input").prop("value","");
    $("#div_editar_bts > select").prop("value","");

}

