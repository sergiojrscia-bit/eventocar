// Modos de visualização da página inicial (RF11) e onde a escolha fica salva.
//
// O modo fica num COOKIE (e não no localStorage, como o tema): o cookie vai
// junto em cada visita, então o servidor já monta a página no modo salvo e
// ela não "pisca" mostrando a Agenda primeiro. Decisão de 2026-10-03.
// O cookie só guarda o nome do modo — não identifica ninguém.

export const IDS_MODOS = ["agenda", "grade", "linha"];
export const MODO_PADRAO = "agenda";
export const COOKIE_MODO = "eventocar-visualizacao";

const UM_ANO_EM_SEGUNDOS = 60 * 60 * 24 * 365;

/** Valor do cookie -> modo válido (qualquer valor estranho vira o padrão). */
export function modoValido(valor) {
  return IDS_MODOS.includes(valor) ? valor : MODO_PADRAO;
}

/** Salva o modo escolhido no cookie (só no navegador). Vale por 1 ano. */
export function salvarModoNoCookie(id) {
  const seguro = window.location.protocol === "https:" ? "; secure" : "";
  document.cookie = `${COOKIE_MODO}=${id}; path=/; max-age=${UM_ANO_EM_SEGUNDOS}; samesite=lax${seguro}`;
}
