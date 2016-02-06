var http = require('http');
var express = require('express');
var fs = require('fs');

var app = express();

app.get('/', function (req, res) {
	var html = '<a href="/pesada">Carga pesada</a><br>' +
		 '<a href="/ligera">Carga ligera</a>';
	
	res.send(html);
});

app.get('/pesada', function (req, res) {
	fs.readFile('pesado.txt', function (err, data) {
		if (err) {
			res.send(err);
			return;
		}
		
		res.send(data);
	});
	
	// var data = fs.readFileSync('pesado.txt');
	
	// res.send(data);
});

app.get('/ligera', function (req, res) {
	res.send('Finalizado: Carga ligera');
});

http.createServer(app).listen(8080, function () {
	console.log('El servidor se ha iniciado en http://localhost:8080');
});

//10.0.16.36