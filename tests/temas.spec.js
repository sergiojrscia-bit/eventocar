// Verifica a leitura (contraste) de cada tema de cores — RF14.
//
// Não abre navegador: só faz conta com as cores de src/lib/temas.js.
// Regra: WCAG AA, contraste mínimo de 4.5:1 para texto normal. Cada par
// abaixo é uma combinação de texto/fundo que de fato aparece no site.
// Se alguém criar ou mudar um tema com cor ilegível, este teste falha.

import { test, expect } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import { TEMAS, cssDosTemas } from "../src/lib/temas.js";

const CONTRASTE_MINIMO = 4.5;

// Fundo dos cards da Linha do tempo (modo escuro em todos os temas)
const CARD_LINHA_DO_TEMPO = "#1B1E22";

// Luminância relativa de uma cor "#RRGGBB" (fórmula da WCAG)
function luminancia(hex) {
  const [r, g, b] = hex
    .slice(1)
    .match(/../g)
    .map((par) => parseInt(par, 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contraste(cor1, cor2) {
  const [clara, escura] = [luminancia(cor1), luminancia(cor2)].sort((a, b) => b - a);
  return (clara + 0.05) / (escura + 0.05);
}

// [descrição, cor do texto, cor do fundo]
function paresDeLeitura(c) {
  return [
    ["texto sobre o fundo", c.texto, c.fundo],
    ["texto sobre os cards", c.texto, c.superficie],
    ["texto secundário sobre o fundo", c.textoSecundario, c.fundo],
    ["texto secundário sobre os cards", c.textoSecundario, c.superficie],
    ["link/destaque sobre o fundo", c.acentoTexto, c.fundo],
    ["link/destaque sobre os cards", c.acentoTexto, c.superficie],
    ["título sobre o cabeçalho", c.textoHeader, c.header],
    ["subtítulo sobre o cabeçalho", c.textoHeader2, c.header],
    ["destaque claro sobre o cabeçalho", c.acentoClaro, c.header],
    ["destaque claro sobre o card da Linha do tempo", c.acentoClaro, CARD_LINHA_DO_TEMPO],
    ["texto sobre botão na cor de destaque", c.sobreAcento, c.acento],
    ["botão ativo (cores invertidas)", c.superficie, c.texto],
  ];
}

test.describe("Temas de cores - contraste de leitura WCAG AA (RF14)", () => {
  for (const tema of TEMAS) {
    test(`tema "${tema.nome}" tem contraste minimo de ${CONTRASTE_MINIMO}:1 em todos os pares`, () => {
      const reprovados = paresDeLeitura(tema.cores)
        .map(([descricao, frente, fundo]) => [descricao, contraste(frente, fundo)])
        .filter(([, valor]) => valor < CONTRASTE_MINIMO)
        .map(([descricao, valor]) => `${descricao}: ${valor.toFixed(2)}`);

      expect(reprovados, `pares abaixo de ${CONTRASTE_MINIMO}:1`).toEqual([]);
    });
  }
});

// Todo arquivo .css dentro de src/ (procura em subpastas também)
function arquivosCss(pasta) {
  return fs.readdirSync(pasta, { withFileTypes: true }).flatMap((item) => {
    const caminho = path.join(pasta, item.name);
    if (item.isDirectory()) return arquivosCss(caminho);
    return item.name.endsWith(".css") ? [caminho] : [];
  });
}

// --cor-tipo não vem do tema: cada card define a sua (estiloDoTipo, em src/lib/tipos.js)
const DEFINIDAS_FORA_DOS_TEMAS = ["--cor-tipo"];

test.describe("Temas de cores - variaveis usadas nos estilos existem (RF14)", () => {
  test("toda variavel --cor-* usada nos arquivos CSS e definida pelos temas", () => {
    const definidas = new Set(cssDosTemas().match(/--cor-[a-z0-9-]+(?=:)/g));
    const usadas = new Set(
      arquivosCss(path.join(process.cwd(), "src")).flatMap(
        (arquivo) => fs.readFileSync(arquivo, "utf-8").match(/(?<=var\()--cor-[a-z0-9-]+/g) ?? []
      )
    );

    const semDefinicao = [...usadas].filter(
      (nome) => !definidas.has(nome) && !DEFINIDAS_FORA_DOS_TEMAS.includes(nome)
    );

    // Uma variável sem definição faz o navegador herdar a cor do elemento de
    // cima — foi assim que o menu sumiu nas páginas institucionais em 2026-10-03.
    expect(semDefinicao, "variáveis usadas no CSS mas não definidas em src/lib/temas.js").toEqual([]);
  });
});
