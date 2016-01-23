var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var mustacheExpress = require('mustache-express');
var Blog = require('./Blog');

var app = express();

app.engine('mustache', mustacheExpress());

app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

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
    res.render('blog', { Entradas: Blog.getAll(10)} );
});

app.get('/blog/new', function (req, res) {
	res.render('blog_form', {Titulo: "Nuevo Blog"});
});

app.post('/blog/new', function (req, res) {
	Blog.insert(req.body);
	res.send('Entrada agregada');
});

app.get('/blog/edit', function (req, res) {
	var codigo = req.query['code'];
	
	res.render('blog_form', {
		Titulo: "Editar Entrada", 
		Entrada: Blog.get(codigo) 
	});
});

app.post('/blog/edit', function (req, res) {
	
	
	Blog.update(req.body);
	res.send('Entrada agregada');
});

http.createServer(app).listen(3000, function () {
    console.log('El servidor se ha iniciado en: ' +
        'http://localhost:3000');
});