/*
**1.6.5 — Loop `for`**
Crie `xpTotalAteNivel(nivel)`. Cada nível N custa `N * 100` de XP. A função soma o custo de todos os níveis de 1 até `nivel`.

```
xpTotalAteNivel(1)  -> 100
xpTotalAteNivel(3)  -> 600     (100 + 200 + 300)
xpTotalAteNivel(5)  -> 1500
xpTotalAteNivel(0)  -> 0
```
*/

const xpTotalAteNivel = (nivel) => {
    let xpTotal = 0;
    for (let i = 1; i <= nivel; i++) {
        xpTotal += i * 100;
    }
    return xpTotal;
};

console.log(xpTotalAteNivel(1)); // 100
console.log(xpTotalAteNivel(3)); // 600
console.log(xpTotalAteNivel(5)); // 1500
console.log(xpTotalAteNivel(0)); // 0
