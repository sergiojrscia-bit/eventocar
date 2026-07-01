---
title: Decisão Técnica — Formato de data nos eventos
parent: Dev
nav_order: 1
---

# Decisão Técnica — Formato de data no eventos.json

**Data:** 2026-07-01
**Papel:** Dev
**Status:** [x] Decidido

---

## Contexto

Precisávamos definir como representar a data de cada evento dentro do
`data/eventos.json`, já que os eventos serão cadastrados manualmente
(REQ-001) e a data é usada tanto para ordenação quanto para o filtro
por período (RF05) e para ocultar eventos passados (RF09).

---

## Opções Consideradas

### Opção A — String no formato "AAAA-MM-DD"
- ✅ Vantagem: fácil de ler e editar manualmente, ordena corretamente como string, compatível com `new Date()` do JavaScript
- ⚠️ Desvantagem: nenhuma relevante para o caso de uso atual

### Opção B — Timestamp Unix (número)
- ✅ Vantagem: comparações matemáticas diretas
- ⚠️ Desvantagem: ilegível para edição manual, mais difícil de debugar

---

## Decisão

**Escolhemos:** Opção A — String "AAAA-MM-DD"

**Motivo:** Os eventos são cadastrados manualmente por enquanto, então legibilidade no JSON importa mais que performance. O formato é nativamente compatível com `new Date()` para comparações e ordenação.

---

## Consequências

- Todo campo `data` no `eventos.json` seguirá o padrão `"AAAA-MM-DD"` (ex: `"2026-08-15"`)
- A comparação com "hoje" (RF09) será feita convertendo essa string com `new Date()`