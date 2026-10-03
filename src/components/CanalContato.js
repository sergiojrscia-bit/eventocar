import { SITE } from "@/lib/site";

// Mostra o e-mail de contato do site (src/lib/site.js). Enquanto o e-mail
// dedicado não for criado, avisa que ele será divulgado em breve.
// Usado nas páginas Contato e Privacidade.
export default function CanalContato() {
  if (!SITE.emailContato) {
    return (
      <p data-testid="canal-contato">
        <strong>E-mail de contato:</strong> será divulgado aqui em breve.
      </p>
    );
  }

  return (
    <p data-testid="canal-contato">
      <strong>E-mail de contato:</strong>{" "}
      <a href={`mailto:${SITE.emailContato}`}>{SITE.emailContato}</a>
    </p>
  );
}
