// Informações gerais do site, usadas no menu, no rodapé e nas páginas
// institucionais (REQ-002). Mudar aqui muda em todas as páginas.

export const SITE = {
  nome: "EventoCar",

  // E-mail dedicado ao site (decisão de 2026-10-03: não usar o e-mail
  // pessoal do dono). Ainda não foi criado: enquanto for null, as páginas
  // Contato e Privacidade avisam que ele será divulgado em breve.
  // Para ativar, troque null pelo endereço, ex: "contato@eventocar.com.br".
  emailContato: null,
};

// Menu do cabeçalho (todas as páginas)
export const LINKS_MENU = [
  { id: "eventos", nome: "Eventos", href: "/" },
  { id: "sobre", nome: "Sobre", href: "/sobre" },
  { id: "contato", nome: "Contato", href: "/contato" },
];

// Links do rodapé (todas as páginas). A política de privacidade fica aqui,
// onde as pessoas costumam procurá-la.
export const LINKS_RODAPE = [
  { id: "sobre", nome: "Sobre", href: "/sobre" },
  { id: "contato", nome: "Contato", href: "/contato" },
  { id: "privacidade", nome: "Privacidade", href: "/privacidade" },
];
