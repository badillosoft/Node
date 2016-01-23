var http = require('http');
var express = require('express');
var mustacheExpress = require('mustache-express');

var app = express();

app.engine('mustache', mustacheExpress());

app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.get('/', function (req, res) {
	res.render('home', {name: "PEPE"});
});

http.createServer(app).listen(8080, function () {
	console.log('El servidor se ha iniciado en http://localhost:8080/');
});
