import Link from "next/link";
import { LINKS_MENU } from "@/lib/site";
import styles from "./MenuPrincipal.module.css";

// Menu do cabeçalho: Eventos, Sobre e Contato (REQ-002 RF01-RF02).
// "atual" é o id da página aberta: o item dela fica destacado e marcado
// com aria-current="page" (leitores de tela anunciam "página atual").
// O menu sempre fica sobre o cabeçalho, que é escuro em todos os temas.
export default function MenuPrincipal({ atual, className = "" }) {
  return (
    <nav aria-label="Menu principal" className={`${styles.menu} ${className}`}>
      <ul className={styles.lista}>
        {LINKS_MENU.map((link) => (
          <li key={link.id}>
            <Link
              href={link.href}
              className={styles.link}
              aria-current={link.id === atual ? "page" : undefined}
            >
              {link.nome}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
