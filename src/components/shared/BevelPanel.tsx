import type { CSSProperties, ReactNode } from 'react';

/* ============================================================
   BevelPanel — container com Borda Bevel (chanfrada) obrigatória.
   Usa um truque de duas camadas: um wrapper externo com o
   clip-path que serve de "borda" colorida + um interno recuado,
   também clipado, que carrega o conteúdo e o glassmorphism.
   ============================================================ */

interface BevelPanelProps {
  children: ReactNode;
  className?: string;
  /** Classes do conteúdo interno (cor de fundo, blur, etc.). */
  innerClassName?: string;
  /** Cor da "borda" bevel externa. */
  borderColor?: string;
  /** Espessura da borda bevel em px. */
  borderWidth?: number;
  /** Usa o bevel maior (32px) para painéis colossais. */
  large?: boolean;
  style?: CSSProperties;
  innerStyle?: CSSProperties;
}

export function BevelPanel({
  children,
  className = '',
  innerClassName = 'glass-heavy',
  borderColor = 'rgba(19, 96, 65, 0.9)',
  borderWidth = 2,
  large = false,
  style,
  innerStyle,
}: BevelPanelProps) {
  const clipClass = large ? 'bevel-clip-lg' : 'bevel-clip';

  return (
    <div
      className={`relative ${clipClass} ${className}`}
      style={{ backgroundColor: borderColor, padding: borderWidth, ...style }}
    >
      <div
        className={`relative h-full w-full ${clipClass} ${innerClassName}`}
        style={innerStyle}
      >
        {children}
      </div>
    </div>
  );
}
