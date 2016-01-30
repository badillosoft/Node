class Persona {
	constructor (nombre, edad) {
		this.$nombre = nombre;
		this.edad = edad;
	}
	
	get esMayorEdad() {
		return this.edad >= 18;
	}
	
	get nombre () {
		return this.$nombre;
	}
	
	set nombre (value) {
		this.$nombre = value;
	}
	
	saludar () {
		console.log('Hola soy: ' + this.$nombre);
	}
}

var pepe = new Persona('pepe', 12);

console.log('Es mayor? ' + pepe.esMayorEdad);

pepe.nombre = 'Pepe';

var Persona = (function () {
	var Persona = function (nombre) {
		this.nombre = nombre;
	};
})();