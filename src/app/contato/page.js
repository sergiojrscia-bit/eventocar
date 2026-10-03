import PaginaInstitucional from "@/components/PaginaInstitucional";
import CanalContato from "@/components/CanalContato";

// Página Contato (REQ-002 RF05). Contato por e-mail dedicado ao site; sem
// formulário, porque o site não tem servidor próprio para receber mensagens.

export const metadata = {
  title: "Contato — EventoCar",
  description:
    "Fale com o EventoCar para sugerir um evento de carro, corrigir uma informação ou avisar sobre algum problema.",
};

export default function Contato() {
  return (
    <PaginaInstitucional
      atual="contato"
      titulo="Contato"
      intro="Fale com o EventoCar para sugerir um evento, corrigir uma informação ou avisar sobre algum problema."
    >
      <CanalContato />

      <h2>Sobre o que escrever</h2>
      <ul>
        <li>
          <strong>Sugerir um evento:</strong> envie o link do post ou do site do organizador, com
          data e local.
        </li>
        <li>
          <strong>Corrigir uma informação:</strong> diga qual evento e o que mudou (data, horário,
          local ou valor).
        </li>
        <li>
          <strong>Avisar sobre um anúncio estranho:</strong> conte em que página ele apareceu e, se
          puder, mande um print.
        </li>
        <li>
          <strong>Organizadores e parcerias:</strong> se você organiza eventos, fale com a gente
          para manter os seus sempre atualizados.
        </li>
      </ul>

      <h2>Antes de escrever</h2>
      <ul>
        <li>
          O EventoCar não vende ingressos. Compra, troca e reembolso são sempre com o organizador
          do evento.
        </li>
        <li>O EventoCar nunca pede senha, dados de cartão ou qualquer pagamento.</li>
      </ul>
    </PaginaInstitucional>
  );
}
