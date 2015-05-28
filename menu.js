var menu = function(){
	
	var $menu = $('#menu');
	var $menuAcceso = $('#menuAcceso');
	
	$menuAcceso.show();
	$menu.hide
	$menuAcceso.on('click', function(e){
		e.stopPropagation();
		$menu.show();
	});
	
	$('html').click(function() {
		$menu.hide();
	});
	
	$menu.find('#link_salir').on('click', function(){
		location.reload();
	});
	
	
	$menu.find('#link_pantalla_medicion').on('click', function(){
		$menu.hide();
		
		$menu.parent().find('.pantalla').hide();
		$('#pantalla_medicion').show();
		
		$menu.find('.link_pantalla').removeClass('selected');
		$(this).addClass('selected');
		
	});
	
	$menu.find('#link_pantalla_configuracion').on('click', function(){
		$menu.hide();
		
		$menu.parent().find('.pantalla').hide();
		$('#pantalla_configuracion').show();
		
		$menu.find('.link_pantalla').removeClass('selected');
		$(this).addClass('selected');
		
	});
	
	
	$menu.find('#link_pantalla_exportar').on('click', function(){
		$menu.hide();
		
		$menu.parent().find('.pantalla').hide();
		$('#pantalla_exportar').show();
		
		$menu.find('.link_pantalla').removeClass('selected');
		$(this).addClass('selected');
	});
	
	
};