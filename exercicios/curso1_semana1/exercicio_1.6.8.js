/*
**1.6.8 — Parâmetros padrão**
Crie a arrow function `criarPersonagem(nome, classe, vida)` onde `classe` vale `"Guerreiro"` e `vida` vale `100` quando não forem informados. Retorna o objeto montado.

```
criarPersonagem("Kael")                  -> { nome: "Kael", classe: "Guerreiro", vida: 100 }
criarPersonagem("Mira", "Maga")          -> { nome: "Mira", classe: "Maga", vida: 100 }
criarPersonagem("Rog", "Ladino", 80)     -> { nome: "Rog", classe: "Ladino", vida: 80 }
```

Dica: `console.log` de um objeto já mostra o conteúdo, não precisa montar a string na mão.
*/

const criarPersonagem = (nome, classe = "Guerreiro", vida = 100) => {
    return { nome, classe, vida };
};

console.log(criarPersonagem("Kael")); // { nome: "Kael", classe: "Guerreiro", vida: 100 }
console.log(criarPersonagem("Mira", "Maga")); // { nome: "Mira", classe: "Maga", vida: 100 }
console.log(criarPersonagem("Rog", "Ladino", 80)); // { nome: "Rog", classe: "Ladino", vida: 80 }
