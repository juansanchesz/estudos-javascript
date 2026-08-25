const calcularDano = (ataque, defesa) => {
    if (ataque < defesa) return 0;
    return ataque - defesa;
};
console.log(calcularDano(50, 20)); // 30
console.log(calcularDano(20, 50)); // 0
