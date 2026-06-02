# 🎨 Criar o seu plano

Você **só edita os arquivos em `plan/`** — nunca `app.js`/`index.html`. Há três formas, da mais rápida à mais manual.

## 1. Partir de um exemplo pronto

```bash
npm run use-example -- --list                  # ver opções
npm run use-example -- salesforce-cta          # aplica em plan/
```

Veja [`examples/`](../examples) para a lista. Bom quando seu objetivo é parecido com um já existente.

## 2. Deixar o Claude montar (skill `plan-builder`)

A skill em `.claude/skills/plan-builder/` é descoberta automaticamente pelo Claude Code/Cowork (inclusive em forks). Rode `/plan-builder`: ela faz uma entrevista, pesquisa materiais e simulados reais, e gera os arquivos de `plan/` já validados.

## 3. Editar `plan/` à mão

Um arquivo por aba — a descrição completa de cada campo está em [`../plan/SCHEMA.md`](../plan/SCHEMA.md):

| Arquivo | Conteúdo |
|---|---|
| `plan/meta.js` | título, subtítulo, duração total, escala do cronograma |
| `plan/phases.js` | fases e suas tarefas (viram checkboxes) |
| `plan/gaps.js` | pontos fortes + domínios a nivelar |
| `plan/mocks.js` | simulados, filtros e **onde encontrar material** (`res`) |
| `plan/routine.js` | rotina semanal e dicas |
| `plan/costs.js` | aba financeira |

`tasks` e `topics` viram checkboxes que alimentam o progresso. Cores são hex livres. Campos marcados com `*` no schema aceitam HTML inline (incl. `<a href>`).

## Validar e conferir

```bash
npm test          # valida campos obrigatórios, ranges (base 0–100, start<=end) e tiers
npm run serve     # confere visualmente em http://localhost:3000
```

## Salvar como exemplo (opcional)

Para versionar seu plano sem sobrescrever o template da raiz, copie-o para `examples/<seu-plano>/plan/`. O `npm test` valida todos os exemplos automaticamente.

> **Atenção:** ao trocar de plano em uma instância já em uso, o progresso salvo (por posição: `p0t0`, `g1t2`…) não corresponde mais aos novos itens. Faça **Backup** antes ou **Zerar** depois.

## Atualizando a partir do template

Se você criou seu repositório com **"Use this template"** (ou pelo botão **Deploy with Vercel**), ele é independente — não tem o botão "Sync fork". Mesmo assim dá para trazer melhorias do template depois.

Como o projeto separa **motor** de **conteúdo** (`plan/`), o jeito mais limpo é atualizar **só os arquivos do motor**, preservando o seu plano:

```bash
# uma vez: adicione o template como remote
git remote add template https://github.com/gabrielcf55/study-plan-tracker.git

# quando quiser atualizar o motor (não toca no seu plan/, README, env):
git fetch template
git checkout template/main -- index.html styles.css app.js ui.js icons.js theme-init.js progress.js middleware.js api vercel.json test
git commit -m "chore: atualiza o motor a partir do template"
```

Para trazer **tudo** (inclusive docs), um merge completo é possível, mas como os históricos são independentes exige `--allow-unrelated-histories` e resolução de conflitos:

```bash
git fetch template
git merge template/main --allow-unrelated-histories
```

> **Fork × Use this template × botão Deploy:** o *fork* mantém histórico comum e sincroniza com um clique (mas fica marcado como "forked from"); *Use this template* e o *botão Deploy* criam repositórios **independentes** (cópias), recomendados para uma instância própria — a atualização é manual, como acima.
