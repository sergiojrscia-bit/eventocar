import styles from "./EspacoAnuncio.module.css";

// Espaço reservado para um anúncio do Google AdSense.
//
// Regras que valem para todos os formatos:
// - o anúncio tem uma área SÓ DELE no fluxo da página: nunca fica por cima do
//   conteúdo (nada de position: fixed/absolute) e nada fica por cima dele;
// - a altura já nasce reservada, para a página não "pular" quando o anúncio
//   carregar (CLS — layout shift, que pesa no ranking do Google);
// - sempre com o rótulo "Publicidade", exigido pela política do AdSense.
//
// Enquanto o AdSense não está ativo (decisão de 2026-07-12: só junto com o
// plano Pro da Vercel), o espaço aparece como caixa tracejada apenas em
// desenvolvimento, e não ocupa nada no site publicado.
const FORMATOS = {
  lateral: "300 × 600",
  retangulo: "300 × 250",
  horizontal: "728 × 90 (celular: 320 × 100)",
  infeed: "Na lista (responsivo)",
};

export default function EspacoAnuncio({ formato, className = "" }) {
  if (process.env.NODE_ENV === "production") return null;

  return (
    <aside
      data-testid="espaco-anuncio"
      aria-label="Publicidade"
      className={`${styles.espaco} ${styles[formato]} ${className}`}
    >
      <span className={styles.rotulo}>Publicidade</span>
      <span className={styles.medida}>{FORMATOS[formato]}</span>
    </aside>
  );
}
