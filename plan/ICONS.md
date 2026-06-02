# 🎯 Ícones do conteúdo (`plan/`)

O conteúdo do plano referencia ícones **por nome** (string) — não por emoji. O motor (`icons.js`) resolve o nome para um SVG de linha, no estilo da interface, herdando a cor do contexto. **Para adicionar um ícone novo**, inclua uma entrada no objeto `P` em `icons.js` (mesmo padrão: `viewBox 0 0 24`, traço `currentColor`).

> Compatibilidade: planos antigos com **emoji** continuam funcionando — são mapeados para o ícone equivalente quando possível; qualquer texto desconhecido aparece como rótulo literal. Mas para planos novos, **prefira os nomes abaixo**.

## Onde usar

| Lugar | Formato | Exemplo |
|---|---|---|
| `routine[].items`, `routineTips.items`, `mockPresentation.items` | `[ícone, texto]` — 1º elemento é o nome | `['book', '30 min de Trailhead']` |
| `routineTips.title`, `mockPresentation.title`, `costs.strategyTitle` | a **1ª palavra**, se for um nome de ícone, vira SVG | `'bulb Estratégia financeira'` |
| `gaps[].badge` | idem (1ª palavra) | `'dotHigh Prioridade Alta'` |
| Números em `*.items` | `'n1'`…`'n9'` ou só o dígito → vira um “chip” numerado | `['n1', 'Premissas & escopo']` |

## Biblioteca de nomes

**Estudo & material**
`book` · `books` · `cards` (flashcards) · `note` · `pencil` · `clipboard` · `blueprint` (artefato/diagrama) · `chart` (progresso) · `timer` (cronômetro) · `clock` · `calendar` · `repeat` (revisão)

**Prática & avaliação**
`target` (meta) · `checkCircle` · `check` · `flag` · `trophy` · `mic` (apresentar) · `speak`

**Pessoas & contexto**
`people` (comunidade) · `briefcase` (trabalho) · `globe` (inglês/idioma) · `rocket` · `compass` · `wallet` · `zap` · `bulb` (dica/ideia)

**Prioridade (cores fixas, independentes do tema)**
`dotHigh` (vermelho) · `dotMed` (âmbar) · `dotLow` (verde) · `dotInfo` (azul)

**Aliases aceitos** (resolvem para o nome canônico)
`review`→`repeat` · `idea`→`bulb` · `flashcards`→`cards` · `presentation`→`speak` · `english`→`globe` · `work`→`briefcase` · `community`→`people` · `launch`→`rocket` · `artifact`/`diagram`→`blueprint` · `stopwatch`→`timer` · `progress`→`chart` · `doc`→`note` · `goal`→`target` · `win`→`trophy` · `money`→`wallet`

## Notas

- Os ícones herdam a cor do contexto (acento nas rotinas; cor da nota nas caixas de dica; cor do badge nos gaps). Não defina cor — exceto os `dot*`, que têm cor própria de prioridade.
- Fases de exame: marque `exam: true` na fase (em `phases.js`) para ganhar a bandeira no cronograma. A tag em texto é livre (sem emoji).
