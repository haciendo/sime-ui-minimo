$(document).ready(function() {  
    //toda esta garcha es para detectar si la aplicacion esta corriendo en un celular o en una pc.
    //En el celular para arrancar la app hay que esperar al evento deviceReady, en la pc solo al documentReady
    //window.isphone = false;
	window.isphone = (document.URL.indexOf("com.") > 0);

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
    
	
	Vx.conectarCon(new NodoConectorSocket('https://sime-backend.herokuapp.com'));
	//Vx.conectarCon(new NodoConectorSocket('http://localhost:3000'));
	
	Vx.when({tipoDeMensaje:"vortex.debug.error"}, function(m){console.log(m);})
	
	
	
	toolbar();
	
	pantalla_medicion();
	pantalla_configuracion();
	pantalla_exportar();
	
	/* START POINT */
	
	$('#link_pantalla_medicion').click();
	
	/***************/
	
	if(window.plugin){
		window.plugin.backgroundMode.enable();
	}
};




