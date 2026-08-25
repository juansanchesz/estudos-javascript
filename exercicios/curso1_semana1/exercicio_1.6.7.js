/*
**1.6.7 — `while`**
Crie `simularBatalha(vidaInimigo, danoPorGolpe)` que ataca em loop até a vida chegar a 0 ou menos, e retorna quantos golpes foram necessários. Imprima o estado a cada golpe com template string.

```
simularBatalha(100, 30) -> 4
simularBatalha(50, 50)  -> 1
```

Cuidado: se `danoPorGolpe` for 0, o loop nunca termina. Trate esse caso.
*/

const simularBatalha = (vidaInimigo, danoPorGolpe) => {
    let golpes = 0;
    if (danoPorGolpe <= 0 ) {
        console.log(`Dano por golpe deve ser maior que 0!`);
        return 0;
    }
    while (vidaInimigo > 0) {
        vidaInimigo -= danoPorGolpe;
        golpes++;
        console.log(`Inimigo recebeu um golpe e agora tem ${vidaInimigo} de vida. Até agora foram ${golpes} golpes.`);
    };
    return golpes;
};

simularBatalha(100, 30); // 4
simularBatalha(50, 50); // 1
simularBatalha(50, 0); // 0
