---
title: Decisão Técnica — Mover código do sistema para src/
parent: Brainstorms
grand_parent: Dev
nav_order: 3
---

# Decisão Técnica — Mover código do sistema para src/

**Data:** 2026-07-11
**Papel:** Dev
**Status:** [x] Decidido

---

## Contexto

O código do sistema (`app/`, `components/`, `lib/`, `data/`) estava solto na raiz do
repositório, misturado visualmente com automação (`tests/`), documentação (`docs/`)
e arquivos de configuração. Isso dificultava enxergar de cara o que era código do site
e o que era outra coisa.

---

## Opções Consideradas

### Opção A — Mover tudo pra dentro de `src/`
- ✅ Vantagem: convenção oficial do Next.js, detectada automaticamente sem configuração extra
- ⚠️ Desvantagem: exige revisar imports e o alias do `jsconfig.json`

### Opção B — Manter como está
- ✅ Vantagem: zero risco, zero trabalho
- ⚠️ Desvantagem: código do sistema continua sem uma "casa" única

---

## Decisão

**Escolhemos:** Opção A

**Motivo:** É o padrão esperado pelo próprio Next.js, resolve o problema de forma
definitiva e já estava registrado como ideia #12 em `ideias.md`.

---

## Consequências

- `app/`, `components/`, `lib/`, `data/` passam a viver dentro de `src/`
- `tests/` e `docs/` continuam na raiz, sem mudança
- Alias de import no `jsconfig.json` precisa ser ajustado para apontar pra `src/`
- Nenhuma mudança de comportamento pro usuário final do site