var s = 0, m = 0, h = 0;

setInterval(function () {
	s += 1;
	
	if (s >= 60) {
		s = 0;
		m += 1;
	}
	
	if (m >= 60) {
		m = 0;
		h += 1;
	}
	
	postMessage({
		segundos: s,
		minutos: m,
		horas: h
	});
}, 1000);

onmessage = function (msg) {
	if (msg.data === 'reiniciar') {
		s = 0;
		m = 0;
		h = 0;
		
		postMessage({
			segundos: s,
			minutos: m,
			horas: h
		});
	}
};