// Alan Badillo - badillo.soft@hotmail.com
// Wifi - Aula1 : kmmx2015

var n = 12;
var str = "Hola"; // 'Hola'
var arr = [123, 'mundo', n, str];
var obj = {
    nombre: 'tal',
    edad: 30,
    direccion: {
        calle: 'Av Siempre Viva',
        otro: '...'
    },
    saludar: function (args) {
        console.log("Hola soy " + obj.nombre);
    }
};

obj.saludar();

var metodo = 'saludar';

try {
    obj[metodo]();
} catch (err) {
    console.log(err);
}