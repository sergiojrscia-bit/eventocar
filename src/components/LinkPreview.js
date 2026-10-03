"use client";

import { useState, useEffect } from "react";
import styles from "./LinkPreview.module.css";
import { dominioDoLink } from "@/lib/formatacao";

// Mostra um popover com o embed oficial do Instagram ao passar o mouse
// sobre o link. Só funciona para links do Instagram — para outros
// domínios, o link se comporta normalmente, sem prévia.
//
// O link sempre mostra o site de destino (ex: "instagram.com ↗") — quem vê
// sabe para onde vai antes de clicar, e não confunde nosso link com anúncio
// (RF13, decisão de 2026-10-03 sobre confiança nos anúncios).
export default function LinkPreview({ href, children }) {
  const [aberto, setAberto] = useState(false);
  const dominio = dominioDoLink(href);
  const ehInstagram = dominio === "instagram.com";

  useEffect(() => {
    if (!aberto || !ehInstagram) return;

    function processar() {
      if (window.instgrm) {
        window.instgrm.Embeds.process();
        return true;
      }
      return false;
    }

    if (!processar()) {
      const intervalo = setInterval(() => {
        if (processar()) clearInterval(intervalo);
      }, 300);
      return () => clearInterval(intervalo);
    }
  }, [aberto, ehInstagram]);

  return (
    <div
      className={styles.wrapper}
      onMouseEnter={() => setAberto(true)}
      onMouseLeave={() => setAberto(false)}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
      >
        <span className={styles.texto}>{children}</span>
        {dominio && (
          <span className={styles.destino}>
            {dominio}
            <span aria-hidden="true"> ↗</span>
          </span>
        )}
        <span className={styles.somenteLeitor}> (abre em nova aba)</span>
      </a>

      {aberto && ehInstagram && (
        <div className={styles.popover}>
          <blockquote
            className="instagram-media"
            data-instgrm-permalink={href}
            data-instgrm-version="14"
            style={{ margin: 0, width: "100%" }}
          />
        </div>
      )}
    </div>
  );
}
