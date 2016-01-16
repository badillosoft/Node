var obj = {
    Nombre: "Tal",
    Edad: 12,
    Saludar: function () {
        console.log('Hola me llamo ' + this.Nombre);
    }
};

var calculadora = {
    ans: 0,
    dis_num: 0,
    op: "+",
    clear: function () {
        this.dis_num = 0;
    },
    clear_all: function () {
        this.dis_num = 0;
        this.ans = 0;
    },
    put_number: function (n) {
        this.dis_num = n;
    },
    "+": function () {
        this.ans += this.dis_num;
        this.op = "+";
    },
    "-": function () {
        this.ans -= this.dis_num;
        this.op = "-";
    },
    "*": function () {
        this.ans *= this.dis_num;
        this.op = "*";
    },
    "/": function () {
        if (this.dis_num == 0) {
            console.log('Math error');
            return;
        }
        
        this.ans /= this.dis_num;
        this.op = "/";
    },
    "=": function () {
        this[this.op]();
    },
};

calculadora.put_number(12);
calculadora["+"]();
calculadora.put_number(12);
calculadora["="]();

console.log('12 + 12 = ' + calculadora.ans);