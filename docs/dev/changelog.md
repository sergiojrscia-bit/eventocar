---
title: Changelog
parent: Dev
nav_order: 4
---

# Changelog — EventoCar

> Registro cronológico de tudo que foi construído ou alterado no projeto.
> Mais recente sempre no topo.

---

## 2026-07-01 — Página inicial: listagem, filtros e cards de eventos

**O que foi feito:**
- Estrutura de dados `data/eventos.json` criada com 6 eventos de exemplo (campos: id, nome, data, cidade, estado, tipo, valor)
- Componente `EventCard` para exibir cada evento em formato de card, com cor lateral por tipo
- Componente `Filtros` para filtrar por tipo, estado e mês, combináveis entre si
- Página inicial (`app/page.js`) reescrita: consome o JSON, aplica filtros no cliente (`useState` + `useMemo`), oculta eventos passados e ordena por data
- Identidade visual "Painel de pista" aplicada: paleta asfalto/laranja-corrida, tipografia Oswald + Inter + JetBrains Mono, linha tracejada de assinatura no cabeçalho
- Mensagem de "nenhum evento encontrado" quando os filtros não retornam resultado

**Por que foi feito assim:**
> Filtragem no cliente porque o volume de eventos é pequeno e não há paginação prevista (REQ-001). Componentes separados (`EventCard`, `Filtros`) para facilitar manutenção e reuso futuro. Cores de tipo centralizadas em `lib/tipos.js` para fácil ajuste.

**Arquivos criados ou modificados:**
| Arquivo | O que mudou |
|---------|-------------|
| `app/layout.js` | Metadata atualizada (título/descrição), `lang="pt-BR"`, fontes Oswald e JetBrains Mono adicionadas |
| `app/globals.css` | Variáveis de cor do projeto definidas |
| `app/page.js` | Reescrito: lógica de filtros e listagem de eventos |
| `app/page.module.css` | Estilos do layout da página inicial |
| `lib/tipos.js` | Cores por tipo de evento e lista de estados brasileiros |
| `components/EventCard.js` | Componente novo — card de evento |
| `components/EventCard.module.css` | Estilos do card |
| `components/Filtros.js` | Componente novo — barra de filtros |
| `components/Filtros.module.css` | Estilos da barra de filtros |
| `data/eventos.json` | 6 eventos de exemplo |

**Testado por:** [x] Dev  [ ] QA  
**Deploy feito:** [ ] Sim  [x] Não  

---