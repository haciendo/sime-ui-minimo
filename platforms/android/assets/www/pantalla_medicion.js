var pantalla_medicion = function() {
	
	var ui = $('#pantalla_medicion');
	
	
	/**** custom_toolbar *******/
	ui.find('#btn_lista_mediciones').on('click', function(){
		$('.pantalla').hide();
		$('#pantalla_lista_mediciones').show();
	});
	/***************************/
	
	
	gestor_medicion.onMedicion(function(medicion){
		ui.find('#valorMedicion').text(medicion.valor + ' ' +  medicion.unidad);
	});
	
};