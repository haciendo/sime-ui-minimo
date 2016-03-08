var SocketScannerVortex = {
	start: function(opt){
        var _this = this;
		this.verbose = opt.verbose || false;
		this.conectores = {};
        this.scanearRedLocal();
//		this.buscarNodos();
	},
    findServers: function (port, ipBase, ipLow, ipHigh, maxInFlight, timeout) {
        var _this = this;
        var ipCurrent = +ipLow, numInFlight = 0, servers = [];
        ipHigh = +ipHigh;
    
        function tryOne(ip) {
            var address = "ws://" + ipBase + ip + ":" + port;
            if(_this.conectores[address]) {
                next();
                return;
            }
            ++numInFlight;
            var socket = new WebSocket(address, ['mensaje_vortex']);
            var timer = setTimeout(function() {
                //console.log(address + " timeout");
                var s = socket;
                socket = null;
                s.close();
                --numInFlight;
                next();
            }, timeout);
            socket.onopen = function() {
                if (socket) {
                    console.log(address + " success");
                    clearTimeout(timer);
                    conector = new NodoConectorSocketNativo({
                        socket:socket, 
                        verbose: _this.verbose,
                        alDesconectar: function(){
                            delete conectores[address]; 
                        }
                    });
			        Vx.conectarCon(conector);
                    _this.conectores[address] = conector;
                    --numInFlight;
                    next();
                }
            };
            socket.onerror = function(err) {
                if (socket) {
                    console.log(address + " error");
                    clearTimeout(timer);
                    --numInFlight;
                    next();
                }
            }
        }
    
        function next() {
            while (ipCurrent <= ipHigh && numInFlight < maxInFlight) {
                tryOne(ipCurrent++);
            }
            // if we get here and there are no requests in flight, then
            // we must be done
            if (numInFlight === 0) {
            }
        }
    
        next();
    },
	intentarConectarConServer: function(url, onError){
		var _this = this;
		var ws = new WebSocket("ws:" + url + ":1234", ['mensaje_vortex']); 
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
		this.intentarConectarConServer('192.168.1.65');
//		for(var i=0; i<256; i++){
//			//_this.conectarConAdaptador('192.168.1.' + i);
//			this.intentarConectarConServer('192.168.1.' + i);
//		}	
	},
	scanearRedLocal: function(){
		var _this = this;
		this.getRangoIpLocal(function(rango){
			_this.findServers(1234, rango, 1, 255, 255, 20000);
        });
		this.findServers(1234, "192.168.4", 1, 1, 1, 20000);
	},
    getRangoIpLocal: function(cb){
        window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;   //compatibility for firefox and chrome
        var pc = new RTCPeerConnection({iceServers:[]}), noop = function(){};      
        pc.createDataChannel("");    //create a bogus data channel
        pc.createOffer(pc.setLocalDescription.bind(pc), noop);    // create offer and set local description
        pc.onicecandidate = function(ice){  //listen for candidate events
            if(!ice || !ice.candidate || !ice.candidate.candidate)  return;
            var myIP = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ice.candidate.candidate)[1];
            pc.onicecandidate = noop;
            var partes = myIP.split('.');
            cb(partes[0]+'.'+partes[1]+'.'+partes[2]+'.');
        };
    }
};