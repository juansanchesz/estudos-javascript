const vida = 0;

function avaliarVida(vida) {
    if (vida >= 20) return "Saudável";
    if (vida > 0) return "Vida Crítica!";
    return "Morto!";
}

console.log(avaliarVida(vida));
