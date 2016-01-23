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

var mongoose = require('mongoose');
var UAdmin = require('./UserAdmin');

mongoose.connect("mongodb://localhost/BlogApp");

var db = mongoose.connection;

var settings = {
	connected: false
};

db.on('error', function () {
	console.log('No pudo conectar con la base de datos');
	settings.connected = false;
});

db.once('open', function () {
	console.log('Se ha conectado con la base de datos');
	settings.connected = true;
}); 

var BlogSchema = new mongoose.Schema({
	Titulo: String,
	Contenido: String,
	Usuario: String,
	Fecha: String,
	Codigo: String,
});

var Blog = mongoose.model('Blog', BlogSchema);

module.exports = {
	settings: settings,
    invalid: function (entrada) {
        return !(entrada.Titulo || entrada.Contenido ||
            entrada.Fecha || entrada.Usuario);
    },
    insert: function (entrada, callback) {
        if (this.invalid(entrada)) {
            console.log('La entrada es inválida');
			callback(false);
            return;
        }
        
        entrada.Codigo = entrada.Codigo || this.getRandomCode();
        entrada.Comentarios = [];
		
		var blog = new Blog(entrada);
		blog.save();
    },
    insertComment: function (codigoEntrada, comentario) {
        var entrada = this.get(codigoEntrada);
        
        if (entrada == null) {
            console.log('La entrada no existe :(');
            return;
        }
        
        entrada.Comentarios.push(comentario);
    },
    getRandomCode: function () {
        return Math.random().toString(36)
            .replace(/[^a-z]+/g, '').substr(0, 5)
            .toUpperCase();
    },
    get: function (codigo, callback) {
        Blog.findOne({Codigo: codigo}, function (err, blog) {
			callback(blog);
		});
    },
    getAll: function (n, callback) {
        Blog.find({}, function (err, blog) {
			callback(blog);
		});
    },
	update: function (entrada, callback) {
        Blog.update({Codigo: entrada.Codigo}, entrada, function (err, blog) {
			callback(!!blog && !err);
		});
    }
};