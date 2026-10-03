---
title: 2026-10-03 — Layout, modos de visualização e espaços do AdSense
parent: Brainstorms
grand_parent: Analista
---

# 🧠 Brainstorm: Novo layout da página inicial, modos de visualização e espaços do AdSense

> **Papel:** Analista
> **Data:** 2026-10-03
> **Participantes:** Dev + IA Parceira
> **Status:** ✅ Decidido

---

## O que estamos decidindo

1. Como deixar a página inicial mais clara e com mais identidade, já que o layout atual não agradou.
2. Onde reservar os espaços para os anúncios do Google AdSense, sem que o anúncio fique em cima do conteúdo nem o conteúdo em cima do anúncio.
3. Se o visitante pode escolher entre mais de um layout.

---

## Contexto

O dono do projeto olhou a página no navegador e apontou quatro incômodos: cards sem graça,
cabeçalho fraco, filtros soltos e página vazia/sem ritmo. Também faltava espaço para anúncios,
com a condição explícita de que **nenhum anúncio fique sobreposto ao conteúdo**.

Diagnóstico feito pela IA parceira, olhando prints da página no computador e no celular:

- A **data**, que é o que a pessoa procura primeiro numa agenda, aparecia em cinza pequeno,
  com o mesmo peso da cidade.
- Todos os eventos atuais caem no tipo "Track Day", então a faixa colorida por tipo ficou
  igual em todos os cards e deixou de ajudar.
- O link "Ver mais" estava no azul padrão do navegador, fora da identidade "Painel de pista".

Decisões anteriores que valem aqui:

- Ideia #2: AdSense de forma não invasiva.
- REQ-001: layout com espaço reservado para anúncios sem quebrar a experiência.
- Brainstorm de 2026-07-12: o AdSense só é ativado junto com o plano Pro da Vercel. Por isso,
  agora só **reservamos** os espaços, sem anúncio de verdade.

---

## Opções analisadas

Para não decidir no escuro, montamos **5 layouts bem diferentes**, com uma faixa de
comparação temporária no topo da página para trocar entre eles e ver cada um no computador e
no celular. Cada layout testou uma posição de anúncio diferente.

### Opção A — Agenda por mês

**O que é:**
Eventos agrupados por mês, um por linha, com um bloco escuro grande de data à esquerda.
Anúncio numa coluna lateral 300×600 no computador e num bloco entre os meses no celular.

**Vantagens:**
- Lê como uma agenda de verdade, que é o propósito do site
- Funciona igual no celular, onde deve estar a maior parte das visitas
- Coluna lateral é a posição de anúncio menos invasiva: não empurra nem interrompe a lista

**Desvantagens:**
- Mostra menos eventos por tela no computador do que uma grade

---

### Opção B — Grade de pista

**O que é:**
Cabeçalho grande com os filtros dentro e uma faixa quadriculada de largada; cards em grade
com selo de data. Faixa de anúncio 728×90 a cada 6 cards e no fim da lista.

**Vantagens:**
- Visual mais forte, com mais identidade automotiva
- Mostra muitos eventos de uma vez no computador

**Desvantagens:**
- A faixa entre os blocos interrompe a leitura da lista

---

### Opção C — Destaque (estilo revista)

**O que é:**
O próximo evento vira uma "capa" grande, e os demais entram numa lista compacta.
Anúncio 300×250 ao lado da capa.

**Vantagens:**
- Dá protagonismo ao evento mais próximo

**Desvantagens:**
- O destaque é sempre o próximo evento por data, não necessariamente o mais relevante
- Menos parecido com os outros dois modos escolhidos, o que dificultaria manter um padrão

---

### Opção D — Painel (tabela de cronometragem)

**O que é:**
Três colunas: filtros fixos à esquerda, eventos em linhas de tabela no centro, anúncio
300×600 à direita.

**Vantagens:**
- Muito eficiente para quem quer comparar eventos rapidamente

**Desvantagens:**
- Contraria a nota do REQ-001 de evitar menus laterais pesados
- Visual mais "sistema" do que "site de entusiasta"

---

### Opção E — Linha do tempo (tema escuro)

**O que é:**
Uma coluna central com os eventos pendurados numa linha vertical e marcos de mês, em tema
escuro. Anúncio num bloco fora da linha, entre os meses, e numa faixa antes do rodapé.

**Vantagens:**
- O mais diferente dos cinco, com clima "noturno" de evento de pista
- O anúncio fica claramente fora da linha do tempo

**Desvantagens:**
- Coluna estreita aproveita pouco a tela do computador

---

### Pergunta seguinte — deixar o visitante escolher?

Depois de ver os layouts, surgiu a ideia de deixar o próprio visitante escolher como prefere
ver a lista. Avaliamos três quantidades:

- **Todos os 5:** máxima liberdade, mas toda feature nova (página de detalhe, favoritos,
  novos campos) teria que ser feita e testada 5 vezes.
- **2 modos (lista ou grade):** o padrão mais conhecido, com menos manutenção.
- **3 modos:** variedade de verdade com manutenção controlada.

Para o SEO (posição no Google) não muda nada: o Google sempre vê o modo padrão, e a troca
acontece só no navegador do visitante.

---

## Recomendação

**Opção escolhida:** 3 modos de visualização escolhidos pelo visitante: **Agenda** (padrão),
**Grade** e **Linha do tempo**.

**Por quê:**
São os três mais diferentes entre si, então a escolha faz sentido para o visitante. A Agenda
fica como padrão por ser a leitura mais natural para uma agenda e a melhor no celular. Três
modos é o limite em que manter tudo funcionando (código + testes) ainda é razoável.

---

## Decisão final

- [ ] Em discussão
- [x] Aprovada → registrar no `diario-de-decisoes.md`
- [ ] Descartada → manter motivo registrado aqui

**O que foi decidido:**

1. **Três modos de visualização** (Agenda, Grade e Linha do tempo), com Agenda como padrão.
2. **Seletor "Ver como"** em botões, na barra de filtros de cada modo, sempre à vista.
3. A escolha fica **salva no navegador do visitante** (`localStorage`), sem cadastro e sem
   sair do aparelho dele. Se o navegador bloquear o salvamento, a troca vale só enquanto a
   página estiver aberta.
4. **Regras dos espaços de anúncio**, valendo para todos os modos:
   - o anúncio tem uma área só dele no fluxo da página: nada de anúncio flutuante ou fixo
     por cima do conteúdo, e nada por cima do anúncio;
   - a altura já nasce reservada, para a página não "pular" quando o anúncio carregar
     (CLS — *layout shift*, que pesa no ranking do Google);
   - sempre com o rótulo "Publicidade", exigido pela política do AdSense;
   - enquanto o AdSense não estiver ativo, os espaços aparecem como caixas tracejadas só em
     desenvolvimento e não ocupam nada no site publicado.
5. Posição dos anúncios em cada modo:

   | Modo | Computador | Celular |
   |---|---|---|
   | Agenda | Coluna lateral 300×600 que acompanha a rolagem dentro da própria coluna | Bloco entre os meses |
   | Grade | Faixa 728×90 a cada 6 cards e no fim da lista | Faixa 320×100 nas mesmas posições |
   | Linha do tempo | Bloco entre os meses + faixa 728×90 antes do rodapé | Bloco entre os meses + faixa 320×100 |

6. Melhorias visuais comuns aos três modos: data em destaque, horário, local e período nos
   eventos de vários dias ("09 a 11 de outubro"), valor como "A partir de R$ X" (é o
   ingresso mais barato) e links no laranja da identidade, num tom mais escuro
   (`--cor-acento-texto`) para manter o contraste de leitura.

**Motivo:**
Resolve os quatro incômodos apontados, cria os espaços de anúncio sem invadir o conteúdo
(ideia #2) e dá ao visitante uma escolha real sem multiplicar demais o trabalho de manutenção.

---

## Próximo passo

- Requisitos RF11 (visualização escolhida pelo visitante) e RF12 (espaços de anúncio)
  adicionados ao `REQ-001`.
- Quando o AdSense for ativado (junto com o plano Pro da Vercel), trocar o conteúdo de
  `src/components/EspacoAnuncio.js` pelo código oficial do anúncio, mantendo os tamanhos.
- Toda feature nova na listagem precisa ser aplicada e testada nos três modos.

---

*Arquivo salvo em: `docs/analista/brainstorms/2026-10-03-layout-visualizacoes-e-espacos-adsense.md`*
