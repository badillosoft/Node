var http = require('http');
var express = require('express');
var mustache = require('mustache-express');
var MongoClient = require('mongodb').MongoClient; 
var main = require('./main');
var report = require('./report');

var app = express();

app.engine('mustache', mustache());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.use(express.static('public'));

MongoClient.connect('mongodb://localhost/MiEmpresa', function (err, db) {
	if (err) {
		console.log('No hay conexión a la base de datos');
		process.exit();
	}
	
	main.set(app);
	report.set(app, db);
});

http.createServer(app).listen(8082, function () {
	console.log('Se inició el servidor en http://localhost:8082');
}); 