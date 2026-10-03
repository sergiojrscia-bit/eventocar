import { cookies } from "next/headers";
import PaginaEventos from "@/components/PaginaEventos";
import { COOKIE_MODO, modoValido } from "@/lib/modos";

// Página inicial — parte "servidor".
//
// Lê o cookie com o modo de visualização salvo (Agenda, Grade ou Linha do
// tempo) e já entrega a página montada nesse modo, sem "piscar" a Agenda
// antes (RF11). Quem nunca escolheu — e o Google — recebe a Agenda.
//
// Ler cookies faz o Next montar esta página a cada visita (renderização
// dinâmica), em vez de uma vez só no build. Decisão de 2026-10-03.
export default async function Home() {
  const cookieStore = await cookies();
  const modoInicial = modoValido(cookieStore.get(COOKIE_MODO)?.value);

  return <PaginaEventos modoInicial={modoInicial} />;
}
