---
title: Teste Automatizado — Página Inicial
parent: QA
nav_order: 5
---

# Teste Automatizado — Página Inicial (Listagem e Filtros)

**Data:** 2026-07-07
**Papel:** QA
**Feature relacionada:** Página inicial — listagem e filtros de eventos (HU-001 / REQ-001)
**Ferramenta:** Playwright
**Arquivo do teste:** `tests/pagina-inicial.spec.js`

---

## Objetivo

Garantir automaticamente que a listagem de eventos, os filtros (individuais e
combinados), a mensagem de "nenhum evento encontrado" e o comportamento
responsivo da página inicial continuam funcionando conforme os critérios de
aceite da HU-001 e do REQ-001 — cobrindo o mesmo roteiro já validado
manualmente em `2026-07-05-caso-de-teste-pagina-inicial.md`, agora repetível
a qualquer momento com `make test`.

---

## Pré-condições

- [x] Servidor local rodando (`make dev`) — ou deixa o Playwright subir sozinho, ver nota abaixo
- [x] `data/eventos.json` com dados de exemplo
- [x] Playwright instalado (`make setup-qa`)

> 💡 O `playwright.config.js` já sobe o `npm run dev` automaticamente antes dos
> testes (bloco `webServer`) e derruba no final — não é obrigatório deixar o
> `make dev` rodando numa aba separada antes de rodar `make test`.

---

## Cenário(s) Cobertos

| # | Cenário | Critério de aceite relacionado (HU/REQ) |
|---|---------|------------------------------------------|
| 1 | Página carrega sem erros no console e exibe a listagem | RF01 |
| 2 | Cada card mostra nome, data, cidade, estado e tipo | RF02 |
| 3 | Eventos ordenados por data, mais próximos primeiro | RF01 |
| 4 | Eventos com data passada não aparecem | RF09 |
| 5 | Evento sem valor de ingresso não quebra o card | RF08 |
| 6 | Filtro por tipo funciona isoladamente | RF03 |
| 7 | Filtro por estado funciona isoladamente | RF04 |
| 8 | Filtro por mês funciona isoladamente | RF05 |
| 9 | Filtros combinados retornam a interseção correta | RF06 |
| 10 | Mensagem de "nenhum evento encontrado" aparece quando esperado | RF07 |
| 11 | Layout responsivo em 375px não corta conteúdo | RNF02 |
| 12 | Cabeçalho e rodapé aparecem na página | RF10 |

---

## Passos Automatizados (resumo em português)

1. Abre a página inicial
2. Calcula, em tempo de execução, quais eventos de `data/eventos.json`
   deveriam aparecer hoje (reproduzindo a mesma lógica de filtragem de
   `app/page.js`) — em vez de usar um número fixo de eventos esperados
3. Compara a lista calculada com o que realmente aparece na tela
   (`data-testid="evento-card"`)
4. Aplica cada filtro (tipo, estado, mês, combinados) usando os
   `data-testid` de `Filtros.js` e confere que só os eventos esperados
   permanecem visíveis
5. Aplica uma combinação de filtros que não deve bater com nenhum evento e
   confere que a mensagem `data-testid="mensagem-vazio"` aparece
6. Redimensiona a página para 375px e confere que os filtros continuam
   visíveis e a lista continua completa
7. Confere que o cabeçalho ("EventoCar") e o rodapé aparecem
8. Durante o primeiro cenário, escuta erros de console e falha o teste se
   algum aparecer

---

## Código do Teste

```javascript
// Ver arquivo completo em tests/pagina-inicial.spec.js
// Resumo: importa data/eventos.json, recalcula a lista esperada com a
// função eventosVisiveis() (mesma lógica de app/page.js) e compara com o
// que o Playwright encontra na tela via data-testid.
```

---

## Como Rodar

```
make test
```

Ou, para ver o relatório visual:

```
make test-report
```

---

## Resultado Final

- [x] ✅ Passou — comportamento validado automaticamente
- [ ] ❌ Falhou — abrir bug report

**Observações:**

✅ **Execução de 2026-07-08 (`make test-report`):** os 12 cenários rodaram no
Chromium e todos passaram (`outcome: expected`) — RF01 a RF10 e RNF02
cobertos sem falhas, incluindo os cenários de filtro isolado, filtro
combinado, mensagem de "nenhum evento encontrado" e responsivo em 375px.

⚠️ **Limitação conhecida — dados de exemplo com validade:** `data/eventos.json`
tem datas fixas (o mais próximo é 2026-07-01, já no passado a partir de hoje).
Para o teste não quebrar sozinho conforme o tempo passa, ele **recalcula** a
lista esperada em cada execução (função `eventosVisiveis`), em vez de assumir
"sempre existem 6 eventos". Isso resolve o problema de contagem, mas **não**
resolve totalmente: alguns cenários (ex: RF03, filtro por tipo) usam o
primeiro evento futuro disponível como referência, e se **todos** os eventos
de exemplo ficarem no passado ao mesmo tempo (o que vai acontecer a partir de
setembro/2026, já que o último evento é `2026-09-05`), esses testes vão pular
automaticamente (`test.skip`) por falta de dado válido, em vez de falhar.

**Isso é aceitável por enquanto** (o teste não quebra por engano), mas não é
ideal — um teste "pulando" silenciosamente pode mascarar um bug real depois.
**Recomendação para o backlog:** quando o cadastro de eventos (fora do escopo
desta entrega) existir, ou antes de setembro/2026, atualizar
`data/eventos.json` com datas futuras relativas à data de execução, ou migrar
para dados de teste gerados dinamicamente (ex: `data-fns` para calcular
"daqui a X dias" em vez de datas fixas).

---

## Histórico de Alterações

| Data | Autor | O que mudou |
|------|-------|-------------|
| 2026-07-07 | QA | Criação do teste — 12 cenários cobrindo RF01–RF10 e RNF02, usando `data-testid` (ver decisão técnica de 2026-07-07) e cálculo dinâmico de datas para resistir à validade limitada dos dados de exemplo |
| 2026-07-08 | QA | Resultado final preenchido — 12/12 testes passaram na execução via `make test-report` |
