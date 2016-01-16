var Persona = function (nombre) {
    this.nombre = nombre || "Anónimo Perez";
};

// 100 objetos x 10 métodos c/u => 1000 métodos registrados

Persona.prototype.saludar = function () {
    console.log('Hola me llamo ' + this.nombre);
};

var pepe = new Persona("Pepe");

console.log(pepe);