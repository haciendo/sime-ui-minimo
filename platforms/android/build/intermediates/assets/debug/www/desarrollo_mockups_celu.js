$(function(){
	
		
	/**************************************************
	 * Mock del objeto serial
	 * borrar al implementar en phoneGap
	 **************************************************/
//		
	if(!window.isphone){
		console.log("mockeando objeto serial");
		serial = {
			open: function(config, success_callback, err_callback){

				//console.log("mock - serial.open");

				//console.log("config");
				//console.log(config);

				success_callback();

			},
			write: function(data, success_callback, err_callback){

				//console.log("mock - serial.write");

				//console.log("data");
				//console.log(data);

				success_callback("success");

			},
			registerReadCallback: function(read_callback, err_callback){
				//console.log("mock - serial.registerReadCallback");

				///// TO DO:
				/*
				envíar mensajes de medicionTiempoReal y medicion
				*/
				
<<<<<<< HEAD
//				setInterval(function(){
//
//					read_callback(((Math.random() * 200.0) - 100).toFixed(3)+" mm\n");
//					console.log("mock - read_callback medicion");
//				}, 9000);
//				
//				var iSenoMock = 0
//				
//				setInterval(function(){
//					
//					read_callback(((Math.sin(iSenoMock/180*Math.PI) * 200.0) - 100).toFixed(3)+" mm tr\n");
//					
//					iSenoMock++;
//					
//					if(iSenoMock>180){
//						iSenoMock=0;
//					}
//					
//				}, 100);
//				
=======
				setInterval(function(){

					read_callback(((Math.random() * 200.0) - 100).toFixed(3)+" mm\n");
					console.log("mock - read_callback medicion");
				}, 9000);
				
				var iSenoMock = 0
				
				setInterval(function(){
					
					read_callback(((Math.sin(iSenoMock/180*Math.PI) * 200.0) - 100).toFixed(3)+" mm tr\n");
					
					iSenoMock++;
					
					if(iSenoMock>180){
						iSenoMock=0;
					}
					
				}, 100);
				
>>>>>>> ad998b955195f184b6e79aceb76bbaab80fe7cb8
				
				
			},
			requestPermission: function(success_callback, err_callback){
				//console.log("mock - serial.requestPermission");

				success_callback('success');
				
			},
			close: function(success_callback, err_callback){
				//console.log("mock - serial.close");

				success_callback('success');
				
			}
		};
	}
	/**************************************************
	 * FIN de Mock de objeto serial
	 **************************************************/
	
	
	/**************************************************
	 * Mock del sistema de archivos en el browser
	 * borrar al implementar en phoneGap
	 **************************************************/
	if(!window.isphone){
		/*GLOBAL*/
		LocalFileSystem = {
			PERSISTENT: 999
		};
		/*/GLOBAL*/
		
		
		
		/*GLOBAL*/
		FileReader = function(){
			console.log('mock - FileReader()');
		};
		FileReader.prototype = {
			readAsText: function(file){
				console.log('mock - FileReader.readAsText');
				console.log('-file');
				console.log(file);
			}
		};
		
		window.requestFileSystem = function(paramConfig1, paramConfig2, success_callback, err_callback){
			console.log('mock - window.requestFileSystem');
			
			var fileSystem = {
				root: {
					getFile: function(fileName, opt, success_callback, err_callback){
						console.log('mock - fileSystem.root.getFile');
						
						var fileEntry = {
							createWriter: function(success_callback, err_callback){
								console.log('mock - fileEntry.createWriter');
								
								var writer = {
									write: function(text){
										console.log('mock - writer.write');
										console.log('-text');
										console.log(text);
									}
									
								};
								success_callback(writer);
							},
							file: function(success_callback, err_callback){
								console.log('mock - fileEntry.file');
								var file = {
									fullPath: '//mock-fileEntry.fullPath//'
								};
								success_callback(file);
								
							},
							remove: function(){
								console.log('mock - fileEntry.remove');
							}
						};
						
						success_callback(fileEntry);
					}
				}
			};
			
			success_callback(fileSystem);
		};
		
	}

	/**************************************************
	 * FIN de Mock del sistema de archivos
	 **************************************************/
	
	
	
	
	
	/**************************************************
	 * Mock simulador de toma de mediciones en el celu
	 * borrar al implementar en phoneGap
	 **************************************************/
//	if(window.isphone){
//		setTimeout(function(){
//			// DEBUG
//			Vx.send({
//				tipoDeMensaje:"medicion",
//				valor: 123,
//				unidad: "mm"
//			});
//			Vx.send({
//				tipoDeMensaje:"medicion",
//				valor: 223,
//				unidad: "cm"
//			});
//			Vx.send({
//				tipoDeMensaje:"medicion",
//				valor: 323,
//				unidad: "mm"
//			});
//			Vx.send({
//				tipoDeMensaje:"medicion",
//				valor: 423,
//				unidad: "cm"
//			});
//		}, 3000);
//		
//		
//	}
	
	
	/**************************************************
	 * FIN de Mock simulador de toma de mediciones en el celu
	 **************************************************/
	
	/**************************************************
	 * Mock simulador de plugines window.plugins...
	 * borrar al implementar en phoneGap
	 **************************************************/
	if(!window.isphone){
		
		window.plugin = {
			backgroundMode: {
				enable: function(){
					console.log('mock - window.plugins.bagroundMode.enable()');
				},
				disable: function(){
					console.log('mock - window.plugins.bagroundMode.disable()');
				}
			},
			
			socialsharing: {
				share: function(){
					console.log('mock - window.plugins.socialsharing.share()');
					console.log('arguments', arguments);
					
				}
			}
		}
	}
	/**************************************************
	 * FIN de Mock simulador de plugines window.plugins...
	 **************************************************/
	
	
	/**************************************************
	 * Mock simulador de navigator.app.exitApp();
	 * borrar al implementar en phoneGap
	 **************************************************/
	if(!window.isphone){
		navigator.app={
			exitApp: function(){
				location.reload();
			}
		}
	}
	/**************************************************
	 * FIN de Mock simulador de navigator.app.exitApp();
	 **************************************************/
	
	
	
	
});