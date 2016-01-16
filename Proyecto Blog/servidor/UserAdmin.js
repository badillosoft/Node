/*

Usuario:
    Nombre
    Correo*
    Clave
    
CRUD:
Create, Read, Update, Delete
*/

var usuarios = [];

module.exports = {
    invalid: function (usuario) {
        return !(usuario.Nombre ||
            usuario.Correo || usuario.Clave);
    },
    insert: function (usuario) {
        if (this.invalid(usuario)) {
            console.log('El usuario no es válido');
            return false;
        }
        
        for (var i = 0; i < usuarios.length; i += 1) {
            if (usuarios[i].Correo === usuario.correo) {
                console.log('El usuario ya existe');
                return false;
            }
        }
        
        usuarios.push(usuario);
        
        return true;
    },
    get: function (correo) {
        for (var i = 0; i < usuarios.length; i += 1) {
            if (usuarios[i].Correo === correo) {
                return usuarios[i];
            }
        }
        
        return null;
    },
    login: function (nombre, clave) {
        for (var i = 0; i < usuarios.length; i += 1) {
            if (usuarios[i].Nombre === nombre &&
                usuarios[i].Clave === clave) {
                return true;
            }
        }
        
        return false;
    },
    update: function (usuario) {
        if (this.invalid(usuario)) {
            console.log('El usuario no es válido');
            return false;
        }
        
        for (var i = 0; i < usuarios.length; i += 1) {
            if (usuarios[i].Correo === usuario.Correo ) {
                usuarios[i] = usuario;
                return true;
            }
        }
        
        return false;
    },
    print: function () {
        console.log(usuarios);
    }
};