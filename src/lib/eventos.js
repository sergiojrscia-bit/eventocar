// Regras de negócio relacionadas a eventos — funções puras, sem depender de
// React/Next.js. Cada função cuida de UMA regra, e pode ser testada isolada,
// sem precisar de navegador (ver ideia #14 em docs/projeto/ideias.md).
//
// Decisão técnica completa em:
// docs/dev/brainstorms/2026-07-11-separar-regras-negocio-eventos.md

/**
 * Regra: eventos que já terminaram não aparecem na listagem (RF09).
 * Usa a data de término (`dataFim`), para um evento de vários dias continuar
 * visível até o último dia; sem `dataFim`, vale a data de início.
 * `hoje` é parâmetro (não `new Date()` fixo dentro da função) para a função
 * continuar pura e fácil de testar com datas fixas.
 */
export function ocultarPassados(eventos, hoje = new Date()) {
  const dataZerada = new Date(hoje);
  dataZerada.setHours(0, 0, 0, 0);

  return eventos.filter(
    (evento) => new Date((evento.dataFim ?? evento.data) + "T00:00:00") >= dataZerada
  );
}

/** Regra: filtro por tipo de evento. Tipo vazio = não filtra. */
export function filtrarPorTipo(eventos, tipo) {
  return eventos.filter((evento) => !tipo || evento.tipo === tipo);
}

/** Regra: filtro por estado (UF). Estado vazio = não filtra. */
export function filtrarPorEstado(eventos, estado) {
  return eventos.filter((evento) => !estado || evento.estado === estado);
}

/** Regra: filtro por mês (formato "AAAA-MM"). Mês vazio = não filtra. */
export function filtrarPorMes(eventos, mes) {
  return eventos.filter((evento) => !mes || evento.data.startsWith(mes));
}

/** Regra: ordenação por data, eventos mais próximos primeiro. */
export function ordenarPorData(eventos) {
  return [...eventos].sort((a, b) => a.data.localeCompare(b.data));
}

/**
 * Composição de todas as regras acima — é isso que a página inicial chama.
 * Se uma nova regra de negócio surgir (ex: "esconder evento sem ingresso
 * disponível"), ela entra como mais uma função pura neste arquivo e mais uma
 * chamada aqui dentro, sem precisar tocar nas regras já existentes.
 */
export function eventosVisiveis(eventos, filtros, hoje = new Date()) {
  return ordenarPorData(
    filtrarPorMes(
      filtrarPorEstado(
        filtrarPorTipo(ocultarPassados(eventos, hoje), filtros.tipo),
        filtros.estado
      ),
      filtros.mes
    )
  );
}

/**
 * Agrupa eventos (já ordenados) por mês, para layouts em formato de agenda.
 * Retorna [{ chave: "2026-10", titulo: "outubro de 2026", eventos: [...] }].
 */
export function agruparPorMes(eventos) {
  const grupos = [];
  for (const evento of eventos) {
    const chave = evento.data.slice(0, 7);
    let grupo = grupos.find((g) => g.chave === chave);
    if (!grupo) {
      const titulo = new Date(chave + "-01T00:00:00").toLocaleDateString("pt-BR", {
        month: "long",
        year: "numeric",
      });
      grupo = { chave, titulo, eventos: [] };
      grupos.push(grupo);
    }
    grupo.eventos.push(evento);
  }
  return grupos;
}
