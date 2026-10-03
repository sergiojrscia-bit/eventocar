import styles from "./SeletorVisualizacao.module.css";

// Ícones simples desenhados em SVG (sem biblioteca), um por modo
const ICONES = {
  agenda: (
    <path d="M3 4h10M3 8h10M3 12h10" />
  ),
  grade: (
    <>
      <rect x="2.5" y="2.5" width="4.5" height="4.5" rx="1" />
      <rect x="9" y="2.5" width="4.5" height="4.5" rx="1" />
      <rect x="2.5" y="9" width="4.5" height="4.5" rx="1" />
      <rect x="9" y="9" width="4.5" height="4.5" rx="1" />
    </>
  ),
  linha: (
    <>
      <path d="M5 2v12" />
      <circle cx="5" cy="4.5" r="1.6" />
      <circle cx="5" cy="11.5" r="1.6" />
      <path d="M8.5 4.5h5M8.5 11.5h5" />
    </>
  ),
};

// "Ver como: Agenda | Grade | Linha do tempo" — o visitante escolhe como
// prefere ver a lista (RF11). Fica na barra de filtros de cada layout.
// "escuro" adapta as cores quando a barra está sobre fundo escuro.
export default function SeletorVisualizacao({ modos, atual, aoMudar, escuro = false }) {
  return (
    <div
      data-testid="seletor-visualizacao"
      role="group"
      aria-label="Ver eventos como"
      className={`${styles.seletor} ${escuro ? styles.escuro : ""}`}
    >
      <span className={styles.rotulo}>Ver como:</span>
      <div className={styles.botoes}>
        {modos.map((modo) => (
          <button
            key={modo.id}
            type="button"
            className={styles.botao}
            aria-pressed={modo.id === atual}
            onClick={() => aoMudar(modo.id)}
          >
            <svg
              viewBox="0 0 16 16"
              width="16"
              height="16"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              {ICONES[modo.id]}
            </svg>
            {modo.nome}
          </button>
        ))}
      </div>
    </div>
  );
}
