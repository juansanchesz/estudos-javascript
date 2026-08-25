//**Exercício 1.3:** Escreva uma função que recebe a vida de um personagem e retorna "morto", "crítico" ou "saudável". A sintaxe de funções só é explicada na Aula 1.5, mas você já pode usar este molde:

const vida = 0;

function avaliarVida(vida) {
    if (vida >= 20) return "Saudável";
    if (vida > 0) return "Vida Crítica!";
    return "Morto!";
}

console.log(avaliarVida(vida));
