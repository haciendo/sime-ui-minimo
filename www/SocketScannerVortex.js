var SocketScannerVortex = {
	start: function(opt){
		this.buscarNodos();
		this.verbose = opt.verbose || false;
		this.conectores = {};
	},
	intentarConectarConServer: function(url, onError){
		var _this = this;
		var ws = new WebSocket("ws:" + url + ":81", ['mensaje_vortex']); 
		ws.onopen = function(){ 
			conector = new NodoConectorSocketNativo({socket:ws, verbose: _this.verbose});
			Vx.conectarCon(conector);
			_this.conectores[url] = conector;
		};		
	},

	buscarNodos: function(){
		var _this = this;
		this.intentarConectarConServer('192.168.4.1');
		//Vx.conectarCon(new NodoConectorSocket('192.168.4.1'));
		//_this.conectarConAdaptador('192.168.4.1');
		for(var i=0; i<256; i++){
			//_this.conectarConAdaptador('192.168.1.' + i);
			this.intentarConectarConServer('192.168.1.' + i);
		}	
	}
};