var http = require('http');
var express = require('express');
var MongoClient = require('mongodb').MongoClient;

var app = express();

MongoClient.connect('mongodb://localhost/DBNAME', function (err, db) {
	if (err) {
		app.all('*', function (req, res) {
			res.send('No hay conexión a la base de datos');
		});
		return;
	}
	
	app.get('/usuarios', function (req, res) {
		db.collection('users').find({}, {_id: 0}).toArray(function (err, usuarios) {
			if (err) {
				res.send('Hubo un error al consultar los usuarios');
				return;
			}
			
			res.send(JSON.stringify(usuarios, null, 2));
		});
	});
});

http.createServer(app).listen(8080, function () {
	console.log('Se ha iniciado el servidor en http://localhost:8080');
});