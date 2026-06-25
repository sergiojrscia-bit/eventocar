# 🚗 EventoCar

> O site que centraliza todos os eventos de carro do Brasil em um único lugar.

---

## O que é este projeto?

O EventoCar é uma plataforma web onde qualquer pessoa pode encontrar eventos
automotivos — encontros, exposições, rachas organizados, track days e muito mais —
com data, local e valor reunidos em um só lugar.

---

## Pré-requisito: Git Bash (apenas Windows)

O EventoCar usa um arquivo `Makefile` para automatizar a configuração do ambiente.
No Windows, esse arquivo precisa do **Git Bash** para funcionar.

### Verificar se já está instalado

1. Clique no menu Iniciar
2. Digite **Git Bash**
3. Se aparecer o programa, está instalado ✅

### Instalar o Git Bash

1. Acesse: https://git-scm.com/downloads
2. Clique em **Download for Windows**
3. Execute o instalador e clique em **Next** em todas as telas
4. Ao final, clique em **Finish**
5. Abra o **Git Bash** pelo menu Iniciar para confirmar que funcionou ✅

---

## Configurando o ambiente

Com o Git Bash instalado, abra ele e execute:

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/eventocar.git

# 2. Entre na pasta do projeto
cd eventocar

# 3. Configure o ambiente completo (apenas uma vez)
make setup
```

Pronto! O `make setup` vai instalar tudo que for necessário automaticamente.

> 💡 **Dica:** rode `make help` a qualquer momento para ver todos os comandos disponíveis.

---

## Comandos disponíveis

### Configuração de ambiente

| Comando | Quem usa | O que faz |
|---------|----------|-----------|
| `make setup` | Todos | Configura o ambiente completo do zero |
| `make setup-dev` | Dev | Instala apenas Next.js e dependências do projeto |
| `make setup-qa` | QA | Instala apenas Playwright e navegadores de teste |

### Desenvolvimento

| Comando | Quem usa | O que faz |
|---------|----------|-----------|
| `make dev` | Dev | Sobe o servidor local para desenvolvimento |

### Testes

| Comando | Quem usa | O que faz |
|---------|----------|-----------|
| `make test` | QA | Roda todos os testes automatizados |
| `make test-report` | QA | Roda os testes e abre o relatório visual |

### Deploy

| Comando | Quem usa | O que faz |
|---------|----------|-----------|
| `make deploy` | Dev | Publica o site na Vercel |

---

## Estrutura de pastas

```
eventocar/
├── docs/
│   ├── projeto/        # Diário de decisões e documentação geral
│   ├── analista/       # Templates de histórias de usuário e requisitos
│   ├── dev/            # Templates de decisão técnica e changelog
│   └── qa/             # Templates de testes, bug reports e checklist
├── tests/              # Testes automatizados com Playwright
├── Makefile            # Automação de ambiente
└── README.md           # Este arquivo
```

---

## Tecnologias utilizadas

| Tecnologia | Para que serve |
|------------|----------------|
| Next.js | Framework principal do site |
| Vercel | Publicação e hospedagem gratuita |
| Playwright | Testes automatizados |

---

*Última atualização: 2026-06-24*

---
