// 0. Creamos una variable global para guardar la conexión al servidor
var ws = null;
var color = "#000000";
var name = "anónimo";

// 1. Cuando carga la página
window.onload = function () {
    console.info('Se ha cargado la página');
    
    name = prompt("Dame tu nombre de usuario:");
    
    // 1.2 Nos conectamos al servidor
    ws = new WebSocket("ws://10.0.16.24:8083", "echo-protocol");
    
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
    
    // 1.7 Cargo el control de jscolor
    // recupero el color, cada que su valor cambie
    // actualizo la variable global de color
    var txt_color = document.getElementById('txt_color');
    
    txt_color.onchange = function () {
        color = "#" + txt_color.value;
    };
    
    // 1.8 Hacemos que se envíe el mensaje al pulsar enter
    var txt_message = document.getElementById('txt_message');
    
    txt_message.onkeydown = function (e) {
        if (e.keyCode == 13 && txt_message.value != "") {
            send();
        }
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
    
    // 2.3 Enriquesemos el mensaje en un objeto
    // para posteriormente convertirlo a JSON y enviarlo
    var message = {
        usuario: name,
        contenido: txt_message.value,
        color: color
    };
    
    ws.send(JSON.stringify(message));
    
    console.log("Se ha enviado el mensaje");
    
    //insertMessage(txt_message.value);
    
    txt_message.value = "";
}

// 3. Inserta un mensaje en el HTML
function insertMessage(data) {
    var messages_box = document.getElementById('messages');
    
    // 3.1 Creamos un elemento HTML con el mensaje
    var div = document.createElement("div");
    
    // 3.2 Recuperamos el JSON, lo parseamos
    // y mostramos sus atributos con estilo
    var message = JSON.parse(data);
    
    div.style.color = message.color;
    
    div.innerHTML = "<strong>" + message.usuario + "</strong>: " +
        message.contenido;
    
    messages_box.appendChild(div);
    
    messages_box.scrollTop = messages_box.scrollHeight;
}