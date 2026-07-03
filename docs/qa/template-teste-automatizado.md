---
title: Template — Teste Automatizado
parent: QA
nav_order: 4
---

# Teste Automatizado — [Nome da Feature]

**Data:** AAAA-MM-DD  
**Papel:** QA  
**Feature relacionada:** [ex: Listagem de eventos]  
**Ferramenta:** Playwright  
**Arquivo do teste:** [ex: `tests/pagina-inicial.spec.js`]

---

## Objetivo

> O que este teste automatizado garante, de forma resumida?

[Descreva em 1–2 frases. Ex: "Garante que os filtros combinados da página inicial retornam os eventos corretos e que a mensagem de 'nenhum evento encontrado' aparece quando esperado."]

---

## Pré-condições

> O que precisa estar rodando/configurado antes de executar este teste?

- [ ] Servidor local rodando (`make dev`)
- [ ] `data/eventos.json` com dados de exemplo consistentes com o teste
- [ ] Playwright instalado (`make setup-qa`)

---

## Cenário(s) Cobertos

| # | Cenário | Critério de aceite relacionado (HU/REQ) |
|---|---------|------------------------------------------|
| 1 | ... | ... |
| 2 | ... | ... |

---

## Passos Automatizados (resumo em português)

> Descreva o que o script faz, passo a passo, em linguagem simples —
> antes de virar código. Isso ajuda quem não programa a entender o que
> está sendo validado sem precisar ler o `.spec.js`.

1. Abre a página inicial
2. ...
3. Verifica que ...

---

## Código do Teste

```javascript
// Cole aqui o script Playwright correspondente
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

- [ ] ✅ Passou — comportamento validado automaticamente
- [ ] ❌ Falhou — abrir bug report

**Observações:**
[Qualquer coisa relevante sobre a execução, comportamento inesperado, ou ajuste feito no teste]

---

## Histórico de Alterações

| Data | Autor | O que mudou |
|------|-------|-------------|
| AAAA-MM-DD | QA | Criação do teste |
