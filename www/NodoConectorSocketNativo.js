/*
Vortex by Vortex Group is licensed under a Creative Commons Reconocimiento 3.0 Unported License.
To view a copy of this licence, visit: http://creativecommons.org/licenses/by/3.0/
Project URL: https://sourceforge.net/p/vortexnet
*/

if(typeof(require) != "undefined"){
    var NodoNulo = require("./NodoNulo").clase;
}

var NodoConectorSocketNativo = function(opt){
    this.socket = opt.socket||new WebSocket("ws://" + opt + ":1234", ['mensaje_vortex']); 
    this.verbose = opt.verbose||false;
    this.id = opt.id||"anonimo";
    this.alDesconectar = opt.alDesconectar||function(){};
	this.vecino = new NodoNulo();
    var _this = this;
	this.socket.onerror = function(){
		if(this.verbose) console.log('socket ' + this.id + ' tiró error');
	};
	this.socket.onclose = function(){
		if(this.verbose) console.log('socket ' + this.id + ' desconectado');
		_this.desconectarDe(_this.vecino);
        _this.alDesconectar();
	};
	this.socket.onopen = function(){ 
		if(this.verbose) console.log('socket ' + this.id + ' conectado');
		
	};
	this.socket.onmessage = function(m){
		var mensaje = JSON.parse(m.data);			
		if(_this.verbose) console.log("conector recibe mensaje por socket:", mensaje);
        _this.vecino.recibirMensaje(mensaje, _this);			
	}
};

NodoConectorSocketNativo.prototype.conectarCon = function(un_vecino){
	if(this.vecino === un_vecino) return;
    this.vecino = un_vecino;
	un_vecino.conectarCon(this);
};

NodoConectorSocketNativo.prototype.desconectarDe = function(un_nodo){
    this.vecino = new NodoNulo();
    this.desconectarDe = function(){};
    
    un_nodo.desconectarDe(this);
    if(this.verbose) console.log('socket ' + this.id + ' desconectado');
    this.alDesconectar();
};

NodoConectorSocketNativo.prototype.recibirMensaje = function(mensaje){  
    if(this.verbose) console.log("conector envia mensaje por socket:", mensaje);
    this.socket.send(mensaje);
};

if(typeof(require) != "undefined"){
    exports.clase = NodoConectorSocketNativo;
}