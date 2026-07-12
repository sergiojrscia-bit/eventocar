---
title: Decisão Técnica — test.step() nos métodos do Page Object
parent: Brainstorms
grand_parent: QA
nav_order: 2
---

# Decisão Técnica — test.step() nos métodos do Page Object

**Data:** 2026-07-12
**Papel:** QA
**Status:** [x] Revisado

---

## Contexto

O relatório HTML do Playwright mostrava só as ações cruas reconhecidas pela ferramenta
("Navigate to /", "Select option", "Expect toHaveCount"), não a narrativa
Dado/Quando/Então que escrevemos como comentário no `pagina-inicial.spec.js`.
Quem abre o relatório sem ler o código-fonte não consegue saber qual cenário está
sendo validado em cada passo.

---

## Opções Consideradas

### Opção A — test.step() direto no .spec.js
- ✅ Vantagem: mudança isolada em um arquivo só
- ⚠️ Desvantagem: repete a mesma estrutura em cada um dos 12 testes; texto duplicado se algum passo for reaproveitado

### Opção B — test.step() dentro dos métodos do Page Object (tests/pages/PaginaInicial.js)
- ✅ Vantagem: alinhado com a decisão de Page Object Model já tomada em 2026-07-11 (o Page Object é o dono de "como fazer"); nome do passo fica em um lugar só, reaproveitado por qualquer teste que use aquele método
- ⚠️ Desvantagem: exige revisar os 12 testes existentes para confirmar que nada quebrou

---

## Decisão

**Escolhemos:** Opção B

**Motivo:** Mantém a mesma filosofia da decisão de POM: o Page Object concentra tanto
"como" interagir com a página quanto o nome legível do passo. Isso evita duplicar
`test.step()` em cada teste e centraliza qualquer ajuste de texto num só lugar.

---

## Consequências

- Os métodos de `tests/pages/PaginaInicial.js` passam a envolver suas ações com
  `await test.step('texto Dado/Quando/Então', async () => { ... })`
- O relatório HTML (`make test-report`) passa a mostrar os passos com nome de negócio,
  não mais ações cruas do Playwright
- Os comentários `// Dado / Quando / Então` que hoje existem soltos no `.spec.js`
  podem ser removidos, já que o texto vira o próprio nome do `test.step()`
- Validado em 2026-07-12: 12/12 testes passaram (`make test`), e o relatório
  (`make test-report`) passou a mostrar os passos com nome de negócio como
  esperado

---

## Nota de reorganização (2026-07-12)

Este arquivo vivia em `docs/dev/brainstorms/`. Migrado para
`docs/qa/brainstorms/` porque o conteúdo é 100% sobre `tests/` (estratégia
de automação), não sobre `src/` — mesmo critério aplicado a
`2026-07-11-separar-automacao-page-object-bdd.md`. Nenhum conteúdo foi
alterado além do front matter (`parent`/`grand_parent`) e desta nota.
