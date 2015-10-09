var pantalla_medicion = function() {
	
	var ui = $('#pantalla_medicion');
	
	
	/**** custom_toolbar *******/
	ui.find('#btn_lista_mediciones').on('click', function(){
		$('.pantalla').hide();
		$('#pantalla_lista_mediciones').show();
	});
	/***************************/
	
	
	
	gestor_medicion.onMedicionTiempoReal(function(medicion){
		ui.find('#valorMedicionTiempoReal').text(medicion.valor + ' ' +  medicion.unidad);
	});
	
	Vx.when({tipoDeMensaje: "instrumentoDesconectado"}, function(){
		ui.find('#valorMedicionTiempoReal').text("--.--");
	});
	
	gestor_medicion.onMedicion(function(medicion){
		var valorMedicion = ui.find('#valorMedicion');
		
		valorMedicion.text(medicion.valor + ' ' +  medicion.unidad);
		valorMedicion.show();
		
		var overlay = ui.find('#overlay_medicion, #valorMedicion');
		
		overlay.show();
		overlay.css({opacity: 1});
		
		overlay.animate({
			opacity: 0
		}, 2000, function(){
			overlay.hide();

		});
		
		
		var valorMedicionTiempoReal = ui.find('#valorMedicionTiempoReal');
		
		valorMedicionTiempoReal.show();
		valorMedicionTiempoReal.css({opacity: 0});
		
		valorMedicionTiempoReal.animate({
			opacity: 0.9
		}, 2000);
		
		
	});
};