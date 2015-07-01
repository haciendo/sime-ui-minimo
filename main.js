$(function() {  
	
    if(window.isphone) {
        document.addEventListener("deviceready", onDeviceReady, false);
    } else {
        onDeviceReady();
    }
});




var datos = {
	mediciones: []
};




var onDeviceReady = function() {
    
	// versión mínima no tiene conexion con server
	//Vx.conectarCon(new NodoConectorSocket('https://sime-backend.herokuapp.com'));
	//Vx.conectarCon(new NodoConectorSocket('http://localhost:3000'));
	//
	
	
	
	Vx.when({tipoDeMensaje:"vortex.debug.error"}, function(m){console.log(m);})
	
	
	// TEST de FileHelper.js
	/*
	var miFile = new FileHelper("la_pucha_file.txt", function(){
		
		
		this.write(
			"blablalba blablabla \r\n sdsddsdsdsd \r\n hola \r\n figarooo figaroo fiiiiiigaroooo",
			function(){
				
				miFile.read(function(text){
					console.log('esto es lo que se lee');
					console.log(text);
				});
				
			}
		);
	});
	*/
	//
	
	
	toolbar();
	
	
	pantalla_medicion();
	pantalla_lista_mediciones();
	pantalla_configuracion();
	pantalla_exportar();
	
	/* START POINT */
	$('#link_pantalla_medicion').click();
	
	
	/***************/
	
	if(window.plugin){
		window.plugin.backgroundMode.enable();
	}
};




