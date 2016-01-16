function Alumno(matricula) {
    // Definición de la clase
    
    this.matricula = matricula;
    
    this.info = function () {
        console.log('Alumno con matrícula: ' + matricula);
    };
    
    // Definición de los métodos estáticos:
    return {
        lista: ["123", "345", "567"]
    };
}

var lista = Alumno().lista;

var alumno = new Alumno("456");

console.log(lista);

console.log(alumno);