var personas = [
    {
        Nombre: "Pepe",
        Edad: 23
    },
    {
        Nombre: "Paco",
        Edad: 34
    },
    {
        Nombre: "Pedro",
        Edad: 28
    },
];

var mayores = personas.filter (function (p, i, arr, m) {
    return p.Edad >= m;
}, 3);

console.log();