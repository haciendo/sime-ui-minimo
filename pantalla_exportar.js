var pantalla_exportar = function() {
	
	var ui = $('#pantalla_exportar');
	
	ui.show();
	
	ui.find('#btn_exportar').on('click', function(){
		var fileName = ui.find("#fileName").val();
		
		
		if(fileName==""){
			fileName = 'mediciones'+moment().format('__YYYY_MM_DD_hh_mm_ss') +'.txt';
		}
		
		
		
		var lineas = _.map(datos.mediciones, function(item){
			return 	item.index 		+ ',' +
					item.fecha		+ ',' +
					item.valor		+ ',' +
					item.unidad;
		});
		
		
		
		var miFile = new FileHelper(fileName, function(){
			
			
			var sTablaMediciones = lineas.join(';\r\n');
			sTablaMediciones += ';\r\n';
			
			this.write(sTablaMediciones,
				function(){
					
					console.log('escritura existosa');
					//TODO:
					// poner notificación de archivo descargado
				}
			);
		});
		
		//
		
		
	});
	
};