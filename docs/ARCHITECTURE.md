# 🧱 Arquitetura

Stack mínimo e **sem build**: arquivos estáticos + uma função serverless. JavaScript vanilla + ES Modules.

## Mapa do repositório

```
index.html        Estrutura (sem CSS/JS inline). Contêineres preenchidos por app.js.
styles.css        Estilos. Tokens de cor em :root.
plan.js           Agregador: importa plan/* e exporta o objeto PLAN. NÃO contém conteúdo.
plan/             CONTEÚDO do plano (1 arquivo por aba). ← edite aqui
  meta.js  phases.js  gaps.js  mocks.js  routine.js  costs.js
  SCHEMA.md       Descrição de todos os campos.
progress.js       Lógica PURA de progresso (sem DOM). Testável isoladamente.
app.js            Motor de UI + sync. Event delegation; importa plan.js e progress.js.
api/progress.js   Função serverless (GET/POST progresso). Credenciais via env.
middleware.js     Login opcional por senha (Basic Auth no Edge). Ativado por env.
examples/         Planos completos prontos (CTA, App Builder, template).
scripts/          use-example.mjs (aplica um exemplo em plan/).
test/             Testes unitários + integridade do plano raiz e dos exemplos.
vercel.json       Headers de segurança + CSP estrito.
.claude/skills/   Skill plan-builder (entrevista → gera plan/).
docs/             Esta documentação.
```

## Separação de responsabilidades

- **Dados** (`plan/`) — conteúdo de um plano específico. Nunca contém lógica.
- **Lógica pura** (`progress.js`) — cálculos de progresso, sem DOM, 100% testável.
- **UI** (`app.js` + `index.html` + `styles.css`) — renderiza qualquer `PLAN` e cuida da sincronização.
- **API** (`api/progress.js`) — persistência opcional na nuvem.

## Sincronização

O progresso é salvo em `localStorage` (cache imediato) e, se a função `/api/progress` estiver configurada com Upstash Redis, espelhado na nuvem (sincroniza entre dispositivos). Sem backend, o app funciona 100% local. Botões de Backup/Restaurar exportam/importam um JSON.

## Segurança

- **CSP estrito** (`script-src 'self'`) — possível porque não há handlers inline; todo evento é tratado por **delegação** em `app.js`.
- Headers em `vercel.json`: HSTS, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`.
- `style-src 'self' 'unsafe-inline'` — necessário pelos estilos dinâmicos (cores vindas dos dados). `script-src` permanece sem `unsafe-inline`.
- Segredos só em variáveis de ambiente da Vercel — nada de tokens no repositório.

## IDs de progresso (estáveis)

Tarefas usam `p{fase}t{i}` e tópicos de gaps usam `g{gap}t{i}`, definidos em `progress.js`. **Reordenar itens muda os IDs** e desalinha o progresso salvo — evite reordenações silenciosas num plano em uso.
