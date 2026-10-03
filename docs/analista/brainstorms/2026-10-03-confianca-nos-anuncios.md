---
title: 2026-10-03 — Confiança nos anúncios
parent: Brainstorms
grand_parent: Analista
---

# 🧠 Brainstorm: Como evitar que o visitante tenha medo de clicar nos anúncios

> **Papel:** Analista
> **Data:** 2026-10-03
> **Participantes:** Dev + IA Parceira
> **Status:** ✅ Decidido

---

## O que estamos decidindo

O que fazer para o visitante não ficar com medo de que os anúncios (ou os links do site) sejam
vírus ou golpe. Retoma a ideia #3 do `ideias.md` ("indicador visual de que os anúncios do
AdSense são seguros e confiáveis").

---

## Contexto

Os espaços de anúncio acabaram de ser definidos (ver
`2026-10-03-layout-visualizacoes-e-espacos-adsense.md`). O medo de "vírus" costuma nascer de sites
que confundem o visitante: anúncio disfarçado de conteúdo, pop-up, página que redireciona sozinha.

**O caminho intuitivo é arriscado:** um selo como "anúncio seguro", "verificado" ou "pode clicar
sem medo" perto dos anúncios:

1. vai contra as regras do AdSense, que proíbem incentivar cliques (texto, seta ou selo que
   estimule o clique pode suspender a conta) e pedem um rótulo neutro, como "Publicidade";
2. promete o que não controlamos: quem escolhe cada anúncio é o Google. Se aparecer um anúncio
   ruim depois de prometermos "seguro", a confiança no site inteiro cai.

> Conferir a lista exata de rótulos permitidos na política oficial do AdSense no dia da ativação.

---

## Opções analisadas

### Opção A — Transparência na própria página

**O que é:**
Separação clara entre anúncio e conteúdo (já feita: área própria + rótulo "Publicidade") e os
nossos links mostrando o site de destino antes do clique (ex: "Ver post · instagram.com ↗").

**Vantagens:**
- Rápido, sem custo, melhora o site já
- Quem sabe para onde vai antes de clicar não se sente enganado
- Diferencia nossos links dos anúncios

**Desvantagens:**
- Não resolve sozinho: o visitante ainda não sabe quem está por trás do site

---

### Opção B — Páginas de confiança

**O que é:**
Páginas "Sobre" (quem faz e por que existem anúncios), "Contato" (para avisar sobre um anúncio
estranho) e "Política de privacidade" (cookies do Google, LGPD).

**Vantagens:**
- Mostra que há pessoas reais e responsáveis por trás do site
- A política de privacidade é exigida pelo AdSense — vamos precisar dela de qualquer jeito

**Desvantagens:**
- É uma feature nova (precisa de HU, requisitos e testes)

---

### Opção C — Controle no painel do AdSense

**O que é:**
No dia da ativação: só anúncios posicionados manualmente (sem anúncios automáticos nem de tela
cheia, as "vinhetas"), bloqueio de categorias sensíveis e de anunciantes, e uso da central de
revisão de anúncios.

**Vantagens:**
- Ataca a causa: evita os formatos e anúncios que mais parecem vírus

**Desvantagens:**
- Só pode ser feito quando o AdSense for ativado

---

## Recomendação

**Opção escolhida:** as três, em ordem — A agora, B como próxima feature, C no dia da ativação.

**Por quê:**
Cada uma cobre uma parte do problema: a A deixa claro o que é anúncio e para onde cada link leva;
a B mostra quem é responsável pelo site; a C reduz a chance de um anúncio ruim aparecer. Nenhuma
delas incentiva clique, então nenhuma arrisca a conta do AdSense.

---

## Decisão final

- [ ] Em discussão
- [x] Aprovada → registrar no `diario-de-decisoes.md`
- [ ] Descartada → manter motivo registrado aqui

**O que foi decidido:**
O "selo de segurança" nos anúncios fica descartado. No lugar dele: transparência (A, entregue
nesta data), páginas de confiança (B, próxima feature) e controle no painel do AdSense (C, no dia
da ativação).

Entregue nesta data (opção A): todo link de post nos cards mostra o site de destino numa segunda
linha ("Ver post" / "instagram.com ↗"), além de um aviso "(abre em nova aba)" lido só por leitores
de tela. Novo requisito RF13 no `REQ-001`.

**Motivo:**
Passa confiança sem prometer o que não controlamos e sem violar as regras do AdSense.

---

## Próximo passo

- Opção B: criar a HU e os requisitos das páginas Sobre, Contato e Política de privacidade.
- Opção C: transformar a lista de controles do painel num checklist para o dia da ativação do
  AdSense.

---

*Arquivo salvo em: `docs/analista/brainstorms/2026-10-03-confianca-nos-anuncios.md`*
