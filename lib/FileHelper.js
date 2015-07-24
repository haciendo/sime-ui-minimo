var FileHelper = function(opt, succesCallback){
	var self = this;
	
	if(typeof opt == "string"){
		var opt = {
			fileName: opt
		};
	}
		
	self.succesCallback_contructor = succesCallback.bind(this);
	
	$.extend(this, {
		fileName: "archivo.txt",
		fileObject: null,
		path: null
	}, opt);
	
	var init = function() {
		
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
			
			fileSystem.root.getFile(self.fileName, {create: true, exclusive: false},
				function (fileEntry) {

					
					self.path = fileSystem.root.toURL() + self.fileName;
					
					self.fileObject = fileEntry;
					
					if(typeof self.succesCallback_contructor != "undefined"){
						
						self.succesCallback_contructor();
					}
					
				}, self.fail);
			
		}, self.fail);
	};
	
	if(window.isphone) document.addEventListener("deviceready", init, false); 
	else init();
	
};

FileHelper.prototype = {
	fail: function(error) {
		console.log("error : "+error.code);
	},
	
	write: function (text, callbacks) {
		var self = this;
		
		
		var _callbacks = {};
		
		
		if( typeof callbacks == "function"){
			
			_callbacks = {
				onwriteend: callbacks  //---> default
			};
			
		}
		
		this.fileObject.createWriter(function(writer) {
				
			// SET the callbacks
			$.extend(writer, _callbacks);
			/* REF:
			writer.onwritestart
			writer.onprogress
			writer.onwrite
			writer.onabort
			writer.onerror
			writer.onwriteend
			*/
			
			writer.write(text);
			
		}, self.fail);
		
	},
	read: function(readerCallback){
		
		this.fileObject.file(function(file) {
			var reader = new FileReader();
			
			reader.onloadend = function(e) {
				readerCallback(this.result);
			};

			reader.readAsText(file);
		}, this.fail);
		
	},
	
	remove: function() {
		this.fileObject.remove();
	}
		
};