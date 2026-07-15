---
title: 2026-07-14 — Propósito, fonte de dados e CI
parent: Brainstorms
grand_parent: Analista
---

# 🧠 Brainstorm: Propósito do projeto, fonte de dados (Instagram) e automação de CI

> **Papel:** Analista
> **Data:** 2026-07-14
> **Participantes:** Dev + IA Parceira
> **Status:** ✅ Decidido

---

## O que estamos decidindo

A sessão começou com uma pergunta ("como criar uma API para buscar eventos do Instagram?") e evoluiu para três decisões conectadas:

1. **Fonte de dados:** como alimentar o `src/data/eventos.json` com eventos reais (ideia #1 do `ideias.md`)
2. **Propósito do projeto:** o que define sucesso para o EventoCar
3. **Automação de CI:** testes rodando sozinhos e relatório publicado (ideias #10 e #11 do `ideias.md`)

---

## Contexto

O site está pronto para o deploy (página inicial entregue e testada, 12/12 cenários passando), mas ainda roda com 6 eventos de exemplo. A ideia inicial era automatizar a coleta de eventos a partir de publicações no Instagram. A investigação das regras da Meta em 2026 mudou o rumo da conversa e acabou provocando uma reflexão maior sobre o objetivo do projeto.

---

## Tema 1 — Fonte de dados dos eventos

### Opção A — Curadoria assistida por IA

**O que é:**
O curador (por enquanto, o próprio dono do projeto) encontra os posts de eventos no Instagram como usuário comum, copia a legenda + link e usa a IA parceira para extrair os campos estruturados (nome, data, cidade, UF, tipo, valor) já no formato do `eventos.json`. Revisa e commita.

**Vantagens:**
- Zero risco legal; funciona hoje, sem código novo obrigatório
- Qualidade controlada (nenhuma data errada publicada sem revisão)
- Constrói o formato de dados e o processo de extração que qualquer automação futura vai reaproveitar

**Desvantagens:**
- Esforço manual proporcional ao volume
- Não "descobre" eventos sozinha

### Opção B — API oficial da Meta (Hashtag Search + Business Discovery)

**O que é:**
Conta profissional do EventoCar no Instagram + app registrado na Meta, usando os recursos oficiais de leitura de conteúdo público.

**Vantagens:**
- 100% legal e sustentável; automatiza a descoberta de eventos
- A conta do EventoCar tem valor próprio de divulgação

**Desvantagens:**
- Aprovação do app pela Meta demora de 2 a 8 semanas, com rejeições frequentes
- Limites duros: 30 hashtags únicas por janela de 7 dias; mídia recente cobre só as últimas 24h (exige robô rodando diariamente — backend + agendamento que ainda não temos); hashtag search não informa o username do autor
- Business Discovery só lê contas Business/Creator — organizadores com conta pessoal ficam de fora
- A legenda continua sendo texto livre: a extração com IA da Opção A seria necessária de qualquer forma (B soma-se a A, não a substitui)

### Opção C — Scraping (em qualquer variante)

**O que é:**
Robôs que raspam as páginas do Instagram fora da API oficial. Inclui a variante **C2 — automação com Playwright logado na conta do EventoCar** pesquisando eventos de perfis seguidos, discutida na sessão.

**Vantagens:**
- Acesso amplo aos dados, sem burocracia de aprovação

**Desvantagens:**
- Viola os Termos de Uso da Meta — a proibição é sobre acesso automatizado fora da API, independente de ferramenta e de estar logado na própria conta
- Na variante C2, o ativo em risco é a própria conta @eventocar (checkpoint → bloqueio → ban), justamente o perfil que dará credibilidade ao site
- Fragilidade crônica: HTML ofuscado, classes com hash, desafios de login — manutenção eterna
- Risco reputacional incompatível com a busca por aprovação no AdSense e parcerias com organizadores

---

## Tema 2 — Propósito do projeto e estratégia de conteúdo

Durante a discussão surgiram (e foram avaliadas) duas alternativas de rumo:

**Pivotar para outro produto** — descartado: o obstáculo encontrado foi num mecanismo de captação de dados, não na proposta; qualquer novo produto enfrentaria os mesmos desafios de dados e tração, partindo do zero e jogando fora análise de mercado, código, testes e documentação já validados.

**Portal de conteúdo com resumos de sites estrangeiros gerados por IA** — descartado: o AdSense rejeita conteúdo raspado/reescrito sem valor próprio (a estratégia pensada para conseguir o AdSense é causa comum de rejeição nele); a política de spam da Busca do Google penaliza conteúdo em massa gerado por IA sem originalidade; e resumo sistemático da produção alheia como modelo de negócio é juridicamente arriscado. Se houver fase de conteúdo no futuro, ela deve nascer dos nossos próprios dados (ex: "eventos de carros antigos em SC neste semestre").

**Redefinição registrada:** o propósito principal do EventoCar passa a ser **laboratório de aprendizado de IA e automação com um projeto real** — código, dados, testes e documentação de verdade. Tráfego e monetização via AdSense tornam-se objetivos secundários (bônus se acontecerem), não critérios de sucesso. A curadoria organizada da agenda de eventos é, por si só, o conteúdo original do site.

---

## Tema 3 — Automação de CI (ideias #10 e #11)

**O que é CI:** Integração Contínua — um robô do GitHub (GitHub Actions) que roda comandos automaticamente quando algo acontece no repositório (um push, um horário agendado).

Decidiu-se implementar dois workflows:

1. **Smoke test a cada push** — subconjunto mínimo de 3–4 cenários críticos marcados com tag `@smoke` (página carrega, eventos aparecem, um filtro funciona), rodando com `--grep @smoke` e com gatilho filtrado por `paths` (só dispara se o push mexer em `src/` ou `tests/` — commit só de `docs/` não gasta minutos de Actions, conforme ideia #11)
2. **Rodada completa agendada** — os 12 cenários via gatilho `schedule` (cron), ex: toda segunda de manhã. Custo zero em repositório público.

Para a **publicação do relatório**, o conflito: o repositório já usa o GitHub Pages (branch `main`, pasta `/docs`) para o site de documentação, e um repositório só pode ter uma fonte de Pages.

### Opção A — Robô commita o relatório dentro de `docs/`

**Vantagens:**
- Simples de entender; relatório vira parte do site existente

**Desvantagens:**
- Contradiz a decisão de 2026-07-08 (relatório é saída gerada, não conteúdo versionado)
- Cada rodada agendada vira um commit automático poluindo o histórico
- Jekyll pode tentar processar o HTML do relatório

### Opção B — Migrar o Pages para publicação via GitHub Actions

**Vantagens:**
- Nenhum commit automático; relatório sempre fresco no mesmo domínio; nada de arquivo gerado versionado
- É o modo "oficial moderno" de publicar Pages — mais aprendizado de CI pelo mesmo esforço

**Desvantagens:**
- Mexe na infraestrutura de publicação que hoje funciona (o build do Jekyll passa a rodar no workflow)

### Opção C — Relatório como artefato do workflow

**Vantagens:**
- Configuração mínima

**Desvantagens:**
- Exige baixar um zip para ver o relatório — exatamente o que a ideia #10 já rejeitou

---

## Tema 4 — Comparação de frameworks de teste (adiado)

Foi discutida a ideia de rodar os mesmos 12 cenários em um segundo framework para comparar comportamentos. Dois experimentos foram desenhados: **motores** (Playwright vs Cypress — filosofias de execução opostas) e **abstração** (Playwright puro vs CodeceptJS com helper Playwright — escrita direta no motor vs camada legível/portátil com troca de motor por configuração). A decisão foi **adiar**: prioridade agora é a infraestrutura de CI do que já existe. A ideia foi registrada no `ideias.md` (ideia #16) com os dois desenhos de experimento preservados. O Page Object Model adotado em 2026-07-11 já deixa o projeto preparado para esse dia.

---

## Recomendação

**Tema 1:** Opção A agora; formulário de sugestão de eventos (já no backlog) como fase 2; Opção B como fase 3, só quando o volume manual doer; Opção C descartada em definitivo, em todas as variantes.

**Tema 3:** os dois workflows com a Opção B de publicação. Se a B se mostrar espinhosa demais na implementação, a A é o plano de emergência assumido.

---

## Decisão final

- [ ] Em discussão
- [x] Aprovada → registrar no `diario-de-decisoes.md`
- [ ] Descartada → manter motivo registrado aqui

**O que foi decidido:**
Curadoria assistida por IA como processo de alimentação de dados (coleta automatizada do Instagram descartada em definitivo); propósito do projeto redefinido como laboratório de aprendizado; CI aprovado com smoke test por push, rodada completa agendada e relatório publicado via Pages por Actions; comparação de frameworks adiada e registrada.

**Motivo:**
Conteúdo real no ar o quanto antes com risco zero, prioridade para infraestrutura do que já existe, e critério de sucesso alinhado ao objetivo real do dono do projeto: aprender IA e automação construindo algo de verdade.

---

## Próximo passo

Sessão de Dev (🛠️) para implementar os dois workflows do GitHub Actions e a migração do Pages para publicação via Actions — com tag `@smoke` nos cenários críticos, filtro de `paths` e template de decisão técnica preenchido.

---

*Arquivo salvo em: `docs/analista/brainstorms/2026-07-14-proposito-fonte-de-dados-e-ci.md`*
