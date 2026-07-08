---
title: Decisão Técnica — Estratégia de data-testid para automação
parent: Brainstorms
grand_parent: Dev
nav_order: 3
---

# Decisão Técnica — Estratégia de `data-testid` para automação

**Data:** 2026-07-07
**Papel:** Dev
**Status:** [x] Decidido

---

## Contexto

Ao escrever o primeiro teste automatizado (Playwright) da página inicial, percebemos
que `Filtros.js` e `EventCard.js` não têm nenhum identificador estável nos elementos
(sem `id`, `aria-label` ou `data-testid`). Isso deixaria o teste dependente de posição
(`select:nth-child(1)`) ou de classes CSS geradas por hash pelo CSS Modules — as duas
opções quebram fácil com qualquer mudança de layout, mesmo sem bug real de comportamento.

---

## Opções Consideradas

### Opção A — Testar por posição/estrutura, sem alterar os componentes
- ✅ Vantagem: entrega mais rápida, zero mudança em código de produção
- ⚠️ Desvantagem: seletor frágil (`nth-child`), quebra com reordenação ou novo campo;
  teste fica difícil de ler ("o terceiro select é o quê mesmo?")

### Opção B — Adicionar `data-testid` só nos dois componentes atuais
- ✅ Vantagem: resolve o problema imediato do teste atual
- ⚠️ Desvantagem: não define um padrão — o próximo componente pode nascer sem
  `data-testid`, e a decisão de nomenclatura seria reinventada a cada vez

### Opção C — Adicionar `data-testid` + formalizar convenção em `boas-praticas.md`
- ✅ Vantagem: resolve o problema atual **e** todo componente novo já nasce seguindo
  o mesmo padrão, sem precisar repetir essa discussão
- ⚠️ Desvantagem: mais trabalho agora (escrever a convenção, não só o atributo)

---

## Decisão

**Escolhemos:** Opção C

**Motivo:** O custo extra de formalizar a convenção agora é pequeno comparado ao
retrabalho de ter essa mesma discussão a cada novo componente. Como o projeto ainda
tem poucos componentes (2), é o momento mais barato para estabelecer o padrão.

**Convenção adotada** (registrada em `docs/dev/boas-praticas.md`):
- `kebab-case`, em português, nomeando o que o elemento **é**
- Elementos únicos: nome direto (`filtro-tipo`, `filtro-estado`, `filtro-mes`,
  `mensagem-vazio`)
- Elementos repetidos em lista: mesmo `data-testid` em todos os itens
  (`evento-card` em todo card), localizando um item específico via
  `.filter({ hasText: "..." })` no teste

---

## Consequências

- `Filtros.js` refatorado: `data-testid="filtro-tipo"`, `filtro-estado`, `filtro-mes`
- `EventCard.js` refatorado: `data-testid="evento-card"` no `<article>` de cada card
- `page.js` — a mensagem de "nenhum evento encontrado" ganhou `data-testid="mensagem-vazio"`
- Todo componente interativo ou de lista criado a partir de agora já nasce com
  `data-testid`, seguindo `docs/dev/boas-praticas.md`
- Nenhuma mudança visual ou de comportamento — `data-testid` é invisível ao usuário

---

## Histórico de Alterações

| Data | Autor | O que mudou |
|------|-------|-------------|
| 2026-07-07 | Dev | Criação da decisão, junto com o primeiro teste automatizado da página inicial |
