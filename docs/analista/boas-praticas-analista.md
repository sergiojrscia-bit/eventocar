---
title: Boas Práticas de Analista
parent: Analista
nav_order: 5
---

# 🎩 Boas Práticas de Analista — EventoCar

> Este arquivo é um **guia de referência**, não um template de execução.
> Ele documenta critérios de qualidade pra avaliar histórias de usuário e
> requisitos — a pergunta que resolve é "como sei se essa HU/REQ está bem
> escrita, e não só no formato certo?"
>
> Os templates de execução (`template-historia-usuario.md`, `template-requisito.md`)
> continuam sendo onde a feature é documentada. Este arquivo é o "controle de
> qualidade" que se aplica depois de preenchido o template, antes de considerar
> a HU/REQ pronta pra virar código.

---

## Por que isso surgiu agora

A HU-001 e o REQ-001 foram escritos seguindo o template certo, mas sem nenhum
critério formal de "isso é uma boa história de usuário" — só a estrutura. Esse
guia fecha essa lacuna: não é sobre preencher o campo certo, é sobre a
qualidade do que vai dentro do campo.

---

## Como usar este guia

Depois de escrever uma HU ou REQ com o template, passar pelo checklist da
seção correspondente abaixo **antes** de marcar como "Aprovado" e passar pro
papel de Dev. Se algo falhar no checklist, é sinal de reescrever aquele trecho,
não de seguir em frente mesmo assim.

---

## Critério INVEST — Histórias de Usuário

**A prática:** toda história de usuário deve passar no checklist INVEST antes
de ser considerada pronta.

| Letra | Significa | Pergunta pra fazer |
|---|---|---|
| **I** | Independente | Essa HU pode ser desenvolvida sem depender de outra HU não terminada? |
| **N** | Negociável | A HU descreve o quê e por quê, sem travar o como? (deixa espaço pro Dev decidir a implementação) |
| **V** | Valiosa | Fica claro, lendo a HU, que valor ela entrega pro usuário final? |
| **E** | Estimável | O Dev consegue ter uma noção de tamanho/esforço só de ler a HU? |
| **S** | Pequena | Cabe numa entrega, sem precisar quebrar em várias HUs escondidas dentro dela? |
| **T** | Testável | Dá pra escrever um caso de teste objetivo a partir dos critérios de aceite? |

**Por que importa:** cada letra do INVEST previne um problema recorrente em
histórias de usuário mal escritas — dependência excessiva, ambiguidade,
tamanho fora de controle, ou critério de aceite vago demais pra testar.

**No EventoCar:** aplicando retroativamente à HU-001 como exercício — ela
passa bem no V (valor claro: "encontrar eventos rápido") e no T (critérios de
aceite específicos), mas vale sempre reconferir o S conforme novas HUs forem
maiores (ex: uma futura "HU — Cadastro de eventos pelo organizador"
provavelmente precisa ser quebrada em HUs menores).

**Baseado em:** o acrônimo INVEST foi criado por **Bill Wake** em 2003 e é
hoje o critério padrão da indústria ágil para avaliar histórias de usuário.
Referência: [Agile Alliance — Glossary: INVEST](https://agilealliance.org/glossary/invest/).

---

## Características de um bom requisito

**A prática:** ao escrever um requisito funcional ou não-funcional no
`template-requisito.md`, evitar especialmente estas duas armadilhas:

1. **Ambiguidade** — o requisito precisa significar exatamente a mesma coisa
   pra qualquer pessoa que o leia, incluindo você mesmo daqui a 3 meses.
   Cuidado especial com adjetivos vagos como "rápido", "fácil", "amigável",
   "robusto" — eles soam bem, mas não dá pra testar objetivamente se foram
   cumpridos.
2. **Não-testabilidade** — se não dá pra escrever um caso de teste que passe
   ou falhe claramente a partir do requisito, ele precisa ser reescrito com
   um número, um limite ou um comportamento específico.

**Exemplo prático (já corrigido no nosso próprio REQ-001):**
- ❌ Vago: "a página deve carregar rápido"
- ✅ Testável: "a página deve carregar em menos de 3 segundos em conexões
  móveis comuns" (é exatamente o RNF01 que já escrevemos)

**No EventoCar:** o REQ-001 já segue bem essa prática nos RNFs (números
concretos em RNF01, RNF02), o que é um bom sinal — esse guia serve pra manter
esse padrão nos próximos requisitos, não pra corrigir o que já existe.

**Baseado em:** características de requisitos de qualidade definidas pelo
[**INCOSE Guide for Writing Requirements**](https://www.incose.org/) (padrão
de referência em Engenharia de Requisitos, também alinhado à norma
ISO/IEC/IEEE 29148) — que lista, entre outras, **inequívoco** (unambiguous) e
**verificável** (verifiable) como características centrais de um bom
requisito.

---

## Priorização — MoSCoW

**A prática:** ao decidir o que entra numa entrega e o que fica pro backlog,
usar as quatro categorias do MoSCoW em vez de só "alta/média/baixa":

- **Must have** — sem isso, a entrega falha
- **Should have** — importante, mas a entrega sobrevive sem, por ora
- **Could have** — desejável, entra se sobrar tempo
- **Won't have (por enquanto)** — combinado que fica de fora dessa rodada

**Por que importa:** categorias como "alta/média/baixa" tendem a virar "tudo é
alta", porque não força uma conversa clara sobre o que realmente é
inegociável. O MoSCoW obriga a decisão explícita — inclusive um "won't have"
declarado evita que a mesma ideia seja revisitada do zero toda sessão.

**No EventoCar:** hoje já usamos informalmente "Alta/Média/Baixa" no backlog
do `diario-de-decisoes.md`. Não é uma mudança urgente, mas vale considerar
migrar pro MoSCoW quando o backlog crescer o suficiente pra "Alta" começar a
virar categoria genérica demais.

**Baseado em:** método criado por **Dai Clegg** em 1994, documentado no manual
do **DSDM** (Dynamic Systems Development Method). Referência:
[Agile Business Consortium — What is MoSCoW Prioritization?](https://www.agilebusiness.org/resource/what-is-moscow-prioritization/).

---

## Checklist rápido antes de aprovar uma HU/REQ

- [ ] A HU passa nos 6 critérios do INVEST?
- [ ] Os requisitos evitam adjetivos vagos (rápido, fácil, robusto) sem um
      número ou comportamento específico junto?
- [ ] Todo requisito tem um jeito claro de ser testado (passa/falha)?
- [ ] Se houver mais de uma prioridade em jogo, está claro o que é
      inegociável (Must) vs. desejável (Could)?

---

## Histórico de Alterações

| Data | Autor | O que mudou |
|------|-------|-------------|
| 2026-07-02 | Analista | Criação do guia — critérios INVEST, qualidade de requisitos e priorização MoSCoW, com fonte documentada para cada um |
