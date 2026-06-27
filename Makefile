# =============================================================================
# Makefile — EventoCar
# =============================================================================
# Como usar: abra o Git Bash na pasta raiz do projeto e digite o comando.
# Exemplo: make dev
#
# Papéis:
#   [TODOS]   — qualquer pessoa do projeto pode usar
#   [DEV]     — comandos para o desenvolvedor
#   [QA]      — comandos para quem faz testes
# =============================================================================


# -----------------------------------------------------------------------------
# SETUP — Preparação do ambiente
# -----------------------------------------------------------------------------

## [TODOS] Instala as dependências do projeto
setup:
	npm install

## [DEV] Instala as dependências e prepara o ambiente de desenvolvimento
setup-dev:
	npm install

## [QA] Instala as dependências e o Playwright (ferramenta de testes)
setup-qa:
	npm install
	npx playwright install


# -----------------------------------------------------------------------------
# DESENVOLVIMENTO — Comandos do dia a dia
# -----------------------------------------------------------------------------

## [DEV] Sobe o servidor local do Next.js (acesse em http://localhost:3000)
dev:
	npm run dev


# -----------------------------------------------------------------------------
# TESTES — Qualidade e verificação
# -----------------------------------------------------------------------------

## [QA] Roda todos os testes automatizados com o Playwright
test:
	npx playwright test

## [QA] Roda os testes e abre o relatório visual no navegador
test-report:
	npx playwright test --reporter=html && npx playwright show-report


# -----------------------------------------------------------------------------
# GIT — Controle de versão
# -----------------------------------------------------------------------------

## [DEV] Faz commit de todas as alterações com uma mensagem descritiva
## Uso: make commit m="sua mensagem aqui"
## Exemplo: make commit m="adiciona listagem de eventos na home"
commit:
	@if [ -z "$(m)" ]; then \
		echo ""; \
		echo "❌ Erro: você precisa informar uma mensagem de commit."; \
		echo ""; \
		echo "   Uso correto: make commit m=\"sua mensagem aqui\""; \
		echo "   Exemplo:     make commit m=\"adiciona listagem de eventos\""; \
		echo ""; \
	else \
		git add . && git commit -m "$(m)"; \
	fi


# -----------------------------------------------------------------------------
# DEPLOY — Publicação
# -----------------------------------------------------------------------------

## [DEV] Publica o site (ainda não configurado)
deploy:
	@echo ""
	@echo "⚠️  O deploy ainda não foi configurado."
	@echo ""
	@echo "   Quando chegar a hora, vamos definir aqui como publicar o site na Vercel."
	@echo ""
