import SeletorVisualizacao from "./SeletorVisualizacao";
import SeletorCores from "./SeletorCores";
import styles from "./Preferencias.module.css";

// Bloco de preferências do visitante: "Ver como" (RF11) + "Cores" (RF14).
// Cada layout coloca este bloco junto dos filtros; "escuro" adapta as cores
// quando ele fica sobre fundo escuro.
export default function Preferencias({ visualizacao, cores, escuro = false, className = "" }) {
  return (
    <div className={`${styles.preferencias} ${className}`}>
      <SeletorVisualizacao {...visualizacao} escuro={escuro} />
      <SeletorCores {...cores} escuro={escuro} />
    </div>
  );
}
