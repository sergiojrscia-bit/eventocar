// Page Object da navegação (menu do cabeçalho e links do rodapé) e das
// páginas institucionais: Sobre, Contato e Privacidade (REQ-002).
//
// Mesmo padrão de tests/pages/PaginaInicial.js: é a única camada que
// conhece seletores e ações do Playwright; o arquivo de cenários só chama
// métodos com nome de negócio, e cada método vira um passo no relatório.

import { test, expect } from "@playwright/test";

export class Navegacao {
  constructor(page) {
    this.page = page;
  }

  /** Abre uma página pelo endereço (ex: "/sobre") e espera ela ficar pronta. */
  async abrir(caminho) {
    await test.step(`Abre a página "${caminho}"`, async () => {
      await this.page.goto(caminho);
      await this.page.waitForLoadState("load");
    });
  }

  async usarTelaDeCelular() {
    await test.step("Ajusta a tela para simular um celular (375px)", async () => {
      await this.page.setViewportSize({ width: 375, height: 800 });
    });
  }

  /** Chame ANTES de abrir(). Retorna o array de erros, preenchido conforme acontecem. */
  escutarErrosDeConsole() {
    const erros = [];
    this.page.on("pageerror", (err) => erros.push(err.message));
    this.page.on("console", (msg) => {
      if (msg.type() === "error") erros.push(msg.text());
    });
    return erros;
  }

  // --- Getters (sem step) ------------------------------------------------

  menu() {
    return this.page.getByRole("navigation", { name: "Menu principal" });
  }

  linkDoMenu(nome) {
    return this.menu().getByRole("link", { name: nome, exact: true });
  }

  linksDoRodape() {
    return this.page.getByRole("navigation", { name: "Links do rodapé" });
  }

  linkDoRodape(nome) {
    return this.linksDoRodape().getByRole("link", { name: nome, exact: true });
  }

  // --- Ações -------------------------------------------------------------

  async clicarNoMenu(nome) {
    await test.step(`Clica em "${nome}" no menu do cabeçalho`, async () => {
      await this.linkDoMenu(nome).click();
    });
  }

  async clicarNoRodape(nome) {
    await test.step(`Clica em "${nome}" no rodapé`, async () => {
      await this.linkDoRodape(nome).click();
    });
  }

  // --- Verificações ------------------------------------------------------

  async verificarItensDoMenu(nomes) {
    await test.step(`Verifica que o menu tem: ${nomes.join(", ")}`, async () => {
      for (const nome of nomes) await expect(this.linkDoMenu(nome)).toBeVisible();
    });
  }

  async verificarLinksDoRodape(nomes) {
    await test.step(`Verifica que o rodapé tem: ${nomes.join(", ")}`, async () => {
      for (const nome of nomes) await expect(this.linkDoRodape(nome)).toBeVisible();
    });
  }

  async verificarEndereco(caminho) {
    await test.step(`Verifica que está no endereço "${caminho}"`, async () => {
      await expect(this.page).toHaveURL((url) => url.pathname === caminho);
    });
  }

  async verificarTituloPrincipal(texto) {
    await test.step(`Verifica que o título principal da página é "${texto}"`, async () => {
      await expect(this.page.getByRole("heading", { level: 1 })).toHaveText(texto);
    });
  }

  async verificarTituloDaAba(texto) {
    await test.step(`Verifica que o título da aba do navegador contém "${texto}"`, async () => {
      await expect(this.page).toHaveTitle(new RegExp(texto));
    });
  }

  async verificarItemAtivoDoMenu(nome) {
    await test.step(`Verifica que "${nome}" está destacado no menu como página atual`, async () => {
      await expect(this.linkDoMenu(nome)).toHaveAttribute("aria-current", "page");
    });
  }

  async verificarSecoes(titulos) {
    await test.step(`Verifica que a página tem as seções: ${titulos.join(", ")}`, async () => {
      for (const titulo of titulos) {
        await expect(this.page.getByRole("heading", { level: 2, name: titulo })).toBeVisible();
      }
    });
  }

  async verificarCanalDeContatoVisivel() {
    await test.step("Verifica que a página informa o canal de contato", async () => {
      await expect(this.page.getByTestId("canal-contato")).toBeVisible();
    });
  }

  async verificarTemaAplicado(idTema, corDeFundo) {
    await test.step(`Verifica que o tema "${idTema}" está aplicado (fundo ${corDeFundo})`, async () => {
      await expect(this.page.locator("html")).toHaveAttribute("data-tema", idTema);
      const fundo = await this.page.evaluate(() =>
        getComputedStyle(document.documentElement).getPropertyValue("--cor-fundo").trim().toUpperCase()
      );
      expect(fundo).toBe(corDeFundo.toUpperCase());
    });
  }

  async verificarSemRolagemHorizontal() {
    await test.step("Verifica que a página não rola para o lado", async () => {
      const larguras = await this.page.evaluate(() => ({
        conteudo: document.documentElement.scrollWidth,
        tela: window.innerWidth,
      }));
      expect(larguras.conteudo).toBeLessThanOrEqual(larguras.tela);
    });
  }

  async verificarSemErrosNoConsole(erros) {
    await test.step("Verifica que nenhum erro apareceu no console", async () => {
      expect(erros).toEqual([]);
    });
  }
}
