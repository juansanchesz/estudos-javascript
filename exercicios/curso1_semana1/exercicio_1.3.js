let vida = 100;

function avaliarVida(vida) {
    if (vida >= 100) return ("100% de vida");
    if (vida >= 50) return ("Vida acima de 50%");
    if (vida >= 10) return ("Vida abaixo de 50%");
    return ("Vida crítica!");
}

console.log(avaliarVida(vida));
