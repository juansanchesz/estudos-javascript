/*
**1.6.6 — `for...of`**
Crie `monstroMaisForte(monstros)` que recebe um array de objetos `{ nome, vida }` e retorna o **nome** do de maior vida. Não use `Math.max` nem métodos de array — percorra com `for...of` e vá guardando o líder atual.

```javascript
const monstros = [
  { nome: "Rat", vida: 20 },
  { nome: "Dragon", vida: 1000 },
  { nome: "Demon", vida: 5000 },
];
monstroMaisForte(monstros) // -> "Demon"
```

Pergunta pra pensar: o que sua função deve fazer se o array vier vazio?

---
*/

const monstros = [
    { nome: "Rat", vida: 20 },
    { nome: "Demon", vida: 5000 },
    { nome: "Dragon", vida: 1000 },
];

const monstroMaisForte = (monstros) => {
    let lider = null;
    for (const monstro of monstros) {
        if (!lider || monstro.vida > lider.vida) {
            lider = monstro;
        }
    }
    return lider ? lider.nome : null;
};

console.log(monstroMaisForte(monstros)); // Demon
