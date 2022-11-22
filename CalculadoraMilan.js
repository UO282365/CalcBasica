class Calculadora {


    constructor() {

        this.operandoA = 0;
        this.operandoB = 0;
        this.operacion = "";
        this.memoria = 0;
        this.hayValores = false;
        this.aux = true;
        this.decimalBool = true;
        this.primeraOperacion = true;
    }

    iniciar() {
        this.pantalla = document.querySelector('input[name="pantalla"]');
        this.pantalla.value = 0;
        document.addEventListener('keydown', (event) => {
            this.pulsaTeclado(event);
        });
    }

    pulsaTeclado(evento) {
        if (evento.key >= "0" && evento.key <= "9")
            this.digito(Number(evento.key));
        if (evento.altKey && evento.key == "s")
            this.signo;

        if (evento.altKey && evento.key == "o") {
            evento.preventDefault();
            this.on();
        }
        if (evento.altKey && evento.key == "c") {
            evento.preventDefault();
            this.ce();
        }
        if (evento.altKey && evento.key == "r") {
            evento.preventDefault();
            this.raiz();
        }
        if (evento.altKey && evento.key == "p") {
            evento.preventDefault();
            this.porcentaje();
        }

        if (evento.altKey && evento.key == "m") {
            evento.preventDefault();
            this.mrc();
        }
        if (evento.ctrlKey && evento.key == "m") {
            evento.preventDefault();
            this.mmas();
        }
        if (evento.altKey && evento.key == "n") {
            evento.preventDefault();
            this.mmenos();
        }


        if (evento.key == "*")
            this.operar("*");
        if (evento.key == "/")
            this.operar("/");
        if (evento.key == "-")
            this.operar("-");
        if (evento.key == "+")
            this.operar("+");

        if (evento.key == ".")
            this.decimal();
        if (evento.key == "Enter")
            this.igual();

    }

    digito(n) {
        if (this.aux == true) {
            this.pantalla.value = "";
            this.aux = false
            this.decimalBool = true;
        }
        var str = this.pantalla.value + n;
        this.pantalla.value = str;
    }

    on() {
        document.querySelector('input[name="pantalla"]').value = "0";
        this.operacion = "";
        this.operandoA = 0;
        this.operandoB = 0;
        this.aux = true;
        this.primeraOperacion = true;
        this.decimalBool = true;
        this.memoria = 0;
    }

    igual() {
        try {
            if (this.cogerValor == true) {
                this.operandoB = document.querySelector('input[name="pantalla"]').value;
                this.operandoA = Number(eval(this.operandoA + this.operacion + this.operandoB))
                document.querySelector('input[name="pantalla"]').value = this.operandoA;
                this.cogerValor = false;
            }
            else {
                this.operandoA = Number(eval(this.operandoA + this.operacion + this.operandoB))
                document.querySelector('input[name="pantalla"]').value = this.operandoA;
            }
            this.aux = true;

        } catch (e) {
            ;
        }
    }

    decimal() {
        if (this.decimalBool == true) {
            if (this.aux) {
                var str = "0.";
                this.aux = false;
            }
            else {
                var str = this.pantalla.value + ".";
            }
            this.pantalla.value = str;
            this.decimalBool = false;
        }
    }

    porcentaje() {
        if (this.primeraOperacion == false && this.aux == false) {
            if ((this.operacion == "/" || this.operacion == "*")) {
                this.cogerValor = false;
                var str = this.pantalla.value / 100;
                this.operandoB = str;
                this.igual();
                this.cogerValor = false;
            }
            else {
                this.cogerValor = false;
                var str = this.pantalla.value / 100 * this.operandoA;
                this.operandoB = str;
                this.igual();
                this.cogerValor = false;
            }
        }
    }

    operar(signo) {
        try {
            if (this.aux == false) {


                if (this.primeraOperacion) {
                    this.operacion = signo;
                    this.operandoA = document.querySelector('input[name="pantalla"]').value;
                    this.primeraOperacion = false;
                }

                else {
                    if (this.operacion != signo) {//otra operacion a la espera
                        this.igual();
                        this.operacion = signo;
                    }
                    else {
                        this.operandoB = document.querySelector('input[name="pantalla"]').value;

                        this.igual();
                    }
                }
                this.aux = true;
                this.cogerValor = true;
            }

            else {
                this.operacion = signo;
                this.operandoB = document.querySelector('input[name="pantalla"]').value;
                this.aux = true;
                this.cogerValor = true;
            }
        } catch (e) {
            ;
        }
    }

    cambiarSigno() {
        var str = this.pantalla.value * -1;
        this.pantalla.value = str;
    }

    raiz() {
        var str = this.pantalla.value;
        if (str >= 0) {
            this.pantalla.value = Math.sqrt(str);
        }

    }

    ce() {
        this.pantalla.value = "0";
        this.aux = true;
        this.decimalBool = true;
    }

    mrc() {
        if (this.memoria == 0)
            this.aux = true;
        this.pantalla.value = this.memoria;
    }

    mmas() {
        this.memoria = Number(eval(this.pantalla.value + "+" + this.memoria));
    }
    mmenos() {
        this.memoria -= this.pantalla.value;
    }

}

var calculadora = new Calculadora();