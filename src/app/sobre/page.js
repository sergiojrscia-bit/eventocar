import Link from "next/link";
import PaginaInstitucional from "@/components/PaginaInstitucional";

// Página Sobre (REQ-002 RF04). Fala em nome do "EventoCar", sem nome de
// pessoa (decisão de 2026-10-03). Tom modesto e direto, sem superlativos.

export const metadata = {
  title: "Sobre o EventoCar",
  description:
    "O que é o EventoCar, de onde vêm os eventos de carro da agenda e por que o site pode exibir anúncios.",
};

export default function Sobre() {
  return (
    <PaginaInstitucional
      atual="sobre"
      titulo="Sobre o EventoCar"
      intro="Uma agenda de eventos de carro no Brasil, para você encontrar o próximo encontro sem precisar procurar em vários lugares."
    >
      <h2>O que você encontra aqui</h2>
      <ul>
        <li>Encontros, track days, arrancadas, drift, exposições e feiras.</li>
        <li>Data, local, horário e valor do ingresso, quando o organizador divulga.</li>
        <li>Filtros por tipo de evento, estado e mês.</li>
        <li>
          Três formas de ver a lista (Agenda, Grade e Linha do tempo) e seis temas de cores, que
          ficam salvos no seu navegador.
        </li>
      </ul>

      <h2>De onde vêm os eventos</h2>
      <p>
        Reunimos eventos divulgados publicamente pelos próprios organizadores, principalmente no
        Instagram. Cada evento tem o link <strong>Ver post</strong>, que leva à publicação
        original.
      </p>
      <p>
        Datas, horários e valores podem mudar. Antes de ir, confirme sempre com o organizador.
        Eventos que já terminaram saem da lista automaticamente.
      </p>

      <h2>Encontrou algo errado ou quer sugerir um evento?</h2>
      <p>
        Fale com a gente pela página de <Link href="/contato">Contato</Link>. Correções e
        sugestões ajudam a manter a agenda útil para todo mundo.
      </p>

      <h2>Por que o site pode exibir anúncios</h2>
      <p>
        Os anúncios ajudam a manter o EventoCar gratuito. Eles são exibidos pelo Google, e não
        escolhemos cada anúncio individualmente. Por isso:
      </p>
      <ul>
        <li>todo anúncio fica numa área própria, separado dos eventos, com o rótulo &quot;Publicidade&quot;;</li>
        <li>nossos links mostram para onde levam (por exemplo, instagram.com) antes do clique;</li>
        <li>
          se você vir um anúncio estranho, avise pela página de{" "}
          <Link href="/contato">Contato</Link>.
        </li>
      </ul>

      <h2>Quem faz</h2>
      <p>
        O EventoCar é um projeto independente, feito por entusiastas de carros e de tecnologia.
      </p>
    </PaginaInstitucional>
  );
}
