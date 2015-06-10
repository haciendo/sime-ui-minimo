$(function(){
	/**************************************************
	 * Mock del objeto serial
	 * borrar al implementar en phoneGap
	 **************************************************/
//	console.log("pregunto antes de mockear:", window.isphone);
//	if(!window.isphone){
//		console.log("mockeando objeto serial");
//		serial = {
//			open: function(config, success_callback, err_callback){
//
//				console.log("mock - serial.open");
//
//				console.log("config");
//				console.log(config);
//
//				success_callback();
//
//			},
//			write: function(data, success_callback, err_callback){
//
//				console.log("mock - serial.write");
//
//				console.log("data");
//				console.log(data);
//
//				success_callback("success");
//
//			},
//			registerReadCallback: function(read_callback, err_callback){
//				console.log("mock - serial.registerReadCallback");
//
//
//				setInterval(function(){
//
//					read_callback((Math.random() * 100.0).toFixed(3));
//
//				}, 3000);
//			},
//			requestPermission: function(success_callback, err_callback){
//				console.log("mock - serial.requestPermission");
//
//				success_callback('success');
//
//			},
//			close: function(success_callback, err_callback){
//				console.log("mock - serial.close");
//
//				success_callback('success');
//
//			}
//		};
//	}
	/**************************************************
	 * FIN de Mock de objeto serial
	 **************************************************/
		
	console.log("nueva version");
	var abrirPuertoSerie = function(){
		
		serial.open (
			{baudRate: 115200},
			
			
			function(successMessage) {
				console.log("puerto serie abierto:", successMessage);
				
				/*
				serial.write(
					"1",
					function(successMessage) {
						console.log(successMessage);
					},
					function(err){
						console.log("error al enviar por puerto serie:", err);
					}
				);	
				*/
			
				serial.registerReadCallback(
					function(data){
						console.log("data recibida:", data);
						var dataArray = new Uint8Array(data);
						console.log("data array:", dataArray);
						var dataString = String.fromCharCode.apply(null, dataArray);
						console.log("data string:", dataString);
						
						// Mensaje definido en:
						// https://docs.google.com/document/d/1y0_301NuTZICPXeorPcrvl9MDEuBTutYIUK0CI5smXY/edit
						// TODO:
						// adaptar con dataFormated real
						var mensaje = {
							tipoDeMensaje:"medicion",
							//valor: String.fromCharCode.apply(null, dataFormated),
							valor: data,
							unidad:"cm"
						}
						
						Vx.send(mensaje);
						
					},
					function(err){
						console.log("error al registrar callback:", err);
					}
				);
			},
			
			
			function(err){
				console.log("error al abrir puerto serie:", err);
			}
		);
	};
	
	var pedirPermisoParaUsarSerie = function(){
		console.log("nueva version");
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
			}
		);		
	};
	
	if(window.isphone) document.addEventListener("deviceready", pedirPermisoParaUsarSerie, false);
	else pedirPermisoParaUsarSerie();
});