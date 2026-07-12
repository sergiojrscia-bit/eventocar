---
title: Decisão Técnica — Separar automação com Page Object e BDD de mentalidade
parent: Brainstorms
grand_parent: QA
nav_order: 1
---

# Decisão Técnica — Separar automação de testes (Page Object Model + BDD de mentalidade)

**Data:** 2026-07-11
**Papel:** QA
**Status:** [x] Decidido

---

## Contexto

`tests/pagina-inicial.spec.js` misturava três coisas num arquivo só: os
cenários de teste, os seletores/ações do Playwright (`data-testid`,
`selectOption`, `fill`) e uma reimplementação duplicada da lógica de
`eventosVisiveis()` que já existe em `src/lib/eventos.js`. Isso trava (1)
trocar de ferramenta de teste no futuro sem reescrever tudo, e (2) usar o
arquivo de teste como documentação fácil de ler para quem não programa.
Resolve as ideias #14 e #15 do `ideias.md`.

---

## Opções Consideradas

### Opção A — Page Object Model
- ✅ Vantagem: só o Page Object conhece Playwright de verdade; trocar de
  ferramenta no futuro (Cypress, Robot Framework) exige reescrever só essa
  camada, não os cenários
- ⚠️ Desvantagem: mais um arquivo pra manter, indireção extra pra quem for
  debugar um teste falhando

### Opção B — BDD "de mentalidade" (comentários Dado/Quando/Então)
- ✅ Vantagem: ganha a legibilidade do BDD sem manter arquivos `.feature`
  separados (`.feature` sincronizado é o motivo pelo qual BDD com ferramenta
  completa já tinha sido descartado no `ideias.md`)
- ⚠️ Desvantagem: nenhuma real — é só convenção de comentário

### Opção C — Não separar, manter como estava
- ✅ Vantagem: zero esforço agora
- ⚠️ Desvantagem: não resolve nenhum dos dois problemas do contexto

---

## Decisão

**Escolhemos:** Opção A + Opção B, juntas (não são concorrentes — resolvem
problemas diferentes: A resolve independência de framework, B resolve
legibilidade como documentação).

**Motivo:** As duas ideias já estavam registradas no `ideias.md` esperando
o momento certo, e esse refactor é exatamente esse momento. De brinde,
aproveitamos pra importar `eventosVisiveis()` de `src/lib/eventos.js` em vez
de manter uma cópia duplicada da lógica dentro do teste — se a regra de
negócio mudar, o teste acompanha sozinho.

---

## Consequências

- Novo arquivo `tests/pages/PaginaInicial.js`: Page Object com todos os
  seletores e ações (`abrir()`, `selecionarFiltroTipo()`,
  `cardComTexto()` etc.) — é a única camada que conhece Playwright
- `tests/pagina-inicial.spec.js` reescrito: cada teste tem comentários
  `// Dado / Quando / Então` descrevendo o cenário em português antes do
  código; nenhum seletor bruto (`data-testid`, `selectOption`) aparece mais
  aqui, só chamadas ao Page Object
- `eventosVisiveis()` agora é importada de `../src/lib/eventos.js` em vez de
  reimplementada localmente — remove duplicação de lógica entre o site e o
  teste
- Próximos testes automatizados de novas páginas seguem o mesmo padrão:
  um Page Object novo em `tests/pages/`, cenários com Dado/Quando/Então no
  `.spec.js`

---

## Nota de reorganização (2026-07-12)

Este arquivo vivia em `docs/dev/brainstorms/`. Migrado para
`docs/qa/brainstorms/` porque o conteúdo é 100% sobre `tests/` (estratégia
de automação), não sobre `src/` — critério fixado na decisão técnica de
2026-07-12 ("Reorganizar brainstorms de automação para o QA"). Nenhum
conteúdo foi alterado além do front matter (`parent`/`grand_parent`) e desta
nota.
