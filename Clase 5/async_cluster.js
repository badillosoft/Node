var cluster = require('cluster');
var nCPUs = require('os').cpus().length;

if (cluster.isMaster) {
	for (var i of [1, 2]) {
		var w = cluster.fork();
	
		w.on('message', function (msg){
			console.log(msg);
		});
		
		w.send(i);
	}
} else {
	process.on('message', function (t) {
		if (t == 1) {
			var i = 0;
			while (i < 10000) {
				var j = 0;
				while (j < 1000) {
					var k = 0;
					while (k < 1000) {
						k += 1;
					}
					j += 1;
				}
				i += 1;
			}
			
			process.send('Carga pesada Finalizada');
		} else {
			process.send('Carga ligera finalizada');
		}
	});
}