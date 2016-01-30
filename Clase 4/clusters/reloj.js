var cluster = require('cluster');
var nCPUs = require('os').cpus().length;

if (cluster.isMaster) {
	var fix = function (n) { return n >= 10 ? n : '0' + n; };
	
	var timeToString = function (time) {
		return fix(time.horas) + ':' +
			fix(time.minutos) + ':' +
			fix(time.segundos);
	}
	
	for (var i = 0; i < nCPUs; i += 1) {
		var w = cluster.fork();
		
		w.on('message', function (time) {
			console.log(this.id + ': ' + timeToString(time));
		});
		
		w.send(w.id);
	}
} else {
	var s = 0, m = 0, h = 0, d = 1;
	
	var inc = function (d) {
		s += d;
		if (s >= 60) {
			m += Math.floor(s / 60);
			s = s % 60;
		}
		if (m >= 60) {
			h += Math.floor(m / 60);
			m = m % 60;
		}
	};
	
	process.on('message', function (delta) {
		d = delta;
	});
	
	setInterval(function () {
		inc(d);
		
		process.send({
			segundos: s, minutos: m, horas: h
		});
	}, 1000);
}