// Teste automatizado da pagina inicial (listagem e filtros de eventos)
// Cobre os mesmos passos ja validados manualmente em
// docs/qa/casos-de-teste/2026-07-05-caso-de-teste-pagina-inicial.md
//
// Como ler este arquivo (mesmo sem programar):
// cada teste chama metodos do Page Object (tests/pages/PaginaInicial.js) que
// ja tem nome de negocio - abrir(), selecionarFiltroTipo(), verificarQuantidadeDeCards()
// etc. O nome de cada metodo aparece como um passo no relatorio HTML
// (make test-report), entao dá pra acompanhar o cenario sem ler o codigo.
//
// Este arquivo NAO conhece seletor nenhum (data-testid, selectOption etc).
// Quem sabe "como" interagir com a pagina e "como" verificar o resultado e
// o Page Object em tests/pages/PaginaInicial.js. Se um dia trocarmos o
// Playwright por outra ferramenta, so o Page Object precisa mudar - os
// cenarios abaixo continuam valendo. Decisao completa em
// docs/qa/brainstorms/2026-07-11-separar-automacao-page-object-bdd.md
// docs/qa/brainstorms/2026-07-12-teststep-page-object-relatorio.md
//
// IMPORTANTE sobre as datas: src/data/eventos.json tem datas fixas. Em vez de
// "chutar" quantos eventos deveriam aparecer, este teste recalcula a lista
// esperada em tempo de execucao com a MESMA funcao eventosVisiveis() usada
// pelo site de verdade (src/lib/eventos.js).

import { test, expect } from "@playwright/test";
import path from "node:path";
import fs from "node:fs";
import { PaginaInicial } from "./pages/PaginaInicial.js";
import { eventosVisiveis } from "../src/lib/eventos.js";

const eventos = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "src", "data", "eventos.json"), "utf-8")
);

test.describe("Pagina inicial - listagem e filtros de eventos", () => {
  test("carrega sem erros no console e exibe a listagem (RF01)", async ({ page }) => {
    const paginaInicial = new PaginaInicial(page);
    const errosConsole = paginaInicial.escutarErrosDeConsole();

    await paginaInicial.abrir();

    const esperados = eventosVisiveis(eventos, {});
    await paginaInicial.verificarQuantidadeDeCards(esperados.length);
    await paginaInicial.verificarSemErrosNoConsole(errosConsole);
  });

  test("cada card mostra nome, data, cidade, estado e tipo (RF02)", async ({ page }) => {
    const paginaInicial = new PaginaInicial(page);
    const esperados = eventosVisiveis(eventos, {});
    test.skip(esperados.length === 0, "Nenhum evento futuro em src/data/eventos.json no momento");

    await paginaInicial.abrir();

    await paginaInicial.verificarPrimeiroCardContemDados(esperados[0]);
  });

  test("eventos aparecem ordenados por data, mais proximos primeiro (RF01)", async ({ page }) => {
    const paginaInicial = new PaginaInicial(page);
    const esperados = eventosVisiveis(eventos, {});

    await paginaInicial.abrir();

    await paginaInicial.verificarOrdemDosCards(esperados);
  });

  test("eventos com data passada nao aparecem na listagem (RF09)", async ({ page }) => {
    const paginaInicial = new PaginaInicial(page);
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const eventosPassados = eventos.filter(
      (evento) => new Date(evento.data + "T00:00:00") < hoje
    );
    test.skip(
      eventosPassados.length === 0,
      "Nenhum evento com data passada em src/data/eventos.json no momento - RF09 nao pode ser validado hoje"
    );

    await paginaInicial.abrir();

    for (const evento of eventosPassados) {
      await paginaInicial.verificarCardAusente(evento.nome);
    }
  });

  test("evento sem valor de ingresso nao quebra o card (RF08)", async ({ page }) => {
    const paginaInicial = new PaginaInicial(page);
    const semValor = eventosVisiveis(eventos, {}).find((evento) => evento.valor === null);
    test.skip(!semValor, "Nenhum evento futuro sem valor em src/data/eventos.json no momento");

    await paginaInicial.abrir();

    await paginaInicial.verificarCardVisivelSemTexto(semValor.nome, "undefined");
  });

  test("filtro por tipo mostra somente eventos do tipo selecionado (RF03)", async ({ page }) => {
    const paginaInicial = new PaginaInicial(page);
    await paginaInicial.abrir();
    const tipoAlvo = eventosVisiveis(eventos, {})[0]?.tipo;
    test.skip(!tipoAlvo, "Sem eventos futuros para testar o filtro de tipo");

    await paginaInicial.selecionarFiltroTipo(tipoAlvo);

    const esperados = eventosVisiveis(eventos, { tipo: tipoAlvo });
    await paginaInicial.verificarQuantidadeDeCards(esperados.length);
  });

  test("filtro por estado mostra somente eventos do estado selecionado (RF04)", async ({ page }) => {
    const paginaInicial = new PaginaInicial(page);
    await paginaInicial.abrir();
    const estadoAlvo = eventosVisiveis(eventos, {})[0]?.estado;
    test.skip(!estadoAlvo, "Sem eventos futuros para testar o filtro de estado");

    await paginaInicial.selecionarFiltroEstado(estadoAlvo);

    const esperados = eventosVisiveis(eventos, { estado: estadoAlvo });
    await paginaInicial.verificarQuantidadeDeCards(esperados.length);
  });

  test("filtro por mes mostra somente eventos do mes selecionado (RF05)", async ({ page }) => {
    const paginaInicial = new PaginaInicial(page);
    await paginaInicial.abrir();
    const mesAlvo = eventosVisiveis(eventos, {})[0]?.data.slice(0, 7); // "AAAA-MM"
    test.skip(!mesAlvo, "Sem eventos futuros para testar o filtro de mes");

    await paginaInicial.preencherFiltroMes(mesAlvo);

    const esperados = eventosVisiveis(eventos, { mes: mesAlvo });
    await paginaInicial.verificarQuantidadeDeCards(esperados.length);
  });

  test("filtros combinados retornam a intersecao correta (RF06)", async ({ page }) => {
    const paginaInicial = new PaginaInicial(page);
    await paginaInicial.abrir();
    const base = eventosVisiveis(eventos, {})[0];
    test.skip(!base, "Sem eventos futuros para testar filtros combinados");

    await paginaInicial.selecionarFiltroTipo(base.tipo);
    await paginaInicial.selecionarFiltroEstado(base.estado);

    const esperados = eventosVisiveis(eventos, { tipo: base.tipo, estado: base.estado });
    await paginaInicial.verificarQuantidadeDeCards(esperados.length);
  });

  test("mensagem de nenhum evento encontrado aparece quando o filtro nao bate com nada (RF07)", async ({
    page,
  }) => {
    const paginaInicial = new PaginaInicial(page);
    await paginaInicial.abrir();

    await paginaInicial.selecionarFiltroTipo("Clássicos");
    await paginaInicial.preencherFiltroMes("2099-01");

    await paginaInicial.verificarMensagemDeNenhumEventoVisivel();
    await paginaInicial.verificarQuantidadeDeCards(0);
  });

  test("layout responsivo em 375px nao corta conteudo (RNF02)", async ({ page }) => {
    const paginaInicial = new PaginaInicial(page);
    await paginaInicial.usarTelaDeCelular();
    await paginaInicial.abrir();

    await paginaInicial.verificarFiltroTipoVisivel();
    const esperados = eventosVisiveis(eventos, {});
    await paginaInicial.verificarQuantidadeDeCards(esperados.length);
  });

  test("cabecalho e rodape aparecem na pagina (RF10)", async ({ page }) => {
    const paginaInicial = new PaginaInicial(page);
    await paginaInicial.abrir();

    await paginaInicial.verificarCabecalhoERodapeVisiveis();
  });
});
