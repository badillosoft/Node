# Recetas de Node.Js

## 1. Instalar un módulo en Node.Js

> __shell__ - Instalar un módulo de forma global

~~~bash
$ npm install -g module_name

$ npm link express
~~~

> __Nota__: Se puede instalar el módulo sobre el mismo directorio
quitando la opción `-g`. Esto es útil cuando queremos que nuestro
proyecto sea portable. Observe que a pesar de el módulo se instaló
de manera global, puede ser necesario crear un link de referencia
a ese módulo.

## 2. Crear un servidor usando Express.Js

> __javascript__

~~~js
var http = require('http');
var express = require('express');

var app = express();

app.get('/', function (req, res) {
	res.send('Hola mundo');
});

http.createServer(app).listen(8080, function () {
	console.log('Se ha iniciado el servidor en http://localhost:8080');
});
~~~

## 3. Utilizar plantillas de Mustache.Js

Documentación: [https://github.com/janl/mustache.js](https://github.com/janl/mustache.js)

### 1. Crear platillas con extensión .mustache en la carpeta /views

> __mustache__ - /views/login.mustache

~~~html
<form method="post">
	<input type="text" placeholder="Usuario" value="{{username}}">
	<input type="password" placeholder="Contraseña" value="{{password}}">
	<input type="submit" value="ingresar">
</form>
~~~

### 2. Utilizar la plantilla en Node.Js

> __javascript__

~~~js
var http = require('http');
var express = require('express');
var mustache = require('mustache-express');

var app = express();

app.engine('mustache', mustache());

app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.get('/', function (req, res) {
	res.render('login', {
		username: 'Pepe',
		password: '123'
	});
});

http.createServer(app).listen(8080, function () {
	console.log('Se ha iniciado el servidor en http://localhost:8080');
});
~~~

## 4. Integrar MongoDB

Documentación: [https://docs.mongodb.org/ecosystem/drivers/node-js/](https://docs.mongodb.org/ecosystem/drivers/node-js/)

### 1. Conectar a la base de datos

> __javascript__ - Conectar a la base de datos

~~~js
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
	
	app.get('/', function (req, res) {
		res.send('Hola mundo');
	});
});

http.createServer(app).listen(8080, function () {
	console.log('Se ha iniciado el servidor en http://localhost:8080');
});
~~~

### 2. Consultar en una colección

> __mongo__ - Colección de usuarios

~~~js
use DBNAME;

db.users.insert([
	{username: 'pepe', password: '123'},
	{username: 'maria', password: '456'},
	{username: 'luis', password: '789'}
]);
~~~

> __javascript__ - Consultar en una colección

~~~js
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
			
			res.send(JSON.stringify(usuarios));
		});
	});
});

http.createServer(app).listen(8080, function () {
	console.log('Se ha iniciado el servidor en http://localhost:8080');
});
~~~

## Crear un servidor basado en WebSockets

> __javascript__ - Crear un servidor WebSocket

~~~js
var http = require('http');
var WebSocket = require('websocket');

var serverHttp = http.createServer(function (req, res) {
	res.writeHead(404);
	res.end();
});

serverHttp.listen(8080, function () {
	console.log('Se ha iniciado el servidor en ws://localhost:8080');
});

var serverWebSocket = new WebSocket.server({
	httpServer: serverHttp
});

wsServer.on('request', function(request) {
    
    var connection = request.accept('echo-protocol', request.origin);
    
    connection.on('message', function(message) {
        // contenido del mensaje: message.utf8Data
        conn.sendUTF('Mensaje recibido');
    });
});
~~~

