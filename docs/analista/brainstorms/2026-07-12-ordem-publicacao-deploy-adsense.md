---
title: Brainstorm — Ordem de publicação: deploy, automação Instagram e AdSense
parent: Brainstorms
grand_parent: Analista
nav_order: 2
---

# 🧠 Brainstorm: Ordem de publicação — deploy, automação Instagram e AdSense

> **Papel:** Analista
> **Data:** 2026-07-12
> **Participantes:** Sérgio + IA Parceira
> **Status:** ✅ Decidido

---

## O que estamos decidindo

Qual a ordem estratégica entre publicar o site na Vercel, implementar a
automação de coleta de eventos via Instagram (ideia #1) e ativar o Google
AdSense — e em que momento migrar do plano Hobby pro Pro da Vercel.

---

## Contexto

Ao planejar o deploy, identificamos que o plano gratuito (Hobby) da Vercel
proíbe uso comercial — e o Fair Use Guidelines da própria Vercel cita o
AdSense nominalmente como exemplo de uso comercial. Isso significa que a
ativação do AdSense e a migração pro plano Pro (US$ 20/mês) precisam
acontecer juntas, não em momentos separados. Faltava decidir quando isso
deveria acontecer em relação ao restante do roadmap.

---

## Opções analisadas

### Opção A — Publicar já com AdSense ativo

**O que é:**
Assim que o site for pro ar na Vercel, já ativar o AdSense e migrar pro
plano Pro no mesmo momento.

**Vantagens:**
- Monetização começa mais cedo, ainda que com pouco tráfego

**Desvantagens:**
- Paga US$ 20/mês desde o início, sem o site ter volume de conteúdo
  relevante (a lista de eventos hoje é cadastrada manualmente, com poucos
  itens de exemplo)
- Custo mensal sem receita comprovada ainda cobrindo ele

---

### Opção B — Publicar no Hobby sem AdSense; ativar AdSense só quando a
automação via Instagram (ideia #1) estiver funcionando

**O que é:**
Publicar o site agora no plano gratuito, sem anúncios. Só ativar o AdSense
(e migrar pro Pro no mesmo momento) depois que a automação de busca de
eventos no Instagram estiver implementada e trazendo eventos automaticamente
— ou seja, quando o site tiver conteúdo relevante em volume, sem depender
de cadastro manual.

**Vantagens:**
- Zero custo até o site ter volume de conteúdo que justifique anúncio
- Migração pro Pro acontece exatamente junto com a ativação do AdSense, sem
  período pagando sem motivo
- Depois de rodando, dá pra avaliar se a receita do AdSense cobre o custo
  do Pro antes de comprometer o orçamento por muito tempo

**Desvantagens:**
- Nenhuma real — só adia a receita até um momento mais estratégico

---

## Recomendação

**Opção escolhida:** Opção B

**Por quê:**
Não faz sentido pagar Pro antes do site ter volume de conteúdo que
justifique anúncio. A automação via Instagram é o que deve gerar esse
volume sem depender de cadastro manual de eventos. Impacto no projeto é
baixo (só define ordem, não muda escopo); custo evitado é real (US$ 20/mês
sem uso correspondente).

---

## Decisão final

- [ ] Em discussão
- [x] Aprovada → registrar no `diario-de-decisoes.md`
- [ ] Descartada → manter motivo registrado aqui

**O que foi decidido:**
Publicar o site agora na Vercel (plano Hobby, sem AdSense); ativar o
AdSense e migrar pro plano Pro só quando a automação de coleta de eventos
via Instagram (ideia #1) estiver funcionando e trazendo eventos
automaticamente; depois de um período rodando, avaliar se a receita do
AdSense cobre o custo do Pro.

**Motivo:**
Evita pagar por um plano comercial antes do site ter conteúdo suficiente
pra fazer sentido monetizar, e alinha a migração de plano exatamente com o
evento que a torna obrigatória pelos termos da Vercel.

---

## Próximo passo

A ideia #1 do `ideias.md` (buscar eventos automaticamente no Instagram)
precisa amadurecer de "💭 Em aberto" para uma decisão técnica de verdade
(qual API usar, limites, viabilidade) antes de ser implementada — é a
próxima peça do caminho crítico pra monetização. Até lá, o deploy pode
seguir normalmente no Hobby.

---

*Arquivo salvo em: `docs/analista/brainstorms/2026-07-12-ordem-publicacao-deploy-adsense.md`*