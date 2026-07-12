// Teste automatizado da pagina inicial (listagem e filtros de eventos)
// Cobre os mesmos passos ja validados manualmente em
// docs/qa/casos-de-teste/2026-07-05-caso-de-teste-pagina-inicial.md
//
// Como ler este arquivo (mesmo sem programar):
// cada teste tem comentarios "Dado / Quando / Entao" descrevendo o cenario
// em portugues antes do codigo. "Dado" = situacao de partida, "Quando" =
// acao do usuario, "Entao" = o que devia acontecer.
//
// Este arquivo NAO conhece seletor nenhum (data-testid, selectOption etc).
// Quem sabe "como" interagir com a pagina e o Page Object em
// tests/pages/PaginaInicial.js. Se um dia trocarmos o Playwright por outra
// ferramenta, so o Page Object precisa mudar - os cenarios abaixo continuam
// valendo. Decisao completa em
// docs/dev/brainstorms/2026-07-11-separar-automacao-page-object-bdd.md
//
// IMPORTANTE sobre as datas: src/data/eventos.json tem datas fixas. Em vez de
// "chutar" quantos eventos deveriam aparecer, este teste recalcula a lista
// esperada em tempo de execucao com a MESMA funcao eventosVisiveis() usada
// pelo site de verdade (src/lib/eventos.js) - antes essa logica era
// reimplementada aqui, duplicada; agora, se a regra de negocio mudar, o
// teste acompanha sozinho, sem precisar lembrar de atualizar os dois lugares.

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
    // Dado que a pagina inicial vai ser aberta
    const paginaInicial = new PaginaInicial(page);
    const errosConsole = paginaInicial.escutarErrosDeConsole();

    // Quando o usuario abre a pagina inicial
    await paginaInicial.abrir();

    // Entao a quantidade de cards exibidos bate com os eventos visiveis hoje,
    // e nenhum erro aparece no console
    const esperados = eventosVisiveis(eventos, {});
    await expect(paginaInicial.cards()).toHaveCount(esperados.length);
    expect(errosConsole).toEqual([]);
  });

  test("cada card mostra nome, data, cidade, estado e tipo (RF02)", async ({ page }) => {
    // Dado a lista de eventos visiveis hoje
    const paginaInicial = new PaginaInicial(page);
    const esperados = eventosVisiveis(eventos, {});
    test.skip(esperados.length === 0, "Nenhum evento futuro em src/data/eventos.json no momento");

    // Quando o usuario abre a pagina inicial
    await paginaInicial.abrir();

    // Entao o primeiro card mostra nome, cidade, estado e tipo do primeiro evento esperado
    const primeiro = esperados[0];
    const primeiroCard = paginaInicial.primeiroCard();
    await expect(primeiroCard).toContainText(primeiro.nome);
    await expect(primeiroCard).toContainText(primeiro.cidade);
    await expect(primeiroCard).toContainText(primeiro.estado);
    await expect(primeiroCard).toContainText(primeiro.tipo);
  });

  test("eventos aparecem ordenados por data, mais proximos primeiro (RF01)", async ({ page }) => {
    // Dado a lista de eventos visiveis hoje, ja ordenada por data
    const paginaInicial = new PaginaInicial(page);
    const esperados = eventosVisiveis(eventos, {});

    // Quando o usuario abre a pagina inicial
    await paginaInicial.abrir();

    // Entao os cards aparecem na mesma ordem da lista esperada
    const nomesNaTela = await paginaInicial.textoDeTodosOsCards();
    esperados.forEach((evento, i) => {
      expect(nomesNaTela[i]).toContain(evento.nome);
    });
  });

  test("eventos com data passada nao aparecem na listagem (RF09)", async ({ page }) => {
    // Dado que existem eventos com data anterior a hoje nos dados de exemplo
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

    // Quando o usuario abre a pagina inicial
    await paginaInicial.abrir();

    // Entao nenhum evento passado aparece na listagem
    for (const evento of eventosPassados) {
      await expect(paginaInicial.cardComTexto(evento.nome)).toHaveCount(0);
    }
  });

  test("evento sem valor de ingresso nao quebra o card (RF08)", async ({ page }) => {
    // Dado um evento visivel hoje que nao tem valor de ingresso cadastrado
    const paginaInicial = new PaginaInicial(page);
    const semValor = eventosVisiveis(eventos, {}).find((evento) => evento.valor === null);
    test.skip(!semValor, "Nenhum evento futuro sem valor em src/data/eventos.json no momento");

    // Quando o usuario abre a pagina inicial
    await paginaInicial.abrir();

    // Entao o card desse evento aparece normalmente, sem mostrar "undefined"
    const card = paginaInicial.cardComTexto(semValor.nome);
    await expect(card).toBeVisible();
    await expect(card).not.toContainText("undefined");
  });

  test("filtro por tipo mostra somente eventos do tipo selecionado (RF03)", async ({ page }) => {
    // Dado a pagina inicial aberta e um tipo de evento existente nos dados
    const paginaInicial = new PaginaInicial(page);
    await paginaInicial.abrir();
    const tipoAlvo = eventosVisiveis(eventos, {})[0]?.tipo;
    test.skip(!tipoAlvo, "Sem eventos futuros para testar o filtro de tipo");

    // Quando o usuario seleciona esse tipo no filtro
    await paginaInicial.selecionarFiltroTipo(tipoAlvo);

    // Entao so aparecem os eventos daquele tipo
    const esperados = eventosVisiveis(eventos, { tipo: tipoAlvo });
    await expect(paginaInicial.cards()).toHaveCount(esperados.length);
  });

  test("filtro por estado mostra somente eventos do estado selecionado (RF04)", async ({ page }) => {
    // Dado a pagina inicial aberta e um estado existente nos dados
    const paginaInicial = new PaginaInicial(page);
    await paginaInicial.abrir();
    const estadoAlvo = eventosVisiveis(eventos, {})[0]?.estado;
    test.skip(!estadoAlvo, "Sem eventos futuros para testar o filtro de estado");

    // Quando o usuario seleciona esse estado no filtro
    await paginaInicial.selecionarFiltroEstado(estadoAlvo);

    // Entao so aparecem os eventos daquele estado
    const esperados = eventosVisiveis(eventos, { estado: estadoAlvo });
    await expect(paginaInicial.cards()).toHaveCount(esperados.length);
  });

  test("filtro por mes mostra somente eventos do mes selecionado (RF05)", async ({ page }) => {
    // Dado a pagina inicial aberta e um mes com evento existente nos dados
    const paginaInicial = new PaginaInicial(page);
    await paginaInicial.abrir();
    const mesAlvo = eventosVisiveis(eventos, {})[0]?.data.slice(0, 7); // "AAAA-MM"
    test.skip(!mesAlvo, "Sem eventos futuros para testar o filtro de mes");

    // Quando o usuario preenche esse mes no filtro
    await paginaInicial.preencherFiltroMes(mesAlvo);

    // Entao so aparecem os eventos daquele mes
    const esperados = eventosVisiveis(eventos, { mes: mesAlvo });
    await expect(paginaInicial.cards()).toHaveCount(esperados.length);
  });

  test("filtros combinados retornam a intersecao correta (RF06)", async ({ page }) => {
    // Dado a pagina inicial aberta e um evento que define tipo e estado alvo
    const paginaInicial = new PaginaInicial(page);
    await paginaInicial.abrir();
    const base = eventosVisiveis(eventos, {})[0];
    test.skip(!base, "Sem eventos futuros para testar filtros combinados");

    // Quando o usuario seleciona tipo e estado ao mesmo tempo
    await paginaInicial.selecionarFiltroTipo(base.tipo);
    await paginaInicial.selecionarFiltroEstado(base.estado);

    // Entao so aparecem os eventos que atendem os dois filtros ao mesmo tempo
    const esperados = eventosVisiveis(eventos, { tipo: base.tipo, estado: base.estado });
    await expect(paginaInicial.cards()).toHaveCount(esperados.length);
  });

  test("mensagem de nenhum evento encontrado aparece quando o filtro nao bate com nada (RF07)", async ({
    page,
  }) => {
    // Dado a pagina inicial aberta
    const paginaInicial = new PaginaInicial(page);
    await paginaInicial.abrir();

    // Quando o usuario aplica uma combinacao de filtros que nao existe nos dados de exemplo
    await paginaInicial.selecionarFiltroTipo("Clássicos");
    await paginaInicial.preencherFiltroMes("2099-01");

    // Entao a mensagem de "nenhum evento encontrado" aparece, e nenhum card e exibido
    await expect(paginaInicial.mensagemDeNenhumEventoEncontrado()).toBeVisible();
    await expect(paginaInicial.cards()).toHaveCount(0);
  });

  test("layout responsivo em 375px nao corta conteudo (RNF02)", async ({ page }) => {
    // Dado que a tela sera simulada como um celular (375px de largura)
    const paginaInicial = new PaginaInicial(page);
    await paginaInicial.usarTelaDeCelular();

    // Quando o usuario abre a pagina inicial nessa tela
    await paginaInicial.abrir();

    // Entao o filtro de tipo continua visivel e todos os eventos esperados aparecem
    await expect(paginaInicial.campoFiltroTipo()).toBeVisible();
    const esperados = eventosVisiveis(eventos, {});
    await expect(paginaInicial.cards()).toHaveCount(esperados.length);
  });

  test("cabecalho e rodape aparecem na pagina (RF10)", async ({ page }) => {
    // Dado a pagina inicial aberta
    const paginaInicial = new PaginaInicial(page);
    await paginaInicial.abrir();

    // Entao o cabecalho com o nome do site e o rodape aparecem
    await expect(paginaInicial.cabecalho()).toBeVisible();
    await expect(paginaInicial.rodape()).toBeVisible();
  });
});
