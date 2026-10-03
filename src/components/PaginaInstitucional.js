import Link from "next/link";
import MenuPrincipal from "./MenuPrincipal";
import ConteudoRodape from "./Rodape";
import styles from "./PaginaInstitucional.module.css";

// Moldura comum das páginas institucionais (Sobre, Contato, Privacidade):
// cabeçalho com a marca e o menu, título da página, texto em coluna de
// leitura confortável e rodapé. As cores vêm do tema escolhido (RF14).
//
// "atual" é o id do item do menu a destacar (null na Privacidade, que fica
// só no rodapé). "intro" é a frase curta abaixo do título.
export default function PaginaInstitucional({ atual, titulo, intro, children }) {
  return (
    <div className={styles.pagina}>
      <header className={styles.header}>
        <div className={styles.headerConteudo}>
          <Link href="/" className={styles.marca}>
            EventoCar
          </Link>
          <MenuPrincipal atual={atual} />
        </div>
      </header>

      <main className={styles.main}>
        <article className={styles.texto}>
          <h1>{titulo}</h1>
          {intro && <p className={styles.intro}>{intro}</p>}
          {children}
        </article>
      </main>

      <footer className={styles.footer}>
        <ConteudoRodape />
      </footer>
    </div>
  );
}
