import { Fragment } from "react";
import Filtros from "@/components/Filtros";
import EspacoAnuncio from "@/components/EspacoAnuncio";
import SeletorVisualizacao from "@/components/SeletorVisualizacao";
import LinkPreview from "@/components/LinkPreview";
import { Contador, MensagemVazia, TextoRodape } from "@/components/Resumo";
import { partesData, textoPeriodo, textoValor } from "@/lib/formatacao";
import styles from "./LayoutGrade.module.css";

// A cada quantos cards entra uma faixa de anúncio
const CARDS_POR_BLOCO = 6;

// Modo de visualização "Grade".
// Cabeçalho grande (tipo "capa") com os filtros dentro dele e grade de cards
// com selo de data. Anúncios: faixa horizontal (728×90) ocupando a largura
// toda ENTRE blocos de cards, e uma no fim da lista.
export default function LayoutGrade({ eventos, filtros, aoMudar, visualizacao }) {
  const blocos = [];
  for (let i = 0; i < eventos.length; i += CARDS_POR_BLOCO) {
    blocos.push(eventos.slice(i, i + CARDS_POR_BLOCO));
  }

  return (
    <div className={styles.pagina}>
      <header className={styles.hero}>
        <div className={styles.heroConteudo}>
          <span className={styles.selo}>Agenda automotiva</span>
          <h1>EventoCar</h1>
          <p>Os próximos eventos de carro, com data, local e valor.</p>
          <div className={styles.controles}>
            <Filtros filtros={filtros} aoMudar={aoMudar} className={styles.filtros} />
            <SeletorVisualizacao {...visualizacao} escuro />
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <Contador total={eventos.length} className={styles.contador} />

        {eventos.length === 0 && <MensagemVazia className={styles.vazio} />}

        {blocos.map((bloco, i) => (
          <Fragment key={i}>
            <div className={styles.grid}>
              {bloco.map((evento) => (
                <CardGrade key={evento.id} evento={evento} />
              ))}
            </div>
            <div className={styles.faixaAnuncio}>
              <EspacoAnuncio formato="horizontal" />
            </div>
          </Fragment>
        ))}
      </main>

      <footer className={styles.footer}>
        <TextoRodape />
      </footer>
    </div>
  );
}

function CardGrade({ evento }) {
  const data = partesData(evento.data);
  const valor = textoValor(evento.valor);

  return (
    <article data-testid="evento-card" className={styles.card}>
      <div className={styles.topo}>
        <div className={styles.data}>
          <span className={styles.dia}>{data.dia}</span>
          <span className={styles.mes}>{data.mes}</span>
        </div>
        <span className={styles.tipo}>{evento.tipo}</span>
      </div>
      <h3 className={styles.nome}>{evento.nome}</h3>
      <p className={styles.detalhe}>{textoPeriodo(evento)}</p>
      <p className={styles.detalhe}>
        {evento.cidade} — {evento.estado}
      </p>
      <div className={styles.rodapeCard}>
        <span className={styles.valor}>{valor ?? "Valor a confirmar"}</span>
        {evento.link && <LinkPreview href={evento.link}>Ver post →</LinkPreview>}
      </div>
    </article>
  );
}
