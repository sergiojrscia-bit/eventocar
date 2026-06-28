# 🖥️ Setup do Ambiente — Windows

> Este guia explica como configurar o ambiente de desenvolvimento do EventoCar no Windows.
> Siga os passos na ordem — cada passo depende do anterior.

---

## Pré-requisitos

- Windows 10 ou superior
- Acesso de Administrador no computador

> Não precisa ter nada instalado antes — este guia cobre tudo do zero.

---

## Opção rápida: rodar o script automático

Se preferir automatizar a instalação do make e do Node.js, siga os passos abaixo.

> ⚠️ O script instala apenas as ferramentas (make e Node.js).
> Antes de rodá-lo, complete o **Passo 1** para ter o Git instalado e o projeto clonado.
> Após o script terminar, vá direto para o **Passo 3** para configurar o projeto.

1. Complete o **Passo 1** deste guia (instalar Git, configurar e clonar o projeto)

2. Abra o **PowerShell como Administrador**
   - Clique no menu Iniciar → digite `PowerShell` → botão direito → **Executar como administrador**

3. Libere a execução de scripts no seu usuário:
   ```powershell
   Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```
   Quando perguntar confirmação, digite `S` e pressione Enter.

4. Entre na pasta do projeto e rode o script:
   ```powershell
   cd C:\Projeto\eventocar
   .\setup-windows.ps1
   ```

5. Aguarde terminar e siga o aviso final na tela.

6. Vá para o **Passo 3** para configurar o projeto.

---

## Opção manual: passo a passo explicado

### Passo 1 — Instalar o Git, configurar e baixar o projeto

O Git é a ferramenta que conecta você ao projeto. Com ele você instala o Git Bash
(o terminal que vamos usar), configura sua identidade e baixa o código do EventoCar.

#### 1.1 — Instalar o Git Bash

O Git Bash é o terminal que vamos usar para rodar todos os comandos do projeto.
Ele já vem com o Git incluso — ou seja, instalando o Git Bash, você já tem o Git também.

**Verificar se já está instalado:**
1. Clique no menu Iniciar → digite **Git Bash**
2. Se aparecer o programa, está instalado ✅ — pode ir para o item 1.2

**Instalar:**
1. Acesse: https://git-scm.com/downloads
2. Clique em **Download for Windows**
3. Execute o instalador e clique em **Next** em todas as telas
4. Ao final, clique em **Finish**
5. Abra o **Git Bash** pelo menu Iniciar para confirmar que funcionou ✅

---

#### 1.2 — Configurar seu nome e e-mail no Git

O Git precisa saber quem você é para registrar corretamente quem fez cada alteração no projeto.
Essa configuração é feita uma única vez.

Abra o **Git Bash** e rode os dois comandos abaixo, substituindo pelos seus dados:

```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"
```

> Use o mesmo e-mail da sua conta no GitHub.

Confirme que funcionou:

```bash
git config --global user.name
git config --global user.email
```

Se aparecer seu nome e e-mail, está pronto ✅

---

#### 1.3 — Baixar o projeto

No **Git Bash**, escolha uma pasta onde quer salvar o projeto e rode:

```bash
# Clone o repositório (isso cria a pasta eventocar no local atual)
git clone https://github.com/seu-usuario/eventocar.git

# Entre na pasta do projeto
cd eventocar
```

---

### Passo 2 — Instalar o make e o Node.js

O `make` lê o `Makefile` e executa os comandos do projeto (como `make setup`, `make dev`).
O `Node.js` é o ambiente que roda o Next.js e já vem com o `npm` (gerenciador de pacotes) incluso.

Vamos instalar os dois via **Chocolatey** — um gerenciador de pacotes para Windows que funciona
como uma "loja de linha de comando", instalando programas automaticamente sem precisar entrar
em vários sites.

1. Abra o **PowerShell como Administrador**
   - Clique no menu Iniciar → Digite **PowerShell** → botão direito → "Executar como administrador"

2. Libere a execução de scripts no seu usuário:
```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```
Quando perguntar confirmação, digite `S` e pressione Enter.

> **Por que isso é necessário?**
> O `npm` usa um script `.ps1` internamente. Sem essa liberação, o comando `npm` falha com erro
> de segurança — mesmo depois de instalado corretamente. Fazer isso antes de instalar o Node.js
> evita o problema na raiz.

3. Instale o Chocolatey:
```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

4. Instale o make e o Node.js de uma vez:
```powershell
choco install make nodejs -y
```

5. Feche o PowerShell e o Git Bash, depois **reabra o Git Bash**
   - O Windows só reconhece os programas novos após reabrir o terminal

6. Confirme que tudo funcionou:
```bash
make --version   # deve mostrar GNU Make 4.x.x
node --version   # deve mostrar v22 ou superior
npm --version    # deve mostrar 10 ou superior
```

---

### Passo 3 — Setup do projeto

Com o ambiente pronto, agora vamos instalar as dependências do projeto.
O comando varia de acordo com o seu papel:

| Papel | Comando | O que faz |
|-------|---------|-----------|
| Todos | `make setup` | Instala as dependências básicas do projeto |
| Dev | `make setup-dev` | Instala as dependências e prepara o ambiente de desenvolvimento |
| QA | `make setup-qa` | Instala as dependências e o Playwright para testes automatizados |

Abra o **Git Bash**, entre na pasta do projeto e rode o comando do seu papel:

```bash
cd eventocar
make setup        # ou make setup-dev / make setup-qa
```

Pronto! O projeto está pronto para rodar. ✅

---

## Verificação final

Após o setup terminar sem erros, rode:

```bash
make --version   # deve mostrar GNU Make
node --version   # deve mostrar v22 ou superior
npm --version    # deve mostrar 10 ou superior
```

Se todos os comandos funcionarem, o ambiente está pronto. 🎉

---

## Erros comuns

| Erro | Causa | Solução |
|------|-------|---------|
| `.\setup-windows.ps1 não pode ser carregado` | Política de execução bloqueando scripts | Rode o item 2 do Passo 2 antes de qualquer outra coisa |
| `make: command not found` | make não instalado ou terminal não foi reaberto | Instale via Chocolatey (Passo 2) e reabra o Git Bash |
| `npm: command not found` | Node.js não instalado ou terminal não foi reaberto | Instale via Chocolatey (Passo 2) e reabra o Git Bash |
| `npm.ps1 não pode ser carregado` | Política de execução bloqueando scripts | Rode o item 2 do Passo 2 no PowerShell como Administrador |
| `Could not read package.json` | Projeto Next.js ainda não inicializado | Normal na primeira vez — aguarde a inicialização do projeto |

---

*Última atualização: 2026-06-28*
