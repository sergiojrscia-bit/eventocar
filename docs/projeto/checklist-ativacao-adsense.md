---
title: Checklist — Ativação do AdSense
parent: Projeto
nav_order: 4
---

# ✅ Checklist: Ativação do Google AdSense

> **Quando usar:** no dia em que formos ativar os anúncios — que, pela decisão de 2026-07-12,
> acontece **junto com a migração para o plano Pro da Vercel**.
> **Papel:** Dev + QA
> **Criado em:** 2026-10-03 (opção C da decisão de confiança nos anúncios)

Este checklist reúne, num só lugar, as decisões que já tomamos sobre anúncios e o que precisa ser
feito no painel do AdSense, no código e depois que os anúncios entrarem no ar. Siga na ordem.

**Decisões que este checklist aplica:**

- `docs/analista/brainstorms/2026-07-12-ordem-publicacao-deploy-adsense.md` — AdSense só junto com o plano Pro da Vercel
- `docs/analista/brainstorms/2026-10-03-layout-visualizacoes-e-espacos-adsense.md` — espaços de anúncio em área própria, sem sobreposição (RF12)
- `docs/analista/brainstorms/2026-10-03-confianca-nos-anuncios.md` — sem selo de "anúncio seguro"; transparência e controle

> ⚠️ Os nomes e caminhos das opções do painel foram conferidos em 2026-10-03, nas páginas de
> ajuda do Google listadas no fim. O Google muda o painel com frequência: se algo não estiver
> onde o checklist diz, procure pelo nome da opção na ajuda do AdSense.

---

## 1. Antes de pedir a aprovação

- [ ] Site publicado na Vercel, com **domínio próprio** e HTTPS
- [ ] Plano da Vercel migrado para o **Pro** (o plano Hobby proíbe uso comercial, e o AdSense é citado como exemplo)
- [ ] **E-mail de contato dedicado** criado e preenchido em `src/lib/site.js` (`emailContato`) — aparece nas páginas Contato e Privacidade
- [ ] **Política de privacidade revisada por alguém da área jurídica** (ver REQ-002, Restrições)
- [ ] Agenda com **volume razoável de eventos reais** — o AdSense recusa sites com pouco conteúdo
- [ ] **Fonte de dados alinhada com a decisão de 2026-07-14** (coleta automatizada do Instagram foi descartada, entre outros motivos, pelo risco reputacional com o AdSense) — pendência em aberto desde a troca da fonte para o agente do Instagram
- [ ] Páginas Sobre, Contato e Privacidade no ar, com links no rodapé (HU-002 — ✅ entregue em 2026-10-03)

---

## 2. Configuração do painel no dia da ativação

### 2.1 Somente anúncios posicionados por nós

Nossa regra: anúncio nunca fica por cima do conteúdo, e nada fica por cima do anúncio. Os
formatos automáticos e de sobreposição quebram essa regra — são justamente os que mais passam a
sensação de "vírus".

- [ ] **Anúncios automáticos desligados** para o site (*Anúncios › Por site › editar o site*)
- [ ] Em *Configurações de anúncios › Formatos de sobreposição*, desligar:
  - [ ] **Anúncios de vinheta** (tela cheia entre uma página e outra)
  - [ ] **Anúncios âncora** (faixa grudada no topo ou no rodapé da tela)
  - [ ] **Faixas laterais** (*side rails*)
- [ ] Clicar em **Aplicar ao site** e conferir que ficou salvo

### 2.2 Blocos de anúncio com os tamanhos que já reservamos

Criar um bloco de anúncio (*ad unit*) para cada espaço que já existe no site. Os tamanhos
precisam bater, para a página não "pular" quando o anúncio carregar (CLS):

| Espaço | Onde aparece | Tamanho | Nome sugerido do bloco |
|---|---|---|---|
| Lateral | Agenda (computador) | 300 × 600 | `eventocar-lateral` |
| Horizontal | Grade (a cada 6 cards e no fim) e Linha do tempo (antes do rodapé) | 728 × 90 (celular: 320 × 100) | `eventocar-horizontal` |
| Na lista | Agenda (celular, entre meses) e Linha do tempo (entre meses) | responsivo, 250 px de altura | `eventocar-na-lista` |
| Retângulo | reservado (sem uso hoje) | 300 × 250 | `eventocar-retangulo` |

- [ ] Blocos criados e o **ID de cada bloco** (`data-ad-slot`) anotado
- [ ] **ID de editor** (`ca-pub-…`) anotado

### 2.3 Bloqueios (*Segurança da marca › Controles de bloqueio*)

Sugestão para um site de eventos de carro, visitado por todo tipo de público (as categorias
exatas do painel podem ter nomes um pouco diferentes):

- [ ] **Jogos de azar e apostas** — muito anunciados no Brasil; incompatíveis com o público
- [ ] **Bebidas alcoólicas** — associar álcool a eventos de carro passa a mensagem errada (álcool e direção)
- [ ] **Namoro**
- [ ] **Sensacionalismo** e **exposição significativa de pele**
- [ ] **Drogas e suplementos** e **perda de peso**
- [ ] Bloquear por **URL de anunciante** qualquer anúncio enganoso que aparecer (ex: "ganhe dinheiro fácil", falsos sorteios de carro)

> O próprio Google avisa que a classificação é automática e **não garante** bloquear todos os
> anúncios de uma categoria. Por isso a revisão periódica (seção 5) continua necessária.

### 2.4 Privacidade e mensagens

- [ ] Em *Privacidade e mensagens*, ativar a mensagem de consentimento para visitantes do
      **Espaço Econômico Europeu, Reino Unido e Suíça** (a ferramenta do próprio Google é uma CMP
      certificada). Sem ela, o Google não exibe anúncios personalizados para esses visitantes
- [ ] Decidir, com a revisão jurídica, se haverá aviso de cookies para visitantes do Brasil (LGPD)

---

## 3. Mudanças no código

> Fazer numa sessão de Dev, com testes antes do código (como em todas as entregas).

- [ ] **`public/ads.txt`** criado, com a linha `google.com, pub-SEU-ID, DIRECT, f08c47fec0942fa0`
      (o arquivo precisa abrir em `https://seu-dominio/ads.txt`)
- [ ] **Script do AdSense** carregado uma única vez em `src/app/layout.js`, só no site publicado
      (`next/script`, com o `ca-pub-…`)
- [ ] **`src/components/EspacoAnuncio.js`**: trocar a caixa tracejada pelo bloco oficial
      (`<ins class="adsbygoogle">` com `data-ad-client` e `data-ad-slot`), mantendo:
  - [ ] a mesma altura reservada de cada formato
  - [ ] o rótulo **"Publicidade"**
  - [ ] a área própria no fluxo da página (nada de `position: fixed` ou `absolute`)
- [ ] IDs (`ca-pub-…` e `data-ad-slot`) guardados em configuração (ex: `src/lib/site.js` ou
      variáveis de ambiente da Vercel), não espalhados pelo código
- [ ] **`src/app/privacidade/page.js`**: reescrever a seção **Anúncios** *antes* de os anúncios
      irem ao ar — cookies do Google, anúncios personalizados, link para "Como o Google usa
      informações de sites que usam nossos serviços" e para a Minha Central de Anúncios
      (onde a pessoa desativa a personalização) — e atualizar a data no topo
- [ ] Testes do RF12 atualizados: os espaços continuam em área própria e não cobrem nenhum card
- [ ] `make test` passando e lint sem erros

---

## 4. Verificação depois de ir ao ar

- [ ] Os anúncios aparecem **só** nos espaços reservados, em todos os modos (Agenda, Grade, Linha do tempo)
- [ ] Nenhum anúncio de vinheta, âncora ou faixa lateral aparece (no computador e no celular)
- [ ] A página **não "pula"** quando o anúncio carrega
- [ ] Todo anúncio tem o rótulo "Publicidade"
- [ ] Nenhum anúncio fica colado em botões, filtros ou links "Ver post" (risco de clique acidental, que o AdSense pune)
- [ ] Testado com os 6 temas de cores (o espaço precisa continuar visível nos temas escuros)
- [ ] `https://seu-dominio/ads.txt` abre e mostra a linha correta
- [ ] Mensagem de consentimento aparece para visitante simulado da Europa (e não para o Brasil, se assim decidido)
- [ ] Registrar a ativação no `diario-de-decisoes.md`

---

## 5. Rotina mensal

- [ ] Passar pelo **Centro de revisão de anúncios** e bloquear anúncios ruins
- [ ] Conferir a **Central de políticas** do AdSense (avisos de violação)
- [ ] Ler e responder os contatos de visitantes sobre anúncios estranhos
- [ ] Comparar a receita do AdSense com o custo do plano Pro da Vercel (decisão de 2026-07-12)

---

## 6. O que nunca fazer

- ❌ Clicar nos próprios anúncios, nem "para testar" — gera tráfego inválido e pode encerrar a conta
- ❌ Pedir que outras pessoas cliquem, ou usar textos como "apoie o site clicando", setas ou destaques apontando para anúncios
- ❌ Selo de "anúncio seguro" ou "verificado" (decisão de 2026-10-03)
- ❌ Disfarçar anúncio de evento ou de conteúdo, ou trocar o rótulo "Publicidade"
- ❌ Reativar anúncios automáticos ou formatos de sobreposição "só para ver quanto rende"

---

## Fontes consultadas (2026-10-03)

- Ajuda do AdSense — formatos de sobreposição e anúncios automáticos: <https://support.google.com/adsense/answer/9305577>
- Desativar anúncios de vinheta (passo a passo): <https://docs.clickio.com/books/google-adsense-guide/page/how-to-disable-vignette-ads-in-adsense>
- Desativar anúncios âncora (passo a passo): <https://docs.clickio.com/books/google-adsense-guide/page/how-to-disable-anchor-ads-in-adsense>
- Exigência de CMP certificada para EEE, Reino Unido e Suíça: <https://support.google.com/admanager/answer/13554116?hl=en>
- Como funciona a CMP do Google: <https://support.google.com/adsense/answer/16918505>
- ads.txt (formato da linha): <https://developers.google.com/adsense/platforms/transparent/ads-txt>
- Verificação de endereço por PIN: <https://support.google.com/adsense/answer/157667>
- Categorias sensíveis e controles de bloqueio: <https://support.google.com/adsense/answer/180609>

---

## Histórico de Alterações

| Data | Autor | O que mudou |
|------|-------|-------------|
| 2026-10-03 | Dev + QA | Criação do documento (opção C da decisão de confiança nos anúncios) |
