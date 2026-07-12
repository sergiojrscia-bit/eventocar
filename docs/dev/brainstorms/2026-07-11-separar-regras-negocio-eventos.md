---
title: Decisão Técnica — Separar regras de negócio de eventos
parent: Brainstorms
grand_parent: Dev
nav_order: 5
---

# Decisão Técnica — Separar regras de negócio de eventos do `page.js`

**Data:** 2026-07-11
**Papel:** Dev
**Status:** [x] Decidido

---

## Contexto

Toda a lógica de filtragem e ordenação de eventos (ocultar passados, filtrar
por tipo/estado/mês, ordenar por data) estava dentro de um único `useMemo`
em `src/app/page.js`, misturada com código de React. Isso trava duas coisas
que queremos: (1) trocar de framework no futuro sem reescrever regra de
negócio, e (2) testar cada regra isoladamente, sem depender de navegador
(ideia #14 em `docs/projeto/ideias.md`). Resolve também a ideia #13.

---

## Opções Consideradas

### Opção A — Uma função única `eventosFiltrados()`
- ✅ Vantagem: rápido de fazer, uma função só pra chamar do `page.js`
- ⚠️ Desvantagem: as regras continuam coladas umas nas outras — testar ou
  mudar uma regra isolada exige entender a função inteira

### Opção B — Funções pequenas, uma por regra, compostas no final
- ✅ Vantagem: cada regra vira uma função pura e testável sozinha. Uma regra
  de negócio nova entra como mais uma função, sem mexer nas existentes
- ⚠️ Desvantagem: mais código agora (5 funções em vez de 1), leitura da
  composição em cascata é um pouco mais verbosa

---

## Decisão

**Escolhemos:** Opção B

**Motivo:** O motivo da refatoração era justamente preparar o projeto para
receber novas regras de negócio de forma isolada — a Opção A não resolve
isso, só move o problema de lugar. Com a B, cada regra é independente e
testável sozinha.

---

## Consequências

- Novo arquivo `src/lib/eventos.js`: funções puras `ocultarPassados`,
  `filtrarPorTipo`, `filtrarPorEstado`, `filtrarPorMes`, `ordenarPorData` e a
  composição `eventosVisiveis`, que junta todas
- `src/app/page.js` não tem mais regra de negócio — só chama
  `eventosVisiveis(eventos, filtros)` e cuida da parte visual/React
- Próximas regras de negócio (ex: "esconder evento sem ingresso disponível")
  entram como função nova em `src/lib/eventos.js`, sem tocar nas existentes
- Abre caminho para testes unitários de cada regra sem Playwright/navegador
  (ideia #14 do `ideias.md`), que fica registrada como próximo passo natural
