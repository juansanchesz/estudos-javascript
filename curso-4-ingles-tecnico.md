# Curso 4: Inglês Técnico para Devs
### (Fase 4 do plano — contínua, desde a semana 1)

Esse é o curso que roda em paralelo com todos os outros, do primeiro ao último dia. Diferente dos outros cursos, aqui o "syllabus" é mais sobre hábito diário do que sobre uma sequência rígida de aulas.

---

## Módulo 1 — Mude seu ambiente pra inglês (Semana 1, faça hoje)

- Sistema operacional, celular, VS Code: tudo em inglês
- Documentação: sempre leia a versão original em inglês, nunca traduzida (traduções de doc técnica costumam ser ruins e ficam desatualizadas)
- Mensagens de erro: quando der erro no código, leia a mensagem em inglês com calma antes de colar no Google/ChatGPT — você vai começar a reconhecer padrões

**Por que isso funciona:** você já lê inglês técnico o tempo todo sem perceber — variável, função, string, array são todas palavras em inglês. A barreira geralmente é conversação, não leitura.

---

## Módulo 2 — Vocabulário técnico essencial

### Palavras que aparecem em toda reunião/documentação de dev

| Inglês | Português | Contexto |
|---|---|---|
| bug | erro | "There's a bug in the login flow" |
| feature | funcionalidade | "We're shipping a new feature" |
| deploy / release | publicar em produção | "We deploy every Friday" |
| pull request (PR) | solicitação de merge | "Can you review my PR?" |
| merge | juntar código | "Merge this branch into main" |
| rollback | reverter | "We had to rollback the release" |
| endpoint | rota de API | "Hit this endpoint with a GET request" |
| breaking change | mudança que quebra compatibilidade | "This is a breaking change" |
| tech debt | dívida técnica | "We need to address our tech debt" |
| stand-up | reunião diária curta | "See you at the stand-up" |
| blocked | travado, impedido | "I'm blocked on this task" |
| ETA | previsão de prazo | "What's the ETA on this?" |
| scope | escopo | "That's out of scope for this sprint" |
| flaky test | teste instável | "This test is flaky, it fails randomly" |

**Exercício:** escreva 5 frases suas usando palavras dessa tabela, sobre seus próprios projetos dos cursos anteriores.

---

## Módulo 3 — Escrita técnica

### Aula 3.1 — README em inglês
Estrutura padrão que toda empresa espera ver:

```markdown
# Project Name

Brief description of what this project does and why it exists.

## Tech Stack
- Node.js, Express, TypeScript
- MySQL with Prisma ORM
- React, Vite

## Getting Started

\`\`\`bash
npm install
cp .env.example .env
npm run dev
\`\`\`

## Live Demo
https://your-project.vercel.app

## Features
- User authentication (JWT)
- CRUD for characters
- ...
```

**Exercício:** reescreva o README de um dos seus projetos anteriores nesse formato.

### Aula 3.2 — Mensagens de commit em inglês
```bash
# formato bom
git commit -m "fix: correct login validation error"
git commit -m "feat: add character delete endpoint"
git commit -m "refactor: simplify auth middleware"

# formato ruim (evite)
git commit -m "ajustes"
git commit -m "corrigido bug"
```

Padrão comum usado por empresas: **Conventional Commits** — prefixos como `feat:`, `fix:`, `refactor:`, `docs:`, `test:`.

### Aula 3.3 — Descrevendo um Pull Request
```markdown
## What
Adds pagination to the /characters endpoint.

## Why
The endpoint was returning all records at once, causing slow response
times for accounts with many characters.

## How to test
1. Run `npm run dev`
2. GET /characters?page=1&limit=10
3. Confirm response includes `total`, `page`, and `data` fields
```

**Exercício:** escreva a descrição de PR (em inglês) pra alguma feature que você já implementou nos cursos anteriores.

---

## Módulo 4 — Conversação técnica

### Aula 4.1 — Frases que você vai usar toda entrevista
- "Can you repeat the question, please?"
- "Let me think about this for a second."
- "I'm not 100% sure, but my approach would be..."
- "Could you clarify what you mean by...?"
- "I haven't worked with that specifically, but I'm familiar with a similar concept: ..."

**Dica importante:** em entrevista técnica internacional, ninguém espera inglês perfeito. Espera-se clareza e capacidade de se comunicar sob pressão. Travar em silêncio é pior que errar um tempo verbal.

### Aula 4.2 — Explicando seu próprio código em voz alta
Prática: escolha um dos projetos que você já fez (Curso 1, 2 ou 3) e grave um vídeo de 2-3 minutos, em inglês, explicando:
1. O que o projeto faz
2. Que decisões técnicas você tomou e por quê
3. O que você melhoraria se tivesse mais tempo

Isso é literalmente o que acontece numa entrevista técnica de "code walkthrough". Treinar isso sozinho reduz muito o nervosismo na hora real.

### Aula 4.3 — Simulando uma daily stand-up
Formato padrão de reunião diária em empresas ágeis — treine responder essas 3 perguntas em inglês, em voz alta, todo dia enquanto estuda:
1. "What did you do yesterday?"
2. "What are you doing today?"
3. "Are you blocked on anything?"

### Recursos recomendados
- **iTalki ou Cambly**: aulas particulares focadas em conversação
- **Tandem/HelloTalk**: intercâmbio de idioma gratuito com estrangeiros
- **Fireship, Web Dev Simplified, Theo (t3.gg)** no YouTube: conteúdo técnico em inglês, com legenda
- **Pramp ou interviewing.io**: simulação de entrevista técnica em inglês com outras pessoas

---

## Módulo 5 — Simulado de entrevista

### Perguntas comportamentais comuns (pratique respostas de 1-2 minutos)
- "Tell me about yourself."
- "Tell me about a challenging bug you fixed."
- "Why do you want to work remotely for an international company?"
- "Describe a time you disagreed with a teammate. How did you handle it?"
- "Where do you see yourself in a few years?"

### Estrutura útil pra responder (método STAR)
- **Situation**: contexto rápido
- **Task**: o que precisava ser feito
- **Action**: o que você fez
- **Result**: o resultado, de preferência com número/impacto

**Exercício final:** grave-se respondendo as 5 perguntas acima usando o método STAR, revise, regrave até soar natural.

---

## Checklist de progresso (revise mensalmente)
- [ ] Consigo ler documentação técnica em inglês sem traduzir mentalmente frase por frase
- [ ] Escrevo READMEs e commits em inglês por padrão
- [ ] Consigo explicar um projeto meu em inglês, falado, por 2-3 minutos sem travar
- [ ] Participei de pelo menos uma simulação de entrevista técnica em inglês
- [ ] Tenho respostas prontas (método STAR) pras 5 perguntas comportamentais mais comuns
