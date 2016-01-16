var UserAdmin = require("./UserAdmin");

UserAdmin.insert({
    Nombre: "pepe",
    Correo: "pepe@gmail.com",
    Clave: "pepetoro"
});

UserAdmin.print();

console.log( UserAdmin.login("pepe", "pepetoro") );

console.log( UserAdmin.get("pepe@gmail.co") );

var pepe = UserAdmin.get("pepe@gmail.com");

pepe.Clave = "jaimito";

UserAdmin.update(pepe);

UserAdmin.print();