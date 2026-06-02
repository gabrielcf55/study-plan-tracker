---
name: plan-builder
description: Gera ou atualiza o conteúdo do plano deste app de estudo — os arquivos em plan/ (fases, gaps, mocks, rotina, custos) — por entrevista + pesquisa de materiais reais. Use quando o usuário quiser criar um plano de estudo novo no app, adaptar/trocar o app para outra certificação, exame, concurso ou meta, ou editar fases, mocks (simulados), gaps, rotina ou custos do plano. NÃO use para tirar dúvidas de conteúdo, gerar um plano em documento separado (Word/PDF), nem mexer no motor do app (app.js, estilos, testes, deploy).
---

# plan-builder

Gera os arquivos de conteúdo em `plan/` (meta, phases, gaps, mocks, routine, costs) a partir de respostas do usuário **e de pesquisa de materiais reais**. O motor do app (`app.js`, `index.html`, `progress.js`) **não muda** — só o conteúdo.

> **Local canônico:** esta skill deve viver em `.claude/skills/plan-builder/` na raiz do repositório. Aí é descoberta automaticamente pelo Claude Code/Cowork ao abrir o projeto (inclusive em forks, sem instalação) e fica disponível como `/plan-builder`. Commite `.claude/skills/`; não commite `.claude/settings.local.json`.

Leia `plan/SCHEMA.md` antes de gerar — é a fonte de verdade dos campos. Use os arquivos atuais em `plan/` como exemplo de estilo.

## Princípio central: nenhum beco sem saída

Um plano de estudo só é útil se a pessoa **souber o que fazer e onde conseguir o material**. Toda recomendação de estudo ou prática precisa vir com **o recurso concreto** (link/nome) ou, no mínimo, onde encontrá-lo. Nunca escreva "faça um simulado" sem dizer *onde* há simulados prontos; nunca cite um tópico sem apontar *onde* estudá-lo. Esse é o erro mais comum a evitar.

## Passo 0 — Pesquisa (OBRIGATÓRIO antes de gerar)

Use a busca na web para levantar, sobre o objetivo específico (certificação, curso, concurso…):

1. **Guia oficial do exame e pesos por tópico** — define a estrutura das fases e gaps. Procure a página oficial da credencial.
2. **Material oficial gratuito** — trilhas/curso oficial, documentação, quizzes (ex.: Trailhead para Salesforce).
3. **Simulados prontos** — distinga claramente **grátis × pago**. Liste os principais provedores com link (ex.: practice test oficial, Focus on Force, bancos de questões gratuitos, practice tests no Udemy). Esta é a parte que o usuário mais sente falta — capriche.
4. **Cursos recomendados** e seus preços típicos (e se costumam ter promoção).
5. **Comunidades** e grupos de estudo relevantes.

Confirme custos e formato no material oficial — preços e estrutura mudam. Anote os URLs; você vai citá-los no plano. Se o usuário já tiver um documento/plano, leia-o primeiro e use a pesquisa só para preencher lacunas e validar.

## Passo 1 — Entrevista

Pergunte em blocos curtos (múltipla escolha quando fizer sentido; campos abertos para texto livre). Não despeje tudo de uma vez. Cobertura mínima:

1. **Objetivo & identidade** — meta/certificação? Nome do dono (tagline)? Frase de contexto (subtitle: situação de vida, tempo disponível)?
2. **Horizonte** — duração total realista em semanas → `meta.timelineWeeks` e a escala.
3. **Ponto de partida** — o que já domina (`strengths`) e onde se sente fraco? Isso calibra os `base` dos gaps e o foco das fases.
4. **Recursos preferidos & orçamento** — prefere material grátis (só Trailhead/docs) ou topa pagar curso/simulado? Há subsídio da empresa? Isso decide o que entra em `costs` e quais `res` priorizar.
5. **Ritmo** — quanto tempo por dia/semana → monta `routine`.

Combine a entrevista com o que a pesquisa já revelou: proponha um rascunho e confirme, em vez de perguntar tudo do zero.

## Passo 2 — Geração

Escreva os arquivos em `plan/` seguindo o schema:

- `plan/meta.js` → `export default { ... }`
- `plan/phases.js` → `export default [ ... ]`
- `plan/gaps.js` → `export const strengths = '...'; export const gaps = [ ... ];`
- `plan/mocks.js` → `export const mocksLead, mockFilters, mockTierLabels, mocks, mockPresentation;`
- `plan/routine.js` → `export const routineLead, routine, routineTips;`
- `plan/costs.js` → `export default { ... }`

**Referências concretas — onde colocar (aplicação do princípio central):**

- **`gaps[].res`** — para cada domínio, 2–3 fontes nomeadas para estudar aquilo (módulo oficial, curso, doc), com link quando houver.
- **`mocks[].res`** — *o ponto crítico.* Cada mock/sessão de prática lista **onde encontrar simulados/questões prontas** para aquele recorte: nome do provedor, se é grátis ou pago, e link `<a href="..." target="_blank" rel="noopener">`. Para simulados completos, aponte os bancos de questões reais (oficial + alternativas). Não deixe nenhum mock sem `res`.
- **`phases[].tasks`** — quando uma tarefa for "estudar X", embuta o recurso (ex.: "Completar o módulo *Nome* no Trailhead"), não só o tópico.
- **`costs`** — itens reais (taxa do exame, cursos, simulados pagos) com preço pesquisado; deixe claro o que é grátis. Inclua a moeda/câmbio na `note`.

Regras de integridade:
- Cada `tier` de mock casa com um `f` de `mockFilters` (exceto `all`).
- `base` de gaps em 0–100; `start <= end` em todas as fases; `timelineWeeks` ≥ maior `end`; ajuste `timelineScale`.
- Cores em hex. Campos marcados com `*` no schema aceitam HTML inline (incl. `<a>`).
- **Ícones por nome, não emoji.** Os marcadores de `routine`/`routineTips`/`mockPresentation` e a 1ª palavra de títulos/badges (`routineTips.title`, `mockPresentation.title`, `costs.strategyTitle`, `gaps[].badge`) usam **nomes de ícone** (ex.: `book`, `timer`, `bulb`, `dotHigh`, ou `n1`…`n9` para números). Lista completa e regras em `plan/ICONS.md`. Marque fases de exame com `exam: true` (sem emoji na `tag`).
- **Não reordene** itens de um plano em uso sem avisar: os IDs de progresso (`p{fase}t{i}`, `g{gap}t{i}`) dependem da ordem e o progresso salvo desalinha.
- Atualize `meta.title`/`tagline`/`subtitle` ao objetivo novo.

## Passo 3 — Validar

```bash
npm test          # confere campos obrigatórios, ranges e tiers
npm run serve     # conferência visual em http://localhost:3000
```

Corrija o que falhar. Faça uma checagem final: **todo mock tem `res`? Todo gap tem `res`? Nenhuma tarefa de estudo está órfã de material?** Então ofereça o commit.

## Saída esperada

Arquivos `plan/*.js` coerentes, `npm test` verde, **referências reais (com links) em todos os mocks e gaps**, e um resumo ao usuário (fases, nº de tarefas, mocks, duração, principais fontes de material).
