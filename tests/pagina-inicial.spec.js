// Teste automatizado da pagina inicial (listagem e filtros de eventos)
// Cobre os mesmos passos ja validados manualmente em
// docs/qa/casos-de-teste/2026-07-05-caso-de-teste-pagina-inicial.md
//
// IMPORTANTE sobre as datas: data/eventos.json tem datas fixas. Em vez de
// "chutar" quantos eventos deveriam aparecer, este teste recalcula a lista
// esperada em tempo de execucao (funcao eventosVisiveis), usando a mesma
// logica de filtragem de app/page.js. Isso evita que o teste quebre sozinho
// conforme os eventos de exemplo forem ficando no passado com o tempo.
// Ver observacoes no arquivo de documentacao deste teste (QA) para mais
// detalhes sobre esse limite dos dados de exemplo.

import { test, expect } from "@playwright/test";
import path from "node:path";
import fs from "node:fs";

const eventos = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "data", "eventos.json"), "utf-8")
);

// Reproduz a mesma logica de filtragem de app/page.js, para calcular
// o resultado esperado sem depender de numeros fixos no teste
function eventosVisiveis(lista, filtros = {}) {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  return lista
    .filter((evento) => new Date(evento.data + "T00:00:00") >= hoje) // RF09
    .filter((evento) => !filtros.tipo || evento.tipo === filtros.tipo)
    .filter((evento) => !filtros.estado || evento.estado === filtros.estado)
    .filter((evento) => !filtros.mes || evento.data.startsWith(filtros.mes))
    .sort((a, b) => a.data.localeCompare(b.data));
}

test.describe("Pagina inicial - listagem e filtros de eventos", () => {
  test("carrega sem erros no console e exibe a listagem (RF01)", async ({ page }) => {
    const errosConsole = [];
    page.on("pageerror", (err) => errosConsole.push(err.message));
    page.on("console", (msg) => {
      if (msg.type() === "error") errosConsole.push(msg.text());
    });

    await page.goto("/");

    const esperados = eventosVisiveis(eventos);
    await expect(page.getByTestId("evento-card")).toHaveCount(esperados.length);
    expect(errosConsole).toEqual([]);
  });

  test("cada card mostra nome, data, cidade, estado e tipo (RF02)", async ({ page }) => {
    await page.goto("/");
    const esperados = eventosVisiveis(eventos);
    test.skip(esperados.length === 0, "Nenhum evento futuro em data/eventos.json no momento");

    const primeiro = esperados[0];
    const primeiroCard = page.getByTestId("evento-card").first();
    await expect(primeiroCard).toContainText(primeiro.nome);
    await expect(primeiroCard).toContainText(primeiro.cidade);
    await expect(primeiroCard).toContainText(primeiro.estado);
    await expect(primeiroCard).toContainText(primeiro.tipo);
  });

  test("eventos aparecem ordenados por data, mais proximos primeiro (RF01)", async ({ page }) => {
    await page.goto("/");
    const esperados = eventosVisiveis(eventos);
    const nomesNaTela = await page.getByTestId("evento-card").allTextContents();

    esperados.forEach((evento, i) => {
      expect(nomesNaTela[i]).toContain(evento.nome);
    });
  });

  test("eventos com data passada nao aparecem na listagem (RF09)", async ({ page }) => {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const eventosPassados = eventos.filter(
      (evento) => new Date(evento.data + "T00:00:00") < hoje
    );
    test.skip(
      eventosPassados.length === 0,
      "Nenhum evento com data passada em data/eventos.json no momento - RF09 nao pode ser validado hoje"
    );

    await page.goto("/");
    for (const evento of eventosPassados) {
      await expect(
        page.getByTestId("evento-card").filter({ hasText: evento.nome })
      ).toHaveCount(0);
    }
  });

  test("evento sem valor de ingresso nao quebra o card (RF08)", async ({ page }) => {
    const semValor = eventosVisiveis(eventos).find((evento) => evento.valor === null);
    test.skip(!semValor, "Nenhum evento futuro sem valor em data/eventos.json no momento");

    await page.goto("/");
    const card = page.getByTestId("evento-card").filter({ hasText: semValor.nome });
    await expect(card).toBeVisible();
    await expect(card).not.toContainText("undefined");
  });

  test("filtro por tipo mostra somente eventos do tipo selecionado (RF03)", async ({ page }) => {
    await page.goto("/");
    const tipoAlvo = eventosVisiveis(eventos)[0]?.tipo;
    test.skip(!tipoAlvo, "Sem eventos futuros para testar o filtro de tipo");

    await page.getByTestId("filtro-tipo").selectOption(tipoAlvo);

    const esperados = eventosVisiveis(eventos, { tipo: tipoAlvo });
    await expect(page.getByTestId("evento-card")).toHaveCount(esperados.length);
  });

  test("filtro por estado mostra somente eventos do estado selecionado (RF04)", async ({ page }) => {
    await page.goto("/");
    const estadoAlvo = eventosVisiveis(eventos)[0]?.estado;
    test.skip(!estadoAlvo, "Sem eventos futuros para testar o filtro de estado");

    await page.getByTestId("filtro-estado").selectOption(estadoAlvo);

    const esperados = eventosVisiveis(eventos, { estado: estadoAlvo });
    await expect(page.getByTestId("evento-card")).toHaveCount(esperados.length);
  });

  test("filtro por mes mostra somente eventos do mes selecionado (RF05)", async ({ page }) => {
    await page.goto("/");
    const mesAlvo = eventosVisiveis(eventos)[0]?.data.slice(0, 7); // "AAAA-MM"
    test.skip(!mesAlvo, "Sem eventos futuros para testar o filtro de mes");

    await page.getByTestId("filtro-mes").fill(mesAlvo);

    const esperados = eventosVisiveis(eventos, { mes: mesAlvo });
    await expect(page.getByTestId("evento-card")).toHaveCount(esperados.length);
  });

  test("filtros combinados retornam a intersecao correta (RF06)", async ({ page }) => {
    await page.goto("/");
    const base = eventosVisiveis(eventos)[0];
    test.skip(!base, "Sem eventos futuros para testar filtros combinados");

    await page.getByTestId("filtro-tipo").selectOption(base.tipo);
    await page.getByTestId("filtro-estado").selectOption(base.estado);

    const esperados = eventosVisiveis(eventos, { tipo: base.tipo, estado: base.estado });
    await expect(page.getByTestId("evento-card")).toHaveCount(esperados.length);
  });

  test("mensagem de nenhum evento encontrado aparece quando o filtro nao bate com nada (RF07)", async ({
    page,
  }) => {
    await page.goto("/");
    // Combinacao que nao deve existir nos dados de exemplo atuais
    await page.getByTestId("filtro-tipo").selectOption("Clássicos");
    await page.getByTestId("filtro-mes").fill("2099-01");

    await expect(page.getByTestId("mensagem-vazio")).toBeVisible();
    await expect(page.getByTestId("evento-card")).toHaveCount(0);
  });

  test("layout responsivo em 375px nao corta conteudo (RNF02)", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto("/");

    await expect(page.getByTestId("filtro-tipo")).toBeVisible();
    const esperados = eventosVisiveis(eventos);
    await expect(page.getByTestId("evento-card")).toHaveCount(esperados.length);
  });

  test("cabecalho e rodape aparecem na pagina (RF10)", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "EventoCar" })).toBeVisible();
    await expect(page.getByText("feito por entusiastas")).toBeVisible();
  });
});
