import { useEffect, useRef, useState } from 'react';

/* ============================================================
   useTypewriter
   Revela um texto caractere a caractere. Retorna o texto parcial,
   um flag de conclusão e o estado de "digitando".
   ============================================================ */

interface UseTypewriterOptions {
  /** Velocidade em ms por caractere. */
  speed?: number;
  /** Atraso inicial antes de começar a digitar (ms). */
  startDelay?: number;
  /** Se false, o efeito não roda e exibe o texto completo imediatamente. */
  enabled?: boolean;
  /** Callback disparado quando a digitação termina. */
  onComplete?: () => void;
}

interface UseTypewriterResult {
  displayed: string;
  isDone: boolean;
  isTyping: boolean;
}

export function useTypewriter(
  text: string,
  options: UseTypewriterOptions = {},
): UseTypewriterResult {
  const { speed = 28, startDelay = 0, enabled = true, onComplete } = options;

  const [displayed, setDisplayed] = useState<string>(enabled ? '' : text);
  const [isDone, setIsDone] = useState<boolean>(!enabled);

  // Mantém o callback fresco sem reiniciar o efeito.
  const onCompleteRef = useRef<UseTypewriterOptions['onComplete']>(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (!enabled) {
      // Exibe o texto completo imediatamente. NÃO dispara onComplete aqui:
      // só uma animação de digitação real deve sinalizar conclusão, evitando
      // avançar a coreografia quando uma mensagem antiga deixa de ser a ativa.
      setDisplayed(text);
      setIsDone(true);
      return;
    }

    setDisplayed('');
    setIsDone(false);

    let index = 0;
    let intervalId: ReturnType<typeof setInterval> | null = null;

    const startTimeout = setTimeout(() => {
      intervalId = setInterval(() => {
        index += 1;
        setDisplayed(text.slice(0, index));

        if (index >= text.length) {
          if (intervalId) clearInterval(intervalId);
          setIsDone(true);
          onCompleteRef.current?.();
        } else {
          import('../utils/sfx').then((m) => m.playTypingSound());
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(startTimeout);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, speed, startDelay, enabled]);

  return {
    displayed,
    isDone,
    isTyping: enabled && !isDone,
  };
}
