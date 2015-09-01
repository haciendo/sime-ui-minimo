var gestor_medicion = {
	start: function(){
		var self = this;
		
		Vx.when({
			tipoDeMensaje:"medicion"

		},function(mensaje){
			
			var medicion = {
				index				: datos.mediciones.length,
				fecha				: moment().format('YYYY-MM-DD hh:mm:ss'),
				valor				: mensaje.valor,
				unidad				: mensaje.unidad
			};
			
			
			datos.mediciones.push(medicion);
			
			
			self.onMedicion(medicion);
		});
	},
	onMedicion_vEventos: [],
	onMedicion: function(param){
		if(typeof param == "function"){
			this.onMedicion_vEventos.push(param);
		}else{
			_.each(this.onMedicion_vEventos, function(evento){
				evento(param);
			});
		}
	}
};

$(function(){
	gestor_medicion.start();
});

