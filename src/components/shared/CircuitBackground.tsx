import type { CSSProperties } from 'react';

/* ============================================================
   CircuitBackground — overlay de trilhas de circuito impresso.
   Trilhas em #147a51 (accent) sobre o fundo verde #1D9D6A.
   Implementado como SVG pattern tileável que pulsa de opacidade.
   ============================================================ */

interface CircuitBackgroundProps {
  className?: string;
  style?: CSSProperties;
  /** Cor das trilhas. */
  trackColor?: string;
  /** Habilita o pulso de opacidade. */
  pulse?: boolean;
}

export function CircuitBackground({
  className = '',
  style,
  trackColor = '#147a51',
  pulse = true,
}: CircuitBackgroundProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 ${pulse ? 'animate-circuit-pulse' : ''} ${className}`}
      style={style}
      aria-hidden="true"
    >
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern
            id="circuit-pattern"
            width="120"
            height="120"
            patternUnits="userSpaceOnUse"
          >
            <g
              fill="none"
              stroke={trackColor}
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              {/* Trilhas horizontais e verticais */}
              <path d="M0 30 H40 V70 H120" />
              <path d="M60 0 V20 H100 V60" />
              <path d="M0 90 H30 V120" />
              <path d="M120 100 H80 V60" />
              <path d="M30 70 V120" />
              {/* Pads (nós de conexão) */}
              <circle cx="40" cy="30" r="3.5" fill={trackColor} stroke="none" />
              <circle cx="40" cy="70" r="3.5" fill={trackColor} stroke="none" />
              <circle cx="60" cy="20" r="3.5" fill={trackColor} stroke="none" />
              <circle cx="100" cy="20" r="3.5" fill={trackColor} stroke="none" />
              <circle cx="100" cy="60" r="3.5" fill={trackColor} stroke="none" />
              <circle cx="80" cy="60" r="3.5" fill={trackColor} stroke="none" />
              <circle cx="30" cy="90" r="3.5" fill={trackColor} stroke="none" />
              <circle cx="30" cy="70" r="3.5" fill={trackColor} stroke="none" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
      </svg>
    </div>
  );
}
