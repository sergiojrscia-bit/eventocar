---
title: Ideias
parent: Projeto
nav_order: 2
---

# 💡 Ideias — EventoCar

> Este arquivo é o caderno de rascunho do projeto.
> Aqui ficam ideias que ainda não viraram decisão — mas que merecem ser lembradas.
> Quando uma ideia amadurecer e for aprovada, ela migra para o `diario-de-decisoes.md`.

---

## Como usar

- Anote qualquer ideia sem pressão — não precisa estar 100% definida
- Classifique por categoria para facilitar a busca
- Marque o status conforme a ideia evolui

**Status possíveis:**
- 💭 Em aberto — ideia registrada, ainda não discutida
- 🔍 Em análise — estamos avaliando viabilidade
- ✅ Aprovada — virou decisão (registrar no diário e arquivar aqui)
- ❌ Descartada — decidimos não seguir por ora (manter o motivo registrado)

---

## 🤖 Alimentação de Dados

| # | Ideia | Status | Observações |
|---|-------|--------|-------------|
| 1 | Buscar informações de eventos automaticamente no Instagram e outras redes sociais | 💭 Em aberto | Reduz trabalho manual de cadastro. Avaliar viabilidade técnica e limitações das APIs das plataformas |

---

## 💰 Monetização

| # | Ideia | Status | Observações |
|---|-------|--------|-------------|
| 2 | Integrar Google AdSense de forma não invasiva — sem poluir a tela ou prejudicar a navegação | 💭 Em aberto | Equilíbrio entre monetização e experiência do usuário é essencial |
| 3 | Adicionar algum indicador visual de que os anúncios do AdSense são seguros e confiáveis | 💭 Em aberto | Reduzir desconfiança do usuário em clicar nos anúncios |

---

## 🎨 Design e Experiência do Usuário

| # | Ideia | Status | Observações |
|---|-------|--------|-------------|
| 4 | Layout simples, objetivo e acessível | 💭 Em aberto | Priorizar clareza e facilidade de uso para qualquer perfil de visitante |
| 5 | Espaço para o usuário enviar sugestões e ideias diretamente pelo site | 💭 Em aberto | Canal de feedback da comunidade |

---

## 📊 Métricas e Visibilidade

| # | Ideia | Status | Observações |
|---|-------|--------|-------------|
| 6 | Contador de visitas visível no site | 💭 Em aberto | Gera prova social e senso de comunidade |
| 7 | Otimizar o site para ser facilmente encontrado no Google (SEO) | 💭 Em aberto | Fundamental para crescimento orgânico — já favorecido pela escolha do Next.js |

---

## 🔍 Busca e Filtros

| # | Ideia | Status | Observações |
|---|-------|--------|-------------|
| 8 | Sistema de pesquisa e filtros de eventos por data, região e outros critérios | 💭 Em aberto | Feature central do produto — quanto mais filtros, mais útil o site fica |

---

## ⚙️ Automação e Infraestrutura

| # | Ideia | Status | Observações |
|---|-------|--------|-------------|
| 10 | Testes automatizados rodando via GitHub Actions a cada push, com relatório publicado no GitHub Pages | 💭 Em aberto | Opção B discutida em 2026-07-08: agenda o Playwright pra rodar sozinho e publica o relatório num endereço fixo (mesma infra do site de documentação), sem precisar baixar nada pra ver quais cenários passaram |
| 11 | Gatilho do GitHub Actions filtrado por `paths` — só roda o teste se o push mexer em código/dados, não em documentação | 💭 Em aberto | Evita rodar (e gastar minutos do GitHub Actions) quando o commit é só em `docs/`. Discutir se `data/eventos.json` entra na lista de gatilhos, já que os testes dependem dele |

---

## 🏗️ Arquitetura e Código

| # | Ideia | Status | Observações |
|---|-------|--------|-------------|
| 12 | Mover `app/`, `components/`, `lib/`, `data/` para dentro de uma pasta `src/` | 💭 Em aberto | Convenção oficial do Next.js (detecta sozinho, sem configuração extra); separa visualmente "código do sistema" de automação (`tests/`) e documentação (`docs/`) na raiz do projeto |
| 13 | Extrair a função `eventosVisiveis()` de `app/page.js` para `src/lib/eventos.js`, como função JavaScript pura (sem depender de React/Next) | 💭 Em aberto | A regra de negócio (quais eventos aparecem) fica independente do framework — sobrevive a uma eventual troca de Next.js por outra tecnologia, e passa a poder ganhar teste unitário isolado, sem precisar de navegador |
| 14 | Page Object Model na automação de teste (`tests/pages/PaginaInicial.js`) | 💭 Em aberto | Separa "o que" testar (cenários) de "como" fazer isso no Playwright especificamente; se um dia trocar de ferramenta (ex: Robot Framework), só essa camada intermediária precisa ser reescrita — o resto (lista de cenários, critérios de aceite) continua valendo |
| 15 | BDD "de mentalidade" — comentários `// Dado / Quando / Então` dentro dos testes do Playwright, sem trocar de ferramenta | 💭 Em aberto | Pega o benefício de organizar o pensamento por comportamento do usuário sem o custo de manter arquivos `.feature` sincronizados. BDD com ferramenta completa (Gherkin + Cucumber/playwright-bdd) fica registrado aqui como ideia descartada por ora — só faria sentido se o time crescesse ou algum stakeholder não-técnico precisasse ler os cenários diretamente |

---

| # | Ideia | Status | Observações |
|---|-------|--------|-------------|
| 9 | Criar guia de referência de técnicas/critérios de decisão para o papel de Analista (nos moldes do `docs/qa/tipos-de-teste.md` e `docs/dev/boas-praticas.md`) | 💭 Em aberto | Só faz sentido se sentirmos a mesma dor que motivou os guias de QA e Dev — a de "ter que decidir um critério do zero toda vez que chega uma demanda nova". Não criar por simetria; criar quando a dor aparecer de fato no papel de Analista |

---

*Última atualização: 2026-07-08*
