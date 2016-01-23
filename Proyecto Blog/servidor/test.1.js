var UserAdmin = require("./UserAdmin");

UserAdmin.insert({
    Nombre: "pepe",
    Correo: "pepe@gmail.com",
    Clave: "pepetoro"
}, function (success) {
	console.log('Se agregó al usuario? ' + success);
});

UserAdmin.get("pepe@gmail.com", function (pepe) {
	console.log(pepe);
});

