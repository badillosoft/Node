/*

Entrada:
    Codigo *
    Titulo
    Contenido
    Fecha
    Usuario
    Comentarios []
    
Comentario:
    Id *
    Contenido
    Usuario
    Fecha
    
*/

var UAdmin = require('./UserAdmin'); 

var entradas = [];

module.exports = {
    invalid: function (entrada) {
        return !(entrada.Titulo || entrada.Contenido ||
            entrada.Fecha || entrada.Usuario);
    },
    insert: function (entrada) {
        if (this.invalid(entrada)) {
            console.log('La entrada es inválida');
            return false;
        }
        
        entrada.Codigo = entrada.Codigo || this.getRandomCode();
        entrada.Comentarios = [];
        
        entradas.push(entrada);
        
        return true;
    },
    insertComment: function (codigoEntrada, comentario) {
        var entrada = this.get(codigoEntrada);
        
        if (entrada == null) {
            console.log('La entrada no existe :(');
            return false;
        }
        
        entrada.Comentarios.push(comentario);
        
        return true;
    },
    getRandomCode: function () {
        return Math.random().toString(36)
            .replace(/[^a-z]+/g, '').substr(0, 5)
            .toUpperCase();
    },
    get: function (codigo) {
        for (var i = 0; i < entradas.length; i++) {
            if (entradas[i].Codigo === codigo) {
                return entradas[i];
            }
        }
        
        return null;
    }
};