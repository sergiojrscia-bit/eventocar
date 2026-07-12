---
title: Template — Decisão Técnica
parent: Dev
nav_order: 1
---

# Decisão Técnica — test.step() nos métodos do Page Object

**Data:** 2026-07-12
**Papel:** Dev
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
- Resolve a ideia #10... (não, essa não — apenas confirma o padrão adotado nas ideias #14/#15)