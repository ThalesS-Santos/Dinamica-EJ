import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Lock, Radio, Terminal } from 'lucide-react';
import type { MensagemChat, Trainee } from '../../types';
import { useChatSimulation } from '../../hooks/useChatSimulation';
import { useTypewriter } from '../../hooks/useTypewriter';
import { playClickSound } from '../../utils/sfx';
import { EqualizerLoader } from '../shared/EqualizerLoader';

/* ============================================================
   CENA 2 — QuantumChat (a entrevista troll)
   ============================================================ */

interface QuantumChatProps {
  trainee: Trainee;
  /** Chamado após a 4ª resposta (já com o glitch de saída). */
  onFinish: () => void;
}

/* ---------- Subcomponente: bolha de mensagem ---------- */

interface ChatMessageProps {
  message: MensagemChat;
  /** Se deve animar o typewriter (apenas a última fala viva da IA). */
  animate: boolean;
  onTypingComplete: () => void;
}

function ChatMessage({ message, animate, onTypingComplete }: ChatMessageProps) {
  const isAi = message.autor === 'ai';

  const { displayed, isTyping } = useTypewriter(message.texto, {
    enabled: animate,
    speed: 24,
    startDelay: 120,
    onComplete: onTypingComplete,
  });

  const content = animate ? displayed : message.texto;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className={`flex w-full ${isAi ? 'justify-start' : 'justify-end'}`}
    >
      <div
        className={`max-w-[80%] rounded-[24px] px-5 py-3 font-spartan ${
          isAi
            ? 'border border-accent/40 bg-panel-dark/80 text-text-light'
            : 'bg-primary text-text-light glow-primary'
        }`}
      >
        {isAi && (
          <div className="mb-1 flex items-center gap-2 font-light text-[11px] tracking-[0.2em] text-secondary">
            <Terminal className="h-3 w-3" />
            [SYS.OPTIMUS_JR]
          </div>
        )}
        <p
          className={`whitespace-pre-wrap leading-relaxed ${
            isAi ? 'font-normal' : 'font-bold'
          }`}
        >
          {content}
          {isAi && animate && isTyping && <span className="typewriter-caret" />}
        </p>
      </div>
    </motion.div>
  );
}

/* ---------- Indicador de "IA pensando" ---------- */

function ThinkingBubble() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="flex justify-start"
    >
      <div className="flex items-center gap-3 rounded-[24px] border border-accent/40 bg-panel-dark/80 px-5 py-4">
        <EqualizerLoader />
        <span className="font-spartan text-xs font-light tracking-[0.2em] text-secondary/70">
          PROCESSANDO...
        </span>
      </div>
    </motion.div>
  );
}

/* ---------- Cena principal ---------- */

export function QuantumChat({ trainee, onFinish }: QuantumChatProps) {
  const [glitching, setGlitching] = useState<boolean>(false);

  // Intercepta a conclusão para tocar o glitch antes de trocar de cena.
  const handleComplete = useCallback(() => {
    setGlitching(true);
    const t = setTimeout(() => onFinish(), 380);
    return () => clearTimeout(t);
  }, [onFinish]);

  const {
    messages,
    isAiThinking,
    showOptions,
    currentQuestion,
    questionIndex,
    totalQuestions,
    handleUserChoice,
    onAiTypingComplete,
  } = useChatSimulation({ trainee, onComplete: handleComplete });

  // Auto-scroll para a última mensagem.
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [messages, isAiThinking, showOptions]);

  const lastIndex = messages.length - 1;

  return (
    <motion.div
      key="quantum-chat"
      initial={{ opacity: 0, scale: 1.3 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`relative flex h-screen w-screen items-center justify-center bg-bg-dark p-4 ${
        glitching ? 'glitch-active' : ''
      }`}
    >
      {/* Scanline decorativo */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30">
        <div className="animate-scanline absolute left-0 h-24 w-full bg-gradient-to-b from-transparent via-accent/20 to-transparent" />
      </div>

      <div className="z-10 flex h-[88vh] w-full max-w-[760px] flex-col overflow-hidden rounded-[24px] border border-accent/30 bg-black/80 shadow-2xl">
        {/* Header do terminal */}
        <div className="flex items-center justify-between border-b border-accent/30 bg-panel-dark/60 px-5 py-3">
          <div className="flex items-center gap-2">
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              className="flex items-center gap-2 font-spartan text-xs font-bold tracking-widest text-secondary"
            >
              <Radio className="h-4 w-4" />
              CONEXÃO SEGURA
            </motion.span>
          </div>
          <div className="flex items-center gap-2 font-spartan text-[11px] font-light tracking-[0.2em] text-text-light/50">
            <Lock className="h-3 w-3" />
            CRIPTOGRAFIA QUÂNTICA AES-∞
          </div>
          {/* Luzes piscando */}
          <div className="flex gap-1.5">
            {['#ef4444', '#eab308', '#1D9D6A'].map((c, i) => (
              <motion.span
                key={c}
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: c }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.3 }}
              />
            ))}
          </div>
        </div>

        {/* Barra de progresso da entrevista */}
        <div className="h-1 w-full bg-panel-dark">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-secondary"
            initial={{ width: '0%' }}
            animate={{
              width: `${((questionIndex + (showOptions ? 0 : 1)) / totalQuestions) * 100}%`,
            }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Área de mensagens */}
        <div
          ref={scrollRef}
          className="flex flex-1 flex-col gap-4 overflow-y-auto px-5 py-6"
        >
          {messages.map((msg, i) => (
            <ChatMessage
              key={msg.id}
              message={msg}
              animate={
                i === lastIndex && msg.autor === 'ai' && Boolean(msg.comTypewriter)
              }
              onTypingComplete={onAiTypingComplete}
            />
          ))}

          <AnimatePresence>{isAiThinking && <ThinkingBubble />}</AnimatePresence>
        </div>

        {/* Opções de resposta (surgem de baixo) */}
        <div className="border-t border-accent/30 bg-panel-dark/40 px-5 py-5">
          <AnimatePresence mode="wait">
            {showOptions && currentQuestion ? (
              <motion.div
                key={`options-${questionIndex}`}
                className="grid grid-cols-1 gap-3 sm:grid-cols-2"
              >
                {(['A', 'B'] as const).map((opcao, idx) => {
                  const texto =
                    opcao === 'A' ? currentQuestion.opcaoA : currentQuestion.opcaoB;
                  return (
                    <motion.button
                      key={opcao}
                      type="button"
                      onClick={() => {
                        playClickSound();
                        handleUserChoice(opcao);
                      }}
                      initial={{ opacity: 0, y: 40, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0, transition: { duration: 0.25 } }}
                      transition={{
                        type: 'spring',
                        stiffness: 280,
                        damping: 20,
                        delay: idx * 0.1,
                      }}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="rounded-[24px] border-2 border-secondary/70 bg-panel-dark/80 px-5 py-4 text-left font-spartan font-bold text-text-light transition-shadow duration-300 hover:border-secondary hover:glow-primary-intense"
                    >
                      <span className="mr-2 font-black text-secondary">
                        [{opcao}]
                      </span>
                      {texto}
                    </motion.button>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div
                key="awaiting"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex h-[60px] items-center justify-center font-spartan text-xs font-light tracking-[0.3em] text-text-light/40"
              >
                {glitching
                  ? '>> ANOMALIA DETECTADA <<'
                  : '>> AGUARDANDO TRANSMISSÃO DO NÚCLEO <<'}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
