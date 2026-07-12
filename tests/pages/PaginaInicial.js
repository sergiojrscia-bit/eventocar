// Page Object da página inicial (Page Object Model).
//
// Esta é a ÚNICA camada que conhece Playwright de verdade: seletores
// (data-testid), cliques, preenchimento de campo. O arquivo de teste
// (pagina-inicial.spec.js) não deve ter nenhum seletor bruto — só chama
// os métodos daqui.
//
// Por quê: se um dia trocarmos o Playwright por outra ferramenta (Cypress,
// Robot Framework etc.), só este arquivo precisa ser reescrito. Os cenários
// e os critérios de aceite continuam valendo do jeito que estão.
//
// Decisão técnica completa em:
// docs/dev/brainstorms/2026-07-11-separar-automacao-page-object-bdd.md

export class PaginaInicial {
  constructor(page) {
    this.page = page;
  }

  /** Abre a página inicial. */
  async abrir() {
    await this.page.goto("/");
  }

  /** Muda o tamanho da tela para simular um celular (RNF02). */
  async usarTelaDeCelular() {
    await this.page.setViewportSize({ width: 375, height: 800 });
  }

  /**
   * Começa a escutar erros de console/página. Retorna um array que vai
   * sendo preenchido conforme erros acontecem — chame isso ANTES de abrir().
   */
  escutarErrosDeConsole() {
    const erros = [];
    this.page.on("pageerror", (err) => erros.push(err.message));
    this.page.on("console", (msg) => {
      if (msg.type() === "error") erros.push(msg.text());
    });
    return erros;
  }

  // --- Cards de evento -------------------------------------------------

  cards() {
    return this.page.getByTestId("evento-card");
  }

  primeiroCard() {
    return this.cards().first();
  }

  cardComTexto(texto) {
    return this.cards().filter({ hasText: texto });
  }

  async textoDeTodosOsCards() {
    return this.cards().allTextContents();
  }

  mensagemDeNenhumEventoEncontrado() {
    return this.page.getByTestId("mensagem-vazio");
  }

  // --- Filtros -----------------------------------------------------------

  campoFiltroTipo() {
    return this.page.getByTestId("filtro-tipo");
  }

  campoFiltroEstado() {
    return this.page.getByTestId("filtro-estado");
  }

  campoFiltroMes() {
    return this.page.getByTestId("filtro-mes");
  }

  async selecionarFiltroTipo(tipo) {
    await this.campoFiltroTipo().selectOption(tipo);
  }

  async selecionarFiltroEstado(estado) {
    await this.campoFiltroEstado().selectOption(estado);
  }

  async preencherFiltroMes(mes) {
    await this.campoFiltroMes().fill(mes);
  }

  // --- Cabeçalho e rodapé ------------------------------------------------

  cabecalho() {
    return this.page.getByRole("heading", { name: "EventoCar" });
  }

  rodape() {
    return this.page.getByText("feito por entusiastas");
  }
}
