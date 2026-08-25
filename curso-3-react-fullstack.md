# Curso 3: React + Deploy Full-Stack
### (Fase 3 do plano — Semanas 15-20)

Aqui você conecta tudo: a API que construiu no Curso 2 ganha uma interface visual, e o projeto inteiro vai pro ar com link público.

---

## Semana 15 — React fundamentos

### Aula 15.1 — Componentes
React é basicamente "montar a tela com blocos reutilizáveis".

```jsx
function CartaoPersonagem({ nome, nivel }) {
  return (
    <div className="cartao">
      <h2>{nome}</h2>
      <p>Nível {nivel}</p>
    </div>
  );
}

function App() {
  return (
    <div>
      <CartaoPersonagem nome="Kael" nivel={50} />
      <CartaoPersonagem nome="Aria" nivel={35} />
    </div>
  );
}
```

`props` (nome, nivel) são os "parâmetros" de um componente — só entram, não são alterados dentro dele.

### Aula 15.2 — useState
```jsx
import { useState } from "react";

function ContadorDeVida() {
  const [vida, setVida] = useState(100);

  return (
    <div>
      <p>Vida: {vida}</p>
      <button onClick={() => setVida(vida - 10)}>Tomar dano</button>
      <button onClick={() => setVida(vida + 10)}>Curar</button>
    </div>
  );
}
```

**Regra importante:** nunca altere o state diretamente (`vida = vida - 10` não funciona). Sempre use a função `set` (`setVida(...)`).

### Aula 15.3 — Renderização de listas
```jsx
function ListaPersonagens({ personagens }) {
  return (
    <ul>
      {personagens.map(p => (
        <li key={p.id}>{p.nome} — nível {p.nivel}</li>
      ))}
    </ul>
  );
}
```

O `key` é obrigatório em listas — ajuda o React a saber o que mudou entre renderizações.

### Aula 15.4 — Renderização condicional
```jsx
function StatusPersonagem({ vida }) {
  return (
    <div>
      {vida <= 0 ? <p>Morto</p> : <p>Vivo — {vida} HP</p>}
      {vida < 20 && <p style={{ color: "red" }}>Vida crítica!</p>}
    </div>
  );
}
```

**Exercício 15.4:** Crie um componente `ListaPersonagens` que recebe um array de personagens e mostra um badge "Nível alto" (verde) para quem tem nível > 30 e "Iniciante" (cinza) pra quem tem nível ≤ 30.

---

## Semana 16 — Formulários e useEffect

### Aula 16.1 — Formulários controlados
```jsx
function FormularioPersonagem({ aoSalvar }) {
  const [nome, setNome] = useState("");
  const [nivel, setNivel] = useState(1);

  function handleSubmit(e) {
    e.preventDefault(); // impede o reload padrão do navegador
    aoSalvar({ nome, nivel });
    setNome("");
    setNivel(1);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome" />
      <input type="number" value={nivel} onChange={e => setNivel(Number(e.target.value))} />
      <button type="submit">Salvar</button>
    </form>
  );
}
```

### Aula 16.2 — useEffect (rodar código quando algo muda)
```jsx
import { useEffect, useState } from "react";

function ListaDePersonagens() {
  const [personagens, setPersonagens] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function buscar() {
      const resposta = await fetch("http://localhost:3000/personagens");
      const dados = await resposta.json();
      setPersonagens(dados);
      setCarregando(false);
    }
    buscar();
  }, []); // array vazio = roda só uma vez, quando o componente monta

  if (carregando) return <p>Carregando...</p>;

  return (
    <ul>
      {personagens.map(p => <li key={p.id}>{p.nome}</li>)}
    </ul>
  );
}
```

**Cuidado clássico de iniciante:** esquecer o array `[]` no final do `useEffect` causa um loop infinito de requisições. Sempre pense: "isso deve rodar quando o quê mudar?"

---

## Semana 17 — Conectando ao seu backend

### Aula 17.1 — Organizando chamadas de API
```javascript
// api.js
const BASE_URL = "http://localhost:3000";

export async function listarPersonagens(token) {
  const resposta = await fetch(`${BASE_URL}/personagens`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!resposta.ok) throw new Error("Erro ao buscar personagens");
  return resposta.json();
}

export async function criarPersonagem(dados, token) {
  const resposta = await fetch(`${BASE_URL}/personagens`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(dados),
  });
  return resposta.json();
}
```

### Aula 17.2 — Tratamento de erro e loading state
```jsx
function App() {
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(false);

  async function handleCriar(dados) {
    setCarregando(true);
    setErro(null);
    try {
      await criarPersonagem(dados, token);
    } catch (e) {
      setErro("Não foi possível salvar. Tente de novo.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div>
      {erro && <p style={{ color: "red" }}>{erro}</p>}
      {carregando && <p>Salvando...</p>}
      {/* formulário aqui */}
    </div>
  );
}
```

**Exercício 17.2:** Conecte seu frontend React ao backend do Curso 2. Faça a tela: (1) listar personagens vindos da API, (2) formulário pra criar novo personagem, (3) botão de deletar.

---

## Semana 18 — Autenticação no frontend

### Aula 18.1 — Login e armazenamento de token
```jsx
function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    const resposta = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });
    const { token } = await resposta.json();
    localStorage.setItem("token", token); // em produção real, considere cookies httpOnly
  }

  // ... resto do formulário
}
```

### Aula 18.2 — Rotas protegidas com React Router
```jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function RotaProtegida({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <RotaProtegida><Dashboard /></RotaProtegida>
        } />
      </Routes>
    </BrowserRouter>
  );
}
```

---

## Semanas 19-20 — Deploy

### Aula 19.1 — Preparando o backend pro deploy
- Garanta que tudo sensível está em variáveis de ambiente
- Adicione um `.env.example` no repositório (sem valores reais)
- Configure CORS pra aceitar requisições do seu frontend:
```javascript
import cors from "cors";
app.use(cors({ origin: "https://seu-frontend.vercel.app" }));
```

### Aula 19.2 — Deploy do backend (Railway ou Render)
1. Suba seu código pro GitHub (se ainda não estiver)
2. Crie conta no Railway ou Render
3. Conecte o repositório
4. Configure as variáveis de ambiente na plataforma (nunca copie do seu `.env` direto pro código)
5. Configure o banco MySQL na nuvem (Railway oferece MySQL gerenciado, ou use PlanetScale)
6. Rode as migrations em produção: `npx prisma migrate deploy`

### Aula 19.3 — Deploy do frontend (Vercel)
1. Suba o código React pro GitHub
2. Conecte no Vercel — ele detecta automaticamente projetos React/Vite
3. Configure a variável de ambiente com a URL do seu backend em produção
4. Deploy automático a cada push na branch `main`

### Aula 19.4 — Checklist de "está pronto pra mostrar"
- [ ] Link do frontend funciona pra qualquer pessoa, sem você rodar nada localmente
- [ ] Login funciona de ponta a ponta
- [ ] CRUD completo funciona em produção, não só localmente
- [ ] Não tem nenhuma senha ou chave exposta no código do GitHub
- [ ] README do projeto (em inglês) explica o que é, como rodar localmente, e link ao vivo

---

## Projeto final da Fase 3

Pegue a API do Curso 2 e construa um frontend completo em React que:
1. Tem tela de login/cadastro
2. Lista os dados vindos da API com loading e tratamento de erro
3. Tem formulário funcional pra criar/editar/deletar
4. Está no ar — link público que qualquer recrutador pode abrir
5. Tem README profissional com prints de tela e link ao vivo

Esse é o projeto principal do seu portfólio. É ele que você vai mostrar em toda entrevista.

---

## Checklist de saída da Fase 3
- [ ] Sei criar componentes, usar state e props sem consultar toda hora
- [ ] Sei consumir uma API com `useEffect` e tratar loading/erro
- [ ] Tenho autenticação funcionando no frontend
- [ ] Tenho um projeto full-stack completo, no ar, com link público
