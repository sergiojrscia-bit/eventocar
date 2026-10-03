import Link from "next/link";
import { LINKS_RODAPE } from "@/lib/site";
import styles from "./Rodape.module.css";

// Conteúdo do rodapé, igual em todas as páginas: frase do site e links
// para Sobre, Contato e Privacidade (REQ-002 RF03). Cada layout decide o
// fundo e a cor do rodapé; os links herdam a cor do texto dele.
export default function ConteudoRodape() {
  return (
    <>
      <p>EventoCar — feito por entusiastas, para entusiastas.</p>
      <nav aria-label="Links do rodapé" className={styles.links}>
        {LINKS_RODAPE.map((link) => (
          <Link key={link.id} href={link.href} className={styles.link}>
            {link.nome}
          </Link>
        ))}
      </nav>
    </>
  );
}
