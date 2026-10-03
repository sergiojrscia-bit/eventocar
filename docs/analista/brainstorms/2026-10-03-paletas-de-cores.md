---
title: 2026-10-03 — Temas de cores escolhidos pelo visitante
parent: Brainstorms
grand_parent: Analista
---

# 🧠 Brainstorm: Temas de cores escolhidos pelo visitante

> **Papel:** Analista
> **Data:** 2026-10-03
> **Participantes:** Dev + IA Parceira
> **Status:** ✅ Decidido

---

## O que estamos decidindo

Como oferecer ao visitante a escolha das cores do site, com 5 opções bem diferentes, somando-se
aos 3 modos de visualização já existentes (RF11).

---

## Contexto

Logo depois de entregar os modos de visualização (Agenda, Grade e Linha do tempo), o dono do
projeto pediu que o visitante também pudesse escolher as cores. Dois riscos apareceram:

1. **Leitura:** uma paleta bonita pode ficar ilegível (texto colorido claro demais sobre fundo
   branco, por exemplo).
2. **Manutenção:** 5 paletas × 3 modos = 15 combinações. Se cada combinação tivesse código
   próprio, toda mudança visual teria que ser feita 15 vezes.

---

## Opções analisadas

### Opção A — Cada paleta com CSS próprio em cada modo

**O que é:**
Escrever as cores de cada paleta diretamente nos estilos de cada modo.

**Vantagens:**
- Controle total de cada combinação

**Desvantagens:**
- 15 combinações para manter; fácil esquecer uma ao mudar algo

---

### Opção B — Paletas como valores de variáveis de cor (tokens)

**O que é:**
Os layouts deixam de ter cores fixas e passam a usar variáveis com nome de função: "fundo da
página", "cards", "texto", "texto secundário", "borda", "cabeçalho", "cor de destaque",
"destaque para texto em fundo claro", "destaque para texto em fundo escuro", "texto sobre o
destaque" etc. Cada tema só define os valores dessas 13 variáveis (`src/lib/temas.js`).

**Vantagens:**
- Tema novo = 13 valores num arquivo, sem mexer em nenhum layout
- O contraste pode ser conferido por cálculo, paleta a paleta, antes de entrar no site

**Desvantagens:**
- Exige disciplina: cor nova nos layouts precisa ser uma variável, nunca um valor fixo

---

## Recomendação

**Opção escolhida:** Opção B — paletas como valores de variáveis de cor.

**Por quê:**
Mantém o custo de manutenção igual ao de hoje, independentemente do número de paletas, e permite
garantir a leitura de cada paleta por cálculo, e não no olho.

---

## Decisão final

- [ ] Em discussão
- [x] Aprovada → registrar no `diario-de-decisoes.md`
- [ ] Descartada → manter motivo registrado aqui

**O que foi decidido:**

1. **6 temas completos** — cada um troca fundo, cards, textos, bordas, cabeçalho e destaques:

   | Tema | Clima | Fundo | Destaque |
   |---|---|---|---|
   | **Original (padrão)** | o visual de antes dos temas | cinza-concreto | links azuis + faixa lateral colorida pelo tipo do evento |
   | Laranja pista | claro, identidade "Painel de pista" | cinza-concreto | laranja |
   | Azul oceano | claro e frio | azul-claro, cabeçalho marinho | azul |
   | Verde inglês | clássico, "carro antigo" | creme, cabeçalho verde-garrafa | dourado |
   | Amarelo largada | **escuro**, alto contraste | preto | amarelo |
   | Rosa neon | **escuro**, anos 80 | roxo profundo | rosa + ciano |

2. **Seletor "Cores"** com bolinhas que mostram três cores de cada tema (fundo, cabeçalho e cor
   dos links — é ela que diferencia o Original do Laranja pista), ao lado do "Ver como". O nome do tema aparece ao passar o mouse e é lido
   por leitores de tela.
3. A escolha fica **salva no navegador do visitante**, junto com o modo de visualização. A lógica
   de salvar virou um módulo reutilizável (`src/lib/preferencias.js`).
4. **Uma única fonte das cores:** `src/lib/temas.js`. O CSS de cada tema é gerado dali e
   entregue no `<head>` da página; nenhuma cor fica duplicada em arquivo de estilo.
5. **Contraste WCAG AA (mínimo 4.5:1) verificado por teste automatizado** (`tests/temas.spec.js`)
   em 12 pares de cada tema: texto e texto secundário sobre fundo e cards, links, título e
   subtítulo sobre o cabeçalho, destaque claro sobre blocos escuros, texto sobre botão colorido e
   botão ativo. Se alguém mudar uma cor para algo ilegível, o teste falha. Ele já pegou um caso
   durante a implementação (texto sobre o botão do Azul oceano em 4.48, corrigido).
6. **Sem "piscar" ao abrir a página:** um script no `<head>`, padrão recomendado pelo Next.js
   ("preventing flash before hydration"), aplica o tema salvo antes de a página aparecer. Sem ele,
   quem escolheu um tema escuro veria um flash do tema claro a cada visita.
7. O modo **Linha do tempo continua sempre escuro** (é a identidade dele), tingido pelo tom de
   cada tema. Agenda e Grade trocam por completo.

**Limitação resolvida no mesmo dia:** o *modo de visualização* salvo aparecia como Agenda por um
instante ao abrir a página. O modo passou do `localStorage` para um cookie
(`eventocar-visualizacao`): o servidor lê o cookie e já entrega a página montada no modo salvo. A
página inicial passou a ser renderizada a cada visita (dinâmica); as páginas institucionais
continuam estáticas.

**Revisões no mesmo dia:**

- A primeira versão trocava só a cor de destaque e o cabeçalho, e o fundo, os cards e os textos
  continuavam iguais. O dono do projeto achou a mudança sutil demais; por isso cada paleta virou
  um tema completo, incluindo dois temas escuros.
- O dono do projeto pediu para manter também o visual de antes dos temas. Entrou o 6º tema,
  **Original**, como padrão: links azuis e a faixa lateral colorida pelo tipo do evento, como no
  card antigo. Único ajuste: o cinza do texto secundário ficou um pouco mais escuro (`#646B77`),
  porque o antigo (`#6B7280`) dava 4.39 sobre o fundo e reprovava no contraste WCAG AA. A faixa
  do tipo é controlada pelo próprio tema (`faixaTipo` em `src/lib/temas.js`), então qualquer tema
  pode ligá-la no futuro.
- O dono do projeto não conseguia ver o Original: o navegador dele tinha um tema salvo de testes
  anteriores (quando o padrão era outro), e o site, corretamente, abria o tema salvo. Dois ajustes:
  a chave onde o tema fica salvo mudou de `eventocar:cores` para `eventocar:tema` (escolhas antigas
  deixam de valer e todos voltam ao Original — sem impacto, o site ainda não foi publicado) e o
  **nome do tema ativo** passou a aparecer ao lado das bolinhas, já que algumas se parecem.

**Motivo:**
Muda o visual de verdade, sem multiplicar o código e sem abrir mão da leitura.

---

## Próximo passo

- RF14 adicionado ao `REQ-001`.
- Toda cor nova nos layouts deve ser uma variável definida em `src/lib/temas.js` — nunca um valor fixo.

---

*Arquivo salvo em: `docs/analista/brainstorms/2026-10-03-paletas-de-cores.md`*
