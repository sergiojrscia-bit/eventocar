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

### Passo 2 — Compartilhar arquivos específicos da sessão *(se aplicável)*

Se for trabalhar em uma feature específica, compartilhe também:

| Situação | Arquivo a compartilhar |
|----------|------------------------|
| Vai planejar uma nova feature | `docs/analista/template-historia-usuario.md` + `docs/analista/template-requisito.md` |
| Vai fazer um brainstorm | `docs/analista/template-brainstorm.md` |
| Vai escrever ou revisar código | `docs/dev/template-decisao-tecnica.md` + `docs/dev/template-changelog.md` |
| Vai testar uma feature | `docs/qa/template-caso-de-teste.md` + `docs/qa/template-checklist-entrega.md` |
| Vai criar testes automatizados | `docs/qa/template-teste-automatizado.md` |

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
- [ ] Configuração do deploy na Vercel e atualização do `make deploy`
- [ ] Definição do domínio do site
- [ ] Construção da primeira página real do EventoCar

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

---

*Última atualização: 2026-06-28*
