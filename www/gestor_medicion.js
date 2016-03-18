var gestor_medicion = {
	start: function(){
		var self = this;
		
        gestor_instrumentos.onNuevoInstrumento(function(instrumento){
            self.suscribirseAInstrumento(instrumento);
		});
		_.forEach(gestor_instrumentos.instrumentos, function(instrumento){
            self.suscribirseAInstrumento(instrumento);        
        });
	},
    suscribirseAInstrumento: function(instrumento){
        var self = this;
        Vx.when({
            tipoDeMensaje:"medicion",
            instrumento: instrumento.codigo    
        },function(mensaje){
            
            var medicion = {
                index				: datos.mediciones.length,
                fecha				: moment().format('YYYY-MM-DD hh:mm:ss'),
                valor				: mensaje.valor,
                unidad				: mensaje.unidad
            };
            
            // DB: SE GUARDA EL DATO
            datos.mediciones.push(medicion);
            ////
            
            self.onMedicion(medicion);
        });
        
        
        Vx.when({
            tipoDeMensaje:"medicionTiempoReal",
            instrumento: instrumento.codigo       
        },function(mensaje){
            
            var medicion = {
                valor				: mensaje.valor,
                unidad				: mensaje.unidad
            };            
            
            self.onMedicionTiempoReal(medicion);
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
	},
	onMedicionTiempoReal_vEventos: [],
	onMedicionTiempoReal: function(param){
		if(typeof param == "function"){
			this.onMedicionTiempoReal_vEventos.push(param);
		}else{
			_.each(this.onMedicionTiempoReal_vEventos, function(evento){
				evento(param);
			});
		}
	}
};

$(function(){
	gestor_medicion.start();
});

