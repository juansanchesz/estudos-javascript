/*
**1.6.9 — Piso e teto com `Math`**
Crie `curar(vidaAtual, cura, vidaMaxima)` que soma a cura sem nunca ultrapassar `vidaMaxima` e sem nunca ficar abaixo de 0. Resolva **sem `if`**, usando `Math.min` e `Math.max`.

```
curar(80, 50, 100)   -> 100    (não passa do teto)
curar(30, 20, 100)   -> 50
curar(50, -80, 100)  -> 0      (não desce do piso)
*/

const curar = (vidaAtual, cura, vidaMaxima) => {
    return Math.min(Math.max(vidaAtual + cura, 0), vidaMaxima);
};

console.log(curar(80, 50, 100)); // 100
console.log(curar(30, 20, 100)); // 50
console.log(curar(50, -80, 100)); // 0
