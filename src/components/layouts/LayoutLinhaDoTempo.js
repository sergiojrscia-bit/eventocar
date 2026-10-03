import { Fragment } from "react";
import Filtros from "@/components/Filtros";
import EspacoAnuncio from "@/components/EspacoAnuncio";
import Preferencias from "@/components/Preferencias";
import LinkPreview from "@/components/LinkPreview";
import { Contador, MensagemVazia } from "@/components/Resumo";
import MenuPrincipal from "@/components/MenuPrincipal";
import ConteudoRodape from "@/components/Rodape";
import { agruparPorMes } from "@/lib/eventos";
import { partesData, textoPeriodo, textoValor } from "@/lib/formatacao";
import { estiloDoTipo } from "@/lib/tipos";
import styles from "./LayoutLinhaDoTempo.module.css";

// Modo de visualização "Linha do tempo" (tema escuro).
// Uma coluna central estreita, com os eventos pendurados numa linha vertical
// e marcos de mês. Anúncios: um bloco "fora da linha" entre os meses e uma
// faixa horizontal no fim, antes do rodapé — sempre em área própria.
export default function LayoutLinhaDoTempo({ eventos, filtros, aoMudar, opcoes, preferencias }) {
  const grupos = agruparPorMes(eventos);

  return (
    <div className={styles.pagina}>
      <header className={styles.header}>
        <MenuPrincipal atual="eventos" className={styles.menu} />
        <h1>EventoCar</h1>
        <p>O que vem por aí no mundo automotivo</p>
        <Filtros filtros={filtros} aoMudar={aoMudar} opcoes={opcoes} className={styles.filtros} />
        <div className={styles.seletor}>
          <Preferencias {...preferencias} escuro className={styles.preferencias} />
        </div>
        <Contador total={eventos.length} className={styles.contador} />
      </header>

      <main className={styles.main}>
        {eventos.length === 0 && <MensagemVazia className={styles.vazio} />}

        {grupos.map((grupo, i) => (
          <Fragment key={grupo.chave}>
            <section className={styles.grupo}>
              <h2 className={styles.marco}>{grupo.titulo}</h2>
              <ol className={styles.linha}>
                {grupo.eventos.map((evento) => (
                  <li key={evento.id} className={styles.item}>
                    <CardLinha evento={evento} />
                  </li>
                ))}
              </ol>
            </section>
            {i < grupos.length - 1 && (
              <div className={styles.parada}>
                <EspacoAnuncio formato="infeed" />
              </div>
            )}
          </Fragment>
        ))}

        {eventos.length > 0 && (
          <div className={styles.faixaFinal}>
            <EspacoAnuncio formato="horizontal" />
          </div>
        )}
      </main>

      <footer className={styles.footer}>
        <ConteudoRodape />
      </footer>
    </div>
  );
}

function CardLinha({ evento }) {
  const data = partesData(evento.data);
  const valor = textoValor(evento.valor);

  return (
    <article data-testid="evento-card" className={styles.card} style={estiloDoTipo(evento)}>
      <span className={styles.quando}>
        {data.semana} · {data.dia} {data.mes}
      </span>
      <h3 className={styles.nome}>{evento.nome}</h3>
      <p className={styles.detalhe}>
        {evento.tipo} · {evento.cidade} — {evento.estado}
      </p>
      <p className={styles.detalhe}>
        {textoPeriodo(evento)}
        {evento.horario && ` · ${evento.horario}`}
      </p>
      <div className={styles.rodapeCard}>
        {valor && <span className={styles.valor}>{valor}</span>}
        {evento.link && <LinkPreview href={evento.link}>Ver post</LinkPreview>}
      </div>
    </article>
  );
}
