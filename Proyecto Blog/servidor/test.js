var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var Blog = require('./Blog');

var app = express();

app.use(bodyParser());

Blog.insert({
    Titulo: "Mi primer post 😊",
    Contenido: "Lo que sea",
    Usuario: "badillo.soft@hotmail.com",
    Fecha: "2016-01-16T13:49:00Z"
});

Blog.insert({
    Titulo: "Mi segundo post 😊",
    Contenido: "Lo que sea 2",
    Usuario: "badillo.soft@hotmail.com",
    Fecha: "2016-01-16T13:55:00Z"
});

app.get('/', function (req, res) {
    res.send("Hola mundo");
});

app.get('/blog', function (req, res) {
    var txt = "<h1>Bienvenido al Blog 😁</h1><br><br>";
    
    var entradas = Blog.getAll(10);
    
    for (var i = 0; i < entradas.length; i += 1) {
        txt += "<div>" +
            "<h2>" + entradas[i].Titulo + "</h2>" + 
            "<p>" + entradas[i].Contenido + "</p>" + 
            "<p>" + entradas[i].Usuario + " | " +
            entradas[i].Fecha + " | " + entradas[i].Codigo + 
            "</p>" + 
            "</div>";
    }
    
    res.send(txt);
});

app.get('/blog/new', function (req, res) {
	var form = '<form action="/blog/new" method="post">';
	
	form += "<input name='Titulo' type='text' placeholder='Título'><br>";
	form += "<textarea name='Contenido'></textarea><br>";
	form += "<input name='Usuario' type='text' placeholder='Usuario'><br>";
	form += "<input name='Fecha' type='date' placeholder='Fecha'><br>";
	form += "<input type='submit' value='enviar'><br>";
	
	form += "</form>";
	
	res.send(form);
});

app.post('/blog/new', function (req, res) {
	console.log(req.body);
	Blog.insert(req.body);
	res.send('Entrada agregada');
});

http.createServer(app).listen(3000, function () {
    console.log('El servidor se ha iniciado en: ' +
        'http://localhost:3000');
});