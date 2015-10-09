$(function(){
	
	var buffer_entrada_serie = "";
	var abrirPuertoSerie = function(){
		serial.open (
			{baudRate: 115200},
			
			
			function(successMessage) {
				console.log("puerto serie abierto:", successMessage);
				
				var id_intervalo_keep_alive = setInterval(function(){
					serial.write(
						"T",
						function(successMessage) {
							console.log("instrumento conectado");
						},
						function(err){
							console.log("instrumento desconectado");
							clearInterval(id_intervalo_keep_alive);	
							Vx.send({tipoDeMensaje: "instrumentoDesconectado"});
							setTimeout(pedirPermisoParaUsarSerie, 1000);
						}
					);	
				}, 2000);
				
				serial.registerReadCallback(
					function(data){
						if(_.isString(data)) dataString = data;
						else{
							var dataArray = new Uint8Array(data);
							var dataString = String.fromCharCode.apply(null, dataArray);
						}
						
						buffer_entrada_serie += dataString;
						var mensajes_en_buffer = buffer_entrada_serie.split(/\r?\n/);
						for(var i=0; i<mensajes_en_buffer.length-1; i++){
							
							var sep = " ";
							
							var _tipoDeMensaje;
							if(mensajes_en_buffer[i].split(sep)[2]=="tr"){
								_tipoDeMensaje = "medicionTiempoReal";
							}else{
								_tipoDeMensaje = "medicion";
							}
							
							Vx.send({
								tipoDeMensaje: _tipoDeMensaje,
								valor: mensajes_en_buffer[i].split(sep)[0],
								unidad: mensajes_en_buffer[i].split(sep)[1]
							});
							
						}
						buffer_entrada_serie = mensajes_en_buffer[mensajes_en_buffer.length-1];
						
					},
					function(err){
						console.log("error al registrar callback:", err);
						setTimeout(pedirPermisoParaUsarSerie, 1000);
					}
				);
			},
			
			
			function(err){
				console.log("error al abrir puerto serie:", err);
				setTimeout(pedirPermisoParaUsarSerie, 1000);
			}
		);
	};
	
	var pedirPermisoParaUsarSerie = function(){
		console.log("pido permiso para usar serie...");
		serial.requestPermission(
			 function(successMessage) {
				console.log("permiso concedido para usar puerto serie:", successMessage);
				serial.close(function(){
					console.log("puerto serie cerrado");
					abrirPuertoSerie();
				}, function(err){
					console.log("error al cerrar puerto serie");
					abrirPuertoSerie();
				});
			},
			function(err){
				console.log("error al pedir permiso para usar puerto serie:", err);
				setTimeout(pedirPermisoParaUsarSerie, 1000);
			}
		);		
	};
	
	if(window.isphone) document.addEventListener("deviceready", pedirPermisoParaUsarSerie, false);
	else pedirPermisoParaUsarSerie();
});