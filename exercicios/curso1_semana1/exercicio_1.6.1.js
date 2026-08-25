/*
**1.6.1 — Declarações**
O código abaixo tem três problemas de declaração. Reescreva corrigindo e explique em comentário o motivo de cada troca.

```javascript
var nomeJogador = "Kael";
let VIDA_MAXIMA = 100;
const pontos = 0;
pontos = pontos + 10;
```
*/

const nomeJogador = "Kael"; // coloquei const porque o nome não muda nunca
const VIDA_MAXIMA = 100; // coloquei const porque a vida também não muda e por estar em maiúsculo é uma convenção para indicar que é uma constante
let pontos = 0; // coloquei let porque os pontos são alterados logo na linha abaixo
pontos += 10;
