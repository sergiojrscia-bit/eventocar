---
title: Análise de mercado (2026-06-29)
parent: Brainstorms
grand_parent: Analista
nav_order: 3
---

# 🧠 Brainstorm: Análise de Mercado — Concorrentes do EventoCar

> **Papel:** Analista
> **Data:** 2026-06-29
> **Participantes:** Dev (usuário) + IA Parceira
> **Status:** ✅ Concluído — insumo para especificação da página inicial

---

## O que estamos decidindo

Antes de construir a página inicial do EventoCar, precisamos entender quem já existe no mercado, o que fazem bem, o que fazem mal e onde está a nossa oportunidade de se diferenciar.

---

## Contexto

O EventoCar quer centralizar eventos de carro do Brasil em um único lugar, com foco no entusiasta — não no profissional do setor. A maioria dos sites encontrados serve nichos específicos (carros antigos, feiras B2B, automobilismo de pista) e nenhum deles resolve o problema de forma ampla e acessível.

---

## Concorrentes encontrados

### 1. Maxicar — maxicar.com.br

**O que é:** Portal focado em veículos antigos e clássicos. Tem um calendário de eventos considerado "o mais completo do Brasil" para esse nicho.

**Pontos positivos:**
- Calendário bem alimentado, com muitos eventos cadastrados
- Permite que organizadores cadastrem seus próprios eventos
- Cobre eventos de todo o país
- Tem uma comunidade fiel de entusiastas de clássicos

**Pontos negativos:**
- Foco exclusivo em carros antigos — não cobre tuning, track day, exposições modernas
- Visual desatualizado, interface pouco intuitiva
- Navegação confusa — muitas seções, difícil achar o calendário rapidamente
- Não tem filtros úteis por estado, tipo de evento ou data
- Não informa valor do ingresso nos eventos

**Link:** https://www.maxicar.com.br/calendario-de-eventos-anuais/

---

### 2. FBVA — fbva.com.br

**O que é:** Federação Brasileira de Veículos Antigos. Tem uma página de eventos dos clubes filiados.

**Pontos positivos:**
- Lista de eventos atualizada regularmente
- Credibilidade institucional — é uma federação oficial
- Cobre eventos em todo o Brasil

**Pontos negativos:**
- Foco restrito: só eventos de veículos antigos de clubes filiados à federação
- Visual extremamente datado (parece um site dos anos 2000)
- Sem filtros — é uma lista corrida de datas
- Não tem informações completas dos eventos (só nome e link "Informações Aqui")
- Não é pensado para o visitante casual — é para membros dos clubes

**Link:** https://www.fbva.com.br/eventos-fbva.php

---

### 3. NFeiras — nfeiras.com/automobilismo/brasil

**O que é:** Agregador internacional de feiras e eventos de negócios. Tem uma seção para o Brasil.

**Pontos positivos:**
- Cobre feiras grandes e oficiais com informações detalhadas
- Visual moderno comparado aos outros
- Tem datas, local e categorias dos eventos

**Pontos negativos:**
- Foco em feiras profissionais e B2B (para empresas do setor, não para entusiastas)
- Não cobre encontros de carro, eventos de tuning ou eventos menores
- Interface em espanhol/inglês — não é 100% adaptado ao Brasil
- Sem filtro por região brasileira
- Não tem valor de ingresso

**Link:** https://www.nfeiras.com/automobilismo/brasil/

---

### 4. Autodynamics — autodynamics.com.br

**O que é:** Site especializado em automobilismo de pista — arrancada, track day e corridas.

**Pontos positivos:**
- Calendário detalhado e bem organizado para o nicho de pista
- Separa por tipo de evento e por autódromo/local
- Serve bem o público de performance e corrida

**Pontos negativos:**
- Nicho muito específico — só automobilismo de pista e arrancada
- Visual antigo
- Nenhuma cobertura de encontros, exposições ou eventos culturais

**Link:** https://autodynamics.com.br/calendarios.php

---

### 5. Carros na Web — carrosnaweb.com.br/eventos.asp

**O que é:** Portal automotivo geral com uma seção de eventos.

**Pontos positivos:**
- É um portal conhecido no Brasil
- Tem alguma cobertura de eventos

**Pontos negativos:**
- Bloqueia acesso automatizado — sinal de que o site não é aberto ou fácil de navegar
- A seção de eventos parece secundária no portal — não é o foco principal
- Não foi possível analisar em profundidade

**Link:** https://www.carrosnaweb.com.br/eventos.asp

---

### 6. Golzinho — golzinho.com

**O que é:** Blog/portal de conteúdo automotivo com artigos sobre eventos.

**Pontos positivos:**
- Escreve sobre eventos de forma acessível e com linguagem para entusiastas
- Cobre eventos variados: tuning, clássicos, exposições

**Pontos negativos:**
- É um blog — não tem um calendário estruturado
- Não é uma ferramenta de busca de eventos; é editorial
- Bloqueia acesso automatizado

**Link:** https://golzinho.com

---

### 7. CBA — cba.org.br/calendario

**O que é:** Confederação Brasileira de Automobilismo. Calendário oficial das competições.

**Pontos positivos:**
- Fonte oficial de competições de automobilismo no Brasil
- Credibilidade máxima para esse nicho

**Pontos negativos:**
- Foco exclusivo em competições oficiais (Stock Car, F1, Rally etc.)
- Não cobre encontros, exposições ou eventos culturais
- Interface institucional, sem experiência de usuário pensada para o fã casual

**Link:** https://www.cba.org.br/calendario

---

## Análise geral do mercado

### O que todo mundo faz mais ou menos:
- Calendário de eventos
- Listagem por data

### O que ninguém faz bem:
- **Cobrir todos os tipos de evento** (clássicos + tuning + track day + exposições + feiras) em um só lugar
- **Filtros úteis** por região, tipo de evento, valor de ingresso e data
- **Visual moderno e acessível** para o entusiasta comum
- **Informações completas** em cada evento (data, local, valor, como chegar, contato)
- **Experiência mobile** — nenhum dos sites é pensado para celular

### Onde está a oportunidade do EventoCar:
O mercado está fragmentado por nicho. Quem gosta de carros antigos vai no Maxicar. Quem curte pista vai no Autodynamics. Quem quer feiras profissionais vai no NFeiras. **Não existe um lugar só para o entusiasta de carro em geral** — independente do tipo de evento.

Essa é a brecha do EventoCar: **ser o calendário completo e acessível para qualquer amante de carro no Brasil**.

---

## Conclusões para a especificação da página inicial

Com base na análise, nossa página inicial deve:

1. **Ter filtros visíveis** — por tipo de evento, estado e data. Isso já nos diferencia de todos os concorrentes.
2. **Mostrar informações completas no card** — pelo menos nome, data, cidade/estado e tipo de evento. Valor se disponível.
3. **Funcionar bem no celular** — nenhum concorrente faz isso direito.
4. **Ser visualmente limpa** — os concorrentes têm interfaces carregadas. Simplicidade é diferencial.
5. **Permitir que organizadores cadastrem eventos** — como o Maxicar faz, mas de forma mais fácil.
6. **Cobrir todos os tipos** — clássicos, tuning, track day, exposições, feiras, encontros de clube.

---

## Próximo passo

Com esse mapa de mercado em mãos, partir para a criação da história de usuário e requisitos da página inicial usando os templates do Analista.

---

*Arquivo salvo em: `docs/analista/brainstorms/2026-06-29-analise-de-mercado.md`*
