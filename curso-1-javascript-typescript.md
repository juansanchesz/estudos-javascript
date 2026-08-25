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

### Aula 1.2 — Tipos primitivos
JavaScript tem: `number`, `string`, `boolean`, `undefined`, `null`, `object`.

```javascript
let vida = 100;              // number
let nomePersonagem = "Ash";  // string
let estaVivo = true;         // boolean
let equipamento;             // undefined (declarado, sem valor)
let arma = null;             // null (valor vazio intencional)
```

Diferente de Lua, JS **não** trata `0` ou `""` como automaticamente `false` em todo contexto — mas em condicionais eles se comportam como "falsy". Vamos ver isso na próxima aula.

### Aula 1.3 — Operadores e condicionais
```javascript
let vida = 30;

if (vida <= 0) {
  console.log("Personagem morreu");
} else if (vida < 20) {
  console.log("Vida crítica");
} else {
  console.log("Tudo certo");
}

// operador ternário — muito usado no dia a dia
let status = vida > 0 ? "vivo" : "morto";
```

**Exercício 1.3:** Escreva uma função (ainda vamos ver função na aula 1.5) que recebe a vida de um personagem e retorna "morto", "crítico" ou "saudável".

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

const criarPersonagem = (nome, classe = "Guerreiro") => {
  return { nome, classe, vida: 100 };
};
```

**Exercício 1.5:** Crie uma arrow function `calcularDano(ataque, defesa)` que retorna o dano líquido (ataque - defesa), nunca menor que 0.

### Exercícios complementares 1.6

Dez exercícios pra fixar tudo da Semana 1. Estão em ordem crescente de dificuldade. Crie um arquivo por exercício (`exercicio_1.6.1.js`, `1.6.2`, etc.) e rode com `node nome-do-arquivo.js`.

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
Escreva `descreverTipo(valor)` que recebe qualquer valor e retorna uma string no formato `"<typeof> — primitivo"` ou `"<typeof> — object"`. Atenção às duas pegadinhas: `null` e arrays.

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
