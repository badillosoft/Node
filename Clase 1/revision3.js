function filtro(arr, condicion) {
    var arr2 = []; //new Array(arr.length);
    
    for(var i = 0; i < arr.length; i += 1) {
        if (condicion(arr[i])) {
            arr2.push(arr[i]);
        }
    }
    
    return arr2;
}

function es_par(x) {
    return x % 2 == 0;
}

filtro([1, 2, 3, 4, 5, 6], es_par);

var pares = filtro([1, 2, 3, 4, 5, 6], function (x) { return x % 2 == 0; });

console.log('Los pares de 1 a 6 son: ' + pares);
console.log(pares);

var impares = [1, 2, 3, 4, 5, 6].filter(function (x) { return x % 2 == 1 });

console.log('Los impares de 1 a 6 son: ' + impares);

[1, 2, 3, 4, 5].forEach(function(x) {
    console.log('> ' + x);
});