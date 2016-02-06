setTimeout(function () {
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
	
	console.log('Finalizado ');
}, 0);

setTimeout(function () {
	console.log('Despues de finalizado');
}, 100);

console.log('Ejecutado inmediatamente');

