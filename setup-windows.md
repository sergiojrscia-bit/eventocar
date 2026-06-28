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

Se preferir automatizar a instalação, siga os passos abaixo.

> ⚠️ O script ainda **não clona o repositório** — ele configura apenas as ferramentas.
> Após rodar o script, volte para o **Passo 4** deste guia para clonar e configurar o projeto.

1. Abra o **PowerShell como Administrador**
   - Clique no menu Iniciar → digite `PowerShell` → botão direito → **Executar como administrador**

2. Libere a execução de scripts no seu usuário:
   ```powershell
   Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```
   Quando perguntar confirmação, digite `S` e pressione Enter.

3. Baixe o repositório:
   ```powershell
   git clone https://github.com/seu-usuario/eventocar.git
   cd eventocar
   ```

4. Rode o script:
   ```powershell
   .\setup-windows.ps1
   ```

5. Aguarde terminar e siga o aviso final na tela.

---

## Opção manual: passo a passo explicado

### Passo 1 — Instalar o Git Bash

O Git Bash é o terminal que vamos usar para rodar todos os comandos do projeto.
Ele já vem com o Git incluso — ou seja, instalando o Git Bash, você já tem o Git também.

**Verificar se já está instalado:**
1. Clique no menu Iniciar → digite **Git Bash**
2. Se aparecer o programa, está instalado ✅ — pode ir para o Passo 2

**Instalar:**
1. Acesse: https://git-scm.com/downloads
2. Clique em **Download for Windows**
3. Execute o instalador e clique em **Next** em todas as telas
4. Ao final, clique em **Finish**
5. Abra o **Git Bash** pelo menu Iniciar para confirmar que funcionou ✅

---

### Passo 2 — Liberar execução de scripts no PowerShell

Por padrão, o Windows bloqueia a execução de scripts `.ps1`. Esse passo libera essa restrição
para o seu usuário — é necessário para que o `npm` funcione corretamente depois de instalado.

1. Abra o **PowerShell como Administrador**
   - Clique no menu Iniciar → Digite **PowerShell** → botão direito → "Executar como administrador"

2. Rode o comando:
```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```
Quando perguntar confirmação, digite `S` e pressione Enter.

> **Por que isso é necessário?**
> O `npm` usa um script `.ps1` internamente. Sem essa liberação, o comando `npm` falha com erro
> de segurança — mesmo depois de instalado corretamente. Fazer isso antes de instalar o Node.js
> evita o problema na raiz.

✅ Feito! Pode deixar o PowerShell aberto para o próximo passo.

---

### Passo 3 — Instalar o Chocolatey, o make e o Node.js

O **Chocolatey** é um gerenciador de pacotes para Windows — funciona como uma "loja de linha de
comando" que instala programas automaticamente, sem precisar entrar em vários sites.

Com o **PowerShell como Administrador** ainda aberto:

1. Instale o Chocolatey:
```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

2. Instale o make e o Node.js de uma vez:
```powershell
choco install make nodejs -y
```

3. Feche o PowerShell e o Git Bash, depois **reabra o Git Bash**
   - Isso é necessário porque o Windows só reconhece os programas novos após reabrir o terminal

4. Confirme que tudo funcionou:
```bash
make --version   # deve mostrar GNU Make 4.x.x
node --version   # deve mostrar v22 ou superior
npm --version    # deve mostrar 10 ou superior
```

---

### Passo 4 — Configurar o Git com seu nome e e-mail

O Git precisa saber quem você é para registrar corretamente quem fez cada alteração no projeto.
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

### Passo 5 — Clonar o repositório e configurar o projeto

Agora que tudo está instalado, vamos baixar o projeto e preparar o ambiente.

No **Git Bash**, rode:

```bash
# 1. Clone o repositório (isso cria a pasta eventocar onde você estiver)
git clone https://github.com/seu-usuario/eventocar.git

# 2. Entre na pasta do projeto
cd eventocar

# 3. Configure o ambiente completo (apenas uma vez)
make setup
```

O `make setup` vai instalar todas as dependências do projeto automaticamente. ✅

---

## Verificação final

Após o `make setup` terminar sem erros, rode:

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
| `.\setup-windows.ps1 não pode ser carregado` | Política de execução bloqueando scripts | Rode o Passo 2 antes de qualquer outra coisa |
| `make: command not found` | make não instalado ou terminal não foi reaberto | Instale via Chocolatey (Passo 3) e reabra o Git Bash |
| `npm: command not found` | Node.js não instalado ou terminal não foi reaberto | Instale via Chocolatey (Passo 3) e reabra o Git Bash |
| `npm.ps1 não pode ser carregado` | Política de execução bloqueando scripts | Rode o Passo 2 no PowerShell como Administrador |
| `Could not read package.json` | Projeto Next.js ainda não inicializado | Normal na primeira vez — aguarde a inicialização do projeto |

---

*Última atualização: 2026-06-28*
