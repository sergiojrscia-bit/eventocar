// Adaptador da fonte de dados do agente do Instagram
// (C:\Projetos\claude\instagram\eventos.json) para o formato que o site usa
// ({ id, nome, data, dataFim, cidade, estado, tipo, valor, link, detalhes }).
// Função pura, sem React/Next.js — usada pela página e pelos testes.

// Palavras-chave do "tipo" livre do Instagram -> tipos fixos de src/lib/tipos.js
const REGRAS_TIPO = [
  [/arrancada|drift|track|treino|corrida|race/i, "Track Day"],
  [/exposi/i, "Exposição"],
  [/feira/i, "Feira"],
  [/encontro|clube/i, "Encontro de Clube"],
  [/tuning/i, "Tuning"],
  [/cl[aá]ssic|antigo|retr[oô]/i, "Clássicos"],
];

export function converterTipo(tipoLivre) {
  const regra = REGRAS_TIPO.find(([padrao]) => padrao.test(tipoLivre || ""));
  return regra ? regra[1] : "Outros";
}

/** "Balneário Camboriú - SC" -> { cidade: "Balneário Camboriú", estado: "SC" } */
export function separarCidadeEstado(texto) {
  const partes = (texto || "").match(/^(.*?)\s*[-–—\/]\s*([A-Z]{2})$/);
  return partes
    ? { cidade: partes[1], estado: partes[2] }
    : { cidade: texto || "", estado: "" };
}

/**
 * Menor valor de ingresso de entrada, ignorando estacionamento e ingressos
 * com condição (ex: "1 kg de alimento"). Sem lista de ingressos = null.
 */
export function menorValorIngresso(ingressos) {
  const valores = (ingressos || [])
    .filter((i) => typeof i.valor === "number" && !i.obs && !/estacionamento/i.test(i.item))
    .map((i) => i.valor);
  return valores.length ? Math.min(...valores) : null;
}

/** Converte o JSON inteiro do agente. Eventos ainda sem data ficam de fora. */
export function converterEventosInstagram(json) {
  return (json.eventos || [])
    .filter((evento) => evento.data_inicio)
    .map((evento) => ({
      id: evento.id,
      nome: evento.titulo,
      data: evento.data_inicio,
      dataFim: evento.data_fim ?? evento.data_inicio,
      ...separarCidadeEstado(evento.cidade),
      tipo: converterTipo(evento.tipo),
      valor: menorValorIngresso(evento.ingressos),
      link: evento.posts_origem?.[0] ?? null,
      detalhes: evento.descricao ?? null,
    }));
}
