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

### Detalhamento: Comandos do Makefile

| Comando | Papel | O que faz |
|---------|-------|-----------|
| `make setup` | Todos | Instala as dependências do projeto (`npm install`) |
| `make setup-dev` | Dev | Instala as dependências e prepara o ambiente de desenvolvimento |
| `make setup-qa` | QA | Instala as dependências e o Playwright (`npx playwright install`) |
| `make dev` | Dev | Sobe o servidor local do Next.js em `http://localhost:3000` |
| `make test` | QA | Roda todos os testes automatizados com o Playwright |
| `make test-report` | QA | Roda os testes e abre o relatório visual no navegador |
| `make commit m="mensagem"` | Dev | Faz commit de todas as alterações com a mensagem informada |
| `make deploy` | Dev | Exibe aviso de que o deploy ainda não foi configurado |

> ⚠️ O comando `make deploy` está reservado para quando definirmos como publicar na Vercel.

---

## Próximas Decisões Pendentes

- [x] Escolha do stack de tecnologia (Next.js + Vercel)
- [x] Criação dos templates do papel Dev (decisão técnica e changelog)
- [x] Criação dos templates do papel QA (caso de teste, bug report, checklist de entrega)
- [x] Criação do Makefile com comandos separados por papel — rodando via Git Bash no Windows
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
| `README.md` | Projeto | Porta de entrada do repositório com instruções de instalação e comandos disponíveis |
| `Makefile` | Projeto | Atalhos de comandos separados por papel (setup, dev, test, commit, deploy) |

---

*Última atualização: 2026-06-27*
