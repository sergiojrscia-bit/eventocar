---
title: HU-001 — Visualizar e filtrar eventos
parent: Analista
nav_order: 1
---

# 📋 História de Usuário: Visualizar e filtrar eventos de carro

## Identificação

- **ID:** HU-001
- **Título:** Visualizar e filtrar eventos de carro no Brasil
- **Data:** 2026-06-29
- **Autor:** Analista
- **Status:** `Aprovada`

---

## A História

> Como **entusiasta de carros**,
> quero **ver uma lista de eventos automotivos do Brasil com filtros por tipo, estado e data**,
> para **encontrar rapidamente eventos do meu interesse perto de mim**.

---

## Critérios de Aceite

- [ ] A página exibe uma lista de eventos com nome, data, cidade/estado e tipo do evento
- [ ] É possível filtrar eventos por tipo (clássicos, tuning, track day, exposição, feira, encontro)
- [ ] É possível filtrar eventos por estado (UF)
- [ ] É possível filtrar eventos por período (mês ou intervalo de datas)
- [ ] Os filtros podem ser combinados (ex: "tuning" + "SC" + "julho")
- [ ] Quando nenhum evento corresponde aos filtros, uma mensagem clara é exibida
- [ ] A página funciona bem em celular e computador
- [ ] Os eventos são ordenados por data (mais próximos primeiro)

---

## Regras de Negócio

- Um evento deve ter no mínimo: nome, data, cidade, estado e tipo
- Eventos passados não aparecem na listagem principal
- O tipo do evento deve seguir uma lista fechada de categorias (definidas abaixo)
- Tipos de evento aceitos: Clássicos | Tuning | Track Day | Exposição | Feira | Encontro de Clube | Outros

---

## Notas e Observações

- Baseado na análise de mercado (2026-06-29): nenhum concorrente oferece filtros combinados para todos os tipos de evento
- Referências de concorrentes analisados: Maxicar, FBVA, Autodynamics, NFeiras
- O campo "valor do ingresso" é desejável, mas opcional — nem todos os eventos têm essa informação disponível
- A feature de cadastro de eventos pelo organizador é planejada para uma versão futura (não faz parte desta HU)

---

## Histórico de Alterações

| Data | Autor | O que mudou |
|------|-------|-------------|
| 2026-06-29 | Analista | Criação do documento |
