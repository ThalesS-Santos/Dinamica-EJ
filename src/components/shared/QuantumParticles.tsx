import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Sistema de partículas complexo usando React Three Fiber.
 * Cria uma nuvem de poeira cósmica/circuitos de energia
 * que flutuam e giram levemente para dar um ar profissional de 3D.
 */
function Particles({ count = 2000 }) {
  const ref = useRef<THREE.Points>(null);

  // Gera as posições aleatórias em uma esfera/caixa
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Distribuição em um cilindro largo/caixa
      const x = (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 10;
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }
    return positions;
  }, [count]);

  // Anima a rotação das partículas
  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#1D9D6A"
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

export function QuantumParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 opacity-60">
      <Canvas camera={{ position: [0, 0, 3], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <Particles count={2500} />
      </Canvas>
    </div>
  );
}
