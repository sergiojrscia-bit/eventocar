// Funções de exibição (texto que aparece na tela) compartilhadas pelos layouts.
// Puras, sem React — recebem dados do evento e devolvem texto pronto.

const DIAS = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"];
const MESES = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];

function paraData(texto) {
  return new Date(texto + "T00:00:00");
}

/** "2026-10-03" -> { dia: "03", mes: "OUT", semana: "SÁB", ano: 2026 } */
export function partesData(texto) {
  const d = paraData(texto);
  return {
    dia: String(d.getDate()).padStart(2, "0"),
    mes: MESES[d.getMonth()],
    semana: DIAS[d.getDay()],
    ano: d.getFullYear(),
  };
}

/** "03 de outubro de 2026" ou, para eventos de vários dias, "09 a 11 de outubro de 2026" */
export function textoPeriodo(evento) {
  const opcoes = { day: "2-digit", month: "long", year: "numeric" };
  const inicio = paraData(evento.data).toLocaleDateString("pt-BR", opcoes);
  if (!evento.dataFim || evento.dataFim === evento.data) return inicio;
  const fim = paraData(evento.dataFim).toLocaleDateString("pt-BR", opcoes);
  return `${inicio.slice(0, 2)} a ${fim}`;
}

/** null quando não há valor; "Gratuito" para 0; senão o menor ingresso. */
export function textoValor(valor) {
  if (valor === null || valor === undefined) return null;
  return valor === 0 ? "Gratuito" : `A partir de R$ ${valor}`;
}
