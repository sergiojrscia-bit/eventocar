# =============================================================================
# Makefile — EventoCar
# =============================================================================
# Como usar: abra o Git Bash na pasta raiz do projeto e digite o comando.
# Exemplo: make dev
#
# Papeis:
#   [TODOS]   — qualquer pessoa do projeto pode usar
#   [DEV]     — comandos para o desenvolvedor
#   [QA]      — comandos para quem faz testes
# =============================================================================


# -----------------------------------------------------------------------------
# SETUP — Preparacao do ambiente
# -----------------------------------------------------------------------------

## [TODOS] Instala as dependencias do projeto
setup:
	npm install

## [DEV] Instala as dependencias e prepara o ambiente de desenvolvimento
setup-dev:
	npm install

## [QA] Instala as dependencias e o Playwright (ferramenta de testes)
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
# TESTES — Qualidade e verificacao
# -----------------------------------------------------------------------------

## [QA] Roda todos os testes automatizados com o Playwright
## Instala pacotes e navegadores automaticamente se ainda nao estiverem presentes
test:
	@if [ ! -d "node_modules/@playwright/test" ]; then \
		echo "Dependencias nao encontradas. Instalando..."; \
		npm install; \
	fi
	@npx playwright install
	npx playwright test

## [QA] Roda os testes e abre o relatorio visual no navegador
## Instala pacotes e navegadores automaticamente se ainda nao estiverem presentes
test-report:
	@if [ ! -d "node_modules/@playwright/test" ]; then \
		echo "Dependencias nao encontradas. Instalando..."; \
		npm install; \
	fi
	@npx playwright install
	npx playwright test --reporter=html && npx playwright show-report


# -----------------------------------------------------------------------------
# GIT — Controle de versao
# -----------------------------------------------------------------------------

## [DEV] Faz commit e envia todas as alteracoes para o GitHub
## Uso: make commit m="sua mensagem aqui"
## Exemplo: make commit m="adiciona listagem de eventos na home"
commit:
	@if [ -z "$(m)" ]; then \
		echo ""; \
		echo "ERRO: voce precisa informar uma mensagem de commit."; \
		echo ""; \
		echo "   Uso correto: make commit m=\"sua mensagem aqui\""; \
		echo "   Exemplo:     make commit m=\"adiciona listagem de eventos\""; \
		echo ""; \
	else \
		git add . && git commit -m "$(m)" && git push; \
	fi


# -----------------------------------------------------------------------------
# DEPLOY — Publicacao
# -----------------------------------------------------------------------------

## [DEV] Publica o site (ainda nao configurado)
deploy:
	@echo ""
	@echo "AVISO: O deploy ainda nao foi configurado."
	@echo ""
	@echo "   Quando chegar a hora, vamos definir aqui como publicar o site na Vercel."
	@echo ""
