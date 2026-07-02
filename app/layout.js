import { Inter, Oswald, JetBrains_Mono } from "next/font/google";
import "./globals.css";

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
    <html
      lang="pt-BR"
      className={`${inter.variable} ${oswald.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}