var pantalla_instrumentos = function() {
	var self = this;
	var ui = $('#pantalla_instrumentos');
	
    /**** custom_toolbar *******/
	ui.find('#scan').on('click', function(){
        SocketScannerVortex.scanearRedLocal();
	});
	/***************************/
    
	ui.on('show', function(){
		
		
	});
};