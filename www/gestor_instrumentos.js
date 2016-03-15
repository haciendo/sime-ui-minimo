var gestor_instrumentos = {
	start: function(){
        this.instrumentos = [];
	},
    addInstrumento: function(codigo){
        if(_.find(this.instrumentos, function(i){return i.codigo == codigo;})) return null;
        var instrumento = {};
        instrumento.codigo = codigo;
        this.instrumentos.push(instrumento);
        this.onNuevoInstrumento(instrumento);
        return instrumento;
    },
    onNuevoInstrumento_vEventos: [],
	onNuevoInstrumento: function(param){
		if(typeof param == "function"){
			this.onNuevoInstrumento_vEventos.push(param);
		}else{
			_.each(this.onNuevoInstrumento_vEventos, function(evento){
				evento(param);
			});
		}
	},
}
	
$(function(){
	gestor_instrumentos.start();
});