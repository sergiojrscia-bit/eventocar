# =============================================================
# EventoCar — Script de configuração do ambiente no Windows
# =============================================================
# Execute este arquivo no PowerShell como Administrador
# Clique com botão direito no menu Iniciar → "Windows PowerShell (Admin)"
# Depois rode: .\setup-windows.ps1
# =============================================================

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  EventoCar — Setup do ambiente Windows" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# -------------------------------------------------------------
# PASSO 1 — Instalar o Chocolatey (gerenciador de pacotes)
# -------------------------------------------------------------
Write-Host "[ 1/4 ] Verificando Chocolatey..." -ForegroundColor Yellow

if (Get-Command choco -ErrorAction SilentlyContinue) {
    Write-Host "        Chocolatey ja esta instalado. Pulando." -ForegroundColor Green
} else {
    Write-Host "        Instalando Chocolatey..." -ForegroundColor Yellow
    Set-ExecutionPolicy Bypass -Scope Process -Force
    [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
    iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
    Write-Host "        Chocolatey instalado com sucesso." -ForegroundColor Green
}

# -------------------------------------------------------------
# PASSO 2 — Instalar o make
# -------------------------------------------------------------
Write-Host ""
Write-Host "[ 2/4 ] Verificando make..." -ForegroundColor Yellow

if (Get-Command make -ErrorAction SilentlyContinue) {
    Write-Host "        make ja esta instalado. Pulando." -ForegroundColor Green
} else {
    Write-Host "        Instalando make via Chocolatey..." -ForegroundColor Yellow
    choco install make -y
    Write-Host "        make instalado com sucesso." -ForegroundColor Green
}

# -------------------------------------------------------------
# PASSO 3 — Instalar o Node.js (ja traz o npm junto)
# -------------------------------------------------------------
Write-Host ""
Write-Host "[ 3/4 ] Verificando Node.js e npm..." -ForegroundColor Yellow

if (Get-Command node -ErrorAction SilentlyContinue) {
    Write-Host "        Node.js ja esta instalado. Pulando." -ForegroundColor Green
} else {
    Write-Host "        Instalando Node.js via Chocolatey..." -ForegroundColor Yellow
    choco install nodejs -y
    Write-Host "        Node.js instalado com sucesso." -ForegroundColor Green
}

# -------------------------------------------------------------
# PASSO 4 — Liberar politica de execucao de scripts
# -------------------------------------------------------------
Write-Host ""
Write-Host "[ 4/4 ] Configurando politica de execucao de scripts..." -ForegroundColor Yellow
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser -Force
Write-Host "        Politica configurada com sucesso." -ForegroundColor Green

# -------------------------------------------------------------
# AVISO FINAL
# -------------------------------------------------------------
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Setup concluido!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "IMPORTANTE: Feche este PowerShell e reabra o Git Bash" -ForegroundColor Yellow
Write-Host "para que as mudancas no PATH entrem em vigor." -ForegroundColor Yellow
Write-Host ""
Write-Host "Depois, na pasta do projeto, rode:" -ForegroundColor White
Write-Host "  make --version   (deve mostrar GNU Make)" -ForegroundColor White
Write-Host "  node --version   (deve mostrar v26 ou superior)" -ForegroundColor White
Write-Host "  npm --version    (deve mostrar 11 ou superior)" -ForegroundColor White
Write-Host ""
