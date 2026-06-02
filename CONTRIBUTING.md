# 🤝 Contribuindo

Obrigado pelo interesse! Este projeto é um **template** de plano de estudo — contribuições que o tornem mais reutilizável são muito bem-vindas.

## Como propor mudanças

1. Faça um fork e crie uma branch: `git checkout -b minha-melhoria`.
2. Rode os testes antes de abrir o PR: `npm test`.
3. Mantenha o padrão de código (`.editorconfig`: 2 espaços, LF, UTF-8).
4. Abra o Pull Request descrevendo o "porquê" da mudança.

## Princípios de design

- **`plan/` é dado, não código.** Conteúdo de um plano específico vive só ali. Lógica genérica vai para `app.js`/`progress.js`.
- **Lógica pura fica em `progress.js`** (sem DOM) para continuar testável.
- **Sem handlers inline** (`onclick=`). Use `data-*` + delegação em `app.js` — isso mantém o CSP estrito.
- **Segredos nunca no repositório.** Apenas variáveis de ambiente na Vercel.

## Contribuir um plano de exemplo

Crie `examples/<seu-plano>/plan/` com os 6 arquivos (`meta`, `phases`, `gaps`, `mocks`, `routine`, `costs`) seguindo [`plan/SCHEMA.md`](./plan/SCHEMA.md). O `npm test` valida automaticamente todos os exemplos (campos obrigatórios, ranges, tiers casando com os filtros). Um `README.md` curto na pasta do exemplo é bem-vindo. Para testar localmente, aplique-o com `npm run use-example -- <seu-plano>` e confira com `npm run serve`.

## Commits

Mensagens em pt-BR, no formato Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`, `test:`), imperativo curto. Agrupe arquivos por tema em cada commit.
