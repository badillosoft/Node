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

app.get('/', function (req, res) {
    res.send("Hola mundo");
});

app.get('/blog', function (req, res) {
	Blog.getAll(10, function (blogs) {
		console.log(blogs);
		res.render('blog', { Entradas: blogs} );
	});
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
	
	Blog.get(codigo, function (blog) {
		res.render('blog_form', {
			Titulo: "Editar Entrada", 
			Entrada: blog  
		});
	});
});

app.post('/blog/edit', function (req, res) {
	Blog.update(req.body, function (valid) {
		res.send('Se actualizó? ' + valid);
	});
});

http.createServer(app).listen(3000, function () {
    console.log('El servidor se ha iniciado en: ' +
        'http://localhost:3000');
});