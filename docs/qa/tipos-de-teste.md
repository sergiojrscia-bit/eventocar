---
title: Tipos de Teste
parent: QA
nav_order: 5
---

# 🧪 Tipos de Teste — Guia de Referência do EventoCar

> Este arquivo é um **guia de consulta**, não um template de execução.
> Ele existe pra responder uma pergunta recorrente: "chegou uma demanda nova,
> quais tipos de teste fazem sentido aplicar aqui, e por quê?"
>
> Os templates de execução (`template-caso-de-teste.md`, `template-teste-automatizado.md`
> etc.) continuam sendo o lugar onde o teste em si é documentado. Este arquivo
> é o "mapa" que ajuda a decidir qual caminho seguir antes de preencher o template.

---

## Como usar este guia

Quando uma feature nova (ou um bug) chegar pro papel de QA:

1. Ler a lista rápida abaixo e marcar mentalmente quais tipos parecem relevantes
2. Ler a seção detalhada de cada tipo marcado, pra confirmar o "porquê"
3. Registrar a decisão no caso de teste ou no changelog ("testamos X e Y porque...")

---

## Lista rápida

| Tipo | Aplica-se hoje no EventoCar? | Quando usar |
|------|:---:|-------------|
| [Teste Manual](#teste-manual) | ✅ Sim | Sempre, como primeira camada — qualquer feature nova |
| [Teste Automatizado E2E (Playwright)](#teste-automatizado-e2e) | ✅ Sim | Fluxos críticos que se repetem (filtros, listagem) |
| [Teste Unitário](#teste-unitário) | ✅ Sim | Funções isoladas com lógica própria (ex: `lib/tipos.js`) |
| [Teste de Regressão](#teste-de-regressão) | ✅ Sim | Sempre que algo já existente pode ter sido afetado |
| [Teste de Usabilidade](#teste-de-usabilidade) | ✅ Sim | Fluxos que o usuário final vai navegar sozinho |
| [Teste de Segurança](#teste-de-segurança) | ⚠️ Versão básica | Formulários, inputs, scripts de terceiros (AdSense) |
| [Teste de Carga/Stress](#teste-de-cargastress) | ❌ Não aplicável ainda | Quando existir backend/API próprio recebendo tráfego |
| [Heurísticas de Teste](#heurísticas-de-teste) | ✅ Sim | Apoio mental pra qualquer teste manual ou de usabilidade |

---

## Teste Manual

**O que é:** uma pessoa executa a feature seguindo passos definidos e compara o resultado
com o esperado, sem nenhum script fazendo isso por ela.

**Analogia:** é como revisar um texto lendo linha por linha — mais lento que um corretor
automático, mas você percebe coisas que um corretor não pega, como "essa frase não faz
sentido nesse contexto".

**No nosso projeto:** é a base de tudo. Documentado no `template-caso-de-teste.md`. Usamos
pra validar critérios de aceite de HUs/REQs antes de considerar a feature pronta — foi
assim que a página inicial (HU-001) foi validada visualmente.

**Referência:** não existe uma "fonte oficial única" pra teste manual — é a prática padrão
da indústria, coberta em qualquer material introdutório de QA/ISTQB (International Software
Testing Qualifications Board).

---

## Teste Automatizado E2E

**O que é:** um script controla um navegador de verdade e simula o que uma pessoa faria
— clicar, digitar, navegar — verificando se o resultado final bate com o esperado. "E2E"
significa "end-to-end" (ponta a ponta): testa o fluxo completo, não uma função isolada.

**Analogia:** é o "boneco de crash test" da fábrica de carros — em vez de um engenheiro
sentar no carro toda vez, um sistema automatizado repete o mesmo teste de colisão
centenas de vezes, sempre igual, sem cansar.

**No nosso projeto:** já decidido — usamos **Playwright**. Documentado no
`template-teste-automatizado.md`. Faz sentido pra fluxos que vamos repetir toda vez que
mexermos no código (ex: "os filtros combinados ainda retornam os eventos certos?"),
porque rodar isso manualmente toda entrega seria repetitivo e sujeito a erro humano.

**Referência:** [Documentação oficial do Playwright](https://playwright.dev/) — cobre
instalação, escrita de testes, seletores e boas práticas.

---

## Teste Unitário

**O que é:** testa uma função ou pedaço pequeno de código isoladamente, sem depender da
interface inteira ou do navegador — geralmente roda em milissegundos.

**Analogia:** antes de testar se um carro anda, você testa se o motor liga sozinho, fora
do carro, na bancada. Se o motor não liga na bancada, nem adianta montar o carro inteiro
pra descobrir isso.

**No nosso projeto:** ainda não implementado formalmente, mas já identificamos onde faz
sentido: `lib/tipos.js` tem lógica própria (associação de cores por tipo de evento, lista
de UFs) que pode ser testada isoladamente, sem precisar abrir o navegador. Diferente do
E2E, um teste unitário não usa Playwright — normalmente usaria uma ferramenta como Jest
ou o test runner nativo do Node.

**Referência:** não há uma ferramenta específica decidida ainda pro EventoCar — fica como
decisão técnica em aberto pro papel de Dev quando a lógica isolada crescer o suficiente
pra justificar.

---

## Teste de Regressão

**O que é:** não é uma ferramenta ou técnica nova — é uma **prática**: sempre que algo
muda no código, testar de novo o que já funcionava, pra garantir que a mudança não
quebrou nada que estava ok antes.

**Analogia:** é como, depois de trocar o pneu do carro, testar não só se o pneu novo
está bom, mas também se o freio, o painel e o rádio continuam funcionando — porque às
vezes mexer numa coisa desconfigura outra sem querer.

**No nosso projeto:** toda vez que uma feature nova mexer em código que já existe (ex:
adicionar um novo filtro pode afetar a lógica dos filtros existentes), o teste de
regressão é rodar de novo os casos de teste e os testes Playwright das features
antigas relacionadas, não só da nova. O `checklist-entrega.md` já tem esse espírito
("todos os casos de teste passaram?") — regressão é garantir que isso inclui os
antigos, não só o novo.

**Referência:** conceito coberto em qualquer glossário de QA/ISTQB; não há uma fonte
única a linkar.

---

## Teste de Usabilidade

**O que é:** avalia se uma pessoa real consegue usar a interface pra atingir um objetivo,
sem travar, sem confundir, sem precisar de ajuda externa. Diferente dos outros tipos,
normalmente não tem um "passou/falhou" automático — é observacional.

**Analogia:** é a diferença entre "o carro tem todos os botões funcionando" (funcional)
e "uma pessoa dirigindo pela primeira vez acha o botão do farol sem procurar no manual"
(usabilidade). O carro pode passar no primeiro teste e falhar feio no segundo.

**No nosso projeto:** muito relevante, porque o valor do EventoCar depende de "o
entusiasta encontra o evento que quer rápido". Na prática, com equipe pequena, a versão
realista disso é: dar uma tarefa concreta pra 1-2 pessoas de fora sem explicação prévia
(ex: "ache um Track Day em SC em julho") e observar onde elas hesitam; ou revisitar a
interface "com olhos de visitante" depois de um tempo longe dela.

**Referência:** [10 Usability Heuristics for User Interface Design — Nielsen Norman Group](https://www.nngroup.com/articles/ten-usability-heuristics/)
— referência padrão da indústria de UX, usada tanto pra avaliação heurística quanto
como checklist de usabilidade prática.

---

## Teste de Segurança

**O que é:** verifica se o sistema resiste a tentativas de uso malicioso — não só "será
que funciona?", mas "será que alguém consegue abusar disso?".

**Analogia:** teste funcional pergunta "a porta abre?". Teste de segurança pergunta
"alguém consegue arrombar essa porta, ou entrar por uma janela que a gente esqueceu de
trancar?".

**No nosso projeto:** superfície de ataque baixa hoje (sem login, sem dado sensível,
sem pagamento), mas não é zero: o formulário de sugestão de eventos (backlog) e os
scripts de terceiros do AdSense são os pontos de atenção. Não faz sentido aplicar o
pacote completo de pentest agora — a versão proporcional ao nosso estágio é: sanitizar
qualquer input de formulário (evitar XSS — injeção de código malicioso via campo de
texto), garantir HTTPS (já é RNF05), e revisar o que os scripts de terceiros (AdSense)
têm permissão de fazer na página.

**Referência:** [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
— guia de referência da indústria pra teste de segurança web; usar como consulta pontual
(ex: seção de "Input Validation Testing"), não como checklist completo neste estágio.

---

## Teste de Carga/Stress

**O que é:** teste de carga verifica como o sistema se comporta com um volume de acesso
esperado (ex: "aguenta 500 pessoas acessando ao mesmo tempo?"). Teste de stress é a
versão mais extrema: aumentar a carga até o sistema quebrar, pra saber onde está o limite.

**Analogia:** teste de carga é lotar o estacionamento do evento até a capacidade prevista
e ver se o fluxo de carros continua tranquilo. Teste de stress é continuar enchendo além
da capacidade, de propósito, pra ver em que ponto vira um caos — e aprender com isso.

**No nosso projeto:** ❌ **não aplicável agora.** O EventoCar hoje é majoritariamente um
site estático (SSG/SSR do Next.js) servido pela Vercel, sem backend próprio recebendo
requisições diretas — a infraestrutura de hospedagem já absorve boa parte da variação de
tráfego. Isso muda quando:
- o formulário de sugestão de eventos gravar em um backend/banco próprio, ou
- os dados saírem do `eventos.json` local e virarem uma API própria

**Gatilho de revisão:** revisitar esta seção quando qualquer um dos dois pontos acima
acontecer.

**Referência:** [Grafana k6 — ferramenta de teste de carga open source](https://grafana.com/oss/k6/)
— quando chegar a hora, é a ferramenta mais indicada pra começar (scripts em
JavaScript, documentação em português disponível em blogs da comunidade).

---

## Heurísticas de Teste

**O que é:** heurísticas não são "um tipo de teste" — são atalhos mentais, perguntas
rápidas que ajudam a pensar no que testar manualmente *antes* de escrever um caso de
teste formal. Servem tanto pra teste funcional quanto pra usabilidade.

**Analogia:** é a diferença entre um cozinheiro experiente que prova a comida em pontos
estratégicos enquanto cozinha (heurística: "sal já entrou? textura tá certa?") e alguém
que só segue a receita ao pé da letra sem questionar nada no meio do processo.

**Checklist prático pra aplicar no EventoCar:**
- **Valor vazio/ausente:** o que acontece se um evento não tiver "valor do ingresso"? (já
  coberto no REQ-001 — RF08 trata isso como opcional)
- **Extremos de data:** evento cadastrado pra hoje aparece? E pra amanhã, e pro último dia
  do mês?
- **Combinação sem resultado:** filtro que não bate com nenhum evento mostra a mensagem
  certa? (RF07)
- **Navegação "errada":** o que acontece se o usuário voltar no navegador depois de
  filtrar? Os filtros se mantêm ou resetam?
- **Tela pequena:** o texto quebra, o botão fica clicável, nada fica cortado em 375px?
  (RNF02)
- **Zero e um:** o que acontece com zero eventos cadastrados? E com só um?

**Referência:** as heurísticas acima são uma adaptação livre, aplicada ao nosso contexto,
inspirada no espírito das [10 Usability Heuristics da Nielsen Norman Group](https://www.nngroup.com/articles/ten-usability-heuristics/)
e em heurísticas clássicas de teste funcional como o mnemônico **CRUD** (Create, Read,
Update, Delete) e **valores-limite/valores extremos**, comuns em qualquer curso introdutório
de QA.

---

## Histórico de Alterações

| Data | Autor | O que mudou |
|------|-------|-------------|
| 2026-07-02 | QA | Criação do guia — 8 tipos de teste mapeados pro contexto do EventoCar |
