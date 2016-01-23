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

var db = mongoose.connection;

db.on('error', function (err) {
	console.log(err);
});

var connected = false;

db.once('open', function () {
	console.log('Se ha conectado con la base de datos');
	connected = true;
});

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
    insert: function (usuario, callback) {
        if (this.invalid(usuario)) {
            console.log('El usuario no es válido');
			callback(false);
            return false;
        }
		
        Usuarios.findOne(
			{ Correo: usuario.Correo },
			function(err, u) {
				if (err || u) {
					console.log('El usuario ya existe');
					callback(false);
					return;
				}
				
				var user = new Usuarios(usuario);
				
				user.save();
				callback(true);
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