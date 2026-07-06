---
title: Caso de Teste — Página Inicial (Listagem e Filtros)
parent: QA
nav_order: 1
---

# Caso de Teste — Página Inicial (Listagem e Filtros)

**Data:** 2026-07-05
**Papel:** QA
**Feature relacionada:** Página inicial — listagem e filtros de eventos (HU-001 / REQ-001)

---

## Objetivo

> O que estamos testando e por quê?

Validar manualmente, um a um, todos os critérios de aceite da HU-001 e do REQ-001 na página inicial do EventoCar — garantindo que a listagem, os filtros (individuais e combinados), a mensagem de "nenhum resultado" e o comportamento responsivo funcionam como especificado, antes de avançar para automação e deploy.

---

## Pré-condições

> O que precisa estar pronto antes de executar o teste?

- [ ] Servidor local rodando (`make dev`)
- [ ] `data/eventos.json` com pelo menos 5 eventos de exemplo, incluindo:
  - Pelo menos 1 evento de cada tipo (Clássicos, Tuning, Track Day, Exposição, Feira, Encontro de Clube, Outros) — ou os tipos que já existirem cadastrados
  - Eventos em pelo menos 2 estados (UFs) diferentes
  - Eventos em pelo menos 2 meses diferentes
  - Pelo menos 1 evento com data passada (para validar RF09)
  - Pelo menos 1 evento sem o campo "valor do ingresso" (para validar RF08 como opcional)
- [ ] Navegador aberto em `http://localhost:3000`
- [ ] Console do navegador (DevTools) aberto para observar erros durante o teste

---

## Passos do Teste

| # | Ação | Resultado Esperado | Resultado Real | Status |
|---|------|--------------------|----------------|--------|
| 1 | Abrir `http://localhost:3000` | Página carrega sem erros no console; lista de eventos aparece | | |
| 2 | Observar a listagem de eventos | Cada card mostra nome, data, cidade, estado e tipo do evento (RF02) | | |
| 3 | Observar a ordem dos eventos | Eventos aparecem ordenados por data, do mais próximo para o mais distante (RF01) | | |
| 4 | Verificar evento com data passada cadastrado no JSON | Esse evento **não aparece** na listagem (RF09) | | |
| 5 | Verificar evento sem "valor do ingresso" | Card exibe normalmente, sem quebrar layout, sem mostrar campo vazio ou "undefined" (RF08) | | |
| 6 | Aplicar filtro por **tipo** (ex: "Tuning") | Somente eventos do tipo selecionado aparecem (RF03) | | |
| 7 | Limpar filtro de tipo e aplicar filtro por **estado** (ex: "SC") | Somente eventos do estado selecionado aparecem (RF04) | | |
| 8 | Limpar filtro de estado e aplicar filtro por **mês** | Somente eventos do mês selecionado aparecem (RF05) | | |
| 9 | Combinar filtros: tipo + estado (ex: "Tuning" + "SC") | Somente eventos que atendem às duas condições aparecem (RF06) | | |
| 10 | Combinar os três filtros: tipo + estado + mês | Somente eventos que atendem às três condições aparecem (RF06) | | |
| 11 | Aplicar uma combinação de filtros que não corresponde a nenhum evento | Mensagem exibida: "Nenhum evento encontrado para os filtros selecionados." (RF07) | | |
| 12 | Limpar todos os filtros | Listagem completa volta a aparecer, eventos passados continuam ocultos | | |
| 13 | Redimensionar o navegador para 375px de largura (ou usar modo responsivo do DevTools) | Layout se adapta, nenhum texto ou elemento fica cortado, filtros continuam usáveis (RNF02) | | |
| 14 | Repetir os filtros do passo 9 na largura de 375px | Filtros combinados funcionam igual à versão desktop | | |
| 15 | Verificar cabeçalho e rodapé da página | Cabeçalho com nome do site e rodapé com informações básicas aparecem (RF10) | | |
| 16 | Durante todos os passos acima, observar o console do navegador | Nenhum erro ou warning inesperado aparece no console | | |

---

## Resultado Final

- [ ] ✅ Aprovado
- [ ] ❌ Reprovado — abrir bug report

**Observações:**
[Preencher após a execução real dos passos acima. Se algum passo falhar, abrir um `template-bug-report.md` referenciando o número do passo e o critério de aceite (RF/RNF) correspondente.]
