/* ============================================================
   EqualizerLoader — indicador de "a IA está digitando".
   Barras equalizadoras animadas (substitui o <Loader3D />).
   ============================================================ */

interface EqualizerLoaderProps {
  bars?: number;
  color?: string;
  className?: string;
}

export function EqualizerLoader({
  bars = 5,
  color = '#1D9D6A',
  className = '',
}: EqualizerLoaderProps) {
  return (
    <div className={`flex items-end gap-1 ${className}`} aria-label="IA digitando">
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          className="animate-equalize block w-[4px] origin-bottom rounded-full"
          style={{
            height: '24px',
            backgroundColor: color,
            // Defasagem para dar o efeito de onda.
            animationDelay: `${(i * 0.12).toFixed(2)}s`,
            boxShadow: `0 0 8px ${color}`,
          }}
        />
      ))}
    </div>
  );
}
