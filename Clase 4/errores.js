function saludar (nombre) {
	if (nombre === undefined) {
		throw new Error("No existe el nombre de la persona a saludar");
	}
	console.log('Hola ' + nombre);
}

saludar('pepe');

try {
	saludar();
} catch (err) {
	console.log('Surgio un error: ' + err);
}

