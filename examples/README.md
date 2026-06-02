# 🗂️ Exemplos de planos

Cada pasta aqui é um **plano completo** — os 6 arquivos de uma pasta `plan/`. Use-os como ponto de partida ou referência de estilo.

| Exemplo | Objetivo | Perfil |
|---|---|---|
| [`salesforce-cta`](./salesforce-cta) | Salesforce Certified Technical Architect | Avançado · ~18–20 meses · mocks de cenário (Review Board) |
| [`salesforce-platform-app-builder`](./salesforce-platform-app-builder) | Salesforce Platform App Builder | Iniciante · 8 semanas · simulados de múltipla escolha |
| [`template`](./template) | Esqueleto neutro | Ponto de partida para um plano novo |

## Aplicar um exemplo

Copia os arquivos do exemplo para a pasta `plan/` da raiz (que é o que o app carrega):

```bash
npm run use-example -- salesforce-cta      # ou salesforce-platform-app-builder, template
npm run use-example -- --list              # lista os exemplos disponíveis
```

Depois confira com `npm run serve` e valide com `npm test`.

> **Atenção — progresso ao trocar de plano:** o progresso é salvo por posição (`p0t0`, `g1t2`…). Ao aplicar outro plano, as marcações antigas não correspondem mais aos novos itens. Faça **Backup** (botão no app) antes de trocar, ou **Zerar** o progresso depois.

## Contribuir um exemplo

Crie `examples/<seu-plano>/plan/` com os 6 arquivos (siga [`plan/SCHEMA.md`](../plan/SCHEMA.md)), rode `npm test` (o teste valida todos os exemplos automaticamente) e abra um PR. Um `README.md` curto na pasta do exemplo é bem-vindo.
