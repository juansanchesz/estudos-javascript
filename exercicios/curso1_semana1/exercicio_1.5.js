

const calcularDano = (ataque, defesa) => {
    if (ataque < defesa) {
        return 0;
    }
    return ataque - defesa;
};