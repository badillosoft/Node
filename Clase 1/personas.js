var personas = [
    {
        "Nombre": "Abc",
        "Edad": 24
    },
    {
        "Nombre": "Def",
        "Edad": 68
    },
    {
        "Nombre": "Ghi",
        "Edad": 57
    },
    {
        "Nombre": "Jkl",
        "Edad": 46
    },
    {
        "Nombre": "Mno",
        "Edad": 35
    }
];

var mayores = personas.filter(function (p) {
    return p.Edad >= 40; 
});

console.log('Hay ' + mayores.length + ' personas mayores de 40 años: ');
console.log(mayores);

var ordEdad = personas.sort(function (a, b) { return a.Edad - b.Edad });

console.log(ordEdad);