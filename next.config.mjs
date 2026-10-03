import path from "node:path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    // A fonte de eventos fica fora do projeto (C:\Projetos\claude\instagram),
    // e o Turbopack só resolve arquivos dentro do root. Por isso o root sobe
    // um nível, abrangendo eventocar/ e instagram/.
    root: path.join(import.meta.dirname, ".."),
  },
};

export default nextConfig;
