import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { playQuantumHum } from '../../utils/sfx';

/* ============================================================
   CENA 3 — ClimaxLoader (a falsa tensão)
   0% -> 99% em 4s, trava em 99% por 2.5s, pula para 100%,
   White Flash de 0.5s e então conclui.
   ============================================================ */

interface ClimaxLoaderProps {
  onComplete: () => void;
}

type Phase = 'counting' | 'holding' | 'jump' | 'flash';

const RAMP_MS = 4000; // 0 -> 99
const HOLD_MS = 2500; // trava angustiante em 99
const FLASH_MS = 500; // white flash bang

export function ClimaxLoader({ onComplete }: ClimaxLoaderProps) {
  const [progress, setProgress] = useState<number>(0);
  const [phase, setPhase] = useState<Phase>('counting');

  // --- Áudio ---
  useEffect(() => {
    const stopHum = playQuantumHum();
    return () => stopHum();
  }, []);

  // --- Rampa 0 -> 99 em 4s ---
  useEffect(() => {
    if (phase !== 'counting') return;

    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const ratio = Math.min(elapsed / RAMP_MS, 1);
      // Curva de easing para parecer "esforço computacional".
      const eased = 1 - Math.pow(1 - ratio, 2.2);
      setProgress(Math.min(99, Math.round(eased * 99)));

      if (ratio < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setProgress(99);
        setPhase('holding');
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  // --- Trava em 99% por 2.5s, depois pula para 100% ---
  useEffect(() => {
    if (phase !== 'holding') return;
    const t = setTimeout(() => {
      setProgress(100);
      setPhase('jump');
    }, HOLD_MS);
    return () => clearTimeout(t);
  }, [phase]);

  // --- Pulo para 100% -> dispara o flash ---
  useEffect(() => {
    if (phase !== 'jump') return;
    const t = setTimeout(() => setPhase('flash'), 350);
    return () => clearTimeout(t);
  }, [phase]);

  // --- White flash bang -> conclui ---
  useEffect(() => {
    if (phase !== 'flash') return;
    const t = setTimeout(() => onComplete(), FLASH_MS);
    return () => clearTimeout(t);
  }, [phase, onComplete]);

  // Geometria do anel de progresso.
  const size = 320;
  const stroke = 14;
  // Margem extra para o cap arredondado + glow não serem cortados pela borda
  // do SVG (o que dava a impressão de um "quadrado barrando" o círculo).
  const pad = 24;
  const radius = (size - stroke) / 2 - pad;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - progress / 100);

  const holding = phase === 'holding';

  return (
    <motion.div
      key="climax-loader"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`relative flex h-screen w-screen items-center justify-center overflow-hidden bg-bg-dark ${
        holding ? 'danger-pulse' : ''
      }`}
    >
      {/* Container que treme (camera shake) */}
      <div className="camera-shake flex flex-col items-center gap-10 text-center">
        {/* Alerta vermelho em letra de máquina */}
        <motion.div
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <AlertTriangle className="h-8 w-8 text-red-500" />
          <p className="neon-text-red font-spartan text-base font-light tracking-[0.25em] text-red-500 sm:text-lg">
            ALERTA: ANOMALIA COGNITIVA DETECTADA.
          </p>
          <p className="font-spartan text-sm font-light tracking-[0.3em] text-red-400/80">
            FORÇANDO MATRIZ DE DESTINO...
          </p>
        </motion.div>

        {/* Anel de progresso colossal */}
        <div className="relative" style={{ width: size, height: size }}>
          <svg
            width={size}
            height={size}
            className="-rotate-90 overflow-visible"
          >
            {/* Trilha de fundo */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth={stroke}
            />
            {/* Progresso */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={holding ? '#ef4444' : '#1D9D6A'}
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              style={{
                transition: 'stroke-dashoffset 0.1s linear, stroke 0.3s ease',
                filter: `drop-shadow(0 0 12px ${holding ? '#ef4444' : '#1D9D6A'})`,
              }}
            />
          </svg>

          {/* Número central */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              animate={
                holding
                  ? { color: ['#ef4444', '#1D9D6A', '#ef4444'], scale: [1, 1.06, 1] }
                  : { color: '#f5f5f5' }
              }
              transition={
                holding ? { duration: 0.5, repeat: Infinity } : { duration: 0.2 }
              }
              className="font-spartan text-7xl font-black tabular-nums"
            >
              {progress}%
            </motion.span>
            <span className="mt-1 font-spartan text-xs font-light tracking-[0.3em] text-text-light/50">
              {holding ? 'RECALIBRANDO...' : 'ALOCANDO'}
            </span>
          </div>
        </div>

        {/* Log técnico no rodapé */}
        <motion.p
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="font-spartan text-[11px] font-light tracking-[0.25em] text-text-light/40"
        >
          {holding
            ? '> núcleo quântico sobrecarregado // tentando override...'
            : '> mapeando sinapses para diretoria-alvo...'}
        </motion.p>
      </div>

      {/* WHITE FLASH BANG */}
      {phase === 'flash' && (
        <motion.div
          className="absolute inset-0 z-50 bg-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.12 }}
        />
      )}
    </motion.div>
  );
}
