import type { CSSProperties } from 'react';

/* ============================================================
   GearSVG — engrenagem vetorial reutilizável.
   Usada no fundo da tela de login (camadas decorativas) e como
   ícone técnico. Cores via props para respeitar o design system.
   ============================================================ */

interface GearSVGProps {
  size?: number;
  /** Cor de preenchimento dos dentes/corpo. */
  color?: string;
  className?: string;
  style?: CSSProperties;
  /** Número de dentes da engrenagem. */
  teeth?: number;
  opacity?: number;
}

export function GearSVG({
  size = 400,
  color = '#1a704e',
  className = '',
  style,
  teeth = 12,
  opacity = 1,
}: GearSVGProps) {
  // Geração procedural dos dentes da engrenagem.
  const cx = 50;
  const cy = 50;
  const outerR = 48;
  const toothR = 50;
  const innerR = 38;
  const holeR = 16;

  const teethPaths: string[] = [];
  for (let i = 0; i < teeth; i += 1) {
    const angle = (i / teeth) * Math.PI * 2;
    const half = (Math.PI / teeth) * 0.42;

    const x1 = cx + outerR * Math.cos(angle - half);
    const y1 = cy + outerR * Math.sin(angle - half);
    const x2 = cx + toothR * Math.cos(angle - half * 0.5);
    const y2 = cy + toothR * Math.sin(angle - half * 0.5);
    const x3 = cx + toothR * Math.cos(angle + half * 0.5);
    const y3 = cy + toothR * Math.sin(angle + half * 0.5);
    const x4 = cx + outerR * Math.cos(angle + half);
    const y4 = cy + outerR * Math.sin(angle + half);

    teethPaths.push(
      `M ${x1.toFixed(2)} ${y1.toFixed(2)} L ${x2.toFixed(2)} ${y2.toFixed(2)} L ${x3.toFixed(
        2,
      )} ${y3.toFixed(2)} L ${x4.toFixed(2)} ${y4.toFixed(2)} Z`,
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      style={{ opacity, ...style }}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g fill={color}>
        {/* Dentes */}
        {teethPaths.map((d, i) => (
          <path key={i} d={d} />
        ))}
        {/* Corpo */}
        <circle cx={cx} cy={cy} r={outerR} />
      </g>
      {/* Anel interno (vazado) para dar profundidade */}
      <circle
        cx={cx}
        cy={cy}
        r={innerR}
        fill="none"
        stroke="rgba(0,0,0,0.25)"
        strokeWidth={3}
      />
      {/* Furo central */}
      <circle cx={cx} cy={cy} r={holeR} fill="rgba(0,0,0,0.45)" />
      <circle
        cx={cx}
        cy={cy}
        r={holeR}
        fill="none"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth={1.5}
      />
    </svg>
  );
}
