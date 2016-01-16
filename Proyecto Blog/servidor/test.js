var http = require('http');
var express = require('express');
var Blog = require('./Blog');

var app = express();

Blog.insert({
    Titulo: "Mi primer post 😊",
    Contenido: "Lo que sea",
    Usuario: "badillo.soft@hotmail.com",
    Fecha: "2016-01-16T13:49:00Z"
});

Blog.insert({
    Titulo: "Mi segundo post 😊",
    Contenido: "Lo que sea",
    Usuario: "badillo.soft@hotmail.com",
    Fecha: "2016-01-16T13:49:00Z"
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

http.createServer(app).listen(3000, function () {
    console.log('El servidor se ha iniciado en: ' +
        'http://localhost:3000');
});