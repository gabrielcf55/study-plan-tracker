# 📋 Schema do plano (`plan/`)

Cada arquivo em `plan/` exporta uma parte do conteúdo. O `plan.js` (raiz) só os reúne num objeto `PLAN`. **Para criar um novo plano, edite apenas os arquivos desta pasta** — nunca `app.js`, `index.html` ou `progress.js`.

Campos com `*` aceitam HTML inline (ex.: `<strong>`). Cores são hex (ex.: `#2563eb`).

Ícones são referenciados **por nome** (não emoji) — veja **[`plan/ICONS.md`](./ICONS.md)** para a lista e as regras.

---

## `meta.js` → `export default {}`

| Campo | Tipo | Descrição |
|---|---|---|
| `tagline` | string | Chip pequeno acima do título (ex.: nome do dono). |
| `title` | string | Título do app (também vira `<title>`). |
| `subtitle`* | string | Subtítulo no cabeçalho. |
| `timelineWeeks` | number | Largura total da régua do cronograma (maior `end` das fases). |
| `timelineLead`* | string | Texto introdutório da aba Cronograma. |
| `timelineScale` | string[] | Marcas da régua, da esquerda p/ direita (ex.: `['Sem 1','20','40','60','80']`). |

## `phases.js` → `export default []`

Lista ordenada. Cada fase:

| Campo | Tipo | Descrição |
|---|---|---|
| `tag` | string | Etiqueta curta (ex.: `Setup`, `Conquista`). Texto livre, sem emoji. |
| `name` | string | Nome da fase. |
| `weeks` | string | Rótulo legível (ex.: `Sem 5–30`). |
| `color`, `bg` | hex | Cor de destaque e fundo claro. |
| `start`, `end` | number | Semana inicial/final (posiciona a barra no cronograma). `start ≤ end`. |
| `exam` | bool | **Opcional.** `true` marca a fase como etapa de exame → ganha a bandeira no cronograma. |
| `goal` | string | Objetivo da fase. |
| `desc` | string | Parágrafo de contexto. |
| `tasks` | string[] | **Checkboxes** que contam no progresso. |

## `gaps.js` → `export const strengths`, `export const gaps`

- `strengths`* (string): resumo dos pontos fortes.
- `gaps` (array). Cada domínio:

| Campo | Tipo | Descrição |
|---|---|---|
| `name` | string | Nome do domínio. |
| `badge` | string | Etiqueta de prioridade. A 1ª palavra pode ser um ícone (ex.: `dotHigh Prioridade Alta`; ver `plan/ICONS.md`). |
| `bcol`, `btxt` | hex | Cor de fundo e texto da etiqueta. |
| `base` | number 0–100 | Nível inicial estimado; a barra parte daqui. |
| `color` | hex | Cor da barra. |
| `topics` | string[] | **Checkboxes**; cada marcação sobe a barra do `base` até 100%. |
| `res` | string[] | Recursos de estudo (não marcáveis). |

## `mocks.js`

- `mocksLead`* (string).
- `mockFilters` (array): `{ f, label }`. O `f` define os filtros; `f:'all'` mostra todos.
- `mockTierLabels` (objeto): mapeia `tier` → rótulo (ex.: `{ eval:'Evaluation', rb:'Review Board' }`).
- `mocks` (array). Cada mock:

| Campo | Tipo | Descrição |
|---|---|---|
| `tier` | string | Deve casar com um `f` de `mockFilters` (≠ `all`). |
| `title` | string | Título do cenário. |
| `time` | string | Rótulo de tempo/tipo. |
| `scenario` | string | Descrição do caso. |
| `reqs` | string[] | Requisitos a arquitetar / tópicos cobertos. |
| `eval` | string | O que os avaliadores observam / meta de acerto. |
| `res`* | string[] | **Opcional.** "Onde encontrar / praticar": fontes reais de simulados e material, com links. Pode conter `<a href="..." target="_blank" rel="noopener">`. Distinga grátis × pago. |

  Cada mock tem um botão "concluído" e um campo de nota — ambos persistem automaticamente.
  Sempre que possível preencha `res` com fontes concretas (simulados prontos, bancos de questões, módulos oficiais) — um plano sem "onde encontrar" deixa o aluno perdido.
- `mockPresentation` (objeto): `{ title, items:[[ícone, texto*]] }`. `ícone` = nome (ver `plan/ICONS.md`) ou número (`n1`…); `title` pode começar com um nome de ícone.

## `routine.js`

- `routineLead`* (string).
- `routine` (array): `{ title, sub, badge, badgeBg, badgeColor, items:[[ícone, texto*]] }`. `ícone` = nome (ver `plan/ICONS.md`).
- `routineTips` (objeto): `{ title, items:[[ícone, texto*]] }`. `title` pode começar com um nome de ícone (ex.: `bulb …`).

## `costs.js` → `export default {}`

| Campo | Tipo | Descrição |
|---|---|---|
| `summary` | array | Cards de resumo: `{ label, amount, sub, bg, border, color }`. |
| `rows` | array | Linhas: `{ req:bool, name, usd, brl, highlight:bool }`. |
| `rowsNote` | string | Nota abaixo das linhas. |
| `strategyTitle` | string | Título da caixa de estratégia. Pode começar com um nome de ícone (ex.: `bulb …`; ver `plan/ICONS.md`). |
| `strategy`* | string[] | Itens de estratégia. |
| `note` | string | Rodapé (fontes/disclaimer). |

---

## Depois de editar

```bash
npm test        # valida a integridade do plano (campos obrigatórios, ranges, tiers)
npm run serve   # confere visualmente em http://localhost:3000
```

> Dica: a skill **`plan-builder`** monta todos esses arquivos a partir de uma entrevista — veja `.claude/skills/plan-builder/`.
