"use client";

import styles from "./Filtros.module.css";

// Barra de filtros: tipo, estado e mês.
// Cada mudança chama "aoMudar", que vem da página e atualiza o estado central.
// "className" deixa cada layout posicionar/estilizar a barra do seu jeito
// (em linha, empilhada, dentro do cabeçalho...).
// "opcoes" traz só os tipos e estados que existem na agenda
// (opcoesDosFiltros, em src/lib/eventos.js).
export default function Filtros({ filtros, aoMudar, opcoes, className = "" }) {
  return (
    <div className={`${styles.barra} ${className}`}>
      <select
        data-testid="filtro-tipo"
        aria-label="Tipo de evento"
        value={filtros.tipo}
        onChange={(e) => aoMudar("tipo", e.target.value)}
      >
        <option value="">Todos os tipos</option>
        {opcoes.tipos.map((tipo) => (
          <option key={tipo} value={tipo}>
            {tipo}
          </option>
        ))}
      </select>

      <select
        data-testid="filtro-estado"
        aria-label="Estado"
        value={filtros.estado}
        onChange={(e) => aoMudar("estado", e.target.value)}
      >
        <option value="">Todos os estados</option>
        {opcoes.estados.map((uf) => (
          <option key={uf} value={uf}>
            {uf}
          </option>
        ))}
      </select>

      <input
        data-testid="filtro-mes"
        aria-label="Mês"
        type="month"
        value={filtros.mes}
        onChange={(e) => aoMudar("mes", e.target.value)}
      />
    </div>
  );
}
