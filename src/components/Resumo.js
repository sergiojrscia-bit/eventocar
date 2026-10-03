// Pedaços de texto repetidos em todos os layouts.

export function Contador({ total, className }) {
  return (
    <p data-testid="contador-eventos" className={className}>
      {total} {total === 1 ? "evento encontrado" : "eventos encontrados"}
    </p>
  );
}

export function MensagemVazia({ className }) {
  return (
    <p data-testid="mensagem-vazio" className={className}>
      Nenhum evento encontrado para os filtros selecionados.
    </p>
  );
}

export function TextoRodape() {
  return <p>EventoCar — feito por entusiastas, para entusiastas.</p>;
}
