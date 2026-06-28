# EventoCar

> O site que centraliza todos os eventos de carro do Brasil em um único lugar.

---

## O que é este projeto?

O EventoCar é uma plataforma web onde qualquer pessoa pode encontrar eventos
automotivos — encontros, exposições, rachas organizados, track days e muito mais —
com data, local e valor reunidos em um só lugar.

---

## Pré-requisitos (apenas Windows)

O EventoCar usa um arquivo `Makefile` para automatizar a configuração do ambiente.
No Windows, você precisa instalar algumas ferramentas e configurar o Git antes de começar.

> 💡 **Quer instalar tudo de uma vez?** Use o script automático:
> abra o PowerShell como Administrador, navegue até a pasta do projeto e rode `.\setup-windows.ps1`.
> O passo a passo detalhado está em [`setup-windows.md`](./setup-windows.md).

---

### 1. Git Bash

O Git Bash é um terminal que permite rodar os comandos do projeto no Windows.

**Verificar se já está instalado:**
1. Clique no menu Iniciar
2. Digite **Git Bash**
3. Se aparecer o programa, está instalado ✅

**Instalar o Git Bash:**
1. Acesse: https://git-scm.com/downloads
2. Clique em **Download for Windows**
3. Execute o instalador e clique em **Next** em todas as telas
4. Ao final, clique em **Finish**
5. Abra o **Git Bash** pelo menu Iniciar para confirmar que funcionou ✅

---

### 2. make e Node.js

O `make` interpreta o Makefile e executa os comandos do projeto.
O `Node.js` é o ambiente que roda o Next.js e já vem com o `npm` (gerenciador de pacotes) incluso.

**Instalar via Chocolatey:**

1. Abra o **PowerShell como Administrador**
   - Clique no menu Iniciar → Digite **PowerShell** → botão direito → "Executar como administrador"

2. Instale o Chocolatey (gerenciador de pacotes do Windows):
```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

3. Instale o make e o Node.js:
```powershell
choco install make -y
choco install nodejs -y
```

4. Libere a execução de scripts (necessário para o npm funcionar no PowerShell):
```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```
Quando perguntar confirmação, digite `S` e pressione Enter.

5. Feche o PowerShell e o Git Bash, depois reabra o Git Bash

6. Confirme que funcionou:
```bash
make --version   # deve mostrar GNU Make 4.x.x
node --version   # deve mostrar v26 ou superior
npm --version    # deve mostrar 11 ou superior
```

---

### 3. Configurar o Git com seu nome e e-mail

O Git precisa saber quem você é para registrar corretamente quem fez cada alteração no projeto.
Essa configuração é feita uma única vez no Git Bash.

**Por que isso é necessário?**
Cada commit (salvamento de alteração) fica registrado com o nome e e-mail de quem o fez.
Sem essa configuração, o Git recusa o commit com um erro.

**Como configurar:**

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

## Configurando o ambiente

Com o Git Bash, o `make`, o Node.js instalados e o Git configurado, abra o Git Bash e execute:

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/eventocar.git

# 2. Entre na pasta do projeto
cd eventocar

# 3. Configure o ambiente completo (apenas uma vez)
make setup
```

Pronto! O `make setup` vai instalar tudo que for necessário automaticamente.

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
