/*
**1.6.10 — Valor vs referência**
Primeiro, **escreva num comentário o que você acha que vai imprimir**. Depois rode e compare.

```javascript
let a = 10;
let b = a;
b = 20;
console.log(a);

const p1 = { vida: 100 };
const p2 = p1;
p2.vida = 50;
console.log(p1.vida);

const inv1 = { pocoes: 3 };
const heroi = { nome: "Kael", inventario: inv1 };
const clone = { ...heroi };
clone.nome = "Copia";
clone.inventario.pocoes = 0;
console.log(heroi.nome, heroi.inventario.pocoes);
```

Agora corrija: faça `clone` ser totalmente independente de `heroi`, de forma que mexer no inventário do clone não afete o original.
*/

let a = 10;
let b = a;
b = 20;
console.log(a); // 10 -> copiou o valor, então a não muda

const p1 = { vida: 100 };
const p2 = p1;
p2.vida = 50;
console.log(p1.vida); // 50 -> copiou a referencia, então p1 e p2 apontam para o mesmo objeto

const inv1 = { pocoes: 3 };
const heroi = { nome: "Kael", inventario: inv1 };
const clone = { ...heroi };
const inv2 = { ...inv1 };
clone.nome = "Copia";
clone.inventario = inv2;
clone.inventario.pocoes = 0;
console.log(heroi.nome, heroi.inventario.pocoes); // Kael, 3
console.log(clone.nome, clone.inventario.pocoes); // Copia, 0
