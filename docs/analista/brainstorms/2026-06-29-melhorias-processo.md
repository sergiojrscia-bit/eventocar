---
title: Melhorias de processo (2026-06-29)
parent: Brainstorms
grand_parent: Analista
nav_order: 1
---

# 🧠 Brainstorm: Melhorias no processo de trabalho com a IA parceira

> **Papel:** Analista
> **Data:** 2026-06-29
> **Participantes:** Dev (usuário) + IA Parceira
> **Status:** ✅ Decidido

---

## O que estamos decidindo

Quatro melhorias no processo de trabalho do projeto foram identificadas pelo Dev e discutidas com a IA parceira. Cada uma foi analisada e resultou em uma decisão.

---

## Contexto

Durante o início de uma sessão de trabalho, o Dev percebeu que alguns arquivos importantes não estavam sendo compartilhados com a IA, que brainstorms feitos na conversa não estavam sendo documentados, que templates criados não estavam sendo usados sistematicamente e levantou a dúvida sobre se valeria criar IAs separadas por papel (Analista, Dev e QA).

---

## Tema 1 — Checklist de arquivos no início da sessão

### Problema
A IA começava a trabalhar sem ter acesso a todos os arquivos do projeto. Isso causava perda de contexto e respostas incompletas.

### Opções analisadas

**Opção A — Confiar na memória do usuário**
- ✅ Sem trabalho extra
- ⚠️ Depende do usuário lembrar de tudo — falha humana inevitável

**Opção B — Criar um checklist formal de início de sessão**
- ✅ Institucionaliza o processo — não depende de memória
- ✅ A IA pode cobrar os arquivos se não forem enviados
- ⚠️ Adiciona um passo no início da sessão

### Decisão
**Opção B aprovada.** Criada a seção "Como iniciar uma sessão" no `diario-de-decisoes.md` com a lista de arquivos obrigatórios e situacionais. A IA deve pedir os arquivos faltantes antes de continuar qualquer trabalho.

---

## Tema 2 — Documentação de brainstorms

### Problema
Brainstorms aconteciam na conversa e sumiam. Não havia registro de por que cada decisão foi tomada — apenas o que foi decidido, no diário.

### Opções analisadas

**Opção A — Manter brainstorms só na conversa**
- ✅ Sem trabalho extra
- ⚠️ Contexto perdido a cada nova sessão
- ⚠️ Impossível revisar o raciocínio meses depois

**Opção B — Criar template de brainstorm e pasta dedicada**
- ✅ Registra o raciocínio por trás de cada decisão
- ✅ Complementa o diário (que registra *o quê*) com o *por quê*
- ✅ Consultável em qualquer sessão futura
- ⚠️ Adiciona um arquivo por brainstorm

### Decisão
**Opção B aprovada.** Criado `docs/analista/template-brainstorm.md` e a pasta `docs/analista/brainstorms/` para guardar os registros. Todo brainstorm relevante deve virar um arquivo nessa pasta.

---

## Tema 3 — IAs separadas por papel (Analista, Dev, QA)

### Problema
Dúvida sobre se seria mais eficiente ter uma conversa/instância de IA para cada papel, em vez de uma única IA que troca de papel.

### Opções analisadas

**Opção A — IA única com troca explícita de chapéu**
- ✅ Um só contexto — a IA carrega o histórico completo do projeto
- ✅ Mais simples de operar — uma conversa, um conjunto de arquivos
- ✅ Ideal para projetos conduzidos por uma pessoa só
- ⚠️ Pode misturar responsabilidades se não houver disciplina

**Opção B — IAs separadas por papel**
- ✅ Cada instância mais focada no seu papel
- ✅ Menos risco de misturar Analista com Dev com QA
- ⚠️ Três conversas para manter sincronizadas
- ⚠️ Contexto fragmentado — cada IA vê só parte do projeto
- ⚠️ Custo operacional alto para um projeto de uma pessoa

### Decisão
**Opção A mantida.** IA única para todos os papéis. Para resolver o risco de mistura, a IA anuncia explicitamente o papel ativo antes de cada entrega ("Chapéu de Analista agora", "Chapéu de Dev agora"). Revisitar essa decisão se o projeto crescer e envolver mais colaboradores.

---

## Tema 4 — Uso obrigatório dos templates

### Problema
Templates foram criados para Analista, Dev e QA, mas às vezes eram pulados — a especificação da página inicial, por exemplo, foi feita sem passar pelo template de história de usuário.

### Opções analisadas

**Opção A — Templates opcionais, usados quando lembrar**
- ✅ Mais ágil em sessões rápidas
- ⚠️ Toda a estrutura criada perde valor se não for usada
- ⚠️ Inconsistência na documentação ao longo do tempo

**Opção B — Templates obrigatórios, IA para antes de continuar**
- ✅ Garante consistência em todas as entregas
- ✅ Aproveita ao máximo a estrutura já construída
- ✅ Facilita onboarding de novos colaboradores no futuro
- ⚠️ Pode parecer burocrático em tarefas simples

### Decisão
**Opção B aprovada.** Antes de qualquer entrega formal — análise, código ou teste — a IA verifica se o template correspondente foi preenchido. Se não foi, ela para, preenche e só então continua. A regra foi adicionada ao checklist de início de sessão.

---

## Próximo passo

Aplicar os arquivos gerados no repositório e commitar com:

```bash
make commit m="docs: adiciona template de brainstorm, checklist de sessão e atualiza diário"
```

Em seguida, retomar o desenvolvimento da primeira página real do EventoCar.

---

*Arquivo salvo em: `docs/analista/brainstorms/2026-06-29-melhorias-processo.md`*
