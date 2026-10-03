import styles from "./SeletorCores.module.css";

// "Cores: ● ● ● ● ●" — o visitante escolhe a paleta do site (RF14).
// Cada bolinha mostra três cores do tema: fundo, cabeçalho e a cor dos
// links. O nome do tema é lido por leitores de tela (aria-label) e
// aparece ao passar o mouse (title). O nome do tema ativo fica sempre
// visível ao lado das bolinhas — algumas bolinhas se parecem.
export default function SeletorCores({ temas, atual, aoMudar, escuro = false }) {
  const temaAtivo = temas.find((tema) => tema.id === atual);

  return (
    <div
      data-testid="seletor-cores"
      role="group"
      aria-label="Cores do site"
      className={`${styles.seletor} ${escuro ? styles.escuro : ""}`}
    >
      <span className={styles.rotulo}>Cores:</span>
      <div className={styles.bolinhas}>
        {temas.map((tema) => (
          <button
            key={tema.id}
            type="button"
            className={styles.bolinha}
            aria-label={tema.nome}
            title={tema.nome}
            aria-pressed={tema.id === atual}
            onClick={() => aoMudar(tema.id)}
            style={{
              background: `linear-gradient(135deg, ${tema.cores.fundo} 0 38%, ${tema.cores.header} 38% 66%, ${tema.cores.acentoTexto} 66% 100%)`,
            }}
          />
        ))}
      </div>
      <span data-testid="nome-tema-ativo" className={styles.nomeAtivo}>
        {temaAtivo?.nome}
      </span>
    </div>
  );
}
