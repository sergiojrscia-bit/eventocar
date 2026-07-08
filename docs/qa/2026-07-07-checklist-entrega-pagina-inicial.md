---
title: Checklist de Entrega — Página Inicial
parent: QA
nav_order: 6
---

# Checklist de Entrega — Página Inicial (Listagem e Filtros)

**Data:** 2026-07-07
**Papel:** QA
**Feature:** Página inicial — listagem e filtros de eventos (HU-001 / REQ-001)

---

## Código

- [ ] O código foi revisado pelo Dev antes de publicar?
- [x] Não há erros no console do navegador?
- [x] O código está comentado e legível?

> ⚠️ Primeiro item deixado em aberto: neste projeto Dev e QA são o mesmo "chapéu" (você),
> então não houve uma revisão por uma segunda pessoa. Não é bloqueante, mas vale registrar
> que a revisão de código, quando existir, ainda não aconteceu de fato.

---

## Funcionalidade

- [x] A feature faz o que a história de usuário descreve?
- [x] Todos os casos de teste passaram?
- [x] Funciona no celular (mobile)?
- [x] Funciona no computador (desktop)?

> ✅ Baseado no `2026-07-05-caso-de-teste-pagina-inicial.md` — 16/16 passos aprovados,
> incluindo os passos 13 e 14 (responsivo em 375px) e os passos 6 a 12 (filtros
> individuais e combinados). Critérios de aceite da HU-001 e do REQ-001 (RF01–RF10)
> todos marcados como cumpridos.

---

## Visual

- [x] O layout está correto nos tamanhos de tela principais?
- [x] Não há texto cortado ou elemento quebrado?

> ✅ Confirmado no passo 13 do caso de teste (375px, sem cortes).

---

## SEO (importante para o AdSense)

- [x] A página tem título descritivo?
- [ ] As imagens têm texto alternativo (atributo `alt`)?
- [x] A URL da página é legível (ex: `/eventos/sp` e não `/page?id=3`)?

> ✅ Título/descrição: confirmado no changelog de 2026-07-01 (metadata atualizada em `app/layout.js`).
> ✅ URL: página inicial é `/`, já é o formato mais legível possível.
> ⚠️ Alt text: não encontrei registro de que os cards usam imagens (`EventCard` parece ser
> só texto/cor por enquanto). Se não há `<img>` na feature, este item não se aplica ainda —
> mas fica pendente de confirmação com o Dev antes de marcar como resolvido.

---

## Deploy

- [x] O código foi enviado para o GitHub?
- [ ] O site atualizou corretamente na Vercel?
- [ ] O link de produção foi testado após o deploy?

> ⚠️ **Bloqueante:** conforme o diário de decisões, a configuração do deploy na Vercel
> ainda está no backlog (`make deploy` só exibe aviso de "não configurado"). Não existe
> link de produção pra testar ainda — o site só está no ar como *documentação* via GitHub
> Pages, não como aplicação Next.js publicada.

---

## Resultado Final

- [ ] ✅ Entrega aprovada — pode ir pro ar
- [x] ❌ Entrega reprovada — corrigir antes de publicar

**Motivo:** Não há reprovação funcional — os 16 passos do caso de teste passaram e a
feature cumpre a HU-001 e o REQ-001. O bloqueio é só o item de **Deploy**: sem a Vercel
configurada, não existe "ar" pra essa entrega ir. Assim que o deploy for feito e o link
de produção for testado, este checklist pode ser reaberto e marcado como aprovado.

**Pendências para reabrir este checklist:**
- [ ] Configurar deploy na Vercel (`make deploy`)
- [ ] Testar o link de produção após o deploy
- [ ] Confirmar com o Dev se `EventCard` usa imagens — se sim, adicionar `alt` texto
- [ ] (Opcional) Definir se revisão de código por segunda pessoa é necessária neste projeto
