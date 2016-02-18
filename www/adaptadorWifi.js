//$(function(){
	var pedir_medicion = function(url){
		$.ajax({
			type: "GET",
			cache: false,
			timeout:5000,
			url: url + "/ultima_medicion",
			success: function (respuestaMedicion, textStatus, jqXHR) {
				if(respuestaMedicion!=""){
					var _tipoDeMensaje;
					if(respuestaMedicion.split(" ")[2]=="tr"){
						_tipoDeMensaje = "medicionTiempoReal";
					}else{
						_tipoDeMensaje = "medicion";
					}

					
					Vx.send({
						tipoDeMensaje: _tipoDeMensaje,
						valor: respuestaMedicion.split(" ")[0],
						unidad: respuestaMedicion.split(" ")[1]
					});					
				}
				setTimeout(function(){
					 pedir_medicion(url);
				}, 200);
			},

			error: function (request, error) {
				console.log("errorAlPedirMedicion:", error);
				setTimeout(function(){
					 pedir_medicion(url);
				}, 1000);
			}
		});	
	};
	
	var conectar_con_adaptador = function(url){
		var ws = new WebSocket("ws:" + url + ":81", ['arduino']); 
		ws.onmessage = function(m){
			var respuestaMedicion = m.data;
			if(respuestaMedicion!=""){
				var _tipoDeMensaje;
				if(respuestaMedicion.split(" ")[2]=="tr"){
					_tipoDeMensaje = "medicionTiempoReal";
				}else{
					_tipoDeMensaje = "medicion";
				}


				Vx.send({
					tipoDeMensaje: _tipoDeMensaje,
					valor: respuestaMedicion.split(" ")[0],
					unidad: respuestaMedicion.split(" ")[1]
				});					
			}
		}
	};

	var detectar_un_adaptador = function(url){
		$.ajax({
			type: "GET",
			cache: false,
			url: "http://" + url + '/detectar',
			success: function (respuestaDetectar, textStatus, jqXHR) {
				if(respuestaDetectar=="aca estoy"){			
					console.log("encontrado adaptador en " + url);
					conectar_con_adaptador(url);
				}
			}
		});		
	}
	
	var buscar_adaptador = function(){
		detectar_un_adaptador('http://192.168.4.1');
		for(var i=0; i<256; i++){
			detectar_un_adaptador('192.168.1.' + i);
		}
	}
	
	buscar_adaptador();
//});