---
title: HU-002 — Menu e páginas Sobre, Contato e Privacidade
parent: Analista
nav_order: 6
---

# 📋 História de Usuário: Menu e páginas Sobre, Contato e Privacidade

## Identificação

- **ID:** HU-002
- **Título:** Conhecer quem está por trás do site, como falar com ele e como meus dados são tratados
- **Data:** 2026-10-03
- **Autor:** Analista
- **Status:** `Concluída`

---

## A História

> Como **visitante do EventoCar**,
> quero **um menu com páginas que expliquem o que é o site, como entrar em contato e como meus dados são tratados**,
> para **confiar no site antes de clicar em links e anúncios, e saber a quem avisar se algo estiver errado**.

---

## Critérios de Aceite

- [x] O cabeçalho de todas as páginas tem um menu com **Eventos**, **Sobre** e **Contato**
- [x] O rodapé de todas as páginas tem links para **Sobre**, **Contato** e **Privacidade**
- [x] O item do menu da página atual fica destacado
- [x] A página **Sobre** explica o que é o site, de onde vêm os eventos e por que pode haver anúncios
- [x] A página **Contato** mostra como falar com o site e para quais assuntos
- [x] A página **Privacidade** explica, de forma honesta, o que o site guarda no navegador, o conteúdo de terceiros que carrega e o que muda quando houver anúncios
- [x] As novas páginas respeitam o tema de cores escolhido pelo visitante
- [x] As novas páginas funcionam no celular (375px) sem rolagem para o lado

---

## Regras de Negócio

- Cada página tem endereço próprio (`/sobre`, `/contato`, `/privacidade`), para aparecer no Google (ideia #17)
- Nenhuma página incentiva clique em anúncio (regra do AdSense — decisão de 2026-10-03 sobre confiança nos anúncios)
- A página Sobre fala em nome do "EventoCar", sem nome de pessoa (decisão do dono do projeto)
- O contato é por um e-mail dedicado ao site, não o e-mail pessoal do dono. Enquanto o e-mail não for criado, a página informa que ele será divulgado em breve
- A Política de privacidade descreve só o que o site faz de verdade; quando algo mudar (ex: ativação do AdSense), ela é atualizada antes
- Tom de voz modesto e direto, sem superlativos

---

## Notas e Observações

- Origem: opção B da decisão de confiança nos anúncios (`docs/analista/brainstorms/2026-10-03-confianca-nos-anuncios.md`) e passo 1 da ideia #17 do `ideias.md`
- A página de privacidade também é pré-requisito para a aprovação no Google AdSense
- Requisitos detalhados em `docs/analista/REQ-002-menu-paginas-institucionais.md`

---

## Histórico de Alterações

| Data | Autor | O que mudou |
|------|-------|-------------|
| 2026-10-03 | Analista | Criação do documento |
| 2026-10-03 | Dev | Critérios de aceite cumpridos e validados por testes automatizados |
