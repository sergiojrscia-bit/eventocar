---
title: REQ-002 — Menu e páginas institucionais
parent: Analista
nav_order: 7
---

# 📋 Requisito: Menu e páginas Sobre, Contato e Privacidade

## Identificação

- **ID:** REQ-002
- **Título:** Menu de navegação e páginas institucionais (Sobre, Contato e Privacidade)
- **Tipo:** `Funcional`
- **Prioridade:** `Alta`
- **História de Usuário relacionada:** HU-002
- **Data:** 2026-10-03
- **Autor:** Analista
- **Status:** `Implementado`

---

## Descrição

O site ganha um menu de navegação e três páginas institucionais. O menu fica no cabeçalho de
todas as páginas (inclusive nos três modos de visualização da página inicial) e os links das
páginas institucionais ficam também no rodapé. As páginas explicam o que é o EventoCar, como
falar com ele e como os dados do visitante são tratados.

---

## Requisitos Funcionais

- RF01 — Exibir no cabeçalho de todas as páginas um menu com os itens **Eventos** (página inicial), **Sobre** e **Contato**
- RF02 — Destacar no menu o item da página atual (marcado também para leitores de tela)
- RF03 — Exibir no rodapé de todas as páginas links para **Sobre**, **Contato** e **Privacidade**
- RF04 — Página **Sobre** (`/sobre`): o que é o site, que tipos de evento reúne, de onde vêm os eventos (divulgação pública dos organizadores, com link para o post original) e por que o site pode exibir anúncios
- RF05 — Página **Contato** (`/contato`): canal de contato (e-mail dedicado ao site) e assuntos para os quais escrever: sugerir evento, corrigir informação, avisar sobre anúncio estranho e parcerias. Enquanto o e-mail não existir, informar que ele será divulgado em breve
- RF06 — Página **Privacidade** (`/privacidade`) com as seções: o que guardamos no seu navegador; conteúdo de terceiros; anúncios; seus direitos; contato; data da última atualização

---

## Requisitos Não-Funcionais

- RNF01 — Cada página tem endereço e título próprios, renderizados no servidor, para aparecer no Google
- RNF02 — As páginas respeitam o tema de cores escolhido pelo visitante (RF14 do REQ-001), sem "piscar"
- RNF03 — As páginas funcionam em telas a partir de 375px, sem rolagem horizontal
- RNF04 — Nenhum erro no console do navegador em nenhuma das páginas
- RNF05 — O código segue o ESLint configurado no projeto

---

## Restrições

- Sem formulário de contato nesta versão: o site não tem servidor próprio para receber mensagens
- Sem nome de pessoa na página Sobre
- Nenhum texto que incentive clique em anúncio
- A Política de privacidade **não substitui revisão jurídica**: deve ser revisada por alguém da área antes de o site ser publicado com anúncios

---

## Dependências

- Depende de: REQ-001 (página inicial, modos de visualização e temas de cores)

---

## Critérios de Aceite

- [x] O menu aparece no cabeçalho da página inicial (nos três modos) e das três páginas novas
- [x] Clicar em Sobre, Contato e Privacidade leva à página certa, com o título certo
- [x] O item da página atual fica destacado no menu
- [x] O item "Eventos" volta para a página inicial
- [x] A página Privacidade tem todas as seções do RF06
- [x] As páginas respeitam o tema salvo
- [x] As páginas funcionam em 375px sem rolagem horizontal e sem erros no console

---

## Notas e Observações

- E-mail de contato: configurado em `src/lib/site.js` (`emailContato`). Hoje está vazio, até o e-mail dedicado ser criado; ao preenchê-lo, as páginas Contato e Privacidade passam a mostrá-lo
- O que a Política de privacidade descreve (situação em 2026-10-03):
  - preferências salvas no navegador (`localStorage`): modo de visualização e tema de cores
  - script do Instagram (Meta) para a prévia dos posts
  - fontes servidas pelo próprio site (o `next/font` não faz o navegador baixar nada do Google)
  - nenhum cadastro, formulário, análise de visitas ou anúncio ativo
- Quando o AdSense for ativado, a seção "Anúncios" precisa ser reescrita antes (cookies do Google e opções de personalização)

---

## Histórico de Alterações

| Data | Autor | O que mudou |
|------|-------|-------------|
| 2026-10-03 | Analista | Criação do documento |
| 2026-10-03 | Dev | Implementado; critérios de aceite validados por testes automatizados |
