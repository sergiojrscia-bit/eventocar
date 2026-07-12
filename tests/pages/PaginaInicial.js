// Page Object da página inicial (Page Object Model).
//
// Esta é a ÚNICA camada que conhece Playwright de verdade: seletores
// (data-testid), cliques, preenchimento de campo. O arquivo de teste
// (pagina-inicial.spec.js) não deve ter nenhum seletor bruto — só chama
// os métodos daqui.
//
// Cada ação e cada verificação usa test.step() com um nome em português,
// então o relatório HTML (make test-report) mostra o cenário de negócio,
// não as ações cruas do Playwright ("Select option", "Expect toHaveCount"...).
//
// Por quê: se um dia trocarmos o Playwright por outra ferramenta (Cypress,
// Robot Framework etc.), só este arquivo precisa ser reescrito. Os cenários
// e os critérios de aceite continuam valendo do jeito que estão.
//
// Decisão técnica completa em:
// docs/qa/brainstorms/2026-07-11-separar-automacao-page-object-bdd.md
// docs/qa/brainstorms/2026-07-12-teststep-page-object-relatorio.md

import { test, expect } from "@playwright/test";

export class PaginaInicial {
  constructor(page) {
    this.page = page;
  }

  /** Abre a página inicial. */
  async abrir() {
    await test.step("Abre a página inicial", async () => {
      await this.page.goto("/");
    });
  }

  /** Muda o tamanho da tela para simular um celular (RNF02). */
  async usarTelaDeCelular() {
    await test.step("Ajusta a tela para simular um celular (375px)", async () => {
      await this.page.setViewportSize({ width: 375, height: 800 });
    });
  }

  /**
   * Começa a escutar erros de console/página. Retorna um array que vai
   * sendo preenchido conforme erros acontecem — chame isso ANTES de abrir().
   * Não usa test.step: é só configuração de escuta, não uma ação do usuário.
   */
  escutarErrosDeConsole() {
    const erros = [];
    this.page.on("pageerror", (err) => erros.push(err.message));
    this.page.on("console", (msg) => {
      if (msg.type() === "error") erros.push(msg.text());
    });
    return erros;
  }

  // --- Cards de evento (getters — sem step, não são ações) --------------

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

  // --- Filtros (ações) ---------------------------------------------------

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
    await test.step(`Seleciona o filtro de tipo "${tipo}"`, async () => {
      await this.campoFiltroTipo().selectOption(tipo);
    });
  }

  async selecionarFiltroEstado(estado) {
    await test.step(`Seleciona o filtro de estado "${estado}"`, async () => {
      await this.campoFiltroEstado().selectOption(estado);
    });
  }

  async preencherFiltroMes(mes) {
    await test.step(`Preenche o filtro de mês com "${mes}"`, async () => {
      await this.campoFiltroMes().fill(mes);
    });
  }

  // --- Cabeçalho e rodapé --------------------------------------------------

  cabecalho() {
    return this.page.getByRole("heading", { name: "EventoCar" });
  }

  rodape() {
    return this.page.getByText("feito por entusiastas");
  }

  // --- Verificações ("Então") — cada uma vira um passo no relatório ------

  async verificarQuantidadeDeCards(quantidadeEsperada) {
    await test.step(`Verifica que aparecem ${quantidadeEsperada} card(s) de evento`, async () => {
      await expect(this.cards()).toHaveCount(quantidadeEsperada);
    });
  }

  async verificarSemErrosNoConsole(erros) {
    await test.step("Verifica que nenhum erro apareceu no console", async () => {
      expect(erros).toEqual([]);
    });
  }

  async verificarPrimeiroCardContemDados(evento) {
    await test.step(`Verifica que o primeiro card mostra os dados de "${evento.nome}"`, async () => {
      const card = this.primeiroCard();
      await expect(card).toContainText(evento.nome);
      await expect(card).toContainText(evento.cidade);
      await expect(card).toContainText(evento.estado);
      await expect(card).toContainText(evento.tipo);
    });
  }

  async verificarOrdemDosCards(esperados) {
    await test.step("Verifica que os cards aparecem ordenados por data", async () => {
      const nomesNaTela = await this.textoDeTodosOsCards();
      esperados.forEach((evento, i) => {
        expect(nomesNaTela[i]).toContain(evento.nome);
      });
    });
  }

  async verificarCardAusente(nomeEvento) {
    await test.step(`Verifica que o evento "${nomeEvento}" não aparece na listagem`, async () => {
      await expect(this.cardComTexto(nomeEvento)).toHaveCount(0);
    });
  }

  async verificarCardVisivelSemTexto(nomeEvento, textoProibido) {
    await test.step(`Verifica que o card de "${nomeEvento}" aparece sem mostrar "${textoProibido}"`, async () => {
      const card = this.cardComTexto(nomeEvento);
      await expect(card).toBeVisible();
      await expect(card).not.toContainText(textoProibido);
    });
  }

  async verificarMensagemDeNenhumEventoVisivel() {
    await test.step("Verifica que a mensagem de nenhum evento encontrado aparece", async () => {
      await expect(this.mensagemDeNenhumEventoEncontrado()).toBeVisible();
    });
  }

  async verificarFiltroTipoVisivel() {
    await test.step("Verifica que o filtro de tipo continua visível", async () => {
      await expect(this.campoFiltroTipo()).toBeVisible();
    });
  }

  async verificarCabecalhoERodapeVisiveis() {
    await test.step("Verifica que o cabeçalho e o rodapé aparecem na página", async () => {
      await expect(this.cabecalho()).toBeVisible();
      await expect(this.rodape()).toBeVisible();
    });
  }
}
