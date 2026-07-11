"use client";

import { useState, useMemo } from "react";
import eventos from "@/data/eventos.json";
import EventCard from "@/components/EventCard";
import Filtros from "@/components/Filtros";
import styles from "./page.module.css";

export default function Home() {
  // Estado central dos filtros ativos
  const [filtros, setFiltros] = useState({ tipo: "", estado: "", mes: "" });

  function aoMudarFiltro(campo, valor) {
    setFiltros((atual) => ({ ...atual, [campo]: valor }));
  }

  // useMemo evita recalcular a lista a cada render — só recalcula
  // quando os filtros mudam
  const eventosFiltrados = useMemo(() => {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    return eventos
      .filter((evento) => new Date(evento.data + "T00:00:00") >= hoje) // RF09
      .filter((evento) => !filtros.tipo || evento.tipo === filtros.tipo)
      .filter((evento) => !filtros.estado || evento.estado === filtros.estado)
      .filter((evento) => !filtros.mes || evento.data.startsWith(filtros.mes))
      .sort((a, b) => a.data.localeCompare(b.data)); // mais próximos primeiro
  }, [filtros]);

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