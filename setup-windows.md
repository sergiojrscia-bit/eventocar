# 🖥️ Setup do Ambiente — Windows

> Este guia explica como configurar o ambiente de desenvolvimento do EventoCar no Windows.
> Siga os passos na ordem. Se preferir automatizar, use o script `setup-windows.ps1` na raiz do projeto.

---

## Pré-requisitos

- Windows 10 ou superior
- Git instalado (com Git Bash)
- Acesso de Administrador no computador

---

## Opção rápida: rodar o script automático

1. Abra o PowerShell como Administrador
   - Clique no menu Iniciar → digite `PowerShell` → botão direito → **Executar como administrador**
2. Navegue até a pasta do projeto:
   ```powershell
   cd C:\Projeto\eventocar
   ```
3. Rode o script:
   ```powershell
   .\setup-windows.ps1
   ```
4. Aguarde terminar e siga o aviso final na tela

---

## Opção manual: passo a passo explicado

### Passo 1 — Instalar o Chocolatey

O Chocolatey é um gerenciador de pacotes para Windows — funciona como uma "loja de linha de comando" que instala programas automaticamente.

Abra o PowerShell como Administrador e rode:

```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

✅ Confirme que funcionou:
```powershell
choco --version
```
Deve aparecer algo como `Chocolatey v2.x.x`.

---

### Passo 2 — Instalar o make

O `make` é a ferramenta que lê o `Makefile` e executa os comandos do projeto (como `make setup`, `make dev`, etc).

```powershell
choco install make -y
```

✅ Confirme que funcionou (depois de fechar e reabrir o Git Bash):
```bash
make --version
```
Deve aparecer `GNU Make 4.x.x`.

---

### Passo 3 — Instalar o Node.js

O Node.js é o ambiente que roda o Next.js (nosso framework). Ele já vem com o `npm` (gerenciador de pacotes do JavaScript) incluso.

```powershell
choco install nodejs -y
```

✅ Confirme que funcionou (depois de fechar e reabrir o Git Bash):
```bash
node --version
npm --version
```
Deve aparecer `v26.x.x` e `11.x.x` (ou superior).

---

### Passo 4 — Liberar política de execução de scripts

Por padrão, o Windows bloqueia a execução de scripts `.ps1` no PowerShell. Esse comando libera para o seu usuário:

```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Quando perguntar confirmação, digite `S` e pressione Enter.

> **Por que isso é necessário?**
> O `npm` no Windows usa um script `.ps1` internamente. Sem essa liberação, o comando `npm` falha com erro de segurança — mesmo depois de instalado corretamente.

---

### Passo 5 — Fechar e reabrir o terminal

Depois de instalar tudo, **feche o PowerShell e o Git Bash** e abra o Git Bash novamente.

Isso é necessário porque o Windows atualiza o PATH (a lista de programas que o terminal conhece) só quando uma nova janela é aberta.

---

## Verificação final

Com o Git Bash aberto na pasta do projeto, rode:

```bash
make --version   # deve mostrar GNU Make
node --version   # deve mostrar v26 ou superior
npm --version    # deve mostrar 11 ou superior
make setup       # deve rodar o npm install sem erros
```

Se todos os comandos funcionarem, o ambiente está pronto. ✅

---

## Erros comuns

| Erro | Causa | Solução |
|------|-------|---------|
| `make: command not found` | make não instalado ou terminal não foi reaberto | Instale via Chocolatey e reabra o Git Bash |
| `npm: command not found` | Node.js não instalado ou terminal não foi reaberto | Instale via Chocolatey e reabra o Git Bash |
| `npm.ps1 não pode ser carregado` | Política de execução bloqueando scripts | Rode o Passo 4 no PowerShell como Admin |
| `Could not read package.json` | Projeto Next.js ainda não inicializado | Normal na primeira vez — rode `make init` para criar o projeto |

---

*Última atualização: 2026-06-28*
