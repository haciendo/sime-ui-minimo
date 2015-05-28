var pantalla_medicion = function() {
	
	var ui = $('#pantalla_medicion');
	
	ui.show();
	
	Vx.when({
		tipoDeMensaje:"medicionCruda"
		
	},function(mensaje){
		
		var medicion = {
			fecha				: moment().format('YYYY-MM-DD hh:mm:ss'),
			valorMedicion		: mensaje.valorCrudo
		};
		
		datos.mediciones.push(medicion);
		
		ui.find('#valorMedicion').text(mensaje.valorMedicion);
	});
	
};