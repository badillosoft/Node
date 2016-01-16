var Persona = (function () { // Extra
    var mi_var_priv = "Hola soy soy privada";

    var Persona = function (nombre) {
        this.nombre = nombre || "No definido";
    };
    
    Persona.prototype.saludar = function () {
        console.log('Hola mi nombre es ' + this.nombre);
        console.log(mi_var_priv);
    };
    
    return Persona;
})(); // Extra

var Alumno = (function () {
    var Alumno = function (matricula) {
        this.matricula = matricula;
    }
    
    return Alumno;
})();

Alumno.prototype = Persona;

Alumno.prototype.info = function () {
    console.log('Matricula: ' + this.matricula);
};

var pepe = new Persona("Pepe");

console.log(pepe);
console.log(pepe.mi_var_priv);

pepe.saludar();