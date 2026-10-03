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

  /**
   * Abre a página inicial e espera o React assumir a página (hidratação).
   * Sem essa espera, um filtro preenchido logo após abrir podia ser desfeito
   * pelo React — causa de falha intermitente no RF05 em 2026-10-03.
   */
  async abrir() {
    await test.step("Abre a página inicial", async () => {
      await this.page.goto("/");
      await this.esperarPaginaPronta();
    });
  }

  async esperarPaginaPronta() {
    await this.page.locator('[data-hidratado="true"]').waitFor({ state: "attached" });
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

  /** Recarrega a página, como quem volta ao site depois (RF11). */
  async recarregar() {
    await test.step("Recarrega a página", async () => {
      await this.page.reload();
      await this.esperarPaginaPronta();
    });
  }

  // --- Visualização (Agenda / Grade / Linha do tempo) — RF11 ------------

  botaoVisualizacao(nome) {
    return this.page.getByTestId("seletor-visualizacao").getByRole("button", { name: nome });
  }

  async selecionarVisualizacao(nome) {
    await test.step(`Escolhe ver os eventos como "${nome}"`, async () => {
      await this.botaoVisualizacao(nome).click();
    });
  }

  async verificarVisualizacaoAtiva(nome) {
    await test.step(`Verifica que a visualização "${nome}" está ativa`, async () => {
      await expect(this.botaoVisualizacao(nome)).toHaveAttribute("aria-pressed", "true");
    });
  }

  /**
   * Confere o HTML que o SERVIDOR devolve (antes de qualquer JavaScript
   * rodar no navegador): ele já precisa vir no modo de visualização salvo,
   * para a página não "piscar" mostrando outro modo primeiro.
   * O pedido usa os mesmos cookies do navegador do teste.
   */
  async verificarModoNoHtmlDoServidor(nome) {
    const ids = { Agenda: "agenda", Grade: "grade", "Linha do tempo": "linha" };
    await test.step(`Verifica que o HTML do servidor já vem no modo "${nome}"`, async () => {
      const resposta = await this.page.request.get("/");
      expect(resposta.ok()).toBe(true);
      expect(await resposta.text()).toContain(`data-modo="${ids[nome]}"`);
    });
  }

  // --- Cores (paletas) — RF14 -------------------------------------------

  botaoCor(nome) {
    return this.page.getByTestId("seletor-cores").getByRole("button", { name: nome });
  }

  async selecionarCor(nome) {
    await test.step(`Escolhe a paleta de cores "${nome}"`, async () => {
      await this.botaoCor(nome).click();
    });
  }

  async verificarCorAtiva(nome) {
    await test.step(`Verifica que o tema "${nome}" está ativo e o nome dele aparece na tela`, async () => {
      await expect(this.botaoCor(nome)).toHaveAttribute("aria-pressed", "true");
      await expect(this.page.getByTestId("nome-tema-ativo")).toHaveText(nome);
    });
  }

  /** Confere a cor de destaque que de fato chegou aos cards. */
  async verificarCorDeDestaqueAplicada(hex) {
    await test.step(`Verifica que a cor de destaque aplicada é ${hex}`, async () => {
      await expect
        .poll(() =>
          this.primeiroCard().evaluate((card) =>
            getComputedStyle(card).getPropertyValue("--cor-acento").trim().toUpperCase()
          )
        )
        .toBe(hex.toUpperCase());
    });
  }

  /**
   * Tema "Original": o primeiro card tem a faixa lateral na cor do tipo do
   * evento (como o card antigo). Nos outros temas, a faixa não aparece.
   */
  async verificarFaixaDoTipoNoPrimeiroCard(corEsperada) {
    const descricao = corEsperada
      ? `Verifica que o primeiro card tem a faixa lateral na cor do tipo (${corEsperada})`
      : "Verifica que o primeiro card não tem faixa lateral do tipo";
    await test.step(descricao, async () => {
      const ler = (nome) =>
        this.primeiroCard().evaluate((card, n) => getComputedStyle(card).getPropertyValue(n).trim(), nome);
      if (corEsperada) {
        await expect.poll(() => ler("--faixa-tipo")).toBe("4px");
        expect((await ler("--cor-tipo")).toUpperCase()).toBe(corEsperada.toUpperCase());
      } else {
        await expect.poll(() => ler("--faixa-tipo")).toBe("0px");
      }
    });
  }

  /**
   * Opções de um filtro (sem a opção "Todos..."), na ordem em que aparecem.
   * Getter — sem step.
   */
  async opcoesDoFiltro(campo) {
    const textos = await campo.locator("option").allTextContents();
    return textos.slice(1); // a primeira é "Todos os tipos" / "Todos os estados"
  }

  async verificarOpcoesDoFiltroTipo(esperadas) {
    await test.step(`Verifica que o filtro de tipo lista só: ${esperadas.join(", ") || "(nenhum)"}`, async () => {
      expect(await this.opcoesDoFiltro(this.campoFiltroTipo())).toEqual(esperadas);
    });
  }

  async verificarOpcoesDoFiltroEstado(esperadas) {
    await test.step(`Verifica que o filtro de estado lista só: ${esperadas.join(", ") || "(nenhum)"}`, async () => {
      expect(await this.opcoesDoFiltro(this.campoFiltroEstado())).toEqual(esperadas);
    });
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

  /**
   * RF13: todo link de post nos cards mostra o site de destino no texto
   * (ex: "instagram.com") e aponta de fato para esse site.
   */
  async verificarLinksMostramDestino(quantidadeEsperada, dominio) {
    await test.step(`Verifica que ${quantidadeEsperada} link(s) de post mostram "${dominio}" e levam até lá`, async () => {
      const links = this.cards().getByRole("link");
      await expect(links).toHaveCount(quantidadeEsperada);
      for (const link of await links.all()) {
        await expect(link).toContainText(dominio);
        const destino = new URL(await link.getAttribute("href"));
        expect(destino.protocol).toBe("https:");
        expect(destino.hostname.replace(/^www\./, "")).toBe(dominio);
      }
    });
  }

  async verificarCabecalhoERodapeVisiveis() {
    await test.step("Verifica que o cabeçalho e o rodapé aparecem na página", async () => {
      await expect(this.cabecalho()).toBeVisible();
      await expect(this.rodape()).toBeVisible();
    });
  }
}
