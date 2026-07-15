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
| 1 | Buscar informações de eventos automaticamente no Instagram e outras redes sociais | ❌ Descartada | Decidido em 2026-07-14: scraping (em qualquer variante, inclusive Playwright logado na conta própria) viola os Termos da Meta e arrisca a conta @eventocar; API oficial é limitada demais por ora (fica como fase 3 futura). Aprovada em seu lugar a **curadoria assistida por IA** — curador acha o post, IA extrai o JSON, curador revisa e commita. Ver `docs/analista/brainstorms/2026-07-14-proposito-fonte-de-dados-e-ci.md` |

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
| 10 | Testes automatizados rodando via GitHub Actions a cada push, com relatório publicado no GitHub Pages | ✅ Aprovada | Decidido em 2026-07-14: smoke test (cenários `@smoke`) a cada push + rodada completa agendada (cron); relatório publicado migrando o Pages para publicação via Actions (Opção B). Implementação na próxima sessão de Dev. Ver `docs/analista/brainstorms/2026-07-14-proposito-fonte-de-dados-e-ci.md` |
| 11 | Gatilho do GitHub Actions filtrado por `paths` — só roda o teste se o push mexer em código/dados, não em documentação | ✅ Aprovada | Decidido em 2026-07-14 junto com a ideia #10: gatilho do smoke test filtrado para `src/` e `tests/` (o que inclui `src/data/eventos.json`, já que os testes dependem dele). Ver `docs/analista/brainstorms/2026-07-14-proposito-fonte-de-dados-e-ci.md` |

---

## 🏗️ Arquitetura e Código

| # | Ideia | Status | Observações |
|---|-------|--------|-------------|
| 12 | Mover `app/`, `components/`, `lib/`, `data/` para dentro de uma pasta `src/` | 💭 Em aberto | Convenção oficial do Next.js (detecta sozinho, sem configuração extra); separa visualmente "código do sistema" de automação (`tests/`) e documentação (`docs/`) na raiz do projeto |
| 13 | Extrair a função `eventosVisiveis()` de `app/page.js` para `src/lib/eventos.js`, como função JavaScript pura (sem depender de React/Next) | ✅ Aprovada | Feito em 2026-07-11 — ver `docs/dev/brainstorms/2026-07-11-separar-regras-negocio-eventos.md`. A regra de negócio (quais eventos aparecem) fica independente do framework e pode ganhar teste unitário isolado, sem precisar de navegador |
| 14 | Page Object Model na automação de teste (`tests/pages/PaginaInicial.js`) | ✅ Aprovada | Feito em 2026-07-11 — ver `docs/qa/brainstorms/2026-07-11-separar-automacao-page-object-bdd.md`. Separa "o que" testar (cenários) de "como" fazer isso no Playwright especificamente; se um dia trocar de ferramenta, só essa camada intermediária precisa ser reescrita |
| 15 | BDD "de mentalidade" — comentários `// Dado / Quando / Então` dentro dos testes do Playwright, sem trocar de ferramenta | ✅ Aprovada | Feito em 2026-07-11 — ver `docs/qa/brainstorms/2026-07-11-separar-automacao-page-object-bdd.md`. BDD com ferramenta completa (Gherkin + Cucumber/playwright-bdd) continua descartado por ora — só faria sentido se o time crescesse ou algum stakeholder não-técnico precisasse ler os cenários diretamente |
| 16 | Comparar frameworks de teste rodando os mesmos 12 cenários em paralelo | 💭 Em aberto | Discutido em 2026-07-14 e adiado (prioridade: CI das ideias #10/#11). Dois experimentos desenhados: **motores** (Playwright vs Cypress — filosofias opostas de execução) e **abstração** (Playwright puro vs CodeceptJS com helper Playwright — escrita direta vs camada legível com troca de motor por configuração). Fazer UM de cada vez. O Page Object Model (ideia #14) já deixa o projeto pronto pra isso. Ver `docs/analista/brainstorms/2026-07-14-proposito-fonte-de-dados-e-ci.md` |

---

| # | Ideia | Status | Observações |
|---|-------|--------|-------------|
| 9 | Criar guia de referência de técnicas/critérios de decisão para o papel de Analista (nos moldes do `docs/qa/tipos-de-teste.md` e `docs/dev/boas-praticas.md`) | 💭 Em aberto | Só faz sentido se sentirmos a mesma dor que motivou os guias de QA e Dev — a de "ter que decidir um critério do zero toda vez que chega uma demanda nova". Não criar por simetria; criar quando a dor aparecer de fato no papel de Analista |

---

*Última atualização: 2026-07-14 (ideia #1 descartada — curadoria assistida aprovada no lugar; ideias #10 e #11 aprovadas — CI com smoke test e relatório no Pages; ideia #16 criada — comparação de frameworks de teste)*
