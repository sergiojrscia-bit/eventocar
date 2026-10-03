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
import styles from "./LayoutAgenda.module.css";

// Modo de visualização "Agenda" (padrão).
// Lista lida como uma agenda: blocos por mês, cada evento em uma linha com a
// data grande à esquerda. Anúncios: coluna lateral fixa no computador
// (300×600) e um bloco entre os meses no celular.
export default function LayoutAgenda({ eventos, filtros, aoMudar, opcoes, preferencias }) {
  const grupos = agruparPorMes(eventos);

  return (
    <div className={styles.pagina}>
      <header className={styles.header}>
        <div className={styles.headerConteudo}>
          <MenuPrincipal atual="eventos" className={styles.menu} />
          <h1>EventoCar</h1>
          <p>Agenda de eventos de carro no Brasil. Encontros, track days, arrancadas e exposições.</p>
        </div>
      </header>

      <div className={styles.barraFiltros}>
        <div className={styles.barraConteudo}>
          <Filtros filtros={filtros} aoMudar={aoMudar} opcoes={opcoes} />
          <Preferencias {...preferencias} />
        </div>
      </div>

      <div className={styles.corpo}>
        <main className={styles.lista}>
          <Contador total={eventos.length} className={styles.contador} />
          {eventos.length === 0 && <MensagemVazia className={styles.vazio} />}

          {grupos.map((grupo, i) => (
            <Fragment key={grupo.chave}>
              <section className={styles.grupo}>
                <h2 className={styles.mes}>{grupo.titulo}</h2>
                {grupo.eventos.map((evento) => (
                  <CardAgenda key={evento.id} evento={evento} />
                ))}
              </section>
              {/* No celular a coluna lateral some; o anúncio entra entre os meses */}
              {i < grupos.length - 1 && (
                <EspacoAnuncio formato="infeed" className={styles.soCelular} />
              )}
            </Fragment>
          ))}
        </main>

        <div className={styles.lateral}>
          <EspacoAnuncio formato="lateral" />
        </div>
      </div>

      <footer className={styles.footer}>
        <ConteudoRodape />
      </footer>
    </div>
  );
}

function CardAgenda({ evento }) {
  const data = partesData(evento.data);
  const valor = textoValor(evento.valor);

  return (
    <article data-testid="evento-card" className={styles.card} style={estiloDoTipo(evento)}>
      <div className={styles.data}>
        <span className={styles.dia}>{data.dia}</span>
        <span className={styles.mesCurto}>{data.mes}</span>
        <span className={styles.semana}>{data.semana}</span>
      </div>
      <div className={styles.info}>
        <span className={styles.tipo}>{evento.tipo}</span>
        <h3 className={styles.nome}>{evento.nome}</h3>
        <p className={styles.detalhe}>
          {textoPeriodo(evento)}
          {evento.horario && ` · ${evento.horario}`}
        </p>
        <p className={styles.detalhe}>
          {evento.local && `${evento.local} · `}
          {evento.cidade} — {evento.estado}
        </p>
      </div>
      <div className={styles.acoes}>
        {valor && <span className={styles.valor}>{valor}</span>}
        {evento.link && <LinkPreview href={evento.link}>Ver post</LinkPreview>}
      </div>
    </article>
  );
}
