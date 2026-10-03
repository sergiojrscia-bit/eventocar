"use client";

import { useState, useEffect } from "react";
import styles from "./LinkPreview.module.css";

// Mostra um popover com o embed oficial do Instagram ao passar o mouse
// sobre o link. Só funciona para links do Instagram — para outros
// domínios, o link se comporta normalmente, sem prévia.
export default function LinkPreview({ href, children }) {
  const [aberto, setAberto] = useState(false);
  const ehInstagram = href.includes("instagram.com");

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
        {children}
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
