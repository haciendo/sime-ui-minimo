var pantalla_instrumentos = function() {
	var self = this;
	var ui = $('#pantalla_instrumentos');
	var txt_codigo = ui.find('#codigo_istrumento_add');
    var lista_instrumentos = ui.find('#lista_instrumentos');
    var btn_agregar = ui.find('#btn_agregar_instrumento');
    
    /**** custom_toolbar *******/

	/***************************/
    
	ui.on('show', function(){
		
		
	});
    
    var agregar_vista_instrumento = function(instrumento){
        var vista = $("#plantillas #plantilla_instrumento_item").clone();
        vista.text(instrumento.codigo);   
        lista_instrumentos.append(vista);
    };
    gestor_instrumentos.getInstrumentos().forEach(instrumento, function(){
         agregar_vista_instrumento(instrumento);        
    });
    
    btn_agregar.on('click', function(){
        var instrumento = {codigo:txt_codigo.val()};
        gestor_instrumentos.addInstrumento(instrumento);
        agregar_vista_instrumento(instrumento);        
	});
};