<div align="center">

<img src="https://raw.githubusercontent.com/gabrielcf55/study-plan-tracker/main/docs/assets/icons/logo.svg" width="68" alt="">

# Plano de Estudo

**Plano de estudo interativo e rastreador de progresso** — um template _data-driven_ para metas longas (certificações, cursos, concursos), com sincronização entre dispositivos e zero build.

[![Demo ao vivo](https://img.shields.io/badge/demo-ao%20vivo-000?logo=vercel&logoColor=white)](https://study-plan-tracker-demo.vercel.app/)
[![Licença: MIT](https://img.shields.io/badge/licen%C3%A7a-MIT-22a559)](LICENSE)
![Stack](https://img.shields.io/badge/stack-vanilla%20JS%20%2B%20ES%20Modules-2a5fd0)
![Build](https://img.shields.io/badge/build-nenhum-555)
![Testes](https://img.shields.io/badge/testes-node%20--test-7c3aed)
![Feito com](https://img.shields.io/badge/feito%20com-Claude-bc5a2c)

<a href="https://vercel.com/new/clone?repository-url=https://github.com/gabrielcf55/study-plan-tracker"><img src="https://vercel.com/button" alt="Deploy with Vercel" height="32"></a>

<sub>O botão clona este repositório na sua conta Vercel. A sincronização (Upstash) é opcional — passo a passo em <a href="docs/DEPLOY.md">docs/DEPLOY.md</a>.</sub>

</div>

O motor do app nunca muda: você descreve o plano em arquivos de dados (`plan/`) e a interface se monta sozinha — fases, cronograma, simulados, gaps, rotina e custos, tudo com progresso persistente. Comece por um exemplo pronto, edite à mão ou deixe a skill `plan-builder` montar por entrevista.

---

## Índice

- [Funcionalidades](#funcionalidades)
- [Começar rápido](#comecar-rapido)
- [Usar um exemplo pronto](#usar-um-exemplo)
- [Customização](#customizacao)
- [Sincronização e privacidade](#sync)
- [Arquitetura](#arquitetura)
- [Ciclo de vida do projeto](#ciclo-de-vida)
- [Documentação](#documentacao)
- [Contribuição](#contribuicao)
- [Licença](#licenca)

---

<h2 id="funcionalidades">✨ Funcionalidades</h2>

A interface é organizada em sete abas, cada uma derivada dos seus dados:

| Aba | O que faz |
|---|---|
| 📍 **Onde estou** | Painel de entrada: anel de progresso geral, fase atual, próximas ações clicáveis e barra de progresso por fase. |
| 🗺️ **Fases** | Etapas do plano com checklists que persistem e alimentam o progresso. Navegação fase a fase. |
| 📅 **Cronograma** | Timeline visual em semanas relativas; marcos de exame sinalizados. |
| 📝 **Mocks** | Simulados/práticas com cenário, requisitos, critérios de avaliação, campo de nota e **onde encontrar material** (links). |
| 🔁 **Rotina** | Rotina semanal recomendada e dicas de método. |
| 🎯 **Gaps** | Domínios a nivelar, com nível inicial estimado e tópicos marcáveis que sobem a barra. |
| 💰 **Financeiro** | Custos do objetivo (obrigatórios × opcionais) e estratégia de orçamento. |

**Recursos transversais:**

- ☁️ **Sincronização entre dispositivos** via função serverless + Upstash Redis; sem backend, roda 100% local (`localStorage`) e exibe o badge `Local`. **Backup/Restaurar** em JSON como rede de segurança.
- 🎨 **Temas** — modo claro/escuro, paletas (Brass, Graphite, Ember) e favicon selecionável, lembrados entre sessões.
- ✅ **Progresso estável** — cada item tem um ID posicional (`p{fase}t{i}`, `g{gap}t{i}`); marcar tarefas atualiza o anel, os contadores e a “semana estimada” em tempo real.
- 💡 **Skill `plan-builder`** — monta um plano novo por entrevista, pesquisando materiais reais.

---

<h2 id="comecar-rapido">🚀 Começar rápido</h2>

O app usa ES Modules, então precisa ser servido por HTTP (não abra via `file://`):

```bash
npm run serve                              # http://localhost:3000 (modo local, sem sync)
npm run use-example -- --list              # ver planos de exemplo prontos
npm run use-example -- salesforce-cta      # aplicar um exemplo em plan/
npm test                                   # validar o plano e os exemplos (node --test)
```

A raiz já vem com um **template genérico**. Não há etapa de build nem dependências de runtime no front-end.

---

<h2 id="usar-um-exemplo">🗂️ Usar um exemplo pronto</h2>

Cada pasta em [`examples/`](examples) é um plano completo. Aplicá-lo copia seus 6 arquivos para `plan/`:

```bash
npm run use-example -- salesforce-cta
```

| Exemplo | Objetivo | Perfil |
|---|---|---|
| `salesforce-cta` | Salesforce Certified Technical Architect | Avançado · ~18–20 meses · mocks de cenário |
| `salesforce-platform-app-builder` | Salesforce Platform App Builder | Iniciante · 8 semanas · simulados de múltipla escolha |
| `template` | Esqueleto neutro | Ponto de partida para um plano novo |

> Ao trocar de plano, o progresso salvo (por posição) não corresponde mais aos novos itens — faça **Backup** antes ou **Zerar** depois.

---

<h2 id="customizacao">🎨 Customização</h2>

Você **só edita os arquivos em `plan/`** — nunca `app.js`/`index.html`. Três caminhos:

1. **Partir de um exemplo** — `npm run use-example -- <nome>` e ajuste o conteúdo.
2. **Skill `/plan-builder`** — no Claude Code/Cowork, descoberta automaticamente; faz a entrevista e gera os arquivos já validados.
3. **Editar à mão** — um arquivo por aba, conforme [`plan/SCHEMA.md`](plan/SCHEMA.md).

| Arquivo | Conteúdo |
|---|---|
| `plan/meta.js` | título, subtítulo, duração total, escala do cronograma |
| `plan/phases.js` | fases e suas tarefas (checkboxes) |
| `plan/gaps.js` | pontos fortes + domínios a nivelar |
| `plan/mocks.js` | simulados, filtros e `res` (onde encontrar material) |
| `plan/routine.js` | rotina semanal e dicas |
| `plan/costs.js` | aba financeira |

**Ícones por nome:** o conteúdo referencia ícones pelo nome (ex.: `book`, `timer`, `dotHigh`), não por emoji — a lista completa está em [`plan/ICONS.md`](plan/ICONS.md). Marcadores numéricos (`'1'`, `'2'`…) viram chips. Emojis legados ainda funcionam por compatibilidade, mas o padrão são os nomes.

Depois de editar, valide com `npm test` e confira com `npm run serve`. Guia completo em [`docs/CUSTOMIZE.md`](docs/CUSTOMIZE.md).

---

<h2 id="sync">☁️ Sincronização e privacidade</h2>

Publicado na Vercel (grátis), o app sincroniza o progresso entre dispositivos via uma função serverless (`api/progress.js`) sobre **Upstash Redis**, provisionado pelo Marketplace da Vercel. As credenciais ficam em variáveis de ambiente — **nada de segredos no repositório**, que pode ser público.

Para restringir o acesso: no tier grátis, o **Vercel Authentication** protege só os deployments de **preview** — a **produção fica pública** (tanto no `*.vercel.app` quanto em domínio custom); proteger a produção nativamente exige plano pago. Por isso o template inclui um **login por senha opcional** (Basic Auth via Edge Middleware, ligado por variável de ambiente) que funciona em **qualquer domínio** — a forma recomendada de manter sua instância pessoal privada de graça. Detalhes em [`docs/DEPLOY.md`](docs/DEPLOY.md).

---

<h2 id="arquitetura">🧱 Arquitetura</h2>

Sem build: arquivos estáticos + uma função serverless, JavaScript vanilla com ES Modules. Separação de responsabilidades clara e testável:

```
index.html · styles.css      Estrutura e estilos (sem CSS/JS inline)
icons.js · ui.js · theme-init.js   Design system: ícones SVG, temas e tipografia
plan.js → plan/*.js          CONTEÚDO do plano (um arquivo por aba) + SCHEMA.md
progress.js                  Lógica PURA de progresso (sem DOM) — coberta por testes
app.js                       Motor de UI + sync, via event delegation
api/progress.js              Função serverless (Upstash Redis)
examples/ · scripts/         Planos prontos + use-example.mjs
test/                        Testes (node --test): lógica + integridade de todos os planos
vercel.json                  Headers de segurança + CSP estrito
```

Decisões-chave: **zero handlers inline** (event delegation) habilitam um **CSP estrito** (`script-src 'self'`); headers de segurança (HSTS, `nosniff`, `frame-ancestors`); validação e limite de payload na API; e a lógica pura isolada para ser testável. Detalhes em [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) e convenções para agentes em [`CLAUDE.md`](CLAUDE.md).

---

<h2 id="ciclo-de-vida">🧭 Ciclo de vida do projeto</h2>

Este repositório é também um estudo de caso de como diferentes produtos Claude se complementam ao longo da vida de um projeto.

1. 💡 **Ideação**<br>A semente: um plano de estudo para uma certificação difícil (Salesforce CTA) que fosse, ao mesmo tempo, *roteiro* e *rastreador* — um lugar único para saber “onde estou, o que conquistei e o que falta”.
2. 📄 **Página estática — Claude (chat)**<br>O primeiro artefato nasceu numa conversa no Claude: um único arquivo HTML, estático, com o plano CTA e abas de navegação. Provou o conceito rápido, sem infraestrutura.
3. 🧩 **App multiuso — Claude Cowork**<br>Com acesso a arquivos e shell, o protótipo virou um **template orientado a dados**: conteúdo separado da lógica (`plan/`), sincronização na nuvem, lógica pura testável, biblioteca de exemplos, o comando `use-example` e a skill `plan-builder` para gerar planos por entrevista.
4. 🎨 **Design system — Claude Design**<br>A repaginação visual: um conjunto coeso de **ícones SVG** (referenciados por nome, substituindo emojis), **temas** claro/escuro com paletas, **tipografia** dedicada e favicons selecionáveis — preservando o CSP estrito e o zero-build.

---

<h2 id="documentacao">📚 Documentação</h2>

- [`docs/CUSTOMIZE.md`](docs/CUSTOMIZE.md) — criar e trocar o plano
- [`docs/DEPLOY.md`](docs/DEPLOY.md) — publicar na Vercel (sync + acesso privado)
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — como o projeto é montado
- [`plan/SCHEMA.md`](plan/SCHEMA.md) — todos os campos do plano
- [`plan/ICONS.md`](plan/ICONS.md) — nomes de ícone
- [`examples/`](examples) — planos prontos
- [`CLAUDE.md`](CLAUDE.md) — convenções para agentes

---

<h2 id="contribuicao">🤝 Contribuição</h2>

Contribuições são bem-vindas — especialmente novos planos de exemplo. Crie `examples/<seu-plano>/plan/` seguindo o schema, rode `npm test` (valida todos os exemplos) e abra um PR. Detalhes e padrão de commits em [`CONTRIBUTING.md`](CONTRIBUTING.md).

---

<h2 id="licenca">⚖️ Licença</h2>

[MIT](LICENSE) — use, modifique e compartilhe. Atribuição é bem-vinda, não obrigatória.

Criado por **Gabriel Cruz Ferreira** · contato e mais conteúdo sobre Salesforce em **[forcetricks.com](https://forcetricks.com)**.

<sub>Os dados de exame nos planos de exemplo foram conferidos em jun/2026; confirme sempre na fonte oficial antes de se inscrever, pois valores e formato mudam.</sub>
