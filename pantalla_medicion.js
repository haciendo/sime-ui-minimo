var pantalla_medicion = function() {
	
	var ui = $('#pantalla_medicion');
	
	
	
	Vx.when({
		tipoDeMensaje:"medicion"
		
	},function(mensaje){
		
			
		var medicion = {
			fecha			: moment().format('YYYY-MM-DD hh:mm:ss'),
			valor			: mensaje.valor,
			unidad			: mensaje.unidad
		};
		
		datos.mediciones.push(medicion);
		
		ui.find('#valorMedicion').text(medicion.valor + ' ' +  medicion.unidad);
	});
	
};