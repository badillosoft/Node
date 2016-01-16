var http = require('http');
var express = require("express");

var app = express();

app.get('/', function (req, res) {
    res.send("Hola mundo");
});

app.get('/blog', function (req, res) {
    res.send("Bienvenido al blog");
});

http.createServer(app).listen(3000, function () {
    console.log('El servidor se ha iniciado en: ' +
        'http://localhost:3000');
});