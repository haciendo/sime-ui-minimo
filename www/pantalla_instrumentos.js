var pantalla_instrumentos = function() {
	var self = this;
	var ui = $('#pantalla_instrumentos');
	var txt_codigo = ui.find('#codigo_istrumento_add');
    var lista_instrumentos = ui.find('#lista_instrumentos ul');
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
    _.forEach(gestor_instrumentos.instrumentos, function(instrumento){
         agregar_vista_instrumento(instrumento);        
    });
    
    btn_agregar.on('click', function(){
        if(txt_codigo.val()=="") return;
        var instrumento = gestor_instrumentos.addInstrumento(txt_codigo.val());
        if(instrumento) agregar_vista_instrumento(instrumento);        
        txt_codigo.val("");
	});
};