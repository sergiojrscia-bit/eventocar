// Temas de cores que o visitante pode escolher (RF14).
//
// Cada tema troca a página inteira — fundo, cards, textos, bordas,
// cabeçalho e destaques —, não só a cor de destaque. Todos os layouts usam
// estas variáveis (tokens) e nenhum conhece uma cor fixa, então 5 temas ×
// 3 modos de visualização funcionam sem 15 versões de código.
//
// Este arquivo é a ÚNICA fonte das cores: o CSS de cada tema é gerado daqui
// (cssDosTemas, usado em src/app/layout.js). O contraste de leitura de cada
// tema é verificado automaticamente em tests/temas.spec.js (WCAG AA).
//
// Significado de cada cor:
//   fundo          fundo da página
//   superficie     cards, barra de filtros, campos
//   superficie2    detalhes sobre a superfície (selos, hover)
//   texto          texto principal
//   textoSecundario datas, locais, contadores
//   borda          bordas e divisórias
//   header         cabeçalho e blocos de destaque escuros
//   textoHeader    título sobre o cabeçalho
//   textoHeader2   subtítulo sobre o cabeçalho
//   acento         destaques decorativos (bordas, faixas, botões)
//   acentoTexto    texto/link colorido sobre fundo e superfície
//   acentoClaro    texto colorido sobre o cabeçalho e blocos escuros
//   sobreAcento    texto em cima de um fundo na cor de acento
//   esquema        "light" ou "dark" — avisa o navegador para desenhar
//                  campos nativos (calendário, listas) no tom certo
//
// faixaTipo (fora de "cores"): true mostra a faixa lateral colorida pelo
// tipo do evento nos cards (cores de src/lib/tipos.js), como o card antigo.
export const TEMAS = [
  {
    // Visual de antes dos temas: links azuis e faixa colorida pelo tipo.
    // Único ajuste: cinza do texto secundário um pouco mais escuro que o
    // antigo (#6B7280), que reprovava no contraste WCAG AA (4.39).
    id: "original",
    nome: "Original",
    faixaTipo: true,
    cores: {
      fundo: "#F2F3F1",
      superficie: "#FFFFFF",
      superficie2: "#ECEDEA",
      texto: "#1C1F24",
      textoSecundario: "#646B77",
      borda: "#E2E4E1",
      header: "#1C1F24",
      textoHeader: "#FFFFFF",
      textoHeader2: "#C7C9CC",
      acento: "#FF4D23",
      acentoTexto: "#0066CC",
      acentoClaro: "#FF8A6B",
      sobreAcento: "#121417",
      esquema: "light",
    },
  },
  {
    id: "pista",
    nome: "Laranja pista",
    cores: {
      fundo: "#F2F3F1",
      superficie: "#FFFFFF",
      superficie2: "#ECEDEA",
      texto: "#1C1F24",
      textoSecundario: "#5B626D",
      borda: "#DCDFDA",
      header: "#1C1F24",
      textoHeader: "#FFFFFF",
      textoHeader2: "#C7C9CC",
      acento: "#FF4D23",
      acentoTexto: "#B8330F",
      acentoClaro: "#FF8A6B",
      sobreAcento: "#121417",
      esquema: "light",
    },
  },
  {
    id: "oceano",
    nome: "Azul oceano",
    cores: {
      fundo: "#DCEAF9",
      superficie: "#FFFFFF",
      superficie2: "#E6F0FB",
      texto: "#0B1F3A",
      textoSecundario: "#3D5677",
      borda: "#B9D0EC",
      header: "#0A2A57",
      textoHeader: "#FFFFFF",
      textoHeader2: "#B5CBEA",
      acento: "#1F7AE0",
      acentoTexto: "#1458A6",
      acentoClaro: "#8CC4FF",
      sobreAcento: "#00050D",
      esquema: "light",
    },
  },
  {
    id: "ingles",
    nome: "Verde inglês",
    cores: {
      fundo: "#F1EAD6",
      superficie: "#FFFCF2",
      superficie2: "#F1EAD6",
      texto: "#1D2A1F",
      textoSecundario: "#565C49",
      borda: "#DCCFAE",
      header: "#0E3B27",
      textoHeader: "#F8F1DA",
      textoHeader2: "#C6D6C0",
      acento: "#C9A227",
      acentoTexto: "#775A08",
      acentoClaro: "#EBCB6A",
      sobreAcento: "#1E1906",
      esquema: "light",
    },
  },
  {
    id: "largada",
    nome: "Amarelo largada",
    cores: {
      fundo: "#0D0D0B",
      superficie: "#1B1B17",
      superficie2: "#272720",
      texto: "#F6F4EA",
      textoSecundario: "#B3B0A1",
      borda: "#34342C",
      header: "#000000",
      textoHeader: "#FFFFFF",
      textoHeader2: "#B3B0A1",
      acento: "#FFD100",
      acentoTexto: "#FFD84D",
      acentoClaro: "#FFD84D",
      sobreAcento: "#111000",
      esquema: "dark",
    },
  },
  {
    id: "neon",
    nome: "Rosa neon",
    cores: {
      fundo: "#14082A",
      superficie: "#201042",
      superficie2: "#2B1755",
      texto: "#F5EDFF",
      textoSecundario: "#BCA9DE",
      borda: "#3C2572",
      header: "#0A0317",
      textoHeader: "#FFFFFF",
      textoHeader2: "#C8B5EE",
      acento: "#FF2BD6",
      acentoTexto: "#FF7AE6",
      acentoClaro: "#3DE2FF",
      sobreAcento: "#14082A",
      esquema: "dark",
    },
  },
];

export const TEMA_PADRAO = TEMAS[0].id;

// Onde o tema escolhido fica salvo no navegador (localStorage).
// Trocada de "eventocar:cores" para "eventocar:tema" em 2026-10-03, quando
// o tema padrão passou a ser o Original: escolhas salvas antes disso (feitas
// em testes, com outro padrão) deixam de valer e todos voltam ao Original.
export const CHAVE_TEMA = "eventocar:tema";

// Nome da variável CSS de cada cor. Hífen só antes de letra maiúscula, nunca
// antes de número: textoSecundario -> --cor-texto-secundario,
// textoHeader2 -> --cor-texto-header2 (é esse o nome usado nos estilos;
// tests/temas.spec.js confere que todo nome usado no CSS existe aqui).
function nomeDaVariavel(chave) {
  return "--cor-" + chave.replace(/[A-Z]/g, (letra) => "-" + letra.toLowerCase());
}

/**
 * CSS de todos os temas, aplicado pelo atributo data-tema no <html>.
 * O tema padrão também vale quando não há data-tema nenhum.
 */
export function cssDosTemas() {
  return TEMAS.map((tema, i) => {
    const seletor =
      i === 0 ? `:root, :root[data-tema="${tema.id}"]` : `:root[data-tema="${tema.id}"]`;
    const variaveis = Object.entries(tema.cores)
      .filter(([chave]) => chave !== "esquema")
      .map(([chave, valor]) => `${nomeDaVariavel(chave)}: ${valor};`)
      .join(" ");
    const faixa = tema.faixaTipo ? "4px" : "0px";
    return `${seletor} { ${variaveis} --faixa-tipo: ${faixa}; color-scheme: ${tema.cores.esquema}; }`;
  }).join("\n");
}

/**
 * Script que roda no <head>, ANTES de a página aparecer: aplica o tema
 * salvo no navegador. Sem ele, quem escolheu um tema escuro veria um
 * "piscar" do tema claro padrão a cada visita.
 */
export function scriptTemaInicial(chave) {
  const ids = JSON.stringify(TEMAS.map((t) => t.id));
  return `(function(){try{var t=localStorage.getItem(${JSON.stringify(chave)});if(${ids}.indexOf(t)>-1)document.documentElement.setAttribute("data-tema",t)}catch(e){}})()`;
}
