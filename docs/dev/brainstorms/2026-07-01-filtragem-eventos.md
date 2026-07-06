---
title: Decisão Técnica — Filtragem de eventos
parent: Brainstorms
grand_parent: Dev
nav_order: 1
---

# Decisão Técnica — Filtragem de eventos: client-side vs server-side

**Data:** 2026-07-01
**Papel:** Dev
**Status:** [x] Decidido

---

## Contexto

Precisávamos definir como os filtros de tipo, estado e data da página inicial
(HU-001 / REQ-001) seriam aplicados: no navegador do usuário (client-side) ou
recarregando a página com parâmetros na URL (server-side).

---

## Opções Consideradas

### Opção A — Filtragem no cliente (client-side)
- ✅ Vantagem: resposta instantânea ao mudar filtro, sem recarregar página, mais simples de implementar e aprender
- ⚠️ Desvantagem: carrega todos os eventos de uma vez (aceitável — REQ-001 não prevê paginação nesta versão)

### Opção B — Filtragem no servidor (query params + SSR)
- ✅ Vantagem: URLs filtráveis e compartilháveis, SEO por combinação de filtro
- ⚠️ Desvantagem: mais complexo, recarrega a página a cada filtro, maior curva de aprendizado agora

---

## Decisão

**Escolhemos:** Opção A — Filtragem no cliente

**Motivo:** RNF03 já garante SEO pela renderização inicial (SSG/SSR) da listagem completa. Os filtros são interatividade por cima dos dados já carregados — não precisam de SEO próprio. Também é o caminho mais didático pra aprender o fluxo de dados com `useState` no Next.js antes de partir pra coisas mais avançadas.

---

## Consequências

- A página inicial vai carregar **todos** os eventos futuros de uma vez (via `data/eventos.json`) e filtrar no navegador
- Vamos usar `useState` para guardar os filtros ativos e recalcular a lista exibida a cada mudança
- Se o volume de eventos crescer muito no futuro, essa decisão precisa ser revisitada (já está anotado como restrição no REQ-001)