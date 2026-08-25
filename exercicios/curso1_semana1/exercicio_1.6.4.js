/*
**1.6.4 — Condicionais em cadeia**
Crie `classificarRaridade(valorEmOuro)` seguindo a tabela. Use *early return*, sem `else`.

| Ouro | Retorno |
|---|---|
| 1000 ou mais | `"Lendário"` |
| 500 a 999 | `"Épico"` |
| 100 a 499 | `"Raro"` |
| abaixo de 100 | `"Comum"` |

Teste as bordas: `1000`, `999`, `500`, `499`, `100`, `99`, `0`.
*/

const classificarRaridade = (valorEmOuro) => {
    if (valorEmOuro >= 1000) return "Lendário";
    if (valorEmOuro >= 500) return "Épico";
    if (valorEmOuro >= 100) return "Raro";
    return "Comum";
}

console.log(classificarRaridade(1000)); // Lendário
console.log(classificarRaridade(999)); // Épico
console.log(classificarRaridade(500)); // Épico
console.log(classificarRaridade(499)); // Raro
console.log(classificarRaridade(100)); // Raro
console.log(classificarRaridade(99)); // Comum
console.log(classificarRaridade(0)); // Comum
