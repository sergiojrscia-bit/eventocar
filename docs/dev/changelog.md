---
title: Changelog
parent: Dev
nav_order: 4
---

# Changelog — EventoCar

> Registro cronológico de tudo que foi construído ou alterado no projeto.
> Mais recente sempre no topo.

---

## 2026-10-03 — Links mostram o site de destino (RF13)

**O que mudou:** O link de cada card passou a ter duas linhas: "Ver post" e, embaixo, o site de destino ("instagram.com ↗"). Leitores de tela também ouvem "(abre em nova aba)". O domínio vem da nova função `dominioDoLink()` em `src/lib/formatacao.js`, usada pelo `LinkPreview`.

**Por quê:** Parte da decisão sobre confiança nos anúncios: quem sabe para onde o link leva não confunde nosso link com anúncio. Decisão completa em `docs/analista/brainstorms/2026-10-03-confianca-nos-anuncios.md`.

**Testes:** 3 cenários novos (um por modo de visualização) verificam que todo link de post mostra "instagram.com" e aponta de fato para `https://instagram.com`. Resultado: 19 passando e 1 pulado, em 3 rodadas seguidas. Conferido também que nenhum link passa da borda do card em telas de 1366px, 375px e 320px.

## 2026-10-03 — Novo layout com 3 modos de visualização e espaços para anúncios

**O que mudou:** A página inicial ganhou três modos de visualização que o visitante escolhe pelos botões "Ver como" na barra de filtros: **Agenda** (padrão, eventos agrupados por mês), **Grade** (cards) e **Linha do tempo** (tema escuro). A escolha fica salva no navegador do visitante. Cada modo tem espaços reservados para anúncios do AdSense em área própria, sem sobreposição. Os cards passaram a destacar a data e a mostrar horário, local, período (eventos de vários dias) e "A partir de R$ X".

**Por quê:** O layout anterior não agradou e não havia espaço para anúncios. Decisão completa em `docs/analista/brainstorms/2026-10-03-layout-visualizacoes-e-espacos-adsense.md`.

**Arquivos criados ou modificados:**
- Criados: `src/components/layouts/` (Agenda, Grade, Linha do tempo), `SeletorVisualizacao`, `EspacoAnuncio`, `Resumo.js` e `src/lib/formatacao.js`
- Modificados: `src/app/page.js` (escolha e preferência do modo), `Filtros.js` (aceita estilo de cada modo e ganhou rótulos de acessibilidade), `src/lib/eventos.js` (`agruparPorMes`), `src/lib/fonteInstagram.js` (campos `horario` e `local`), `globals.css` (`--cor-acento-texto`)
- Removidos: `EventCard.js`, `EventCard.module.css` e `page.module.css`
- Testes: 5 cenários novos para o RF11 em `tests/pagina-inicial.spec.js`, com os métodos `selecionarVisualizacao`, `verificarVisualizacaoAtiva` e `recarregar` no Page Object

**Resultado:** 16 testes passando e 1 pulado (RF09: o JSON atual não tem evento que já terminou). Lint sem problemas. Conferido no computador (1366px) e no celular (375px), sem erros no console e sem rolagem horizontal.

**Correção no mesmo dia — teste intermitente do RF05:** com vários testes em paralelo, o filtro de mês às vezes era preenchido antes de o React assumir a página no navegador (hidratação), e o React desfazia o valor. A página agora expõe um sinal `data-hidratado` e o `abrir()`/`recarregar()` do Page Object esperam por ele antes de interagir. Validado com 5 rodadas seguidas da suíte completa: 16/16 em todas.

## 2026-07-12 — Passos com nome de negócio no relatório de testes

**O que mudou:** Métodos de ação e verificação de `tests/pages/PaginaInicial.js`
agora envolvem suas chamadas com `test.step()`. O relatório HTML
(`make test-report`) passa a mostrar passos como "Seleciona o filtro de tipo
'Track Day'" e "Verifica que aparecem 1 card(s) de evento", em vez de ações
cruas do Playwright ("Select option", "Expect toHaveCount").

**Por quê:** Quem conferia o resultado dos testes não conseguia saber qual
cenário estava sendo validado sem abrir o código-fonte. Decisão completa em
`docs/dev/brainstorms/2026-07-12-teststep-page-object-relatorio.md`.

**Resultado:** 12/12 testes continuam passando (`make test`), sem alteração
de comportamento — só de legibilidade do relatório.

## 2026-07-11 — Automação de testes separada com Page Object Model e BDD de mentalidade

**O que foi feito:**
- Criado `tests/pages/PaginaInicial.js` — Page Object com todos os seletores e ações do Playwright (a única camada que conhece Playwright de verdade)
- `tests/pagina-inicial.spec.js` reescrito: cada teste ganhou comentários `// Dado / Quando / Então` descrevendo o cenário em português antes do código, e nenhum seletor bruto (`data-testid`, `selectOption`, `fill`) aparece mais direto no arquivo — tudo passa pelo Page Object
- Removida a reimplementação duplicada de `eventosVisiveis()` dentro do teste; agora ele importa a função de `src/lib/eventos.js`, a mesma usada pelo site
- Resolvidas as ideias #14 e #15 do `ideias.md`

**Por que foi feito assim:**
> O teste misturava cenário, seletor do Playwright e lógica de negócio duplicada no mesmo arquivo. Com o Page Object, trocar de ferramenta de teste no futuro exige reescrever só `PaginaInicial.js`, não os cenários. Com Dado/Quando/Então, o `.spec.js` fica legível como documentação, mesmo pra quem não programa. Decisão completa em `docs/dev/brainstorms/2026-07-11-separar-automacao-page-object-bdd.md`.

**Arquivos criados ou modificados:**

| Arquivo | O que mudou |
|---------|-------------|
| `tests/pages/PaginaInicial.js` | Arquivo novo — Page Object da página inicial |
| `tests/pagina-inicial.spec.js` | Reescrito: cenários em Dado/Quando/Então via Page Object, sem seletor bruto; importa `eventosVisiveis()` de `src/lib/eventos.js` em vez de duplicá-la |

**Testado por:** [x] Dev  [ ] QA  
**Deploy feito:** [ ] Sim  [x] Não  

---

## 2026-07-11 — Regras de negócio de eventos extraídas para src/lib/eventos.js

**O que foi feito:**
- Criado `src/lib/eventos.js` com as regras de negócio de eventos como funções puras: `ocultarPassados`, `filtrarPorTipo`, `filtrarPorEstado`, `filtrarPorMes`, `ordenarPorData` e a composição `eventosVisiveis`
- `src/app/page.js` simplificado: o `useMemo` agora só chama `eventosVisiveis(eventos, filtros)`, sem nenhuma regra de negócio misturada com o código de React
- Resolvida a ideia #13 do `ideias.md`

**Por que foi feito assim:**
> A lógica de filtragem/ordenação estava toda dentro de um `useMemo` no componente da página, misturada com React. Isso dificultava trocar de framework no futuro e impedia testar cada regra isolada, sem navegador. Cada regra virou uma função pura e independente — uma regra de negócio nova entra como mais uma função em `eventos.js`, sem mexer nas existentes. Decisão completa em `docs/dev/brainstorms/2026-07-11-separar-regras-negocio-eventos.md`.

**Arquivos criados ou modificados:**

| Arquivo | O que mudou |
|---------|-------------|
| `src/lib/eventos.js` | Arquivo novo — regras de negócio de eventos como funções puras |
| `src/app/page.js` | `useMemo` simplificado para chamar `eventosVisiveis()` em vez de conter a lógica de filtro/ordenação |

**Testado por:** [x] Dev  [ ] QA  
**Deploy feito:** [ ] Sim  [x] Não  

---

## 2026-07-11 — make test e make test-report instalam dependencias automaticamente

**O que foi feito:**
- `make test` e `make test-report` agora checam se `node_modules/@playwright/test` existe antes de rodar; se nao existir, rodam `npm install` automaticamente
- Ambos os comandos passam a rodar `npx playwright install` antes dos testes, garantindo que os navegadores do Playwright tambem estejam prontos

**Por que foi feito assim:**
> Quem clonava o projeto (ou apagava `node_modules`) e rodava `make test` direto via erro cru do Node (`Cannot find module '@playwright/test'`), sem saber que precisava rodar `make setup-qa` antes. Automatizar essa checagem remove esse atrito. `npx playwright install` e idempotente — se os navegadores ja estiverem instalados, ele confere rapido e segue sem baixar nada de novo, entao nao deixa o dia a dia mais lento depois da primeira vez.

**Arquivos criados ou modificados:**

| Arquivo | O que mudou |
|---------|-------------|
| `Makefile` | Alvos `test` e `test-report` agora instalam dependencias e navegadores automaticamente se necessario |

**Testado por:** [x] Dev  [ ] QA  
**Deploy feito:** [ ] Sim  [x] Não  

---

## 2026-07-11 — Reorganização de pastas: código do sistema movido para src/

**O que foi feito:**
- Pastas `app/`, `components/`, `lib/` e `data/` movidas para dentro de `src/`, seguindo a convenção nativa do Next.js
- Alias `@/*` no `jsconfig.json` atualizado de `./*` para `./src/*`
- Caminho de leitura de `eventos.json` corrigido em `tests/pagina-inicial.spec.js` (de `data/eventos.json` para `src/data/eventos.json`)

**Por que foi feito assim:**
> O código do sistema estava solto na raiz do repositório, misturado visualmente com automação (`tests/`) e documentação (`docs/`). Mover para `src/` é o padrão que o próprio Next.js espera — detectado automaticamente, sem configuração extra — e deixa claro, só de olhar a raiz, o que é código, o que é automação e o que é documentação. Decisão completa em `docs/dev/brainstorms/2026-07-11-mover-para-src.md`.

**Arquivos criados ou modificados:**

| Arquivo | O que mudou |
|---------|-------------|
| `src/app/`, `src/components/`, `src/lib/`, `src/data/` | Pastas movidas de suas localizações originais na raiz |
| `jsconfig.json` | Alias `@/*` atualizado para apontar para `./src/*` |
| `tests/pagina-inicial.spec.js` | Caminho de `fs.readFileSync` corrigido para `src/data/eventos.json` |

**Testado por:** [x] Dev  [ ] QA  
**Deploy feito:** [ ] Sim  [x] Não  

---

## 2026-07-01 — Página inicial: listagem, filtros e cards de eventos

**O que foi feito:**
- Estrutura de dados `data/eventos.json` criada com 6 eventos de exemplo (campos: id, nome, data, cidade, estado, tipo, valor)
- Componente `EventCard` para exibir cada evento em formato de card, com cor lateral por tipo
- Componente `Filtros` para filtrar por tipo, estado e mês, combináveis entre si
- Página inicial (`app/page.js`) reescrita: consome o JSON, aplica filtros no cliente (`useState` + `useMemo`), oculta eventos passados e ordena por data
- Identidade visual "Painel de pista" aplicada: paleta asfalto/laranja-corrida, tipografia Oswald + Inter + JetBrains Mono, linha tracejada de assinatura no cabeçalho
- Mensagem de "nenhum evento encontrado" quando os filtros não retornam resultado

**Por que foi feito assim:**
> Filtragem no cliente porque o volume de eventos é pequeno e não há paginação prevista (REQ-001). Componentes separados (`EventCard`, `Filtros`) para facilitar manutenção e reuso futuro. Cores de tipo centralizadas em `lib/tipos.js` para fácil ajuste.

**Arquivos criados ou modificados:**

| Arquivo | O que mudou |
|---------|-------------|
| `app/layout.js` | Metadata atualizada (título/descrição), `lang="pt-BR"`, fontes Oswald e JetBrains Mono adicionadas |
| `app/globals.css` | Variáveis de cor do projeto definidas |
| `app/page.js` | Reescrito: lógica de filtros e listagem de eventos |
| `app/page.module.css` | Estilos do layout da página inicial |
| `lib/tipos.js` | Cores por tipo de evento e lista de estados brasileiros |
| `components/EventCard.js` | Componente novo — card de evento |
| `components/EventCard.module.css` | Estilos do card |
| `components/Filtros.js` | Componente novo — barra de filtros |
| `components/Filtros.module.css` | Estilos da barra de filtros |
| `data/eventos.json` | 6 eventos de exemplo |

**Testado por:** [x] Dev  [ ] QA  
**Deploy feito:** [ ] Sim  [x] Não  

---
