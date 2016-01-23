var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser());

app.get('/', function (request, response) {
	console.log(request.query);
	
	var html = "<form action='/' method='post'>" 
	
	html += "<input name='txt_message' type='text' " +
		"placeholder='ingresa un mensaje'>";
	
	html += "<input type='submit' value='enviar'>"
	
	html += "</form>"
	
	response.send(html);
});

app.post('/', function (request, response) {
	console.log(request.body);
	
	response.send('Tu mensaje es <trong>' + request.body.txt_message + 
		'</strong>');
});

http.createServer(app).listen(8080, function () {
	console.log('Se ha creado el servidor en http://localhost:8080/');
});