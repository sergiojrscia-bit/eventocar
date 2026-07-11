import styles from "./EventCard.module.css";
import { CORES_TIPO } from "@/lib/tipos";

// Recebe um evento e mostra ele como um card
export default function EventCard({ evento }) {
  const corTipo = CORES_TIPO[evento.tipo] || CORES_TIPO["Outros"];

  // Transforma "2026-07-12" em "12 de julho de 2026"
  const dataFormatada = new Date(
    evento.data + "T00:00:00"
  ).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <article
      data-testid="evento-card"
      className={styles.card}
      style={{ borderLeftColor: corTipo }}
    >
      <span className={styles.tipo} style={{ color: corTipo }}>
        {evento.tipo}
      </span>
      <h3 className={styles.nome}>{evento.nome}</h3>
      <p className={styles.data}>{dataFormatada}</p>
      <p className={styles.local}>
        {evento.cidade} — {evento.estado}
      </p>
      {evento.valor !== null && (
        <p className={styles.valor}>
          {evento.valor === 0 ? "Gratuito" : `R$ ${evento.valor}`}
        </p>
      )}
    </article>
  );
}