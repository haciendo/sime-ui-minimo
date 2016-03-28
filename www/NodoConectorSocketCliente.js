/*
Vortex by Vortex Group is licensed under a Creative Commons Reconocimiento 3.0 Unported License.
To view a copy of this licence, visit: http://creativecommons.org/licenses/by/3.0/
Project URL: https://sourceforge.net/p/vortexnet
*/

if(typeof(require) != "undefined"){
    var NodoNulo = require("./NodoNulo").clase;
}

var NodoConectorSocketCliente = function(url){
    this.url = url;  
    this.initSocket();    
    this.verbose = true;
};

NodoConectorSocketCliente.prototype.initSocket = function(){
    this.socket = new WebSocket("ws://" + this.url + ":1234", ['mensaje_vortex']);    
    if(this.verbose) console.log('socket cliente conectando con ' + this.url);
	var _this = this;
	this.socket.onerror = function(){
		if(_this.verbose) console.log('socket cliente tiró error');
	};
	this.socket.onclose = function(){
		if(_this.verbose) console.log('socket cliente desconectado');
        setTimeout(function(){_this.initSocket();}, 500);
	};
	this.socket.onopen = function(){ 
		if(this.verbose) console.log('socket cliente conectado');	
        _this.reconectar();
	};
	this.socket.onmessage = function(m){
		var mensaje = JSON.parse(m.data);			
		if(_this.verbose) console.log("conector recibe mensaje por socket:", mensaje);
        _this.vecino.recibirMensaje(mensaje, _this);			
	}
};

NodoConectorSocketCliente.prototype.conectarCon = function(un_vecino){
	if(this.vecino === un_vecino) return;
    this.vecino = un_vecino;
	un_vecino.conectarCon(this);
};

NodoConectorSocketCliente.prototype.desconectarDe = function(un_nodo){
    if(this.verbose) console.log('conector socket cliente desconectado');
};

NodoConectorSocketCliente.prototype.reconectar = function(){
    this.vecino.desconectarDe(this);
    this.conectarCon(this.nodoVecino);
};

NodoConectorSocketCliente.prototype.recibirMensaje = function(mensaje){      
    if(this.socket.readyState == 1) {
        this.socket.send(mensaje);
        if(this.verbose) console.log("conector envia mensaje por socket:", mensaje);
    }
};

if(typeof(require) != "undefined"){
    exports.clase = NodoConectorSocketNativo;
}