var Persona = (function () {
    function Persona(nombre) {
        this.nombre = nombre;
    }
    
    return Persona;
})();

module.exports = {
    Persona: Persona,
    Anonimo: new Persona("Anónimo"),
    saludar: function () {
        console.log('Hola mundo');
    },
    a: 5
};