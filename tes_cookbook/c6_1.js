var EventEmitter = require('events').EventEmitter;

var emitter = new EventEmitter();

emitter.on('esPrimo', function (p) {
	setImmediate(function () {
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
		
		console.log('El número ' + p + ' es primo [pesado]');
	});
});

emitter.on('esPrimo', function (p) {
	console.log('El número ' + p + ' es primo');
});

var criba = [];

for (var i = 0; i <= 100; i += 1) {
	criba.push(true);
}

for (var n = 2; n <= 100; n += 1) {
	if (criba[n]) {
		for (var k = 2 * n; k <= 100; k += n) {
			criba[k] = false;
		}
		
		emitter.emit('esPrimo', n);
	}
}