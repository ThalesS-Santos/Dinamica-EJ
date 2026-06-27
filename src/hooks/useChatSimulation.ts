import { useCallback, useEffect, useRef, useState } from 'react';
import type { EscolhaOpcao, MensagemChat, Pergunta, Trainee } from '../types';
import { buildSaudacao, getReaction } from '../data/aiReactions';

/* ============================================================
   useChatSimulation
   Controla toda a coreografia da entrevista troll:
   - delay de "pensamento" da IA (loader 1.5s) antes de cada fala;
   - fila de saudação -> perguntas -> reações;
   - registro das mensagens do usuário;
   - sinaliza a conclusão após a 4ª resposta.
   ============================================================ */

/** Tempo (ms) que a IA fica "pensando" (loader) antes de cada mensagem. */
const AI_THINKING_MS = 1500;

/** O que a IA está prestes a dizer / dizendo. */
type PendingKind = 'saudacao' | 'pergunta' | 'reacao';

/** Fases da máquina de estados do chat. */
type ChatPhase = 'ai-loading' | 'ai-typing' | 'user-turn' | 'finished';

interface UseChatSimulationOptions {
  trainee: Trainee;
  /** Disparado uma única vez após a 4ª (última) resposta do usuário. */
  onComplete?: () => void;
}

interface UseChatSimulationResult {
  /** Lista completa de mensagens renderizadas no terminal. */
  messages: MensagemChat[];
  /** True enquanto o loader de "digitando" da IA deve aparecer. */
  isAiThinking: boolean;
  /** True quando as duas opções de resposta devem ser exibidas. */
  showOptions: boolean;
  /** A pergunta cujas opções estão ativas (null fora do user-turn). */
  currentQuestion: Pergunta | null;
  /** Índice (0-based) da pergunta atual. */
  questionIndex: number;
  /** Total de perguntas deste trainee. */
  totalQuestions: number;
  /** Registra a escolha do usuário e avança a coreografia. */
  handleUserChoice: (escolha: EscolhaOpcao) => void;
  /**
   * Deve ser chamada pelo componente quando o typewriter da ÚLTIMA
   * mensagem da IA terminar, para sincronizar a próxima etapa.
   */
  onAiTypingComplete: () => void;
}

export function useChatSimulation(
  options: UseChatSimulationOptions,
): UseChatSimulationResult {
  const { trainee, onComplete } = options;
  const perguntas = trainee.perguntas;
  const totalQuestions = perguntas.length;

  const [messages, setMessages] = useState<MensagemChat[]>([]);
  const [phase, setPhase] = useState<ChatPhase>('ai-loading');
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [pendingKind, setPendingKind] = useState<PendingKind>('saudacao');
  const [pendingReactionIndex, setPendingReactionIndex] = useState<number>(0);
  const [pendingReactionOption, setPendingReactionOption] = useState<'A' | 'B'>('A');

  // Contador monotônico para gerar ids estáveis sem Math.random/Date.now.
  const messageCounter = useRef<number>(0);
  const nextMessageId = useCallback((prefix: string) => {
    messageCounter.current += 1;
    return `${prefix}_${messageCounter.current}`;
  }, []);

  // Mantém onComplete fresco.
  const onCompleteRef = useRef<UseChatSimulationOptions['onComplete']>(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  /** Resolve o texto que a IA dirá nesta rodada. */
  const resolvePendingText = useCallback((): string => {
    switch (pendingKind) {
      case 'saudacao':
        return buildSaudacao(trainee.nome_display);
      case 'pergunta':
        return perguntas[questionIndex].texto;
      case 'reacao':
        return getReaction(pendingReactionOption, pendingReactionIndex);
      default:
        return '';
    }
  }, [pendingKind, trainee.nome_display, perguntas, questionIndex, pendingReactionIndex]);

  // EFEITO: enquanto a IA "pensa", aguarda 1.5s e então empurra a mensagem.
  useEffect(() => {
    if (phase !== 'ai-loading') return;

    const timeoutId = setTimeout(() => {
      const texto = resolvePendingText();
      setMessages((prev) => [
        ...prev,
        {
          id: nextMessageId('ai'),
          autor: 'ai',
          texto,
          comTypewriter: true,
        },
      ]);
      setPhase('ai-typing');
    }, AI_THINKING_MS);

    return () => clearTimeout(timeoutId);
  }, [phase, resolvePendingText, nextMessageId]);

  /** Chamado quando o typewriter da última fala da IA conclui. */
  const onAiTypingComplete = useCallback(() => {
    setPhase((current) => {
      if (current !== 'ai-typing') return current;

      if (pendingKind === 'saudacao') {
        // Logo após a saudação, a IA "pensa" e dispara a 1ª pergunta.
        setPendingKind('pergunta');
        return 'ai-loading';
      }

      if (pendingKind === 'reacao') {
        // Depois da reação de desdém, vem a próxima pergunta.
        setPendingKind('pergunta');
        return 'ai-loading';
      }

      // pendingKind === 'pergunta' -> hora do usuário escolher.
      return 'user-turn';
    });
  }, [pendingKind]);

  /** Registra a escolha do usuário e avança o roteiro. */
  const handleUserChoice = useCallback(
    (escolha: EscolhaOpcao) => {
      // Só aceita cliques no turno do usuário.
      let accepted = false;
      setPhase((current) => {
        if (current === 'user-turn') accepted = true;
        return current;
      });
      if (!accepted) return;

      const pergunta = perguntas[questionIndex];
      const texto = escolha === 'A' ? pergunta.opcaoA : pergunta.opcaoB;

      setMessages((prev) => [
        ...prev,
        {
          id: nextMessageId('user'),
          autor: 'user',
          texto,
          comTypewriter: false,
        },
      ]);

      const respondida = questionIndex;
      const ehUltima = respondida >= totalQuestions - 1;

      if (ehUltima) {
        setPhase('finished');
        onCompleteRef.current?.();
        return;
      }

      // Prepara a reação de desdém e avança o ponteiro de perguntas.
      setPendingReactionOption(escolha);
      setPendingReactionIndex(respondida);
      setQuestionIndex(respondida + 1);
      setPendingKind('reacao');
      setPhase('ai-loading');
    },
    [perguntas, questionIndex, totalQuestions, nextMessageId],
  );

  return {
    messages,
    isAiThinking: phase === 'ai-loading',
    showOptions: phase === 'user-turn',
    currentQuestion: phase === 'user-turn' ? perguntas[questionIndex] : null,
    questionIndex,
    totalQuestions,
    handleUserChoice,
    onAiTypingComplete,
  };
}
