/* ============================================================
   QUANTUM AI TRAINEE ALLOCATOR — TYPE DEFINITIONS
   ============================================================ */

/** Uma pergunta da entrevista troll, com exatamente duas opções absurdas. */
export interface Pergunta {
  /** Enunciado da pergunta exibida pela IA. */
  texto: string;
  /** Primeira opção (botão esquerdo / superior). */
  opcaoA: string;
  /** Segunda opção (botão direito / inferior). */
  opcaoB: string;
}

/** Perfil completo e hardcoded de um trainee. */
export interface Trainee {
  /** Identificador único, ex.: "trainee_1". */
  id: string;
  /** Nome exibido na interface. */
  nome_display: string;
  /** Sigla da diretoria (ex.: "DGP"). Só é revelada no card final. */
  sigla: string;
  /** Diretoria real para a qual o trainee SEMPRE será alocado. */
  diretoria_real: string;
  /** Caminho da imagem da diretoria (em /public/assets/diretorias/). */
  imagem_diretoria: string;
  /** Subtítulo flavor exibido no card final. */
  lema: string;
  /** As 4 perguntas exclusivas deste trainee. */
  perguntas: Pergunta[];
}

/** As opções possíveis que o usuário pode clicar. */
export type EscolhaOpcao = 'A' | 'B';

/** Cenas controladas pelo orquestrador global via AnimatePresence. */
export type Cena = 'login' | 'chat' | 'climax' | 'result';

/** Tipos de autor de uma mensagem no chat Sci-Fi. */
export type AutorMensagem = 'ai' | 'user';

/** Uma mensagem renderizada no terminal de chat. */
export interface MensagemChat {
  /** Chave estável para reconciliação do React / Framer Motion. */
  id: string;
  autor: AutorMensagem;
  texto: string;
  /** Quando true, o texto da IA é revelado caractere a caractere. */
  comTypewriter?: boolean;
}
