"use client";

import { useState, useMemo, useEffect, useSyncExternalStore } from "react";
import dadosInstagram from "@instagram/eventos.json";
import LayoutAgenda from "@/components/layouts/LayoutAgenda";
import LayoutGrade from "@/components/layouts/LayoutGrade";
import LayoutLinhaDoTempo from "@/components/layouts/LayoutLinhaDoTempo";
import { eventosVisiveis } from "@/lib/eventos";
import { converterEventosInstagram } from "@/lib/fonteInstagram";
import { criarPreferencia } from "@/lib/preferencias";
import { TEMAS, TEMA_PADRAO, CHAVE_TEMA } from "@/lib/temas";

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

// Preferências salvas no navegador do visitante (ver src/lib/preferencias.js)
const prefModo = criarPreferencia(
  "eventocar:visualizacao",
  MODOS.map((m) => m.id),
  MODOS[0].id
);
const prefTema = criarPreferencia(
  CHAVE_TEMA,
  TEMAS.map((t) => t.id),
  TEMA_PADRAO
);

// Sinal de "página pronta": false no HTML do servidor, true depois que o
// React assume a página no navegador (hidratação). Usado pelos testes
// automatizados para não interagir antes da hora — um clique ou campo
// preenchido antes da hidratação é desfeito pelo React.
const nenhumaAssinatura = () => () => {};

export default function Home() {
  // Estado central dos filtros ativos
  const [filtros, setFiltros] = useState({ tipo: "", estado: "", mes: "" });

  // useSyncExternalStore: forma do React de ler um valor que mora fora dele
  // (aqui, o localStorage). No servidor não existe localStorage, então lá
  // vale sempre o padrão; no navegador, a preferência salva.
  const modoAtual = useSyncExternalStore(prefModo.assinar, prefModo.ler, () => MODOS[0].id);
  const temaAtual = useSyncExternalStore(prefTema.assinar, prefTema.ler, () => TEMA_PADRAO);
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

  // O tema vale para a página inteira (inclusive o fundo do <body>), por isso
  // fica no <html>. O script do <head> já aplicou o tema salvo antes de a
  // página aparecer; aqui só acompanhamos as trocas feitas pelo visitante.
  // Só depois da hidratação: antes dela, temaAtual ainda vale o padrão do
  // servidor e desfaria o tema que o script aplicou (o "piscar" voltaria).
  useEffect(() => {
    if (hidratado) document.documentElement.setAttribute("data-tema", temaAtual);
  }, [temaAtual, hidratado]);

  const { Componente } = MODOS.find((m) => m.id === modoAtual);

  return (
    // display: contents — o div não interfere no layout, só carrega o sinal
    <div data-hidratado={hidratado} style={{ display: "contents" }}>
      <Componente
        eventos={eventosFiltrados}
        filtros={filtros}
        aoMudar={aoMudarFiltro}
        preferencias={{
          visualizacao: { modos: MODOS, atual: modoAtual, aoMudar: prefModo.salvar },
          cores: { temas: TEMAS, atual: temaAtual, aoMudar: prefTema.salvar },
        }}
      />
    </div>
  );
}
