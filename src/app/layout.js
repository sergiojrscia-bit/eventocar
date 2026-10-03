import { Inter, Oswald, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { cssDosTemas, scriptTemaInicial, CHAVE_TEMA } from "@/lib/temas";

// Fonte do corpo do texto — limpa e legível
const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

// Fonte dos títulos — condensada, remete a numeração de carro de corrida
const oswald = Oswald({
  variable: "--font-heading",
  subsets: ["latin"],
});

// Fonte para datas e valores — remete a um painel de cronômetro
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "EventoCar — Eventos de carro no Brasil",
  description:
    "Encontre eventos automotivos perto de você: encontros, track days, exposições e mais, tudo em um só lugar.",
};

export default function RootLayout({ children }) {
  return (
    // suppressHydrationWarning: o script abaixo pode pôr data-tema no <html>
    // antes de o React assumir a página — diferença esperada, não é erro.
    <html
      lang="pt-BR"
      className={`${inter.variable} ${oswald.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Cores de todos os temas, geradas de src/lib/temas.js (RF14) */}
        <style dangerouslySetInnerHTML={{ __html: cssDosTemas() }} />
        {/* Aplica o tema salvo antes de a página aparecer (sem "piscar") */}
        <script dangerouslySetInnerHTML={{ __html: scriptTemaInicial(CHAVE_TEMA) }} />
      </head>
      <body>
        {children}
        <Script src="https://www.instagram.com/embed.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}