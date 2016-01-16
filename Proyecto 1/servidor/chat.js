var http = require("http");
var WebSocket = require("websocket");

// 1. Creamos un servidor HTTP
var server = http.createServer(function (req, res) {
    console.log((new Date()) + ' Received request for ' + request.url);
    res.writeHead(404);
    res.end();
});

// 2. Iniciamos el servidor HTTP
server.listen(8083, function () {
    console.log((new Date()) + ' Server is listening on port 8083');
});

// 3. Creamos un servidor WebSocket a partir del servidor HTTP
var wsServer = new WebSocket.server({
    httpServer: server
});

// 4. Creamos un arreglo para guardar las conexiones
var connections = [];

// 5. Cada que un usuario se conecte:
wsServer.on('request', function(request) {
    
    // 5.1 Aceptamos la conexión 
    var connection = request.accept('echo-protocol', request.origin);
    
    // 5.2 Guardamos la conexión 
    connections.push(connection);
    
    console.log((new Date()) + ' Connection accepted.');
    
    // 5.3 Cada que un usuario nos mande un mensaje
    connection.on('message', function(message) {
        console.log('Received Message: ' + message.utf8Data);
        
        // 5.3.1 Recorremos todas las conexiones
        connections.forEach(function (conn) {
            // 5.3.1.1 Si es el usuario enviamos un mensaje
            if (connection == conn) {
                conn.sendUTF("Tu mensaje fué propagado");
                return;
            }
            
            // 5.3.1.2 Si es otro le enviamos el mensjae
            conn.sendUTF(message.utf8Data);
        });
    });
    
    // 5.4 Si un usuario se desconecta
    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});