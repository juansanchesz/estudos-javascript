//**Exercício 1.5:** Crie uma arrow function `calcularDano(ataque, defesa)` que retorna o dano líquido (ataque - defesa), nunca menor que 0.

const calcularDano = (ataque, defesa) => {
    if (ataque < defesa) return 0;
    return ataque - defesa;
};
console.log(calcularDano(50, 20)); // 30
console.log(calcularDano(20, 50)); // 0
