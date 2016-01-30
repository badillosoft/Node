/* global process */
var cluster = require('cluster');
var http = require('http');
var nCPUs = require('os').cpus().length;

if (cluster.isMaster) {
	console.log('Tu servidor cuenta con: ' + nCPUs);
	
	for (var i = 0; i < nCPUs; i += 1) {
		var w = cluster.fork();
	}
	
	for (var id in cluster.workers) {
		console.log('Id: ' + id);
		
		if (id == 3) {
			var w = cluster.workers[3];
			
			w.on('message', function (msg) {
				console.log('El cluster ha enviado: ' + msg.title);
				
				w.send('Ok');
			});
		}
	}
} else {
	var id = 0;
	
	console.log('Hola mundo');
	
	process.send({
		title: 'saludar'
	});
	
	process.on('message', function (msg) {
		if (msg.cmd == 'set_id') {
			id = msg.id
		}
	});
	
	//process.exit();
}
