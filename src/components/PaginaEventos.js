"use client";

import { useState, useMemo, useEffect, useSyncExternalStore } from "react";
import dadosInstagram from "@instagram/eventos.json";
import LayoutAgenda from "@/components/layouts/LayoutAgenda";
import LayoutGrade from "@/components/layouts/LayoutGrade";
import LayoutLinhaDoTempo from "@/components/layouts/LayoutLinhaDoTempo";
import { eventosVisiveis, opcoesDosFiltros } from "@/lib/eventos";
import { converterEventosInstagram } from "@/lib/fonteInstagram";
import { salvarModoNoCookie } from "@/lib/modos";
import { criarPreferencia } from "@/lib/preferencias";
import { TEMAS, TEMA_PADRAO, CHAVE_TEMA } from "@/lib/temas";

// Parte "navegador" da página inicial: filtros, troca de modo e de tema.
// A parte "servidor" (src/app/page.js) lê o cookie do modo salvo e entrega
// "modoInicial" — assim a página já chega montada no modo certo.

// Fonte: JSON gerado pelo agente do Instagram (../instagram/eventos.json),
// convertido para o formato que o site usa em src/lib/fonteInstagram.js.
const eventos = converterEventosInstagram(dadosInstagram);

// Os filtros de tipo e estado só listam o que existe na agenda
const opcoes = opcoesDosFiltros(eventos);

// Modos de visualização que o visitante pode escolher (RF11).
// Todos recebem os mesmos dados e filtros — só muda a apresentação.
// Os ids precisam ser os mesmos de IDS_MODOS (src/lib/modos.js).
const MODOS = [
  { id: "agenda", nome: "Agenda", Componente: LayoutAgenda },
  { id: "grade", nome: "Grade", Componente: LayoutGrade },
  { id: "linha", nome: "Linha do tempo", Componente: LayoutLinhaDoTempo },
];

// Tema de cores salvo no navegador (ver src/lib/preferencias.js)
const prefTema = criarPreferencia(
  CHAVE_TEMA,
  TEMAS.map((t) => t.id),
  TEMA_PADRAO
);

// Antes de 2026-10-03 o modo ficava no localStorage com este nome. Agora
// fica num cookie; apagamos a versão antiga para não guardar nada à toa.
const CHAVE_MODO_ANTIGA = "eventocar:visualizacao";

// Sinal de "página pronta": false no HTML do servidor, true depois que o
// React assume a página no navegador (hidratação). Usado pelos testes
// automatizados para não interagir antes da hora — um clique ou campo
// preenchido antes da hidratação é desfeito pelo React.
const nenhumaAssinatura = () => () => {};

export default function PaginaEventos({ modoInicial }) {
  // Estado central dos filtros ativos
  const [filtros, setFiltros] = useState({ tipo: "", estado: "", mes: "" });

  // O modo começa no que o servidor leu do cookie; trocas do visitante
  // atualizam a tela na hora e o cookie para as próximas visitas.
  const [modoAtual, setModoAtual] = useState(modoInicial);

  function aoMudarModo(id) {
    setModoAtual(id);
    salvarModoNoCookie(id);
  }

  // useSyncExternalStore: forma do React de ler um valor que mora fora dele
  // (aqui, o localStorage). No servidor não existe localStorage, então lá
  // vale sempre o padrão; no navegador, a preferência salva.
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

  // Limpeza do modo salvo no formato antigo (localStorage)
  useEffect(() => {
    try {
      window.localStorage.removeItem(CHAVE_MODO_ANTIGA);
    } catch {
      // localStorage bloqueado: não há nada para limpar
    }
  }, []);

  const { Componente } = MODOS.find((m) => m.id === modoAtual);

  return (
    // display: contents — o div não interfere no layout, só carrega os sinais
    // (data-modo também aparece no HTML do servidor — os testes conferem)
    <div data-hidratado={hidratado} data-modo={modoAtual} style={{ display: "contents" }}>
      <Componente
        eventos={eventosFiltrados}
        filtros={filtros}
        aoMudar={aoMudarFiltro}
        opcoes={opcoes}
        preferencias={{
          visualizacao: { modos: MODOS, atual: modoAtual, aoMudar: aoMudarModo },
          cores: { temas: TEMAS, atual: temaAtual, aoMudar: prefTema.salvar },
        }}
      />
    </div>
  );
}
