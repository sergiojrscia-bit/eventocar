// Preferências do visitante salvas no navegador dele (localStorage):
// modo de visualização (RF11) e paleta de cores (RF14).
//
// Fica só no aparelho da pessoa, sem cadastro. O acesso fica dentro de
// try/catch porque o navegador pode bloquear o localStorage (aba anônima,
// cookies bloqueados) — nesse caso vale uma cópia em memória, e a escolha
// dura só enquanto a página estiver aberta.
//
// Cada preferência devolve { assinar, ler, salvar }, no formato que o
// useSyncExternalStore do React espera.

const EVENTO_TROCA = "eventocar:troca-preferencia";

export function criarPreferencia(chave, idsValidos, padrao) {
  let emMemoria = padrao;

  function ler() {
    try {
      const salvo = window.localStorage.getItem(chave);
      if (idsValidos.includes(salvo)) return salvo;
    } catch {
      // localStorage bloqueado — usa a cópia em memória
    }
    return emMemoria;
  }

  function salvar(id) {
    emMemoria = id;
    try {
      window.localStorage.setItem(chave, id);
    } catch {
      // localStorage bloqueado — fica só a cópia em memória
    }
    window.dispatchEvent(new Event(EVENTO_TROCA));
  }

  // Avisa o React quando a preferência muda — nesta aba (EVENTO_TROCA) ou
  // em outra aba do site aberta ao mesmo tempo ("storage").
  function assinar(avisar) {
    window.addEventListener(EVENTO_TROCA, avisar);
    window.addEventListener("storage", avisar);
    return () => {
      window.removeEventListener(EVENTO_TROCA, avisar);
      window.removeEventListener("storage", avisar);
    };
  }

  return { assinar, ler, salvar };
}
