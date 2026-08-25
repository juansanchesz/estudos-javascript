/*
**1.6.3 — Ternário**
Crie `podeEquipar(nivelJogador, nivelItem)` usando **apenas** um operador ternário (sem `if`). Retorna `"Equipado"` ou `"Nível insuficiente"`.

```
podeEquipar(10, 5)  -> "Equipado"
podeEquipar(5, 5)   -> "Equipado"
podeEquipar(3, 10)  -> "Nível insuficiente"
```
*/

const podeEquipar = (nivelJogador, nivelItem) => 
    nivelJogador >= nivelItem ? "Equipado" : "Nível insuficiente";


console.log(podeEquipar(10, 5)); // Equipado
console.log(podeEquipar(5, 5)); // Equipado
console.log(podeEquipar(3, 10)); // Nível insuficiente

