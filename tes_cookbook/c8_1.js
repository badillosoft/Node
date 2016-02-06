var cluster = require('cluster');
var nCPUs = require('os').cpus().length;

if (cluster.isMaster) {
	for (var i = 1; i <= 10 * nCPUs; i += 1) {
		var worker = cluster.fork();
		
		worker.on('message', function (data) {
			console.log(data);
		});
		
		worker.send(i);
	}
} else {
	process.on('message', function (id) {
		var EventEmitter = require('events').EventEmitter;

		var emitter = new EventEmitter();

		emitter.on('esPrimo', function (p) {
			process.send('[' + id + ']Primo: ' + p);
		});
		
		var criba = [];

		for (var i = 0; i <= 1000; i += 1) {
			criba.push(true);
		}

		for (var n = 2; n <= 1000; n += 1) {
			if (criba[n]) {
				for (var k = 2 * n; k <= 100; k += n) {
					criba[k] = false;
				}
				
				emitter.emit('esPrimo', n);
			}
		}
	});
}