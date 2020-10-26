var g_tit= "VOCABULARIO NGÄBERE | Software WHATMOVIEPTY LLC";
var my_url = "http://taykuku.de/npmod1000/vol1/ngabebugle.php";
var my_url_g = "http://taykuku.de/npmod1000/vol1/ngabebugle.php";
var bandera = "fn_insert";
var datatable_fat;

//~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*
$( document ).ready(function() {
	document.title = g_tit;

	//$("#tx_id_parking").val(fn_get_param2("id_park"));
	/*
	setTimeout(function(){			
			fn_refrescar();
	}, 10);	*/	
	
	//$("#dv_pool button").on("click", fn_check_in_out);
	
	$("#btn_add").on("click", fn_volver);
		
	$("#btn_checkout").click(function(e) {
	
		var parameters = {
                    "Bandera":bandera,
					"id_check":$("#tx_numero").val(),
                    "ngabe":$("#tx_ngabe").val(),
					"espanio":$("#tx_espanio").val()					
		}
		
		 ComServidor(my_url_g,parameters,"text", function(text){

		});
	
	
	});
	
	fn_ini_datatable();
		setTimeout(function(){			
			fn_gridPanel();
		}, 0);	
});

//~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*	
function fn_volver()
{
	bandera = "fn_insert";
	$("#tx_numero").val("0");
	$('#div_chechout_bts').modal('show');
	$("#tx_ngabe").val("");
	$("#tx_espanio").val("");
	$("#tx_ngabe").focus();
}

//~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*	
function fn_check_in(item)
{
	
	bandera = "fn_update";
	
	var parameters = {
                    "Bandera":"fn_registros",
                    "id_check":item
					}
		
		 ComServidor(my_url_g,parameters,"json", function(customer){
			 if(customer!="")
			 {
				 $.each(customer, function(i) {
					$("#tx_ngabe").val(customer[i].nagbe);
					$("#tx_espanio").val(customer[i].espanio);
					$("#tx_numero").val(item);
				});
			}

			$('#div_chechout_bts').modal('show');
							

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
			"sEmptyTable":     "No hay clientes para este parking",
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
		},"pageLength": 10,"bLengthChange": false, "info": false, "searching": false
		}
		);
		
		/*$('#tx_busca').on( 'keyup', function () {
			datatable_fat.search( this.value ).draw();
		} );*/
	}, 0);	
}
//~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*	
function fn_gridPanel()
{
	
	/*if(bandera == 1)
	{	datatable_fat.destroy();
		datatable_fat.clear().draw();
	}*/
	// alert("hh1");
	$("#bookContainer").empty();

	//$("#tx_id_parking").val(p_categoria);
	var parameters = {"parking":"1"};
	
	 ComServidor(my_url,parameters,"json", function(text){
		
		 $("#bookTemplate").tmpl(text).appendTo("#bookContainer");		
		 bandera = 1;
	});
	
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
function fn_get_param2(variable){
	
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i=0;i<vars.length;i++) {
		   var pair = vars[i].split("=");
		   if(pair[0] == variable){return pair[1];}
	}
	return(false);	
	
}