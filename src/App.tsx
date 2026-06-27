import { useCallback, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import type { Cena, Trainee } from './types';
import { PortalLogin } from './components/scenes/PortalLogin';
import { QuantumChat } from './components/scenes/QuantumChat';
import { ClimaxLoader } from './components/scenes/ClimaxLoader';
import { HolographicResultCard } from './components/scenes/HolographicResultCard';

/* ============================================================
   <App /> — Orquestrador global
   Gerencia a transição fluida entre as 4 cenas com AnimatePresence.
   ============================================================ */

export default function App() {
  const [cena, setCena] = useState<Cena>('login');
  const [trainee, setTrainee] = useState<Trainee | null>(null);

  // Cena 1 -> 2
  const handleStart = useCallback((selecionado: Trainee) => {
    setTrainee(selecionado);
    setCena('chat');
  }, []);

  // Cena 2 -> 3
  const handleChatFinish = useCallback(() => {
    setCena('climax');
  }, []);

  // Cena 3 -> 4
  const handleClimaxComplete = useCallback(() => {
    setCena('result');
  }, []);

  // Cena 4 -> 1 (reset total)
  const handleRestart = useCallback(() => {
    setCena('login');
    // Limpa o trainee após a transição de saída para não piscar vazio.
    setTimeout(() => setTrainee(null), 600);
  }, []);

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-bg-dark">
      <AnimatePresence mode="wait">
        {cena === 'login' && <PortalLogin key="login" onStart={handleStart} />}

        {cena === 'chat' && trainee && (
          <QuantumChat key="chat" trainee={trainee} onFinish={handleChatFinish} />
        )}

        {cena === 'climax' && (
          <ClimaxLoader key="climax" onComplete={handleClimaxComplete} />
        )}

        {cena === 'result' && trainee && (
          <HolographicResultCard
            key="result"
            trainee={trainee}
            onRestart={handleRestart}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
