import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Sparkles, Award, ImageOff } from 'lucide-react';
import type { Trainee } from '../../types';
import { CircuitBackground } from '../shared/CircuitBackground';
import { QuantumParticles } from '../shared/QuantumParticles';
import { playVictorySwoosh } from '../../utils/sfx';

/* ============================================================
   CENA 4 — HolographicResultCard (o espetáculo final)
   Card que nasce explodindo, rastreia o mouse com tilt 3D real,
   glare refletivo, imagem-troféu flutuante e título neon animado.
   ============================================================ */

interface HolographicResultCardProps {
  trainee: Trainee;
  /** Reseta toda a aplicação e volta ao login. */
  onRestart: () => void;
}

/** Intensidade máxima do tilt em graus. */
const MAX_TILT = 14;


export function HolographicResultCard({
  trainee,
  onRestart,
}: HolographicResultCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Estado do tilt 3D.
  const [tilt, setTilt] = useState<{ rx: number; ry: number }>({ rx: 0, ry: 0 });
  // Posição do glare (0..100 em %).
  const [glare, setGlare] = useState<{ x: number; y: number; on: boolean }>({
    x: 50,
    y: 50,
    on: false,
  });
  const [imgError, setImgError] = useState<boolean>(false);

  // Reseta o estado de erro sempre que a imagem mudar, evitando que um
  // erro antigo (ex.: imagem que ainda não existia) "grude" no fallback.
  useEffect(() => {
    setImgError(false);
  }, [trainee.imagem_diretoria]);

  // Play epic swoosh sound on mount
  useEffect(() => {
    playVictorySwoosh();
  }, []);

  /** Matemática do tilt baseada no boundingClientRect do card. */
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();

    // Posição relativa do cursor dentro do card, normalizada para [0, 1].
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    // Interpolação: centro (0.5) => 0deg; bordas => ±MAX_TILT.
    // rotateY segue o eixo X; rotateX é invertido para o eixo Y.
    const ry = (px - 0.5) * 2 * MAX_TILT;
    const rx = -(py - 0.5) * 2 * MAX_TILT;

    setTilt({ rx, ry });
    setGlare({ x: px * 100, y: py * 100, on: true });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0 });
    setGlare((g) => ({ ...g, on: false }));
  };



  return (
    <motion.div
      key="holographic-result"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.5 }}
      className="relative flex h-screen w-screen flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#1D9D6A' }}
    >
      {/* Circuito de fundo sutil */}
      <CircuitBackground trackColor="#147a51" pulse />

      {/* Sistema de partículas (React Three Fiber) */}
      <QuantumParticles />

      {/* ====== O CARD (astro do show) ====== */}
      <motion.div
        initial={{ scale: 0, rotate: -8, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 10, stiffness: 80, delay: 0.1 }}
        className="relative z-20"
        style={{ perspective: 1000 }}
      >
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="bevel-clip-lg preserve-3d relative h-[460px] w-[330px] sm:h-[520px] sm:w-[400px]"
          style={{
            transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
            transition: glare.on
              ? 'transform 0.08s ease-out'
              : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            backgroundColor: '#1e293b',
            border: '2px solid #136041',
            boxShadow:
              '0 0 30px rgba(19,96,65,0.9), 0 0 80px rgba(29,157,106,0.5), inset 0 0 30px rgba(19,96,65,0.3)',
          }}
        >
          {/* Glare refletivo (mix-blend-mode: overlay) */}
          <div
            className="bevel-clip-lg pointer-events-none absolute inset-0 z-30"
            style={{
              background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.45), rgba(255,255,255,0) 55%)`,
              mixBlendMode: 'overlay',
              opacity: glare.on ? 1 : 0,
              transition: 'opacity 0.3s ease',
            }}
          />

          {/* Conteúdo do card */}
          <div className="relative flex h-full flex-col items-center justify-between px-6 py-7">
            {/* Badge superior */}
            <div
              className="flex items-center gap-2 rounded-full border border-secondary/60 bg-primary/30 px-4 py-1.5 font-spartan text-[11px] font-bold uppercase tracking-[0.25em] text-secondary"
              style={{ transform: 'translateZ(40px)' }}
            >
              <Award className="h-3.5 w-3.5" />
              Alocação Concluída
            </div>

            {/* Imagem-troféu da diretoria (flutuando, translateZ) */}
            <div
              className="flex flex-1 items-center justify-center py-4"
              style={{ transform: 'translateZ(60px)' }}
            >
              {!imgError ? (
                <img
                  src={trainee.imagem_diretoria}
                  alt={`Diretoria ${trainee.diretoria_real}`}
                  onError={() => setImgError(true)}
                  className="max-h-[220px] w-auto object-contain"
                  style={{
                    filter:
                      'drop-shadow(0 14px 24px rgba(0,0,0,0.55)) drop-shadow(0 0 18px rgba(29,157,106,0.7))',
                  }}
                />
              ) : (
                // Fallback elegante caso a imagem ainda não exista em /public/assets.
                <div className="flex h-[200px] w-[200px] flex-col items-center justify-center gap-3 rounded-[24px] border-2 border-dashed border-secondary/50 bg-panel-dark/60 text-center">
                  <ImageOff className="h-10 w-10 text-secondary/70" />
                  <span className="px-3 font-spartan text-[10px] font-light tracking-wider text-text-light/50">
                    adicione a imagem em
                    <br />
                    {trainee.imagem_diretoria}
                  </span>
                </div>
              )}
            </div>

            {/* Texto: trainee + diretoria */}
            <div
              className="w-full text-center"
              style={{ transform: 'translateZ(30px)' }}
            >
              <p className="font-spartan text-sm font-bold uppercase tracking-[0.3em] text-text-light/70">
                {trainee.nome_display}, sua diretoria é
              </p>
              <h2 className="neon-gradient-text mt-1 font-spartan text-5xl font-black uppercase leading-none tracking-tight sm:text-6xl">
                {trainee.sigla}
              </h2>
              <p className="mt-2 font-spartan text-sm font-bold uppercase leading-tight tracking-[0.15em] text-text-light">
                {trainee.diretoria_real}
              </p>
              <p className="mt-3 font-spartan text-xs font-light italic leading-snug text-secondary/80">
                "{trainee.lema}"
              </p>
            </div>
          </div>

          {/* Cantos decorativos sci-fi */}
          <div className="pointer-events-none absolute left-3 top-3 h-5 w-5 border-l-2 border-t-2 border-secondary/70" />
          <div className="pointer-events-none absolute bottom-3 right-3 h-5 w-5 border-b-2 border-r-2 border-secondary/70" />
        </div>
      </motion.div>

      {/* Selo flutuante de "match perfeito" */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="z-20 mt-7 flex items-center gap-2 font-spartan text-sm font-light tracking-[0.2em] text-text-light"
      >
        <Sparkles className="h-4 w-4 text-text-light" />
        COMPATIBILIDADE QUÂNTICA: 100,00%
      </motion.div>

      {/* Botão de reinício (externo ao card) */}
      <motion.button
        type="button"
        onClick={onRestart}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        whileHover={{
          scale: 1.05,
          boxShadow: '0 0 30px #136041, 0 0 60px rgba(29,157,106,0.6)',
        }}
        whileTap={{ scale: 0.96 }}
        className="z-20 mt-6 flex items-center gap-3 rounded-full border-2 border-primary bg-panel-dark/90 px-8 py-4 font-spartan text-base font-bold uppercase tracking-wider text-text-light transition-colors hover:bg-primary"
      >
        <RotateCcw className="h-5 w-5" />
        Reiniciar Sistema Quântico
      </motion.button>
    </motion.div>
  );
}
