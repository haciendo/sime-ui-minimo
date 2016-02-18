var gestor_adaptadores_wifi = {
	start: function(){
		this.buscarAdaptadores();
		this.adaptadores = {};
	},
	conectarConAdaptador: function(url, onError){
		var _this = this;
		var ws = new WebSocket("ws:" + url + ":81", ['mensaje_vortex']); 
		ws.onerror = function(){if(onError) onError();};
		ws.onclose = function(){
			console.log("Adaptador desconectado en " + url);
			_this.adaptadores[url] = undefined;
		};
		ws.onopen = function(){ 
			console.log("Encontrado adaptador en " + url);
			_this.adaptadores[url] = url;
		};
		ws.onmessage = function(m){
			var mensaje = JSON.parse(m.data);			
			Vx.send(mensaje);					
		}
		
	},

	buscarAdaptadores: function(){
		var _this = this;
		Vx.conectarCon(new NodoConectorSocket('192.168.4.1'));
		//_this.conectarConAdaptador('192.168.4.1');
		for(var i=0; i<256; i++){
			//_this.conectarConAdaptador('192.168.1.' + i);
			Vx.conectarCon(new NodoConectorSocket('192.168.1.' + i));
		}	
	}
}
	
$(function(){
	gestor_adaptadores_wifi.start();
});