# EventoCar

> O site que centraliza todos os eventos de carro do Brasil em um único lugar.

---

## O que é este projeto?

O EventoCar é uma plataforma web onde qualquer pessoa pode encontrar eventos
automotivos — encontros, exposições, rachas organizados, track days e muito mais —
com data, local e valor reunidos em um só lugar.

---

## Configurando o ambiente (Windows)

Siga os passos abaixo na ordem. Cada passo depende do anterior.

---

### Passo 1 — Instalar o Git Bash

O Git Bash é o terminal que vamos usar para rodar todos os comandos do projeto no Windows.

**Verificar se já está instalado:**
1. Clique no menu Iniciar
2. Digite **Git Bash**
3. Se aparecer o programa, está instalado ✅ — pode ir para o Passo 2

**Instalar o Git Bash:**
1. Acesse: https://git-scm.com/downloads
2. Clique em **Download for Windows**
3. Execute o instalador e clique em **Next** em todas as telas
4. Ao final, clique em **Finish**
5. Abra o **Git Bash** pelo menu Iniciar para confirmar que funcionou ✅

---

### Passo 2 — Instalar o make e o Node.js

O `make` lê o `Makefile` e executa os comandos do projeto (como `make setup`, `make dev`).
O `Node.js` é o ambiente que roda o Next.js e já vem com o `npm` (gerenciador de pacotes) incluso.

> 💡 **Quer automatizar esta etapa?** Existe um script que instala tudo do Passo 2 e 3 automaticamente.
> O passo a passo completo está em [`setup-windows.md`](./setup-windows.md).

Vamos instalar os dois via **Chocolatey**, um gerenciador de pacotes para Windows.

1. Abra o **PowerShell como Administrador**
   - Clique no menu Iniciar → Digite **PowerShell** → botão direito → "Executar como administrador"

2. Libere a execução de scripts no seu usuário (necessário para o `npm` funcionar):
```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```
Quando perguntar confirmação, digite `S` e pressione Enter.

3. Instale o Chocolatey:
```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

4. Instale o make e o Node.js:
```powershell
choco install make nodejs -y
```

5. Feche o PowerShell e o Git Bash, depois **reabra o Git Bash**

6. Confirme que tudo funcionou:
```bash
make --version   # deve mostrar GNU Make 4.x.x
node --version   # deve mostrar v22 ou superior
npm --version    # deve mostrar 10 ou superior
```

---

### Passo 3 — Configurar o Git com seu nome e e-mail

O Git precisa saber quem você é para registrar corretamente quem fez cada alteração.
Essa configuração é feita uma única vez.

1. Abra o **Git Bash**
2. Rode os dois comandos abaixo, substituindo pelos seus dados:

```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"
```

> Use o mesmo e-mail da sua conta no GitHub.

3. Confirme que funcionou:
```bash
git config --global user.name
git config --global user.email
```
Se aparecer seu nome e e-mail, está pronto ✅

---

### Passo 4 — Clonar o repositório e configurar o projeto

Com tudo instalado e configurado, agora vamos baixar o projeto e preparar o ambiente.

Abra o **Git Bash** e execute:

```bash
# 1. Clone o repositório (isso cria a pasta eventocar no local atual)
git clone https://github.com/seu-usuario/eventocar.git

# 2. Entre na pasta do projeto
cd eventocar

# 3. Configure o ambiente completo (apenas uma vez)
make setup
```

Pronto! O `make setup` vai instalar tudo que for necessário automaticamente. ✅

---

## Comandos disponíveis

### Configuração de ambiente

| Comando | Quem usa | O que faz |
|---------|----------|-----------|
| `make setup` | Todos | Instala as dependências do projeto |
| `make setup-dev` | Dev | Instala as dependências e prepara o ambiente de desenvolvimento |
| `make setup-qa` | QA | Instala as dependências e o Playwright |

### Desenvolvimento

| Comando | Quem usa | O que faz |
|---------|----------|-----------|
| `make dev` | Dev | Sobe o servidor local em http://localhost:3000 |

### Testes

| Comando | Quem usa | O que faz |
|---------|----------|-----------|
| `make test` | QA | Roda todos os testes automatizados |
| `make test-report` | QA | Roda os testes e abre o relatório visual no navegador |

### Git

| Comando | Quem usa | O que faz |
|---------|----------|-----------|
| `make commit m="mensagem"` | Dev | Adiciona, commita e envia todas as alterações para o GitHub |

### Deploy

| Comando | Quem usa | O que faz |
|---------|----------|-----------|
| `make deploy` | Dev | Publica o site na Vercel (ainda não configurado) |

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
├── setup-windows.ps1   # Script automático de configuração do ambiente no Windows
├── setup-windows.md    # Passo a passo manual de configuração do ambiente no Windows
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

*Última atualização: 2026-06-28*
