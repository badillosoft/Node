// Clase a partir de método
function Persona(nombre, edad) {
    this.Nombre = nombre;
    this.Edad = edad;
    
    this.Saludar = function () {
        console.log('Hola me llamo ' + this.Nombre);
    };
    
    // Función normal
    
    return "Hola soy " + nombre;
}

var pepe = Persona("Pepe", 123);

//pepe.Saludar();

console.log(pepe);