# Curso 1: Fundamentos de JavaScript + TypeScript
### (Fase 1 do plano — Semanas 1-6)

Esse curso assume que você já entende lógica básica (condicionais, loops, variáveis) pelo seu tempo com Lua. Vamos usar isso a seu favor: sempre que possível, vou comparar com Lua pra você aproveitar o que já sabe.

---

## Semana 1 — Sintaxe e tipos

### Aula 1.1 — Variáveis
Em Lua você declara com `local x = 10`. Em JavaScript:

```javascript
let idade = 25;        // pode mudar depois
const nome = "Kael";   // não pode mudar (equivalente a uma constante)
var antigo = "evite";  // forma antiga, quase não se usa mais
```

**Regra prática:** use `const` por padrão. Só use `let` quando o valor realmente vai mudar. Nunca use `var`.

### Aula 1.2 — Tipos primitivos e o tipo `object`

**Os sete tipos primitivos.** Primitivo é um valor simples, indivisível e imutável:

| Tipo | Exemplo | Pra que serve |
|---|---|---|
| `number` | `100`, `3.14`, `-7` | todo número (JS não separa int de float como C) |
| `string` | `"Ash"` | texto |
| `boolean` | `true`, `false` | verdadeiro/falso |
| `undefined` | — | declarado, mas sem valor ainda |
| `null` | `null` | vazio **intencional** |
| `symbol` | `Symbol("id")` | identificador único (raro no dia a dia) |
| `bigint` | `9007199254740993n` | inteiros gigantes (raro) |

```javascript
const vida = 100;              // number
const nomePersonagem = "Ash";  // string
const estaVivo = true;         // boolean
let equipamento;               // undefined (declarado, sem valor)
const arma = null;             // null (valor vazio intencional)
```

Na prática você vive dos cinco primeiros. `symbol` e `bigint` existem, mas pode ignorá-los por enquanto.

**Diferença entre `undefined` e `null`:** `undefined` é o JavaScript dizendo "ninguém pôs valor aqui". `null` é você dizendo "aqui está vazio de propósito". Em Lua os dois papéis são cobertos por um único `nil`.

**Template strings.** Pra montar texto com valores dentro, use crase em vez de aspas:

```javascript
const nome = "Kael";
const vida = 30;

// forma antiga, com concatenação
console.log("O " + nome + " tem " + vida + " de vida");

// template string — crase + ${}
console.log(`O ${nome} tem ${vida} de vida`);
```

Dentro do `${}` cabe qualquer expressão, não só uma variável: `${vida * 2}` ou `${vida > 0 ? "vivo" : "morto"}` funcionam. Equivale ao `..` de Lua, só que muito mais legível.

**E o `object`?** É o único tipo **não-primitivo** de JavaScript — tudo que não está na tabela acima é `object`: objetos, arrays, funções, `Date`, `Map`. É o parente do `table` de Lua.

```javascript
const jogador = { nome: "Kael", vida: 100 };   // object
const itens = ["espada", "escudo"];            // object (array é object)
```

**Descobrindo o tipo: `typeof`.** É um operador que devolve o nome do tipo como string. Não é função, não precisa de parênteses:

```javascript
typeof 42          // "number"
typeof "oi"        // "string"
typeof true        // "boolean"
typeof undefined   // "undefined"
typeof { a: 1 }    // "object"
```

Equivale ao `type(x)` de Lua. Mas ele tem duas armadilhas famosas:

```javascript
typeof null        // "object"  <- bug histórico da linguagem; null É primitivo
typeof [1, 2]      // "object"  <- array é object mesmo; pra detectar array use Array.isArray()
```

O `typeof null` retornar `"object"` é um erro que existe desde 1995 e nunca foi corrigido, porque consertar quebraria metade da web. Você só precisa saber que ele existe: **pra testar se algo é `null`, compare direto** com `valor === null`.

**Valor vs referência — a diferença que mais gera bug.** A regra de atribuição é a mesma nos dois casos: `b = a` copia o que está dentro da "caixa" de `a`. O que muda é *o que está dentro da caixa*.

Num primitivo, a caixa guarda o próprio valor:

```javascript
let a = 10;
let b = a;   // copia o 10
b = 20;
console.log(a);  // 10 — caixas independentes
```

Num object, o valor não cabe na caixa. Ele mora em outro lugar da memória, e a caixa guarda só o **endereço**:

```javascript
const p1 = { vida: 100 };
const p2 = p1;   // copia o endereço, não o objeto
p2.vida = 50;
console.log(p1.vida);  // 50 — as duas apontam pro mesmo objeto!
```

```
p1: [ ->0xA1 ]  --+
                  +-->  0xA1: { vida: 100 }
p2: [ ->0xA1 ]  --+
```

Repare na diferença entre mexer na caixa e mexer no objeto:

```javascript
p2 = { vida: 50 };   // troca a CAIXA de p2 — p1 fica intacto
p2.vida = 50;        // muda o OBJETO compartilhado — p1 enxerga a mudança
```

Em Lua é idêntico: `number` e `string` são valor, `table` é referência.

**Copiando de verdade.** Quando você quer um objeto independente, use spread (`...`):

```javascript
const original = { vida: 100, classe: "Guerreiro" };
const copia = { ...original };
copia.vida = 50;
console.log(original.vida);  // 100 ✓
```

Cuidado: o spread é uma cópia **rasa**. Objetos dentro de objetos continuam compartilhados:

```javascript
const heroi = { nome: "Kael", inventario: { pocoes: 3 } };
const clone = { ...heroi };
clone.inventario.pocoes = 0;
console.log(heroi.inventario.pocoes);  // 0 — o inventario é o MESMO objeto
```

Pra copiar tudo em profundidade: `structuredClone(heroi)`.

Essa é a causa da maioria dos bugs de "o estado não atualiza" em React. Vale entender agora, não depois.

**Acessando propriedades.** Duas formas, e você vai usar as duas:

```javascript
const jogador = { nome: "Kael", vida: 100 };

jogador.nome        // "Kael"  — notação de ponto, o padrão
jogador["nome"]     // "Kael"  — colchetes, quando a chave está numa variável

jogador.vida = 80;        // altera
jogador.classe = "Mago";  // cria uma propriedade nova
```

Vamos nos aprofundar em objetos e arrays na Semana 2 — por ora, basta saber ler e escrever propriedades.

### Aula 1.3 — Operadores e condicionais

**Comparação.** Use sempre os de três caracteres:

| Operador | Significado |
|---|---|
| `===` | igual em valor **e** tipo |
| `!==` | diferente em valor **ou** tipo |
| `>` `<` | maior / menor |
| `>=` `<=` | maior ou igual / menor ou igual |

```javascript
5 === 5      // true
5 === "5"    // false — number não é string
5 !== "5"    // true
vida >= 100  // true se vida for 100 ou mais
```

**Nunca use `==` e `!=`.** Eles convertem os tipos antes de comparar, e o resultado é imprevisível:

```javascript
5 == "5"           // true
0 == false         // true
"" == 0            // true
null == undefined  // true
```

Em Lua só existe `==`, e ele já se comporta como o `===` de JS. A tradução mental é: **o `==` que você conhece de Lua virou `===` aqui.**

**Lógicos.**

```javascript
vida > 0 && temPocao      // E   — os dois precisam ser true
vida <= 0 || desistiu     // OU  — basta um ser true
!estaVivo                 // NÃO — inverte
```

Em Lua seriam `and`, `or`, `not`.

**Atribuição.** Quando você opera sobre a própria variável, abrevie:

```javascript
let pontos = 0;

pontos = pontos + 10;   // funciona
pontos += 10;           // idêntico, e é a forma usada na prática

pontos -= 5;   // subtrai
pontos *= 2;   // multiplica
pontos /= 4;   // divide

pontos++;      // soma 1
pontos--;      // subtrai 1
```

O `+=` é o coração do padrão **acumulador**: uma variável que vai somando a cada volta de um loop.

**Condicionais.**

```javascript
const vida = 30;

if (vida <= 0) {
  console.log("Personagem morreu");
} else if (vida < 20) {
  console.log("Vida crítica");
} else {
  console.log("Tudo certo");
}

// operador ternário — muito usado no dia a dia
const status = vida > 0 ? "vivo" : "morto";
```

**A ordem das condições importa.** Num `else if`, quando o segundo teste roda é porque o primeiro já falhou. Isso permite simplificar:

```javascript
if (vida >= 100) { ... }
else if (vida > 50) { ... }   // aqui vida já é < 100, não precisa testar de novo
```

E cuidado com as **bordas**: se você escreve `vida > 50` num teste e `vida < 50` no outro, o valor exato `50` não cai em nenhum dos dois e escorrega pro `else`. Sempre teste os números exatos das fronteiras.

**Truthy e falsy.** Dentro de um `if`, todo valor tem um "valor de verdade" mesmo sem comparação. Só estes seis são **falsy**:

```javascript
false, 0, "", null, undefined, NaN
```

Todo o resto é truthy — inclusive `"0"`, `"false"`, `[]` e `{}`.

```javascript
if (nomeJogador) { ... }   // roda se nomeJogador não for "" nem undefined
```

Aqui mora a maior diferença em relação a Lua: **em Lua só `nil` e `false` são falsos** — `0` e `""` são verdadeiros. Em JavaScript `0` e `""` são falsos. Se você escrever `if (vida)` esperando "tem vida definida", vai se surpreender quando `vida` for `0`.

**Exercício 1.3:** Escreva uma função que recebe a vida de um personagem e retorna "morto", "crítico" ou "saudável". A sintaxe de funções só é explicada na Aula 1.5, mas você já pode usar este molde:

```javascript
function avaliarVida(vida) {
  // suas condicionais aqui
}
```

### Aula 1.4 — Loops
```javascript
// for clássico
for (let i = 0; i < 5; i++) {
  console.log(`Volta ${i}`);
}

// for...of — para percorrer listas (o mais usado no dia a dia)
const itens = ["espada", "escudo", "poção"];
for (const item of itens) {
  console.log(item);
}

// while
let tentativas = 3;
while (tentativas > 0) {
  tentativas--;
}
```

### Aula 1.5 — Funções

```javascript
// forma tradicional
function somar(a, b) {
  return a + b;
}

// arrow function — forma moderna, você vai ver isso o tempo todo
const somar2 = (a, b) => a + b;
```

Note a diferença de pontuação: `function somar() {}` é uma **declaração** e não leva `;` no fim. `const somar2 = () => {};` é uma **atribuição de variável**, e leva.

**`return` não é `console.log`.** Essa confusão trava muita gente no começo:

```javascript
// com console.log — a função fala sozinha e o valor morre ali dentro
const avaliar = (vida) => { console.log("crítico"); };
const r = avaliar(10);
console.log(r);   // undefined

// com return — a função responde, e quem chamou decide o que fazer
const avaliar2 = (vida) => { return "crítico"; };
const r2 = avaliar2(10);
if (r2 === "crítico") { usarPocao(); }
```

Uma função que só imprime serve pra uma coisa. Uma função que retorna serve pra qualquer coisa.

**Chamar não é imprimir.** Se você escrever só `avaliar2(10);`, a função roda, devolve o valor... e ninguém o pega. Não aparece nada na tela. Pra ver o resultado: `console.log(avaliar2(10));`.

**Arrow function: com e sem chaves.** A regra que resolve tudo: **`return` só existe dentro de chaves.** Ou você usa chaves e escreve o `return`, ou não usa nenhum dos dois.

```javascript
const f = (a, b) => a + b;              // sem chaves: return implícito
const g = (a, b) => { return a + b; };  // com chaves: return obrigatório
```

| Escrita | Resultado |
|---|---|
| `=> a + b` | retorna `a + b` ✓ |
| `=> { return a + b; }` | retorna `a + b` ✓ |
| `=> return a + b` | **SyntaxError** — o arquivo nem roda |
| `=> { a + b; }` | retorna `undefined` — roda, mas silenciosamente errado |

As duas últimas são os erros clássicos. Misturar seta e `return` sem chaves quebra na hora:

```javascript
const i = (a, b) => return a + b;   // SyntaxError: Unexpected token 'return'
```

O motivo é que `return` é um **comando**, e sem chaves o corpo da arrow function precisa ser uma **expressão** — algo que já é um valor por si só. As chaves criam um bloco, e é dentro de bloco que comandos como `return` podem existir.

Já o caso `{ a + b; }` é mais traiçoeiro: não dá erro nenhum, a função só devolve `undefined` e o bug aparece longe dali.

**Retornando objeto sem chaves.** Uma pegadinha que todo mundo esbarra:

```javascript
const criar = (nome) => { nome: nome };     // retorna undefined!
```

O JavaScript lê aquelas chaves como bloco de código, não como objeto literal. Pra deixar claro que é um objeto, envolva em parênteses:

```javascript
const criar = (nome) => ({ nome: nome });   // ✓ agora é objeto
```

Na dúvida, use a forma com bloco e `return` — é mais longa, mas não tem ambiguidade:

```javascript
const criar = (nome) => {
  return { nome };
};
```

**Parâmetros padrão.** Um valor usado quando o argumento não é informado:

```javascript
const criarPersonagem = (nome, classe = "Guerreiro", vida = 100) => {
  return { nome, classe, vida };
};

criarPersonagem("Kael");                 // { nome: "Kael", classe: "Guerreiro", vida: 100 }
criarPersonagem("Mira", "Maga");         // { nome: "Mira", classe: "Maga", vida: 100 }
criarPersonagem("Rog", "Ladino", 80);    // { nome: "Rog", classe: "Ladino", vida: 80 }
```

Repare no `{ nome, classe, vida }` do `return`: quando a propriedade tem o mesmo nome da variável, você pode escrever só uma vez. É atalho para `{ nome: nome, classe: classe, vida: vida }`.

**Early return (guard clause).** Como o `return` encerra a função na hora, você não precisa de `else`:

```javascript
// com else — aninhado
const classificar = (vida) => {
  if (vida >= 100) {
    return "cheio";
  } else if (vida > 50) {
    return "saudável";
  } else {
    return "ferido";
  }
};

// com early return — plano e mais fácil de ler
const classificar2 = (vida) => {
  if (vida >= 100) return "cheio";
  if (vida > 50) return "saudável";
  return "ferido";
};
```

É o padrão preferido no dia a dia: trata os casos especiais logo na entrada e deixa o caminho principal sem indentação.

**Funções que já vêm prontas: `Math`.** JavaScript traz um conjunto de utilitários matemáticos:

```javascript
Math.max(10, 25, 7)   // 25 — o maior dos argumentos
Math.min(10, 25, 7)   // 7  — o menor
Math.floor(3.9)       // 3  — arredonda pra baixo
Math.ceil(3.1)        // 4  — arredonda pra cima
Math.round(3.5)       // 4  — arredonda normal
Math.random()         // número aleatório entre 0 e 1
Math.abs(-30)         // 30 — valor absoluto
```

Os dois primeiros rendem um truque que aparece o tempo todo em lógica de jogo:

```javascript
Math.max(0, valor)          // cria um PISO: nunca menor que 0
Math.min(100, valor)        // cria um TETO: nunca maior que 100
Math.min(100, Math.max(0, valor))   // prende entre 0 e 100
```

Isso substitui um `if` inteiro e comunica melhor a intenção. Em Lua é `math.max` / `math.min`, praticamente igual — só muda a maiúscula.

**Exercício 1.5:** Crie uma arrow function `calcularDano(ataque, defesa)` que retorna o dano líquido (ataque - defesa), nunca menor que 0.

### Exercícios complementares 1.6

Dez exercícios pra fixar tudo da Semana 1. Estão em ordem crescente de dificuldade. Crie um arquivo por exercício em `exercicios/curso1_semana1/` (`exercicio_1.6.1.js`, `exercicio_1.6.2.js`, etc.) e rode com `node exercicios/curso1_semana1/exercicio_1.6.1.js`.

Cada um traz os casos de teste esperados — use-os pra conferir sozinho antes de me perguntar.

---

**1.6.1 — Declarações**
O código abaixo tem três problemas de declaração. Reescreva corrigindo e explique em comentário o motivo de cada troca.

```javascript
var nomeJogador = "Kael";
let VIDA_MAXIMA = 100;
const pontos = 0;
pontos = pontos + 10;
```

---

**1.6.2 — Primitivo ou object?**
Escreva `descreverTipo(valor)` que responde **duas perguntas** sobre um valor e junta as respostas numa string só: o que o `typeof` diz, e se o valor é de fato primitivo ou object.

O motivo de a função existir é que `typeof` mente num caso: ele responde `"object"` para `null`, `[1, 2]` e `{ a: 1 }` — mas `null` é primitivo. Sua função corrige isso.

```
descreverTipo(42)        -> "number — primitivo"
descreverTipo("oi")      -> "string — primitivo"
descreverTipo(null)      -> "object — primitivo"   (typeof mente aqui)
descreverTipo([1, 2])    -> "object — object"
descreverTipo({ a: 1 })  -> "object — object"
```

---

**1.6.3 — Ternário**
Crie `podeEquipar(nivelJogador, nivelItem)` usando **apenas** um operador ternário (sem `if`). Retorna `"Equipado"` ou `"Nível insuficiente"`.

```
podeEquipar(10, 5)  -> "Equipado"
podeEquipar(5, 5)   -> "Equipado"
podeEquipar(3, 10)  -> "Nível insuficiente"
```

---

**1.6.4 — Condicionais em cadeia**
Crie `classificarRaridade(valorEmOuro)` seguindo a tabela. Use *early return*, sem `else`.

| Ouro | Retorno |
|---|---|
| 1000 ou mais | `"Lendário"` |
| 500 a 999 | `"Épico"` |
| 100 a 499 | `"Raro"` |
| abaixo de 100 | `"Comum"` |

Teste as bordas: `1000`, `999`, `500`, `499`, `100`, `99`, `0`.

---

**1.6.5 — Loop `for`**
Crie `xpTotalAteNivel(nivel)`. Cada nível N custa `N * 100` de XP. A função soma o custo de todos os níveis de 1 até `nivel`.

```
xpTotalAteNivel(1)  -> 100
xpTotalAteNivel(3)  -> 600     (100 + 200 + 300)
xpTotalAteNivel(5)  -> 1500
xpTotalAteNivel(0)  -> 0
```

---

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

**1.6.7 — `while`**
Crie `simularBatalha(vidaInimigo, danoPorGolpe)` que ataca em loop até a vida chegar a 0 ou menos, e retorna quantos golpes foram necessários. Imprima o estado a cada golpe com template string.

```
simularBatalha(100, 30) -> 4
simularBatalha(50, 50)  -> 1
```

Cuidado: se `danoPorGolpe` for 0, o loop nunca termina. Trate esse caso.

---

**1.6.8 — Parâmetros padrão**
Crie a arrow function `criarPersonagem(nome, classe, vida)` onde `classe` vale `"Guerreiro"` e `vida` vale `100` quando não forem informados. Retorna o objeto montado.

```
criarPersonagem("Kael")                  -> { nome: "Kael", classe: "Guerreiro", vida: 100 }
criarPersonagem("Mira", "Maga")          -> { nome: "Mira", classe: "Maga", vida: 100 }
criarPersonagem("Rog", "Ladino", 80)     -> { nome: "Rog", classe: "Ladino", vida: 80 }
```

Dica: `console.log` de um objeto já mostra o conteúdo, não precisa montar a string na mão.

---

**1.6.9 — Piso e teto com `Math`**
Crie `curar(vidaAtual, cura, vidaMaxima)` que soma a cura sem nunca ultrapassar `vidaMaxima` e sem nunca ficar abaixo de 0. Resolva **sem `if`**, usando `Math.min` e `Math.max`.

```
curar(80, 50, 100)   -> 100    (não passa do teto)
curar(30, 20, 100)   -> 50
curar(50, -80, 100)  -> 0      (não desce do piso)
```

---

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

---

## Semana 2 — Estruturas de dados

### Aula 2.1 — Arrays e métodos essenciais
Isso é o que mais separa quem programa "tipo script de jogo" de quem programa profissionalmente. Domine estes três:

```javascript
const monstros = [
  { nome: "Rat", vida: 20 },
  { nome: "Dragon", vida: 1000 },
  { nome: "Demon", vida: 5000 },
];

// map — transforma cada item, retorna novo array
const nomes = monstros.map(m => m.nome);
// ["Rat", "Dragon", "Demon"]

// filter — filtra itens que passam numa condição
const fortes = monstros.filter(m => m.vida > 500);
// [{nome: "Dragon", ...}, {nome: "Demon", ...}]

// reduce — reduz tudo a um único valor
const vidaTotal = monstros.reduce((total, m) => total + m.vida, 0);
// 6020
```

**Por que isso importa tanto:** em entrevista técnica júnior, é praticamente garantido que vão te pedir pra usar `map`/`filter`/`reduce`. Pratique até ficar automático.

**Exercício 2.1:** Dado o array `monstros` acima, retorne apenas os nomes dos monstros com vida acima de 100.

### Aula 2.2 — Objetos
```javascript
const jogador = {
  nome: "Kael",
  nivel: 50,
  inventario: ["espada", "poção"],
  atacar() {
    console.log(`${this.nome} ataca!`);
  }
};

// desestruturação — muito usado
const { nome, nivel } = jogador;

// spread — copiar/combinar objetos
const jogadorAtualizado = { ...jogador, nivel: 51 };
```

### Aula 2.3 — JSON
Todo backend fala JSON. É essencialmente objetos JS em formato texto.

```javascript
const objeto = { nome: "Kael", nivel: 50 };
const texto = JSON.stringify(objeto);  // vira string
const voltaObjeto = JSON.parse(texto); // volta a ser objeto
```

**Exercício 2.3:** Crie um objeto representando um personagem de RPG com pelo menos 4 propriedades, converta para JSON com `stringify`, imprima no console, depois converta de volta com `parse`.

---

## Semana 3 — Assincronismo

### Aula 3.1 — Por que assincronismo existe
Em Lua/scripts de servidor, você já viu algo parecido com callbacks/eventos. JavaScript é single-threaded, então operações demoradas (buscar dado da internet, ler arquivo) não podem travar o programa — daí o conceito de assíncrono.

### Aula 3.2 — Promises
```javascript
function buscarJogador(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) {
        resolve({ id, nome: "Kael" });
      } else {
        reject("ID inválido");
      }
    }, 1000);
  });
}

buscarJogador(1)
  .then(jogador => console.log(jogador))
  .catch(erro => console.error(erro));
```

### Aula 3.3 — async/await (a forma que você vai usar 95% do tempo)
```javascript
async function main() {
  try {
    const jogador = await buscarJogador(1);
    console.log(jogador);
  } catch (erro) {
    console.error(erro);
  }
}

main();
```

**Regra prática:** toda função que usa `await` dentro precisa ser declarada `async`.

### Aula 3.4 — Fetch (consumir API)
```javascript
async function pegarPokemon(nome) {
  const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`);
  const dados = await resposta.json();
  console.log(dados.name, dados.height);
}

pegarPokemon("pikachu");
```

**Exercício 3.4 (projeto da semana):** Use a PokéAPI (`https://pokeapi.co/api/v2/pokemon/{nome}`) pra criar um script que busca 3 pokémons diferentes e imprime nome + altura + peso de cada um no console.

---

## Semana 4 — TypeScript

### Aula 4.1 — Por que TypeScript
JavaScript não checa tipos — você só descobre um erro de tipo em runtime (rodando o código). TypeScript adiciona checagem de tipos **antes** de rodar, o que evita muito bug bobo. Empresas sérias usam TS por padrão hoje.

### Aula 4.2 — Tipos básicos
```typescript
let vida: number = 100;
let nome: string = "Kael";
let vivo: boolean = true;

function somar(a: number, b: number): number {
  return a + b;
}
```

### Aula 4.3 — Interfaces (o mais usado no dia a dia)
```typescript
interface Personagem {
  nome: string;
  nivel: number;
  vida: number;
  inventario?: string[]; // ? = opcional
}

function criarPersonagem(dados: Personagem): Personagem {
  return dados;
}

const kael: Personagem = {
  nome: "Kael",
  nivel: 50,
  vida: 100,
};
```

### Aula 4.4 — Types e union types
```typescript
type Classe = "guerreiro" | "mago" | "arqueiro";

function definirClasse(classe: Classe) {
  console.log(`Classe escolhida: ${classe}`);
}

definirClasse("mago");     // ok
// definirClasse("ladino"); // erro! TypeScript avisa antes de rodar
```

**Exercício 4.4:** Converta o objeto `jogador` da Aula 2.2 pra TypeScript, criando uma interface `Jogador` com tipos corretos para cada propriedade.

---

## Semana 5-6 — Git, GitHub e projeto final da fase

### Aula 5.1 — Git essencial
```bash
git init
git add .
git commit -m "primeiro commit"
git branch feature/nova-funcionalidade
git checkout feature/nova-funcionalidade
git push origin feature/nova-funcionalidade
```

Fluxo profissional real: você nunca trabalha direto na branch `main`. Cria uma branch nova pra cada funcionalidade, e abre um **Pull Request** no GitHub pra revisão antes de juntar na `main`.

### Aula 5.2 — Estruturando seu perfil GitHub
- Crie um repositório por exercício importante, ou um repositório único "estudos-javascript" bem organizado por pastas
- Escreva um `README.md` em cada projeto explicando o que ele faz (em inglês, já adiantando a Fase 4)
- Configure seu perfil GitHub com foto, bio curta em inglês, e fixe (pin) seus 2-3 melhores repositórios

### Projeto final da Fase 1
Construa um **script de linha de comando em Node.js + TypeScript** que:
1. Tem um array de "monstros" (objeto com nome, vida, ataque)
2. Simula uma batalha simples entre dois monstros usando funções
3. Usa `map`/`filter`/`reduce` em pelo menos um ponto
4. Busca dados de uma API externa (ex: PokéAPI) pra "importar" um monstro extra
5. Está tipado com interfaces TypeScript
6. Está no GitHub com README explicando como rodar

Esse projeto é seu primeiro item de portfólio real. Guarde o link.

---

## Checklist de saída da Fase 1
- [ ] Entendo `let`/`const`, tipos, condicionais e loops sem consultar
- [ ] Uso `map`, `filter`, `reduce` sem precisar pensar muito
- [ ] Entendo `async`/`await` e sei consumir uma API com `fetch`
- [ ] Escrevi interfaces e tipos básicos em TypeScript
- [ ] Tenho um projeto no GitHub com commits organizados e README
