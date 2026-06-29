# 📋 Requisito: Página inicial com listagem e filtros de eventos

## Identificação

- **ID:** REQ-001
- **Título:** Página inicial com listagem e filtros de eventos automotivos
- **Tipo:** `Funcional`
- **Prioridade:** `Alta`
- **História de Usuário relacionada:** HU-001
- **Data:** 2026-06-29
- **Autor:** Analista
- **Status:** `Aprovado`

---

## Descrição

A página inicial do EventoCar deve exibir uma listagem de eventos automotivos do Brasil, com filtros que permitam ao usuário encontrar rapidamente eventos do seu interesse. Os eventos devem ser apresentados em cards visuais, ordenados por data, e a página deve funcionar bem em celular e computador.

---

## Requisitos Funcionais

> O que o sistema **deve fazer**.

- RF01 — Exibir lista de eventos em formato de cards, ordenados por data (mais próximos primeiro)
- RF02 — Cada card deve mostrar: nome do evento, data, cidade, estado e tipo do evento
- RF03 — Exibir filtro por tipo de evento (Clássicos, Tuning, Track Day, Exposição, Feira, Encontro de Clube, Outros)
- RF04 — Exibir filtro por estado (lista de UFs brasileiras)
- RF05 — Exibir filtro por mês ou intervalo de datas
- RF06 — Permitir a combinação de múltiplos filtros simultaneamente
- RF07 — Exibir mensagem amigável quando nenhum evento corresponder aos filtros aplicados
- RF08 — Exibir o campo "valor do ingresso" no card quando a informação estiver disponível
- RF09 — Não exibir eventos com data passada na listagem principal
- RF10 — Exibir cabeçalho com nome do site e rodapé com informações básicas

---

## Requisitos Não-Funcionais

> Como o sistema **deve se comportar**.

- RNF01 — A página deve carregar em menos de 3 segundos em conexões móveis comuns
- RNF02 — O layout deve ser responsivo — funcionar em telas de celular (a partir de 375px) e computador
- RNF03 — As páginas devem ser renderizadas no servidor (SSR ou SSG do Next.js) para garantir boa indexação no Google (SEO)
- RNF04 — O código deve seguir os padrões do ESLint configurado no projeto
- RNF05 — O site deve ser acessível via HTTPS quando publicado na Vercel

---

## Restrições

- Os eventos são cadastrados manualmente por enquanto — não há integração com APIs externas nesta versão
- O sistema de cadastro de eventos pelo organizador é fora do escopo desta entrega
- Não haverá paginação na primeira versão — todos os eventos futuros serão exibidos de uma vez (revisar se o volume crescer)
- Os dados dos eventos ficam em um arquivo local (JSON ou similar) até a integração com banco de dados ser definida

---

## Dependências

- Depende de: projeto Next.js inicializado (já concluído em 2026-06-28)
- Não há outros requisitos bloqueantes

---

## Critérios de Aceite

- [ ] A página inicial abre sem erros em `http://localhost:3000`
- [ ] Pelo menos 5 eventos de exemplo aparecem na listagem
- [ ] Os filtros de tipo, estado e data funcionam individualmente
- [ ] Os filtros funcionam combinados (ex: tuning + SP)
- [ ] Ao filtrar sem resultado, aparece mensagem: "Nenhum evento encontrado para os filtros selecionados."
- [ ] A página é visualizável e utilizável em tela de celular (375px)
- [ ] Eventos com data anterior a hoje não aparecem na lista
- [ ] A página passa na verificação do Playwright sem erros

---

## Notas e Observações

- Diferencial identificado na análise de mercado: nenhum concorrente oferece filtros combinados para todos os tipos de evento automotivo
- O arquivo de dados inicial pode ser `data/eventos.json` — uma lista de objetos com os campos definidos nos RFs
- Referência visual de simplicidade: evitar menus laterais pesados, preferir filtros no topo ou em linha
- Compatível com Google AdSense: layout deve ter espaço reservado para anúncios sem quebrar a experiência

---

## Histórico de Alterações

| Data | Autor | O que mudou |
|------|-------|-------------|
| 2026-06-29 | Analista | Criação do documento |
