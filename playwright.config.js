// Configuracao do Playwright para o EventoCar
// Documentacao: https://playwright.dev/docs/test-configuration
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",

  // Roda os testes em paralelo por padrao
  fullyParallel: true,

  // Falha o build se algum teste ficar marcado como .only (evita esquecer no CI)
  forbidOnly: !!process.env.CI,

  // So tenta de novo em ambiente de CI, nao na maquina local
  retries: process.env.CI ? 2 : 0,

  reporter: "html",

  use: {
    // Permite usar page.goto("/") em vez do endereco completo
    baseURL: "http://localhost:3000",

    // Tira print e trace so quando o teste falha, para facilitar o diagnostico
    screenshot: "only-on-failure",
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],

  // Sobe o "npm run dev" automaticamente antes dos testes e derruba no final,
  // assim nao e preciso lembrar de rodar "make dev" numa aba separada antes
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
