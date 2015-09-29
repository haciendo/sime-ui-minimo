$(function() {  
	
    if(window.isphone) {
        document.addEventListener("deviceready", onDeviceReady, false);
    } else {
        onDeviceReady();
    }
});


// eventos en show y hide
(function ($) {
	$.each(['show', 'hide'], function (i, ev) {
		var el = $.fn[ev];
		$.fn[ev] = function () {
			this.trigger(ev);
			return el.apply(this, arguments);
		};
	});
})(jQuery);




var datos = {
	mediciones: []
};




var onDeviceReady = function() {
    
	// versión mínima no tiene conexion con server
	//Vx.conectarCon(new NodoConectorSocket('https://sime-backend.herokuapp.com'));
	//Vx.conectarCon(new NodoConectorSocket('http://localhost:3000'));
	//
	
	
	
	Vx.when({tipoDeMensaje:"vortex.debug.error"}, function(m){console.log(m);})
	
	
	toolbar();
	
	
	pantalla_medicion();
	pantalla_lista_mediciones();
	pantalla_configuracion();
	pantalla_exportar();
	
	/* START POINT */
	$('.pantalla').hide();
	$('#pantalla_medicion').show();
	
	
	/***************/
	
	window.plugin.backgroundMode.enable();
	
};




