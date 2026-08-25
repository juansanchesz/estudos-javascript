# Curso 2: Backend com Node.js, Express e MySQL
### (Fase 2 do plano — Semanas 7-14)

Aqui é onde seu MySQL prévio vira vantagem de verdade. Vamos construir APIs reais, do tipo que empresa contrata gente pra manter.

---

## Semana 7 — Node.js fundamentos

### Aula 7.1 — O que é Node e o event loop
Node roda JavaScript fora do navegador. A ideia central é o **event loop**: operações demoradas (banco de dados, arquivos, rede) não bloqueiam o programa — elas rodam "em segundo plano" e avisam quando terminam.

```javascript
console.log("1");
setTimeout(() => console.log("2"), 0);
console.log("3");
// imprime: 1, 3, 2 — mesmo com delay 0!
```
Isso acontece porque `setTimeout` sempre vai pra "fila de espera", mesmo com 0ms.

### Aula 7.2 — NPM e package.json
```bash
npm init -y
npm install express
npm install -D typescript @types/node
```

`package.json` é o "manifesto" do seu projeto: nome, dependências, scripts.

```json
{
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc"
  }
}
```

### Aula 7.3 — Variáveis de ambiente
Nunca coloque senha de banco direto no código.

```bash
# .env
DATABASE_URL="mysql://usuario:senha@localhost:3306/meubanco"
PORT=3000
```

```javascript
import "dotenv/config";
const porta = process.env.PORT;
```

Adicione `.env` no `.gitignore` — isso é **obrigatório**, senha nunca vai pro GitHub.

---

## Semana 8 — Fundamentos de servidor HTTP

### Aula 8.1 — O básico sem framework (pra entender o que Express faz por baixo)
```javascript
import http from "node:http";

const servidor = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ mensagem: "olá" }));
});

servidor.listen(3000, () => console.log("Rodando na porta 3000"));
```

Isso funciona, mas é trabalhoso — por isso usamos Express.

---

## Semanas 9-11 — Express e APIs REST

### Aula 9.1 — Primeira API com Express
```javascript
import express from "express";
const app = express();
app.use(express.json()); // permite ler JSON no corpo da requisição

app.get("/personagens", (req, res) => {
  res.json([{ nome: "Kael", nivel: 50 }]);
});

app.listen(3000, () => console.log("Rodando na porta 3000"));
```

### Aula 9.2 — Rotas CRUD completas
CRUD = Create, Read, Update, Delete. É o esqueleto de praticamente toda API.

```javascript
let personagens = [{ id: 1, nome: "Kael", nivel: 50 }];

app.get("/personagens", (req, res) => {
  res.json(personagens);
});

app.get("/personagens/:id", (req, res) => {
  const personagem = personagens.find(p => p.id === Number(req.params.id));
  if (!personagem) return res.status(404).json({ erro: "Não encontrado" });
  res.json(personagem);
});

app.post("/personagens", (req, res) => {
  const novo = { id: Date.now(), ...req.body };
  personagens.push(novo);
  res.status(201).json(novo);
});

app.put("/personagens/:id", (req, res) => {
  const index = personagens.findIndex(p => p.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ erro: "Não encontrado" });
  personagens[index] = { ...personagens[index], ...req.body };
  res.json(personagens[index]);
});

app.delete("/personagens/:id", (req, res) => {
  personagens = personagens.filter(p => p.id !== Number(req.params.id));
  res.status(204).send();
});
```

**Status codes que você precisa saber de cor:**
- `200` OK, `201` Criado, `204` Sem conteúdo (delete OK)
- `400` Requisição inválida, `401` Não autenticado, `403` Proibido, `404` Não encontrado
- `500` Erro interno do servidor

**Exercício 9.2:** Teste todas essas rotas usando Postman, Insomnia ou `curl`. Documente cada requisição num arquivo `requests.http` ou coleção do Postman.

### Aula 9.3 — Middlewares
Middleware é uma função que roda **entre** a requisição chegar e a resposta ser enviada.

```javascript
function logger(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next(); // sem isso, a requisição trava aqui pra sempre
}

app.use(logger);

function autenticar(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ erro: "Sem token" });
  next();
}

app.get("/rota-protegida", autenticar, (req, res) => {
  res.json({ mensagem: "acesso liberado" });
});
```

### Aula 9.4 — Validação com Zod
```javascript
import { z } from "zod";

const personagemSchema = z.object({
  nome: z.string().min(2),
  nivel: z.number().min(1).max(100),
});

app.post("/personagens", (req, res) => {
  const resultado = personagemSchema.safeParse(req.body);
  if (!resultado.success) {
    return res.status(400).json({ erro: resultado.error.issues });
  }
  // resultado.data está validado e tipado
  res.status(201).json(resultado.data);
});
```

### Aula 9.5 — Autenticação: hash de senha e JWT
```javascript
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// ao cadastrar usuário
const senhaHash = await bcrypt.hash("senha123", 10);

// ao fazer login
const senhaCorreta = await bcrypt.compare("senha123", senhaHash);

// gerar token depois do login
const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: "7d" });

// middleware pra checar token em rotas protegidas
function autenticar(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    const dados = jwt.verify(token, process.env.JWT_SECRET);
    req.usuarioId = dados.id;
    next();
  } catch {
    res.status(401).json({ erro: "Token inválido" });
  }
}
```

**Nunca guarde senha em texto puro no banco.** Isso é básico de segurança que toda empresa vai checar no seu código.

---

## Semanas 12-14 — Banco de dados com Node

### Aula 12.1 — Conectando ao MySQL direto (pra entender a base)
```javascript
import mysql from "mysql2/promise";

const conexao = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "senha",
  database: "meubanco",
});

const [linhas] = await conexao.execute("SELECT * FROM personagens WHERE nivel > ?", [10]);
console.log(linhas);
```

Isso funciona, mas escrever SQL puro toda hora é repetitivo e propenso a erro — daí entra o ORM.

### Aula 12.2 — Prisma (ORM recomendado)
```bash
npm install prisma --save-dev
npx prisma init
```

```prisma
// schema.prisma
model Personagem {
  id       Int      @id @default(autoincrement())
  nome     String
  nivel    Int      @default(1)
  vida     Int      @default(100)
  usuario  Usuario  @relation(fields: [usuarioId], references: [id])
  usuarioId Int
}

model Usuario {
  id          Int          @id @default(autoincrement())
  email       String       @unique
  senhaHash   String
  personagens Personagem[]
}
```

```bash
npx prisma migrate dev --name init
```

### Aula 12.3 — Usando Prisma no código
```javascript
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// criar
const novo = await prisma.personagem.create({
  data: { nome: "Kael", nivel: 50, usuarioId: 1 },
});

// buscar com filtro
const fortes = await prisma.personagem.findMany({
  where: { nivel: { gte: 30 } },
});

// buscar com relacionamento
const usuarioComPersonagens = await prisma.usuario.findUnique({
  where: { id: 1 },
  include: { personagens: true },
});

// atualizar
await prisma.personagem.update({
  where: { id: 1 },
  data: { nivel: 51 },
});

// deletar
await prisma.personagem.delete({ where: { id: 1 } });
```

**Exercício 12.3:** Modele um schema com pelo menos 2 tabelas relacionadas (ex: `Usuario` e `Personagem`, ou algo do seu servidor de Tibia — `Jogador` e `Guild`). Rode as migrations e teste create/read/update/delete de cada uma.

### Aula 12.4 — Relacionamentos 1-N e N-N
```prisma
// 1-N: um usuário tem vários personagens (já visto acima)

// N-N: personagens podem estar em várias guilds, guilds têm vários personagens
model Guild {
  id          Int          @id @default(autoincrement())
  nome        String
  personagens Personagem[]
}

model Personagem {
  id       Int     @id @default(autoincrement())
  nome     String
  guilds   Guild[]
}
```

---

## Projeto final da Fase 2

Construa uma **API REST completa** com:
1. Autenticação (cadastro, login, JWT)
2. Pelo menos 2 tabelas relacionadas no MySQL via Prisma
3. CRUD completo em pelo menos uma entidade
4. Validação de entrada com Zod
5. Middleware de autenticação protegendo as rotas sensíveis
6. Rotas testadas e documentadas (Postman collection ou README com exemplos de `curl`)
7. Tudo no GitHub, com `.env.example` (nunca o `.env` real)

**Sugestão temática:** já que você manja de Tibia, faça uma API de gerenciamento de personagens/guilds — vira portfólio E diferencial ao mesmo tempo.

---

## Checklist de saída da Fase 2
- [ ] Sei criar rotas CRUD completas com Express
- [ ] Entendo middlewares e uso pelo menos autenticação com JWT
- [ ] Modelo banco de dados relacional com Prisma, incluindo relacionamentos
- [ ] Sei validar entrada de dados antes de processar
- [ ] Tenho uma API completa e testada no GitHub
