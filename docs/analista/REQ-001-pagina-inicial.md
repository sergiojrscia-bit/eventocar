---
title: REQ-001 — Página inicial
parent: Analista
nav_order: 2
---

# 📋 Requisito: Página inicial com listagem e filtros de eventos

## Identificação

- **ID:** REQ-001
- **Título:** Página inicial com listagem e filtros de eventos automotivos
- **Tipo:** `Funcional`
- **Prioridade:** `Alta`
- **História de Usuário relacionada:** HU-001
- **Data:** 2026-06-29
- **Autor:** Analista
- **Status:** `Aprovado`

---

## Descrição

A página inicial do EventoCar deve exibir uma listagem de eventos automotivos do Brasil, com filtros que permitam ao usuário encontrar rapidamente eventos do seu interesse. Os eventos devem ser apresentados em cards visuais, ordenados por data, e a página deve funcionar bem em celular e computador.

---

## Requisitos Funcionais

> O que o sistema **deve fazer**.

- RF01 — Exibir lista de eventos em formato de cards, ordenados por data (mais próximos primeiro)
- RF02 — Cada card deve mostrar: nome do evento, data, cidade, estado e tipo do evento
- RF03 — Exibir filtro por tipo de evento, listando só os tipos que existem entre os eventos da agenda que ainda não terminaram (dentre Clássicos, Tuning, Track Day, Exposição, Feira, Encontro de Clube e Outros, nessa ordem)
- RF04 — Exibir filtro por estado, listando só as UFs que existem entre os eventos da agenda que ainda não terminaram, em ordem alfabética
- RF05 — Exibir filtro por mês ou intervalo de datas
- RF06 — Permitir a combinação de múltiplos filtros simultaneamente
- RF07 — Exibir mensagem amigável quando nenhum evento corresponder aos filtros aplicados
- RF08 — Exibir o campo "valor do ingresso" no card quando a informação estiver disponível
- RF09 — Não exibir eventos com data passada na listagem principal
- RF10 — Exibir cabeçalho com nome do site e rodapé com informações básicas
- RF11 — Permitir que o visitante escolha como ver a lista de eventos, entre três modos (Agenda, Grade e Linha do tempo), com Agenda como padrão. A escolha fica salva no navegador do visitante para as próximas visitas
- RF12 — Reservar espaços para anúncios do Google AdSense em cada modo de visualização, cada um em área própria (nunca sobreposto ao conteúdo, e nada sobreposto a ele), com altura fixa reservada e o rótulo "Publicidade". Enquanto o AdSense não estiver ativo, os espaços só aparecem em desenvolvimento
- RF13 — Todo link externo nos cards deve mostrar o site de destino antes do clique (ex: "instagram.com ↗"), para o visitante saber para onde vai e não confundir o link com anúncio
- RF14 — Permitir que o visitante escolha o tema de cores do site entre seis opções (Original, Laranja pista, Azul oceano, Verde inglês, Amarelo largada e Rosa neon), com Original como padrão — o visual de antes dos temas, com links azuis e faixa lateral colorida pelo tipo do evento. Cada tema troca fundo, cards, textos, bordas, cabeçalho e destaques; dois deles são escuros. A escolha vale para os três modos de visualização, fica salva no navegador e é aplicada antes de a página aparecer (sem "piscar"). Todo tema deve passar no contraste WCAG AA (mínimo 4.5:1), verificado por teste automatizado

---

## Requisitos Não-Funcionais

> Como o sistema **deve se comportar**.

- RNF01 — A página deve carregar em menos de 3 segundos em conexões móveis comuns
- RNF02 — O layout deve ser responsivo — funcionar em telas de celular (a partir de 375px) e computador
- RNF03 — As páginas devem ser renderizadas no servidor (SSR ou SSG do Next.js) para garantir boa indexação no Google (SEO)
- RNF04 — O código deve seguir os padrões do ESLint configurado no projeto
- RNF05 — O site deve ser acessível via HTTPS quando publicado na Vercel

---

## Restrições

- Os eventos são cadastrados manualmente por enquanto — não há integração com APIs externas nesta versão
- O sistema de cadastro de eventos pelo organizador é fora do escopo desta entrega
- Não haverá paginação na primeira versão — todos os eventos futuros serão exibidos de uma vez (revisar se o volume crescer)
- Os dados dos eventos ficam em um arquivo local (JSON ou similar) até a integração com banco de dados ser definida

---

## Dependências

- Depende de: projeto Next.js inicializado (já concluído em 2026-06-28)
- Não há outros requisitos bloqueantes

---

## Critérios de Aceite

- [x] A página inicial abre sem erros em `http://localhost:3000`
- [x] Pelo menos 5 eventos de exemplo aparecem na listagem
- [x] Os filtros de tipo, estado e data funcionam individualmente
- [x] Os filtros funcionam combinados (ex: tuning + SP)
- [x] Ao filtrar sem resultado, aparece mensagem: "Nenhum evento encontrado para os filtros selecionados."
- [x] A página é visualizável e utilizável em tela de celular (375px)
- [x] Eventos com data anterior a hoje não aparecem na lista
- [x] A página passa na verificação do Playwright sem erros
- [x] O visitante troca entre Agenda, Grade e Linha do tempo, e a escolha continua ao recarregar a página (RF11)
- [x] Os espaços de anúncio aparecem em área própria em cada modo, sem cobrir nenhum evento (RF12)
- [x] Em todos os modos, todo link de post mostra o site de destino e leva de fato até ele (RF13)
- [x] Cada um dos seis temas pode ser escolhido e é aplicado aos cards; tema e modo continuam ao recarregar a página; os seis passam no teste de contraste WCAG AA; só o tema Original mostra a faixa colorida do tipo (RF14)

> ✅ Sete critérios implementados e validados visualmente pelo Dev em 2026-07-01.
> ⚠️ O critério de Playwright continua pendente — testes automatizados ainda não foram
> criados (ver backlog no `diario-de-decisoes.md`). Caso de teste manual em
> `docs/qa/casos-de-teste/2026-07-05-caso-de-teste-pagina-inicial.md`, ainda não executado.

---

## Notas e Observações

- Diferencial identificado na análise de mercado: nenhum concorrente oferece filtros combinados para todos os tipos de evento automotivo
- O arquivo de dados inicial pode ser `data/eventos.json` — uma lista de objetos com os campos definidos nos RFs
- Referência visual de simplicidade: evitar menus laterais pesados, preferir filtros no topo ou em linha
- Compatível com Google AdSense: layout deve ter espaço reservado para anúncios sem quebrar a experiência — resolvido pelo RF12 (ver `docs/analista/brainstorms/2026-10-03-layout-visualizacoes-e-espacos-adsense.md`)

---

## Histórico de Alterações

| Data | Autor | O que mudou |
|------|-------|-------------|
| 2026-06-29 | Analista | Criação do documento |
| 2026-07-05 | Analista | Critérios de aceite marcados como cumpridos (exceto Playwright, ainda pendente), conforme entrega registrada no diário em 2026-07-01 |
| 2026-10-03 | Analista | RF11 (modos de visualização escolhidos pelo visitante) e RF12 (espaços de anúncio sem sobreposição) adicionados, com critérios de aceite. Critério do Playwright marcado como cumprido — validado em 2026-07-08 (ver diário) e confirmado em 2026-10-03 com 16 cenários passando |
| 2026-10-03 | Analista | RF13 (links externos mostram o site de destino) adicionado, com critério de aceite. Ver `docs/analista/brainstorms/2026-10-03-confianca-nos-anuncios.md` |
| 2026-10-03 | Analista | RF14 (tema de cores escolhido pelo visitante) adicionado, com critério de aceite. Ver `docs/analista/brainstorms/2026-10-03-paletas-de-cores.md` |
| 2026-10-03 | Analista | RF03 e RF04 alterados: os filtros de tipo e estado deixam de listar todas as opções fixas e passam a listar só o que existe nos eventos da agenda, para nenhuma opção levar a "nenhum evento encontrado" |
