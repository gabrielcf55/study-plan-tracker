# CLAUDE.md

Guia para agentes (Claude) trabalharem neste repositório. Leia antes de editar.

## O que é

App estático de **plano de estudo + rastreador de progresso**, orientado a dados. A raiz `plan/` é um **template genérico**; planos reais ficam em `examples/` (Salesforce CTA, Platform App Builder) e podem ser aplicados com `npm run use-example`. Trocar o conteúdo de `plan/` gera um plano totalmente diferente, sem tocar na lógica.

## Stack

JavaScript vanilla + ES Modules, **sem build step**. Hospedagem estática na Vercel + uma função serverless (`api/progress.js`) sobre Upstash Redis para sincronização. Testes com `node --test` (sem dependências externas).

## Mapa do repositório

```
index.html        Estrutura (sem CSS/JS inline). Contêineres preenchidos por app.js.
styles.css        Estilos. Tokens de cor em :root.
plan.js           Agregador: importa plan/* e exporta o objeto PLAN. NÃO contém conteúdo.
plan/             CONTEÚDO do plano (1 arquivo por aba) — template genérico na raiz. ← edite aqui
  meta.js  phases.js  gaps.js  mocks.js  routine.js  costs.js
  SCHEMA.md       Descrição de todos os campos.
progress.js       Lógica PURA de progresso (sem DOM). Testável isoladamente.
app.js            Motor de UI + sync. Event delegation; importa plan.js e progress.js.
api/progress.js   Função serverless (GET/POST progresso). Credenciais via env.
middleware.js     Login opcional por senha (Basic Auth no Edge). Ativado por env.
examples/         Planos completos prontos + README. Aplicar com npm run use-example.
scripts/          use-example.mjs (copia examples/<nome>/plan → plan/).
test/             Testes unitários + integridade do plano raiz e de todos os exemplos.
vercel.json       Headers de segurança + CSP estrito.
docs/             ARCHITECTURE.md · DEPLOY.md · CUSTOMIZE.md.
.claude/skills/   Skill `plan-builder` (entrevista → gera plan/).
```

## Regras de ouro

1. **Conteúdo vive em `plan/`.** Mudou objetivo, fases, mocks, custos? Edite os arquivos de `plan/` seguindo `plan/SCHEMA.md`. Não espalhe conteúdo em `app.js`/`index.html`.
2. **Lógica pura fica em `progress.js`** (sem DOM) para permanecer testável. Não acesse `document` ali.
3. **Sem handlers inline** (`onclick=`, `onchange=`). Use `data-*` + delegação de eventos em `app.js`. Isso é o que permite o CSP estrito (`script-src 'self'`) do `vercel.json` — não o quebre.
4. **Segredos só em variáveis de ambiente.** Nada de tokens no repositório (ele é público). `api/progress.js` lê `UPSTASH_REDIS_REST_URL/TOKEN` (ou `KV_REST_API_*`).
5. **Estilos inline dinâmicos** (cores vindas dos dados via `style="..."`) são aceitáveis — o CSP usa `style-src 'self' 'unsafe-inline'`. Mantenha `script-src` sem `unsafe-inline`.
6. **IDs de progresso são estáveis:** `p{fase}t{i}` (tarefas) e `g{gap}t{i}` (gaps), definidos em `progress.js`. Reordenar itens muda os IDs e desalinha o progresso salvo — evite reordenações silenciosas.

## Fluxo ao alterar o plano

```bash
npm test            # valida shape, ranges (base 0–100, start<=end), tiers de mock
npm run serve       # http://localhost:3000 — confere visual (modo local, sem sync)
```

## Convenções

- 2 espaços, LF, UTF-8 (`.editorconfig`). Node ≥ 18 (`.nvmrc`: 20).
- Comentários e UI em pt-BR.
- Commits em pt-BR, imperativo curto.

## Não faça

- Não adicione um bundler/framework sem necessidade — o valor aqui é ser zero-build.
- Não use `localStorage` como fonte única: ele é só cache; a verdade é o backend quando configurado.
- Não introduza dependências de runtime no front-end (o front é 100% vanilla servido estático).
