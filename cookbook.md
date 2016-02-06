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

## 5. Crear un servidor basado en WebSockets

Documentación: [https://github.com/theturtle32/WebSocket-Node](https://github.com/theturtle32/WebSocket-Node)

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

## 6. Crear eventos en Node.JS

Los eventos son funciónes asíncronas que se ejecutan cuando un "evento"
es emitido, es decir, que los eventos se componen de un Emisor que emite
los eventos (llama a las funciones suscritas) y también tenemos
funciones que se suscriben al evento.

Documentación: [https://nodejs.org/api/events.html](https://nodejs.org/api/events.html)

> __javascript__ - Crear un emisor de eventos y suscriptores

~~~js
var EventEmitter = require('events').EventEmitter;

var emitter = new EventEmitter();

emitter.on('esPrimo', function (p) {
	console.log('El número ' + p + ' es primo');
});

var criba = [];

for (var i = 0; i <= 100; i += 1) {
	criba.push(true);
}

for (var n = 2; n <= 100; n += 1) {
	if (criba[n]) {
		for (var k = 2 * n; k <= 100; k += n) {
			criba[k] = false;
		}
		
		emitter.emit('esPrimo', n);
	}
}
~~~

## 7. Crear Buffers

Los Buffers son arreglos de datos estructurados a trozos
esto permite tener gran cantidad de datos sin tener que leerlos
o acceder a ellos uno por uno como un array tradicional, además
permite conversiones de datos sobre strigs y bytes.

Documentación: [https://nodejs.org/api/buffer.html](https://nodejs.org/api/buffer.html)

> __javascript__ - Crear un Buffer de datos

~~~js
var buff = new Buffer(10);

buff.write('Hola ', 'utf8');

console.log(buff.toString('utf8'));

buff.write('mundo', 5, 'utf8');

console.log(buff.toString('utf8'));
~~~

## 8. Crear Clusters para hacer programas en paralelo

Documentación: [https://nodejs.org/api/cluster.html](https://nodejs.org/api/cluster.html)

> __javascript__ - Clusters

~~~js
var cluster = require('cluster');
var nCPUs = require('os').cpus().length;

if (cluster.isMaster) {
	for (var i = 1; i <= 2 * nCPUs; i += 1) {
		var worker = cluster.fork();
		
		worker.on('message', function (data) {
			console.log(data);
		});
		
		worker.send(i);
	}
} else {
	process.on('message', function (id) {
		// TODO: Programa
		
		process.send('Hola soy el proceso: ' + id);
	});
}
~~~