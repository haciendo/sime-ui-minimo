var gestor_instrumentos = {
	start: function(){
        this.instrumentos = [];
	},
    addInstrumento: function(instrumento){
        this.instrumentos.push(instrumento);
    },
    getInstrumentos: function(){
        return this.instrumentos;
    }
}
	
$(function(){
	gestor_instrumentos.start();
});