var toolbar = function(){
	
	
	var ui = $('#toolbar');
	ui.show();
	
	
	/*****************************************************/
	var mueveBrillo = function(){
		$('#brillo_toolbar').show();
		$('#brillo_toolbar').css('left', '0px');
		
		$('#brillo_toolbar').animate({
			left: "+=" + ($('#toolbar').width() - $('#brillo_toolbar').width())
			
		}, 1000, "linear", function(){
			$('#brillo_toolbar').hide();
			$('#marca_sime').addClass('iluminado');
			setTimeout(function(){
				$('#marca_sime').removeClass('iluminado');
			}, 500);
			
		});
		
		
	};
	mueveBrillo();
	setInterval(function(){
		mueveBrillo();
	},20000);
	/*****************************************************/
	
	$('.medir').on('click', function(e){
		e.stopPropagation();
		$('.pantalla').hide();
		$('#pantalla_medicion').show();
	});
	
	
	var $options = ui.find('#options');
	var $options_list = $('#options_list');
	
	$options.on('click', function(e){
		e.stopPropagation();
		$options_list.show();
		$('.custom_toolbar').hide();
		
	});
	
	$('html').click(function(e) {
		e.stopPropagation();
		$options_list.hide();
		$('.custom_toolbar').show();
	});
	/********* options_list ITEMS ****************/
	
	$options_list.find('#link_salir').on('click', function(){
		window.plugin.backgroundMode.disable();
		navigator.app.exitApp();
	});
	
	
	
	
	$options_list.find('#link_pantalla_configuracion').on('click', function(){
		$options_list.hide();
		
		$('.pantalla').hide();
		$('#pantalla_configuracion').show();
	});
	
	/*************************/
	
};