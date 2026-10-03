// Teste automatizado do menu e das páginas institucionais (REQ-002 / HU-002).
//
// Como ler: cada teste só chama métodos com nome de negócio do Page Object
// (tests/pages/Navegacao.js). Nenhum seletor aparece aqui.

import { test } from "@playwright/test";
import { Navegacao } from "./pages/Navegacao.js";
import { PaginaInicial } from "./pages/PaginaInicial.js";
import { TEMAS } from "../src/lib/temas.js";

const PAGINAS = [
  { caminho: "/sobre", menu: "Sobre", titulo: "Sobre o EventoCar" },
  { caminho: "/contato", menu: "Contato", titulo: "Contato" },
  { caminho: "/privacidade", menu: null, titulo: "Política de privacidade" },
];

test.describe("Menu de navegacao (REQ-002 RF01-RF03)", () => {
  for (const modo of ["Agenda", "Grade", "Linha do tempo"]) {
    test(`na pagina inicial, modo "${modo}", o menu e o rodape tem os links`, async ({ page }) => {
      const paginaInicial = new PaginaInicial(page);
      const navegacao = new Navegacao(page);
      await paginaInicial.abrir();

      await paginaInicial.selecionarVisualizacao(modo);

      await navegacao.verificarItensDoMenu(["Eventos", "Sobre", "Contato"]);
      await navegacao.verificarItemAtivoDoMenu("Eventos");
      await navegacao.verificarLinksDoRodape(["Sobre", "Contato", "Privacidade"]);
    });
  }

  test("clicar em Sobre e depois em Contato no menu leva as paginas certas", async ({ page }) => {
    const paginaInicial = new PaginaInicial(page);
    const navegacao = new Navegacao(page);
    await paginaInicial.abrir();

    await navegacao.clicarNoMenu("Sobre");
    await navegacao.verificarEndereco("/sobre");
    await navegacao.verificarTituloPrincipal("Sobre o EventoCar");
    await navegacao.verificarItemAtivoDoMenu("Sobre");

    await navegacao.clicarNoMenu("Contato");
    await navegacao.verificarEndereco("/contato");
    await navegacao.verificarItemAtivoDoMenu("Contato");
  });

  test("Privacidade fica no rodape e leva a politica de privacidade", async ({ page }) => {
    const paginaInicial = new PaginaInicial(page);
    const navegacao = new Navegacao(page);
    await paginaInicial.abrir();

    await navegacao.clicarNoRodape("Privacidade");

    await navegacao.verificarEndereco("/privacidade");
    await navegacao.verificarTituloPrincipal("Política de privacidade");
  });

  test("Eventos no menu volta para a pagina inicial", async ({ page }) => {
    const navegacao = new Navegacao(page);
    await navegacao.abrir("/sobre");

    await navegacao.clicarNoMenu("Eventos");

    await navegacao.verificarEndereco("/");
  });
});

test.describe("Paginas institucionais (REQ-002 RF04-RF06, RNF01-RNF04)", () => {
  for (const pagina of PAGINAS) {
    test(`${pagina.caminho} tem titulo proprio, menu, rodape e nenhum erro no console`, async ({ page }) => {
      const navegacao = new Navegacao(page);
      const erros = navegacao.escutarErrosDeConsole();

      await navegacao.abrir(pagina.caminho);

      await navegacao.verificarTituloPrincipal(pagina.titulo);
      await navegacao.verificarTituloDaAba(pagina.titulo);
      await navegacao.verificarItensDoMenu(["Eventos", "Sobre", "Contato"]);
      if (pagina.menu) await navegacao.verificarItemAtivoDoMenu(pagina.menu);
      await navegacao.verificarLinksDoRodape(["Sobre", "Contato", "Privacidade"]);
      await navegacao.verificarSemErrosNoConsole(erros);
    });

    test(`${pagina.caminho} funciona no celular sem rolagem horizontal`, async ({ page }) => {
      const navegacao = new Navegacao(page);
      await navegacao.usarTelaDeCelular();

      await navegacao.abrir(pagina.caminho);

      await navegacao.verificarItensDoMenu(["Eventos", "Sobre", "Contato"]);
      await navegacao.verificarSemRolagemHorizontal();
    });
  }

  test("a pagina Contato informa o canal de contato", async ({ page }) => {
    const navegacao = new Navegacao(page);

    await navegacao.abrir("/contato");

    await navegacao.verificarCanalDeContatoVisivel();
  });

  test("a politica de privacidade tem todas as secoes obrigatorias", async ({ page }) => {
    const navegacao = new Navegacao(page);

    await navegacao.abrir("/privacidade");

    await navegacao.verificarSecoes([
      "O que guardamos no seu navegador",
      "Conteúdo de terceiros",
      "Anúncios",
      "Seus direitos",
      "Contato",
    ]);
  });

  test("as paginas institucionais respeitam o tema escolhido na pagina inicial", async ({ page }) => {
    const paginaInicial = new PaginaInicial(page);
    const navegacao = new Navegacao(page);
    const tema = TEMAS.find((t) => t.cores.esquema === "dark");
    await paginaInicial.abrir();
    await paginaInicial.selecionarCor(tema.nome);

    await navegacao.clicarNoMenu("Sobre");

    await navegacao.verificarEndereco("/sobre");
    await navegacao.verificarTemaAplicado(tema.id, tema.cores.fundo);
  });
});
