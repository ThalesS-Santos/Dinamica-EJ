import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ScanLine, Cpu, Check } from 'lucide-react';
import { TRAINEES } from '../../data/trainees';
import type { Trainee } from '../../types';
import { GearSVG } from '../shared/GearSVG';
import { CircuitBackground } from '../shared/CircuitBackground';
import { BevelPanel } from '../shared/BevelPanel';

/* ============================================================
   CENA 1 — PortalLogin
   Seleção do trainee + botão "INICIAR VARREDURA NEURAL".
   ============================================================ */

interface PortalLoginProps {
  /** Dispara a transição para o chat com o trainee escolhido. */
  onStart: (trainee: Trainee) => void;
}

// Variantes do dropdown customizado (efeito cascata / staggerChildren).
const listVariants = {
  hidden: { opacity: 0, y: -8, transition: { when: 'afterChildren' } },
  visible: {
    opacity: 1,
    y: 0,
    transition: { when: 'beforeChildren', staggerChildren: 0.06 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -24, filter: 'blur(4px)' },
  visible: { opacity: 1, x: 0, filter: 'blur(0px)' },
};

export function PortalLogin({ onStart }: PortalLoginProps) {
  const [selected, setSelected] = useState<Trainee | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [hovering, setHovering] = useState<boolean>(false);

  const handleSelect = (trainee: Trainee) => {
    setSelected(trainee);
    setOpen(false);
  };

  const handleStart = () => {
    if (selected) onStart(selected);
  };

  return (
    <motion.div
      key="portal-login"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.15, filter: 'blur(8px)' }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      className="relative flex h-screen w-screen items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#1D9D6A' }}
    >
      {/* Overlay de circuito impresso pulsante */}
      <CircuitBackground trackColor="#147a51" />

      {/* Engrenagens gigantes girando em sentidos opostos */}
      <motion.div
        className="pointer-events-none absolute -left-40 -top-40"
        animate={{ rotate: 360 }}
        transition={{
          duration: hovering ? 30 : 60,
          ease: 'linear',
          repeat: Infinity,
        }}
      >
        <GearSVG size={520} color="#1a704e" opacity={0.35} teeth={14} />
      </motion.div>
      <motion.div
        className="pointer-events-none absolute -bottom-52 -right-52"
        animate={{ rotate: -360 }}
        transition={{
          duration: hovering ? 40 : 80,
          ease: 'linear',
          repeat: Infinity,
        }}
      >
        <GearSVG size={680} color="#1a704e" opacity={0.3} teeth={18} />
      </motion.div>

      {/* Painel central massivo (bevel + glassmorphism pesado) */}
      <BevelPanel
        large
        borderColor="rgba(255,255,255,0.12)"
        borderWidth={1}
        className="z-10 w-[92%] max-w-[640px] shadow-2xl"
        innerClassName="glass-heavy"
      >
        <div className="flex flex-col items-center gap-8 px-8 py-12 sm:px-14 sm:py-16">
          {/* Selo / ícone */}
          <motion.div
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 12, delay: 0.2 }}
            className="flex h-16 w-16 items-center justify-center rounded-full border border-secondary/40 bg-primary/20 glow-primary"
          >
            <Cpu className="h-8 w-8 text-secondary" />
          </motion.div>

          {/* Título neon */}
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="neon-text font-spartan text-3xl font-black uppercase leading-[0.95] tracking-tight text-text-light sm:text-4xl"
            >
              Sistema Quântico
              <br />
              de Alocação{' '}
              <span className="neon-gradient-text">Optimus</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-3 font-spartan text-sm font-light tracking-[0.3em] text-secondary/80"
            >
              [ EMPRESA JÚNIOR DE CONTROLE E AUTOMAÇÃO ]
            </motion.p>
          </div>

          {/* Seletor customizado (NÃO nativo) */}
          <div className="relative w-full">
            <label className="mb-2 block font-spartan text-xs font-bold uppercase tracking-[0.2em] text-secondary/70">
              Identificação do candidato
            </label>

            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              className="flex w-full items-center justify-between rounded-[24px] border border-secondary/30 bg-panel-dark/60 px-6 py-4 font-spartan text-base font-bold text-text-light transition-all duration-300 hover:border-secondary hover:bg-panel-dark/80 hover:glow-primary"
            >
              <span className={selected ? 'text-text-light' : 'text-text-light/40'}>
                {selected ? selected.nome_display : 'Selecione um trainee...'}
              </span>
              <motion.span
                animate={{ rotate: open ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="h-5 w-5 text-secondary" />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {open && (
                <motion.ul
                  variants={listVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="relative z-30 mt-2 w-full overflow-hidden rounded-[24px] border border-secondary/30 bg-panel-dark/95 p-2 shadow-2xl"
                >
                  {TRAINEES.map((trainee, idx) => {
                    const isActive = selected?.id === trainee.id;
                    return (
                      <motion.li key={trainee.id} variants={itemVariants}>
                        <button
                          type="button"
                          onClick={() => handleSelect(trainee)}
                          className={`flex w-full items-center justify-between rounded-[18px] px-4 py-3 text-left font-spartan transition-colors duration-200 ${
                            isActive
                              ? 'bg-primary/40 text-text-light'
                              : 'text-text-light/80 hover:bg-accent/30'
                          }`}
                        >
                          <span className="flex items-center gap-3">
                            <span className="font-light text-xs tabular-nums text-secondary/60">
                              {String(idx + 1).padStart(2, '0')}
                            </span>
                            <span className="font-bold">{trainee.nome_display}</span>
                          </span>
                          {isActive && <Check className="h-4 w-4 text-secondary" />}
                        </button>
                      </motion.li>
                    );
                  })}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          {/* Botão gigante "INICIAR VARREDURA NEURAL" */}
          <motion.button
            type="button"
            disabled={!selected}
            onClick={handleStart}
            onHoverStart={() => setHovering(true)}
            onHoverEnd={() => setHovering(false)}
            whileHover={selected ? { scale: 1.04 } : undefined}
            whileTap={selected ? { scale: 0.97, x: [0, -2, 2, -2, 2, 0] } : undefined}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className={`group relative mt-2 w-full overflow-hidden rounded-full px-8 py-5 font-spartan text-lg font-black uppercase tracking-wider transition-all duration-300 ${
              selected
                ? 'cursor-pointer bg-primary text-text-light'
                : 'cursor-not-allowed bg-panel-dark/50 text-text-light/30'
            }`}
            style={
              selected && hovering
                ? {
                    boxShadow:
                      '0 0 30px #136041, 0 0 60px #136041, 0 0 120px rgba(29,157,106,0.6)',
                  }
                : undefined
            }
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              <ScanLine className="h-6 w-6" />
              Iniciar Varredura Neural
            </span>
            {/* Brilho que varre o botão no hover */}
            {selected && (
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            )}
          </motion.button>
        </div>
      </BevelPanel>

      {/* Rodapé técnico */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1 }}
        className="absolute bottom-5 z-10 font-spartan text-[11px] font-light tracking-[0.3em] text-text-light/60"
      >
        v2.7.1 · QUANTUM CORE ONLINE · LATÊNCIA 0.003ms
      </motion.p>
    </motion.div>
  );
}
