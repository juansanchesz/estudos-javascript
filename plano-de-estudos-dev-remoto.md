# Plano de Estudos: De Lua/C/MySQL até Vaga Remota Internacional

**Ponto de partida:** conhecimento básico de Lua (scripting Tibia), noções de C, MySQL básico
**Objetivo:** vaga remota júnior/pleno em empresa estrangeira, stack JavaScript/TypeScript + Node.js
**Duração estimada:** 6 a 9 meses, ritmo de 10-15h/semana (ajuste conforme sua disponibilidade)
**Regra de ouro:** prática > teoria. Pra cada 1h assistindo/lendo, gaste 2h escrevendo código.

---

## Fase 1 — Fundamentos (Semanas 1-6)

**Meta da fase:** sair do zero absoluto em JS e já pensar em "modo programador profissional", não scripter de servidor.

### Semanas 1-2: Lógica + JavaScript básico
- Sintaxe: variáveis (`let`/`const`), tipos, operadores, condicionais, loops
- Funções, arrow functions, escopo
- Arrays e objetos (métodos como `map`, `filter`, `reduce` — isso é essencial e usado o tempo todo)
- Recursos: freeCodeCamp (JavaScript Algorithms and Data Structures), MDN Web Docs como referência
- **Prática:** resolva 3-5 exercícios por dia em algo como Exercism ou CodeWars (nível fácil)

### Semanas 3-4: JavaScript assíncrono + TypeScript
- Callbacks, Promises, `async`/`await` (isso trava muita gente — vá com calma)
- `fetch`/requisições HTTP básicas
- Introdução ao TypeScript: tipos, interfaces, por que isso importa pra empresas sérias
- **Prática:** consuma uma API pública (ex: PokéAPI, OpenWeather) e mostre os dados no console/terminal

### Semanas 5-6: Git e ambiente profissional
- Git: init, add, commit, branch, merge, pull request (não só `git push` decorado — entenda o fluxo)
- GitHub: crie conta, suba seus exercícios da Fase 1 lá (currículo vivo desde o dia 1)
- Configure VS Code direito: extensões, terminal integrado, debugger
- **Entregável da fase:** repositório no GitHub com todos os exercícios organizados

---

## Fase 2 — Backend com Node.js (Semanas 7-14)

**Meta da fase:** conseguir construir uma API funcional do zero, conectada a banco de dados. Isso é o coração de uma vaga backend júnior.

### Semanas 7-8: Node.js fundamentos
- O que é Node, event loop (conceito importante, não decore, entenda)
- NPM, `package.json`, módulos (`require`/`import`)
- Sistema de arquivos, variáveis de ambiente (`.env`)

### Semanas 9-11: Express/Fastify + APIs REST
- Criar rotas, middlewares, tratamento de erros
- Métodos HTTP (GET, POST, PUT, DELETE) e status codes corretos
- Validação de dados de entrada (ex: com Zod ou Joi)
- Autenticação básica: JWT, hash de senha (bcrypt)
- **Prática:** construa uma API de "to-do list" completa com CRUD

### Semanas 12-14: Banco de dados com Node
- Conectar Node ao MySQL (você já tem base aqui — vantagem!)
- ORM: aprenda Prisma ou Sequelize (facilita muito e é o que empresas usam)
- Modelagem de dados, relacionamentos (1-N, N-N)
- Migrations (versionamento de schema de banco)
- **Entregável da fase:** API REST completa com autenticação, CRUD e banco relacional, documentada com README em inglês

---

## Fase 3 — Frontend + Full-Stack (Semanas 15-20)

**Meta da fase:** conseguir entregar um projeto completo, ponta a ponta — isso multiplica suas chances em vagas full-stack, que são as mais comuns no mercado remoto.

### Semanas 15-17: React
- Componentes, props, state (`useState`, `useEffect`)
- Formulários controlados, listas, renderização condicional
- Consumo da sua própria API (conectar frontend ao backend que você criou na Fase 2)

### Semanas 18-20: Deploy e projeto integrado
- Deploy do backend (Railway, Render ou Fly.io)
- Deploy do frontend (Vercel ou Netlify)
- Banco de dados em nuvem (PlanetScale, Supabase ou Railway MySQL)
- **Entregável da fase:** aplicação full-stack no ar, com link público, que você pode mostrar em entrevista

---

## Fase 4 — Inglês técnico (paralelo, do mês 1 ao fim)

Não deixe pro final — comece junto com a Fase 1 e mantenha constante.

- Troque o idioma do VS Code, sistema operacional e celular para inglês
- Leia documentação oficial sempre em inglês (nunca traduzida)
- Assista devs estrangeiros no YouTube com legenda em inglês (ex: Fireship, Web Dev Simplified)
- Pratique conversação: iTalki, Cambly, ou parcerias de intercâmbio de idioma (ex: Tandem)
- Simule uma entrevista técnica em inglês gravando você mesmo respondendo perguntas comuns
- **Meta mínima:** conseguir participar de uma call técnica de 30 min sem travar

---

## Fase 5 — Portfólio + Aplicações (Semanas 21-26+)

**Meta da fase:** transformar o que você aprendeu em vagas de verdade.

### Portfólio (2-3 projetos, não mais que isso)
1. O CRUD full-stack da Fase 3 (mostra fundamentos sólidos)
2. Um projeto com tema pessoal — ex: dashboard pra estatísticas do seu servidor de Tibia, ou ferramenta de gerenciamento de itens/guilds. Isso te diferencia porque mostra paixão genuína, não só tutorial copiado
3. Opcional: contribuição em projeto open source no GitHub (mesmo pequena, conta muito)

### Currículo e LinkedIn
- Currículo em inglês, formato ATS-friendly (uma página, sem enfeites, foco em resultados)
- LinkedIn atualizado, em inglês, com "Open to Work" + remoto internacional configurado
- GitHub com README caprichado no perfil

### Onde aplicar
- **We Work Remotely, RemoteOK, Wellfound (AngelList)** — vagas diretas
- **Toptal, Turing, Deel Talent** — plataformas que já cuidam de contrato/pagamento internacional
- Comunidades brasileiras: **#jobnagringa** (Discord/Instagram), grupos de "devs brasileiros no exterior"
- LinkedIn: siga recrutadores de empresas remote-first (GitLab, Automattic, Zapier, etc. — são "unicórnios" totalmente remotos, bons pontos de partida)

---

## Cronograma resumido

| Fase | Semanas | Foco |
|---|---|---|
| 1 | 1-6 | JavaScript + TypeScript básico, Git |
| 2 | 7-14 | Node.js + Express + MySQL/ORM |
| 3 | 15-20 | React + deploy full-stack |
| 4 | contínua | Inglês técnico |
| 5 | 21-26+ | Portfólio, currículo, aplicações |

## Regras pra não travar no caminho
- **Não pule pra próxima linguagem/framework "da moda"** antes de terminar essa trilha. Profundidade em uma stack vale mais que superficialidade em cinco.
- **Não fique só assistindo curso.** Se passou 2h sem digitar código, você está estudando errado.
- **Comece a aplicar pra vagas antes de se sentir "pronto".** Ninguém se sente 100% pronto — aplique já na Fase 4/5, mesmo estagiário/júnior, pra pegar prática de entrevista.
- **Documente tudo em público** (GitHub, LinkedIn). Isso vira prova social pra recrutador.
