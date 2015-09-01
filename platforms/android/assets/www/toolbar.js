var toolbar = function(){
	
	
	var ui = $('#toolbar');
	ui.show();
	
	var $options = ui.find('#options');
	var $options_list = ui.find('#options_list');
	
	$options.on('click', function(e){
		e.stopPropagation();
		$options_list.show();
	});
	
	$('html').click(function() {
		$options_list.hide();
	});

	
	
	
	
	
	
	/********* options_list ITEMS ****************/
	
	$options_list.find('#link_salir').on('click', function(){
		navigator.app.exitApp();
	});
	
	$options_list.find('#link_pantalla_medicion').on('click', function(){
		$options_list.hide();
		
		$('.pantalla').hide();
		$('#pantalla_medicion').show();
		
		$options_list.find('.link_pantalla').removeClass('selected');
		$(this).addClass('selected');
		
	});
	
	$options_list.find('#link_pantalla_configuracion').on('click', function(){
		$options_list.hide();
		
		$('.pantalla').hide();
		$('#pantalla_configuracion').show();
		
		$options_list.find('.link_pantalla').removeClass('selected');
		$(this).addClass('selected');
		
	});
	
	/*************************/
	
};