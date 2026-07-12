"use client";

import { useState, useMemo } from "react";
import eventos from "@/data/eventos.json";
import EventCard from "@/components/EventCard";
import Filtros from "@/components/Filtros";
import { eventosVisiveis } from "@/lib/eventos";
import styles from "./page.module.css";

export default function Home() {
  // Estado central dos filtros ativos
  const [filtros, setFiltros] = useState({ tipo: "", estado: "", mes: "" });

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

  return (
    <div className={styles.pagina}>
      <header className={styles.header}>
        <h1>EventoCar</h1>
        <p>Eventos de carro no Brasil, em um só lugar.</p>
      </header>

      <Filtros filtros={filtros} aoMudar={aoMudarFiltro} />

      <main className={styles.main}>
        {eventosFiltrados.length === 0 ? (
          <p data-testid="mensagem-vazio" className={styles.vazio}>
            Nenhum evento encontrado para os filtros selecionados.
          </p>
        ) : (
          <div className={styles.grid}>
            {eventosFiltrados.map((evento) => (
              <EventCard key={evento.id} evento={evento} />
            ))}
          </div>
        )}
      </main>

      <footer className={styles.footer}>
        <p>EventoCar — feito por entusiastas, para entusiastas.</p>
      </footer>
    </div>
  );
}
