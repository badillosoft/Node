// 0. Creamos una variable global para guardar la conexión al servidor
var ws = null;

// 1. Cuando carga la página
window.onload = function () {
    console.info('Se ha cargado la página');
    
    // 1.2 Nos conectamos al servidor
    ws = new WebSocket("ws://localhost:8083", "echo-protocol");
    
    // 1.3 Cuando el servidor se conecta
    ws.onopen = function () {
        console.info('Nos conectamos al servidor :D');
    };
    
    // 1.4 Cuando el servidor nos rechaza
    ws.onclose = function () {
        console.info('Nos hemos desconectado del servidor D:');
    };
    
    // 1.5 Cuando surge un error en el websocket
    ws.onerror = function (e) {
        console.info('Ha surgido un error :(');
        console.error(e);
    };
    
    // 1.6 Cuando recibimos un mensaje de servidor
    ws.onmessage = function (message) {
        console.info('Se ha recibido un mensaje');
        console.log(message.data);
        insertMessage(message.data);
    };
};

// 2. Cuando pulsamos el botón enviar
function send() {
    // 2.1 Si no hay websocket salimos
    if (!ws) {
        console.error('No se ha establecido la conexión al servidor');
        return;
    }
    
    // 2.2 Recuperamos el texto de la caja y lo enviamos
    var txt_message = document.getElementById("txt_message");
    
    ws.send(txt_message.value);
    
    console.log("Se ha enviado el mensaje");
    
    insertMessage(txt_message.value);
    
    txt_message.value = "";
}

// 3. Inserta un mensaje en el HTML
function insertMessage(message) {
    var messages_box = document.getElementById('messages');
    
    // 3.1 Creamos un elemento HTML con el mensaje
    var div = document.createElement("div");
    
    div.innerHTML = "<strong>" + message + "</strong>";
    
    messages_box.appendChild(div);
}