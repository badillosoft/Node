/*

Usuario:
    Nombre
    Correo*
    Clave
    
CRUD:
Create, Read, Update, Delete
*/

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/BlogApp');

mongoose.on('error', function (err) {
	console.log(err);
});

var connected = false;

mongoose.once('open', function () {
	console.log('Se ha conectado con la base de datos');
	connected = true;
});

var db = mongoose.connection;

var UsuariosSchema = new mongoose.Schema({
	Correo: String,
	Nombre: String, 
	Clave: String
});

var Usuarios = mongoose.model('Usuarios', UsuariosSchema);

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
		
        Usuarios.findOne(
			{ Correo: usuario.Correo },
			function(err, usuario) {
				if (err || usuario) {
					console.log('El usuario ya existe');
					return;
				}
				
				Usuarios.insertOne(usuario, function (err2) {
					if (err) {
						console.log('El usuario no pudo insertarse');
					} else {
						console.log('El usuario fue insertado');
					}
				});
			}
		);
        
        return true;
    },
    get: function (correo, callback) {
        Usuarios.findOne({Correo: correo}, function (err, usuario) {
			callback(usuario);
		});
    },
    login: function (nombre, clave, callback) {
        Usuarios.findOne({Nombre: nombre, Clave: clave}, function (err, usuario) {
			callback(!!usuario && !err);
		});
    },
    update: function (usuario, callback) {
        if (this.invalid(usuario)) {
            console.log('El usuario no es válido');
            return false;
        }
        
        Usuarios.update(usuario, function (err, usuario) {
			callback(!!usuario && !err);
		});
    }
};