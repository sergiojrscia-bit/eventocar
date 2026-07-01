---
title: Diário de Decisões
parent: Projeto
nav_order: 1
---

# 📓 Diário de Decisões — EventoCar

> Este arquivo é a memória do projeto.
> Toda decisão importante tomada durante o desenvolvimento é registrada aqui.
> Ao iniciar uma nova sessão de trabalho, compartilhe este arquivo com sua IA parceira
> para que ela retome o contexto completo do projeto.

> 📎 **Este projeto também possui `docs/projeto/ideias.md`** — um caderno de rascunho com
> ideias ainda não decididas. Sempre que uma nova feature for planejada ou entregue,
> verificar se alguma ideia registrada lá pode ser aproveitada ou já foi resolvida.

---

## Como usar

- Sempre que uma decisão for tomada, adicione uma entrada neste arquivo
- Seja breve, mas claro: o que foi decidido e por quê
- Mantenha a ordem cronológica (mais recente embaixo)

---

## 🚀 Como iniciar uma sessão de trabalho

> Siga este checklist toda vez que começar uma nova conversa com a IA parceira.
> O objetivo é garantir que ela tenha contexto completo antes de qualquer decisão ou código.

---

### Passo 1 — Compartilhar os arquivos obrigatórios

Faça upload dos seguintes arquivos no início de cada sessão:

| Arquivo | Por que é necessário |
|---------|----------------------|
| `docs/projeto/diario-de-decisoes.md` | Memória principal do projeto — decisões, stack, arquivos criados |
| `docs/projeto/ideias.md` | Ideias registradas que podem ser aproveitadas ou já foram resolvidas |
| `docs/analista/especificacao-pagina-inicial.md` | Especificação da feature em desenvolvimento |

> ⚠️ Se algum desses arquivos não for compartilhado, a IA deve pedir antes de continuar.

---

### Passo 2 — Compartilhar arquivos específicos do papel ativo

#### 🎩 Sessão de Analista

| Arquivo | Por que é necessário |
|---------|----------------------|
| `docs/analista/template-historia-usuario.md` | Para criar histórias de usuário no formato correto |
| `docs/analista/template-requisito.md` | Para criar requisitos no formato correto |
| `docs/analista/template-brainstorm.md` | Para documentar discussões e decisões |

#### 🛠️ Sessão de Dev

| Arquivo | Por que é necessário |
|---------|----------------------|
| `docs/analista/HU-XXX-*.md` | História de usuário da feature a ser desenvolvida |
| `docs/analista/REQ-XXX-*.md` | Requisitos da feature a ser desenvolvida |
| `docs/analista/brainstorms/AAAA-MM-DD-*.md` | Brainstorm de análise relevante (se houver) |
| `docs/dev/template-decisao-tecnica.md` | Para documentar decisões técnicas tomadas durante o desenvolvimento |
| `docs/dev/template-changelog.md` | Para registrar o que foi entregue |

#### 🧪 Sessão de QA

| Arquivo | Por que é necessário |
|---------|----------------------|
| `docs/analista/HU-XXX-*.md` | Para entender o que deve ser testado |
| `docs/analista/REQ-XXX-*.md` | Para validar os critérios de aceite |
| `docs/qa/template-caso-de-teste.md` | Para documentar os casos de teste |
| `docs/qa/template-checklist-entrega.md` | Para verificar a entrega antes de publicar |
| `docs/qa/template-teste-automatizado.md` | Para documentar testes com Playwright |
| `docs/qa/template-bug-report.md` | Para registrar bugs encontrados |

---

**Se a IA não pedir esses arquivos antes de começar:** diga "quais arquivos você precisa para essa sessão?" e ela deve listar conforme o papel ativo.


---

### Passo 3 — Confirmar o estado atual com a IA

Após o upload, informe:

1. **O que mudou desde a última sessão?** (novos arquivos, commits, erros encontrados)
2. **Qual é o foco de hoje?** (nova feature, correção de bug, documentação, deploy)

---

### Regra da IA parceira

> Antes de qualquer entrega — análise, código ou teste — a IA deve verificar:
>
> 1. Os arquivos obrigatórios foram compartilhados?
> 2. O template correspondente ao papel (Analista, Dev ou QA) foi preenchido?
> 3. O brainstorm foi documentado, se houve discussão antes da decisão?
>
> Se a resposta for **não** para qualquer um desses pontos, a IA para e resolve antes de continuar.

---
## ✅ Regras Fixas da IA Parceira

> Estas regras foram definidas em 2026-06-29 e se aplicam em toda sessão de trabalho.
> Elas estão aqui para que o usuário possa cobrar a IA caso ela esqueça de segui-las.

---

### Regra 1 — Checklist antes de executar

Sempre que a IA pedir para você fazer algo (salvar arquivo, rodar comando, commitar), ela deve entregar um checklist com os passos em ordem, assim:

```
📋 O que fazer agora:
- [ ] Passo 1
- [ ] Passo 2
- [ ] Cole aqui a saída do terminal para confirmarmos juntos
```

**Se a IA não fizer isso:** peça "me dá o checklist do que preciso fazer".

---

### Regra 2 — Confirmação após o commit

Depois de cada `make commit`, a IA deve pedir a saída do terminal para confirmar que:
- O commit foi criado sem erros
- O push para o GitHub foi bem-sucedido
- O que foi enviado está correto

**Se a IA não fizer isso:** cole a saída do terminal e peça "confirma se está tudo certo".

---

### Regra 3 — Arquivos obrigatórios antes de começar

Se os arquivos da seção "Como iniciar uma sessão" não foram compartilhados, a IA deve listar o que está faltando e aguardar antes de continuar qualquer tarefa.

**Se a IA não fizer isso:** diga "quais arquivos ainda precisam ser compartilhados?"

---

### Como cobrar a IA se ela esquecer uma regra

Basta dizer: **"você esqueceu a regra X"** — e ela retoma o procedimento correto.

---

*Estas regras também estão registradas na skill da IA em `SKILL.md` para reforço automático.*

---

## Registro de Decisões

| Data | Papel | Decisão | Motivo |
|------|-------|---------|--------|
| 2026-06-23 | Analista | Nome do projeto definido: **EventoCar** | Nome curto, direto e fácil de lembrar. Comunica bem o propósito do site |
| 2026-06-23 | Analista | Repositório criado no GitHub como público | Necessário para aprovação futura no Google AdSense |
| 2026-06-23 | Analista | Documentação em Markdown no GitHub | Padrão da indústria, versionado junto com o código, acessível via web |
| 2026-06-23 | Analista | Estrutura de fábrica de software adotada | Papéis de Analista, Dev e QA com templates próprios para manter qualidade |
| 2026-06-23 | Analista | Templates do Analista criados | Criados `template-historia-usuario.md` e `template-requisito.md` em `docs/analista/` |
| 2026-06-24 | Analista | Stack definido: Next.js + Vercel | Melhor SEO para eventos indexados no Google, publicação automática gratuita e tecnologia com valor real de mercado |
| 2026-06-24 | Analista | Templates do Dev criados | Padronizar registro de decisões técnicas e changelog |
| 2026-06-24 | Analista | Templates do QA criados | Padronizar testes, bug reports e checklist de entrega |
| 2026-06-24 | Analista | Playwright adotado como ferramenta de testes automatizados | Simula usuário real no navegador, ideal para garantir que novas features não quebrem o que já está em produção |
| 2026-06-24 | Dev | README.md criado e revisado | Documentar pré-requisitos, comandos por papel e estrutura de pastas do projeto |
| 2026-06-26 | Analista | Arquivo `docs/projeto/ideias.md` criado | Espaço para registrar ideias ainda não decididas, separado do diário para não poluir o histórico de decisões |
| 2026-06-27 | Analista | Git Bash adotado para rodar comandos `make` no Windows | `make` não é nativo no Windows; Git Bash resolve sem instalações extras e já é familiar para quem usa Git |
| 2026-06-27 | Dev | Makefile criado com comandos separados por papel | Padronizar e simplificar os comandos do dia a dia do projeto |
| 2026-06-27 | Dev | Chocolatey e `make` adicionados como pré-requisitos no README | Sem essas ferramentas o Makefile não funciona no Windows; documentar evita o erro `command not found` |
| 2026-06-27 | Dev | `make commit` atualizado para incluir `git push` | O comando precisa fazer o ciclo completo: adicionar, commitar e enviar para o GitHub em uma única etapa |
| 2026-06-28 | Dev | Node.js adicionado como pré-requisito no README | O projeto Next.js exige o Node.js para rodar; sem ele o `make setup` falha com erro de `package.json` não encontrado |
| 2026-06-28 | Dev | Política de execução `RemoteSigned` adicionada ao setup do Windows | O Windows bloqueia scripts `.ps1` por padrão; sem essa configuração o `npm` falha mesmo após instalado corretamente |
| 2026-06-28 | Dev | Script `setup-windows.ps1` criado | Automatizar a instalação de todo o ambiente Windows em uma única execução, evitando erros manuais |
| 2026-06-28 | Dev | Checklist `setup-windows.md` criado | Documentar o passo a passo manual com explicações didáticas e tabela de erros comuns |
| 2026-06-28 | Dev | Estrutura de passos do README e `setup-windows.md` reorganizada | Separar a configuração do computador (Git, make, Node) da configuração do projeto em 3 passos claros, tornando o guia mais intuitivo para novos membros |
| 2026-06-28 | Dev | Projeto Next.js 16.2.9 inicializado com `create-next-app` | Estrutura base do site criada com JavaScript, ESLint e App Router; servidor local rodando em `http://localhost:3000` |
| 2026-06-29 | Analista | Checklist de início de sessão criado | Garantir que a IA parceira sempre receba os arquivos necessários antes de começar a trabalhar, evitando perda de contexto |
| 2026-06-29 | Analista | Template de brainstorm criado em `docs/analista/template-brainstorm.md` | Brainstorms feitos na conversa sumiam sem registro; agora toda discussão de decisão vira um arquivo documentado |
| 2026-06-29 | Analista | Pasta `docs/analista/brainstorms/` criada para guardar brainstorms documentados | Separar os registros de brainstorm dos templates e das especificações |
| 2026-06-29 | Analista | IA única mantida para todos os papéis (Analista, Dev, QA) com troca explícita de chapéu | IAs separadas por papel aumentariam complexidade operacional sem ganho real neste momento; a IA anuncia o papel ativo a cada mudança |
| 2026-06-29 | Analista | Regra obrigatória: templates sempre preenchidos antes de qualquer entrega | Toda entrega formal (análise, código ou teste) exige o template correspondente; a IA para e preenche antes de continuar se isso não tiver sido feito |
| 2026-06-29 | Analista | Checklist de início de sessão criado e adicionado ao diário | Garantir que a IA parceira sempre receba os arquivos necessários antes de começar, evitando perda de contexto |
| 2026-06-29 | Analista | Regras fixas de acompanhamento adicionadas ao diário e à skill | Institucionalizar checklist antes de executar, confirmação após commit e verificação de arquivos — sem depender de memória |
| 2026-06-29 | Analista | Template de brainstorm criado em `docs/analista/template-brainstorm.md` | Brainstorms feitos na conversa sumiam sem registro; agora toda discussão vira um arquivo documentado |
| 2026-06-29 | Analista | Pasta `docs/analista/brainstorms/` criada para guardar brainstorms documentados | Separar registros de brainstorm dos templates e especificações |
| 2026-06-29 | Analista | IA única mantida para todos os papéis com troca explícita de chapéu | IAs separadas aumentariam complexidade sem ganho real neste momento |
| 2026-06-29 | Analista | Uso obrigatório de templates antes de qualquer entrega formal | Toda entrega exige o template correspondente; a IA para e preenche antes de continuar |
| 2026-06-29 | Analista | Análise de mercado realizada — 7 concorrentes mapeados | Entender o mercado antes de especificar a página inicial; oportunidade identificada: nenhum concorrente cobre todos os tipos de evento com filtros combinados |
| 2026-06-29 | Analista | HU-001 criada — Visualizar e filtrar eventos de carro | Definir o que o usuário precisa fazer na página inicial do ponto de vista do entusiasta |
| 2026-06-29 | Analista | REQ-001 criado — Página inicial com listagem e filtros de eventos | Detalhar tecnicamente o que a página inicial deve fazer, como deve se comportar e os critérios de aceite |
| 2026-06-29 | Analista | Lista de arquivos por papel definida para início de sessão | A lista de arquivos necessários muda conforme o papel ativo (Analista, Dev ou QA); documentar evita iniciar uma sessão sem contexto suficiente |
| 2026-06-30 | Dev | Site de documentação publicado via GitHub Pages | A pasta `docs/` do repositório virou também o site público, usando o tema `just-the-docs` (via `remote_theme`) para gerar menu, busca e navegação a partir do front matter dos arquivos `.md` |
| 2026-06-30 | Dev | GitHub Pages configurado com branch `main` e pasta `/docs` | Publicação automática a cada `git push` na `main`, sem passo manual — site no ar em `https://sergiojrscia-bit.github.io/eventocar/` |
| 2026-06-30 | Dev | Guia `publicacao-github-pages.md` criado em `docs/projeto/` | Documentar o passo a passo de como o site é publicado e como adicionar novas páginas, evitando depender de memória |
| 2026-06-30 | Dev | Bug corrigido no `ideias.md` — front matter sem `---` de abertura | Sem o `---` na primeira linha, o Jekyll não reconhece o front matter e a página não é processada corretamente pelo tema |
| 2026-06-30 | Dev | `kramdown: input: GFM` adicionado e depois **revertido** do `_config.yml` | Tentativa inicial para corrigir o bug de tabelas; não era a causa raiz (ver decisão seguinte) e foi removido para não deixar configuração sem efeito real no arquivo |
| 2026-06-30 | Dev | Linha em branco adicionada entre cabeçalhos e tabelas em `diario-de-decisoes.md` | Causa real do bug: o kramdown exige uma linha em branco antes de qualquer tabela; sem ela, a tabela vira texto corrido com os `\|` visíveis. Três tabelas na seção "Passo 2" estavam coladas direto no cabeçalho `####` acima delas |


### Detalhamento: Comandos do Makefile

| Comando | Papel | O que faz |
|---------|-------|-----------|
| `make setup` | Todos | Instala as dependências do projeto (`npm install`) |
| `make setup-dev` | Dev | Instala as dependências e prepara o ambiente de desenvolvimento |
| `make setup-qa` | QA | Instala as dependências e o Playwright (`npx playwright install`) |
| `make dev` | Dev | Sobe o servidor local do Next.js em `http://localhost:3000` |
| `make test` | QA | Roda todos os testes automatizados com o Playwright |
| `make test-report` | QA | Roda os testes e abre o relatório visual no navegador |
| `make commit m="mensagem"` | Dev | Adiciona, commita e envia todas as alterações para o GitHub |
| `make deploy` | Dev | Exibe aviso de que o deploy ainda não foi configurado |

> ⚠️ O comando `make deploy` está reservado para quando definirmos como publicar na Vercel.

---

## Próximas Decisões Pendentes

- [x] Escolha do stack de tecnologia (Next.js + Vercel)
- [x] Criação dos templates do papel Dev (decisão técnica e changelog)
- [x] Criação dos templates do papel QA (caso de teste, bug report, checklist de entrega)
- [x] Criação do Makefile com comandos separados por papel — rodando via Git Bash no Windows
- [x] Documentação e automação do setup do ambiente Windows
- [x] Inicialização do projeto Next.js
- [x] Criação do template de brainstorm e pasta de brainstorms
- [x] Definição do procedimento de início de sessão
- [x] Decisão sobre IAs separadas por papel (mantida IA única com troca de chapéu)
- [x] Especificação da página inicial concluída (HU-001 + REQ-001)
- [x] Site de documentação publicado no GitHub Pages (branch `main`, pasta `/docs`)
- [ ] Desenvolvimento da página inicial (cards + filtros)
- [ ] Criação do arquivo `data/eventos.json` com eventos de exemplo
- [ ] Configuração do deploy na Vercel e atualização do `make deploy`
- [ ] Definição do domínio do site




---

## Arquivos criados até agora

| Arquivo | Papel | Descrição |
|---------|-------|-----------|
| `docs/projeto/diario-de-decisoes.md` | Projeto | Memória e histórico de decisões |
| `docs/projeto/ideias.md` | Projeto | Caderno de rascunho com ideias ainda não decididas |
| `docs/analista/template-historia-usuario.md` | Analista | Template para descrever features do ponto de vista do usuário |
| `docs/analista/template-requisito.md` | Analista | Template para detalhar requisitos funcionais e não-funcionais |
| `docs/dev/template-decisao-tecnica.md` | Dev | Template para documentar decisões técnicas |
| `docs/dev/template-changelog.md` | Dev | Registro cronológico de entregas e alterações |
| `docs/qa/template-caso-de-teste.md` | QA | Template para descrever como testar uma feature |
| `docs/qa/template-bug-report.md` | QA | Template para registrar bugs encontrados |
| `docs/qa/template-checklist-entrega.md` | QA | Lista de verificação antes de publicar uma entrega |
| `docs/qa/template-teste-automatizado.md` | QA | Template para documentar testes automatizados com Playwright |
| `docs/analista/template-brainstorm.md` | Analista | Template para documentar brainstorms e discussões de decisão |
| `docs/analista/brainstorms/` | Analista | Pasta para guardar os brainstorms documentados do projeto |
| `README.md` | Projeto | Porta de entrada do repositório com instruções de instalação e comandos disponíveis |
| `Makefile` | Projeto | Atalhos de comandos separados por papel (setup, dev, test, commit, deploy) |
| `setup-windows.ps1` | Projeto | Script automático de configuração do ambiente no Windows |
| `setup-windows.md` | Projeto | Passo a passo manual de configuração do ambiente no Windows com erros comuns |
| `app/` | Projeto | Estrutura de páginas e rotas do Next.js |
| `package.json` | Projeto | Dependências e scripts do projeto Next.js |
| `next.config.mjs` | Projeto | Configuração do Next.js |
| `jsconfig.json` | Projeto | Configuração de caminhos e aliases do projeto |
| `.eslintrc` | Projeto | Configuração do ESLint (verificador de qualidade do código) |
| `docs/analista/template-brainstorm.md` | Analista | Template para documentar brainstorms e discussões de decisão |
| `docs/analista/brainstorms/2026-06-29-melhorias-processo.md` | Analista | Brainstorm das melhorias de processo adotadas na sessão |
| `docs/analista/brainstorms/2026-06-29-analise-de-mercado.md` | Analista | Análise de 7 concorrentes com pontos positivos, negativos e oportunidade do EventoCar |
| `docs/analista/HU-001-visualizar-filtrar-eventos.md` | Analista | História de usuário da página inicial |
| `docs/analista/REQ-001-pagina-inicial.md` | Analista | Requisitos funcionais e não-funcionais da página inicial |
| `docs/projeto/publicacao-github-pages.md` | Projeto | Guia de como o site de documentação é publicado no GitHub Pages e como adicionar novas páginas |

---

*Última atualização: 2026-06-30*