---
title: Boas Práticas de Dev
parent: Dev
nav_order: 3
---

# 🛠️ Boas Práticas de Dev — EventoCar

> Este arquivo é um **guia de referência**, não um template de execução.
> Ele documenta as práticas de código que seguimos desde já — com foco principal
> em segurança — e por que cada uma importa, com a fonte em que foi baseada.
>
> As decisões técnicas específicas de uma feature continuam indo pro
> `template-decisao-tecnica.md`. Este arquivo é o "código de conduta" que vale
> pra qualquer código novo, independente da feature.

---

## Por que segurança desde já, num site simples?

Hoje o EventoCar não tem login, não tem pagamento, não tem dado sensível de
usuário — é tentador achar que segurança "ainda não se aplica". Mas duas coisas
mudam esse raciocínio:

1. **É mais barato prevenir do que arrumar depois.** Hábito de código se forma cedo;
   é mais fácil manter uma prática desde a primeira linha do que "higienizar" um
   projeto inteiro depois que ele cresceu.
2. **O backlog já aponta pontos de atenção reais:** formulário de sugestão de
   eventos (input de usuário) e integração com Google AdSense (scripts de
   terceiros rodando na nossa página).

---

## Como usar este guia

Antes de escrever código novo que mexe em formulário, variável de ambiente,
dependência nova ou dado sensível, dar uma olhada na seção correspondente
abaixo. Se a prática ainda não existe no projeto, é um bom motivo pra abrir
uma decisão técnica (`template-decisao-tecnica.md`) implementando ela.

---

## Sanitização e validação de input

**A prática:** todo input vindo de usuário (formulário, query string, parâmetro
de URL) precisa ser validado antes de ser usado — nunca confiar que o dado
chegou no formato esperado.

**Por que importa:** é a principal defesa contra XSS (Cross-Site Scripting —
quando alguém injeta código malicioso através de um campo de texto que depois
é exibido pra outros usuários).

**No EventoCar:** ainda não temos formulário nenhum no ar. Mas é a primeira
prática a aplicar quando o formulário de sugestão de eventos (backlog) for
desenvolvido — e vale já adotar `getByRole`/validação de schema (ex: Zod) como
padrão desde o primeiro formulário, em vez de aceitar texto livre sem checagem.

**Baseado em:** [Next.js — Data Security Guide](https://nextjs.org/docs/app/guides/data-security)
(documentação oficial) — reforça que o React já escapa strings por padrão
(proteção básica contra XSS), mas que isso não substitui validação explícita
de input, especialmente em qualquer coisa que vire uma Server Action ou rota
que aceite dado externo.

---

## Variáveis de ambiente e segredos

**A prática:**
- Nenhuma chave, token ou credencial é commitada direto no código
- Segredos ficam em `.env.local` (que já vem no `.gitignore` por padrão do
  `create-next-app`)
- No Next.js, uma variável só fica disponível no navegador se tiver o prefixo
  `NEXT_PUBLIC_` — variáveis sensíveis **nunca** devem usar esse prefixo

**Por que importa:** qualquer variável com `NEXT_PUBLIC_` é embutida no
JavaScript que vai pro navegador — ou seja, qualquer pessoa consegue ver
abrindo o "inspecionar" do navegador. Uma chave de API sensível marcada como
pública por engano fica exposta pra qualquer visitante do site.

**No EventoCar:** relevante já para quando integrarmos o Google AdSense (o
ID do AdSense normalmente é público, mas outras chaves futuras — ex: se
integrarmos alguma API de eventos — não devem ser) e para a configuração de
variáveis na Vercel quando o deploy for configurado.

**Baseado em:** [Next.js — Guides: Environment Variables](https://nextjs.org/docs/pages/guides/environment-variables)
(documentação oficial) — explica a distinção entre variáveis server-only e
`NEXT_PUBLIC_`, e a recomendação de nunca commitar `.env.local`.

---

## Dependências (pacotes do `package.json`)

**A prática:**
- Rodar `npm audit` periodicamente pra checar vulnerabilidades conhecidas nas
  dependências
- Evitar adicionar pacotes sem necessidade real — cada dependência nova é uma
  superfície de risco a mais
- Manter o `package-lock.json` versionado no repositório (já é padrão do
  `create-next-app`), pra garantir que todo mundo (e o deploy) usa exatamente
  as mesmas versões

**Por que importa:** pacotes desatualizados ou abandonados podem carregar
vulnerabilidades conhecidas publicamente — um dos vetores de ataque mais
comuns não é "hackear o código", é explorar uma falha já documentada numa
dependência que ninguém atualizou.

**No EventoCar:** já temos poucas dependências (projeto simples), o que é
bom — mas vale rodar `npm audit` antes de cada entrega maior, especialmente
depois de adicionar qualquer biblioteca nova.

**Baseado em:** [Next.js Security Checklist — Arcjet](https://blog.arcjet.com/next-js-security-checklist/)
— checklist de sete pontos escrito por um time que constrói ferramentas de
segurança para Next.js; o ponto sobre dependências trava versões via
`package-lock.json` e recomenda `npm audit` como alternativa mais simples a
ferramentas pagas de terceiros.

---

## HTTPS

**A prática:** o site só deve ser servido via HTTPS, nunca HTTP puro.

**Por que importa:** sem HTTPS, qualquer dado trafegando entre o navegador do
visitante e o servidor pode ser interceptado ou alterado no meio do caminho.

**No EventoCar:** já registrado como RNF05 no REQ-001. Na prática, isso é
automático quando publicarmos na Vercel (HTTPS vem habilitado por padrão),
mas vale confirmar no checklist de entrega antes de cada publicação.

**Baseado em:** prática padrão da indústria, sem uma fonte única — mas
reforçada tanto pela documentação de segurança do Next.js quanto pelos guias
gerais de OWASP já usados no `docs/qa/tipos-de-teste.md`.

---

## Scripts de terceiros e cabeçalhos de segurança (CSP)

**A prática:** quando um script de terceiro (como o Google AdSense) for
adicionado à página, definir explicitamente quais domínios têm permissão de
rodar código ali, através de uma Content Security Policy (CSP) — em vez de
simplesmente colar o script e confiar.

**Por que importa:** sem CSP, qualquer script de terceiro (ou uma injeção
maliciosa) tem liberdade total pra rodar o que quiser na página. A CSP é uma
"lista de permissões" que limita isso.

**No EventoCar:** ❌ ainda não implementado — não aplicável até o Google
AdSense entrar de fato. **Gatilho de revisão:** aplicar essa prática no
momento em que a integração do AdSense (item do backlog de monetização) for
desenvolvida — não antes, porque uma CSP genérica sem os domínios reais do
AdSense definidos não tem utilidade prática ainda.

**Baseado em:** [Next.js — Data Security Guide](https://nextjs.org/docs/app/guides/data-security)
(documentação oficial, seção de Content Security Policy) e reforçado por
checklists de segurança de terceiros como o [Next.js Security Checklist — Arcjet](https://blog.arcjet.com/next-js-security-checklist/).

---

## ESLint como rede de segurança de qualidade

**A prática:** todo código deve passar no ESLint configurado no projeto antes
de ser considerado pronto — não só formatação, mas os alertas de padrões
arriscados que o linter identifica.

**Por que importa:** já é requisito do projeto (RNF04), mas vale reforçar
aqui porque ferramentas como ESLint pegam erros e padrões arriscados antes
mesmo de virar bug em produção — é a primeira linha de defesa, mais barata
que qualquer teste manual depois.

**No EventoCar:** já configurado desde a inicialização do projeto Next.js.

**Baseado em:** citado como boa prática recorrente em múltiplas fontes de
segurança Next.js pesquisadas — ESLint (junto com Prettier) aparece como
"primeira camada" de detecção de padrões arriscados antes do code review.

---

## Código limpo (qualidade geral, não só segurança)

**A prática:**
- Nomes de variáveis e funções que explicam o que fazem, sem abreviação
  obscura
- Comentários explicando o **porquê** de uma decisão, não só o que o código
  faz (o código já diz o "o quê"; o comentário deve dizer o motivo)
- Componentes pequenos e focados em uma responsabilidade — se um componente
  está fazendo muita coisa, é sinal de quebrar em partes menores

**Por que importa:** código difícil de entender é código difícil de revisar
com segurança — um bug (inclusive de segurança) passa despercebido mais
fácil num código confuso do que num código claro.

**No EventoCar:** já é a prática que vimos seguindo (`components/EventCard.js`,
`components/Filtros.js` como componentes pequenos e focados) — este item
formaliza o que já fazemos, sem mudar nada na prática.

**Baseado em:** prática geral de engenharia de software, sem uma fonte única
específica de Next.js — reforça o que já está registrado nas
"Diretrizes de Documentação" do `SKILL.md` do projeto.

---

## Histórico de Alterações

| Data | Autor | O que mudou |
|------|-------|-------------|
| 2026-07-02 | Dev | Criação do guia — 7 práticas mapeadas, com foco em segurança e fonte documentada para cada uma |
