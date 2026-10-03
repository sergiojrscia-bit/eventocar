import PaginaInstitucional from "@/components/PaginaInstitucional";
import CanalContato from "@/components/CanalContato";

// Política de privacidade (REQ-002 RF06). Descreve SÓ o que o site faz de
// verdade hoje. Quando algo mudar — principalmente a ativação do AdSense —,
// este texto precisa ser atualizado ANTES da mudança ir ao ar.
// Não substitui revisão jurídica: revisar com alguém da área antes de
// publicar o site com anúncios (ver REQ-002, Restrições).

export const metadata = {
  title: "Política de privacidade — EventoCar",
  description:
    "Como o EventoCar trata as informações de quem visita o site: preferências salvas no navegador, conteúdo de terceiros e anúncios.",
};

export default function Privacidade() {
  return (
    <PaginaInstitucional
      atual={null}
      titulo="Política de privacidade"
      intro="Como o EventoCar trata as informações de quem visita o site. Em linguagem simples, e descrevendo só o que o site faz de verdade."
    >
      <p>
        <strong>Última atualização:</strong> 3 de outubro de 2026.
      </p>

      <h2>Resumo</h2>
      <ul>
        <li>O EventoCar não tem cadastro e não pede seu nome, e-mail ou telefone.</li>
        <li>Não usamos ferramentas de análise de visitas.</li>
        <li>Suas preferências de visualização ficam só no seu navegador.</li>
      </ul>

      <h2>O que guardamos no seu navegador</h2>
      <p>
        Guardamos duas preferências no armazenamento local do seu navegador
        (o <code>localStorage</code>), para o site abrir do jeito que você escolheu:
      </p>
      <ul>
        <li>
          a forma de ver a lista de eventos (Agenda, Grade ou Linha do tempo), com o nome{" "}
          <code>eventocar:visualizacao</code>;
        </li>
        <li>
          o tema de cores escolhido, com o nome <code>eventocar:tema</code>.
        </li>
      </ul>
      <p>
        Essas informações ficam só no seu aparelho e não são enviadas para nós. Para apagá-las,
        limpe os dados deste site nas configurações do seu navegador.
      </p>

      <h2>Conteúdo de terceiros</h2>
      <ul>
        <li>
          <strong>Instagram (Meta):</strong> para mostrar a prévia dos posts dos eventos, o site
          carrega um código do Instagram. Ao carregá-lo, a Meta pode receber dados técnicos do seu
          acesso (como endereço IP e tipo de navegador) e usar cookies, conforme a{" "}
          <a href="https://privacycenter.instagram.com/policy" target="_blank" rel="noopener noreferrer">
            política de privacidade do Instagram
          </a>
          . Os links &quot;Ver post&quot; levam ao site do Instagram.
        </li>
        <li>
          <strong>Fontes:</strong> as fontes de texto são servidas pelo próprio EventoCar; seu
          navegador não as baixa de outros sites.
        </li>
        <li>
          <strong>Hospedagem:</strong> o serviço que hospeda o site pode registrar dados técnicos
          de acesso (como endereço IP, data e página visitada), para segurança e funcionamento.
        </li>
      </ul>

      <h2>Anúncios</h2>
      <p>
        Hoje o EventoCar não exibe anúncios. Quando passar a exibir, eles serão fornecidos pelo
        Google AdSense, que pode usar cookies para mostrar anúncios, inclusive personalizados
        conforme seus interesses. Esta política será atualizada antes disso, explicando como
        funciona e como desativar a personalização.
      </p>

      <h2>Seus direitos</h2>
      <p>
        A Lei Geral de Proteção de Dados (LGPD, Lei nº 13.709/2018) garante a você, entre outros,
        o direito de saber se seus dados são tratados, acessá-los, corrigi-los e pedir que sejam
        excluídos.
      </p>
      <p>
        Como o EventoCar não guarda dados pessoais em servidor próprio, as preferências descritas
        acima podem ser apagadas por você mesmo, no navegador. Para dados tratados por terceiros
        (como a Meta), use também os canais deles. Para qualquer dúvida, fale com a gente.
      </p>

      <h2>Contato</h2>
      <CanalContato />

      <h2>Mudanças nesta política</h2>
      <p>
        Atualizamos esta página sempre que o site mudar a forma de tratar informações. A data da
        última atualização fica no topo.
      </p>
    </PaginaInstitucional>
  );
}
