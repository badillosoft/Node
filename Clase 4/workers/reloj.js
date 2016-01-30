var worker = new Worker('contador.js');

worker.onmessage = function (msg) {
	var fix = function (n) {
		return n < 10 ? '0' + n : n;
	}
	
	console.log(fix(msg.data.horas) + ':' +
		fix(msg.data.minutos) + ':' +
		fix(msg.data.segundos));
		
	var timer = document.getElementById('timer');
	
	timer.innerHTML = fix(msg.data.horas) + ':' +
		fix(msg.data.minutos) + ':' +
		fix(msg.data.segundos);
};

function reiniciar() {
	worker.postMessage('reiniciar');
}