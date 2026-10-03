"use client";

import { useState, useMemo, useSyncExternalStore } from "react";
import dadosInstagram from "@instagram/eventos.json";
import LayoutAgenda from "@/components/layouts/LayoutAgenda";
import LayoutGrade from "@/components/layouts/LayoutGrade";
import LayoutLinhaDoTempo from "@/components/layouts/LayoutLinhaDoTempo";
import { eventosVisiveis } from "@/lib/eventos";
import { converterEventosInstagram } from "@/lib/fonteInstagram";

// Fonte: JSON gerado pelo agente do Instagram (../instagram/eventos.json),
// convertido para o formato que o site usa em src/lib/fonteInstagram.js.
const eventos = converterEventosInstagram(dadosInstagram);

// Modos de visualização que o visitante pode escolher (RF11).
// Todos recebem os mesmos dados e filtros — só muda a apresentação.
// O primeiro é o padrão (e o que o Google vê ao indexar a página).
const MODOS = [
  { id: "agenda", nome: "Agenda", Componente: LayoutAgenda },
  { id: "grade", nome: "Grade", Componente: LayoutGrade },
  { id: "linha", nome: "Linha do tempo", Componente: LayoutLinhaDoTempo },
];
const MODO_PADRAO = MODOS[0].id;

// --- Preferência salva no navegador do visitante (localStorage) ---------
// Fica só no aparelho da pessoa, sem cadastro. O acesso fica dentro de
// try/catch porque o navegador pode bloquear o localStorage (aba anônima,
// cookies bloqueados) — nesse caso a escolha vale só enquanto a página
// estiver aberta.
const CHAVE_PREFERENCIA = "eventocar:visualizacao";
const EVENTO_TROCA = "eventocar:troca-visualizacao";

// Cópia em memória: é o que vale se o localStorage estiver bloqueado
// (aí a escolha dura só até a página ser fechada).
let preferenciaEmMemoria = MODO_PADRAO;

function lerPreferencia() {
  try {
    const salvo = window.localStorage.getItem(CHAVE_PREFERENCIA);
    if (MODOS.some((m) => m.id === salvo)) return salvo;
  } catch {
    // localStorage bloqueado — usa a cópia em memória
  }
  return preferenciaEmMemoria;
}

function salvarPreferencia(id) {
  preferenciaEmMemoria = id;
  try {
    window.localStorage.setItem(CHAVE_PREFERENCIA, id);
  } catch {
    // localStorage bloqueado — fica só a cópia em memória
  }
  window.dispatchEvent(new Event(EVENTO_TROCA));
}

// Avisa o React quando a preferência muda — nesta aba (EVENTO_TROCA) ou
// em outra aba do site aberta ao mesmo tempo ("storage").
// Sinal de "página pronta": false no HTML do servidor, true depois que o
// React assume a página no navegador (hidratação). Usado pelos testes
// automatizados para não interagir antes da hora — um clique ou campo
// preenchido antes da hidratação é desfeito pelo React.
const nenhumaAssinatura = () => () => {};

function assinarPreferencia(avisar) {
  window.addEventListener(EVENTO_TROCA, avisar);
  window.addEventListener("storage", avisar);
  return () => {
    window.removeEventListener(EVENTO_TROCA, avisar);
    window.removeEventListener("storage", avisar);
  };
}

export default function Home() {
  // Estado central dos filtros ativos
  const [filtros, setFiltros] = useState({ tipo: "", estado: "", mes: "" });

  // useSyncExternalStore: forma do React de ler um valor que mora fora dele
  // (aqui, o localStorage). No servidor não existe localStorage, então lá
  // vale sempre o modo padrão; no navegador, a preferência salva.
  const modoAtual = useSyncExternalStore(assinarPreferencia, lerPreferencia, () => MODO_PADRAO);
  const hidratado = useSyncExternalStore(nenhumaAssinatura, () => true, () => false);

  function aoMudarFiltro(campo, valor) {
    setFiltros((atual) => ({ ...atual, [campo]: valor }));
  }

  // useMemo evita recalcular a lista a cada render — só recalcula
  // quando os filtros mudam. A regra de negócio em si (o que filtra,
  // o que ordena) mora em src/lib/eventos.js, não aqui.
  const eventosFiltrados = useMemo(
    () => eventosVisiveis(eventos, filtros),
    [filtros]
  );

  const { Componente } = MODOS.find((m) => m.id === modoAtual);

  return (
    // display: contents — o div não interfere no layout, só carrega o sinal
    <div data-hidratado={hidratado} style={{ display: "contents" }}>
      <Componente
        eventos={eventosFiltrados}
        filtros={filtros}
        aoMudar={aoMudarFiltro}
        visualizacao={{ modos: MODOS, atual: modoAtual, aoMudar: salvarPreferencia }}
      />
    </div>
  );
}

