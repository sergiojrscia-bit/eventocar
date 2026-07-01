---
title: Publicação da Documentação (GitHub Pages)
parent: Projeto
nav_order: 3
---

# 🌐 Como o site de documentação é publicado

> Este guia explica como o EventoCar transformou a pasta `docs/` do repositório
> em um site público, e como adicionar novas páginas a esse site no futuro.

---

## O que é o GitHub Pages

O **GitHub Pages** é um serviço gratuito do GitHub que pega arquivos de dentro
de um repositório e os transforma em um site publicado na internet.

**Na prática, no nosso projeto, isso significa:** a mesma pasta `docs/` que
guarda nosso diário de decisões, templates e especificações também *é* o
site que aparece em `https://sergiojrscia-bit.github.io/eventocar/`. Não
existem dois lugares — é um só, servindo dois propósitos.

---

## O que é o tema just-the-docs

Sozinho, o GitHub Pages só publicaria arquivos `.md` como texto cru. Quem
transforma isso em um site com menu lateral, busca e navegação por categorias
é o tema **just-the-docs**, configurado no `_config.yml` via `remote_theme`.

Esse tema lê um bloco especial no topo de cada arquivo `.md` — chamado
**front matter** — para saber o título da página e onde ela deve aparecer
no menu.

---

## Passo a passo: como foi configurado

📋 **Configuração feita em GitHub → Settings → Pages:**
- [x] Build and deployment → Source: `Deploy from a branch`
- [x] Branch: `main`
- [x] Pasta: `/docs`
- [x] Salvo — site publicado em `https://sergiojrscia-bit.github.io/eventocar/`

Ou seja: toda vez que um `git push` (feito pelo `make commit`) atualiza a
branch `main`, o GitHub reconstrói o site automaticamente a partir do
conteúdo da pasta `/docs`. Não existe passo manual de publicação — é
automático a cada commit.

---

## Como adicionar uma nova página ao site

Sempre que criarmos um arquivo `.md` novo dentro de `docs/`, ele só aparece
no site se tiver o front matter correto. O formato é:

```markdown
---
title: Nome que aparece no menu
parent: Nome da categoria pai (ex: Analista, Dev, QA, Projeto)
nav_order: número de ordem dentro da categoria
---
```

**Regras importantes:**
- O `---` de abertura é **obrigatório** na primeira linha do arquivo. Sem
  ele, o front matter não é reconhecido e a página não aparece corretamente
  no menu (foi exatamente o bug que corrigimos no `ideias.md` nesta sessão).
- Para categorias com sub-categorias (como `Brainstorms` dentro de
  `Analista`), usa-se `grand_parent` além de `parent` — como já foi feito em
  `docs/analista/brainstorms/`.
- Cada categoria (Projeto, Analista, Dev, QA) tem um arquivo `index.md`
  próprio com `has_children: true` — é ele quem faz a categoria aparecer
  como uma "gaveta" clicável no menu.

---

## Checklist rápido antes de commitar uma nova página de documentação

- [ ] O arquivo `.md` começa com `---` na primeira linha?
- [ ] Tem `title`, `parent` e `nav_order` preenchidos?
- [ ] O `parent` é exatamente igual ao `title` da categoria (ex: `Analista`, não `analista`)?
- [ ] O arquivo está na pasta correta dentro de `docs/`?

---

*Última atualização: 2026-06-30*
