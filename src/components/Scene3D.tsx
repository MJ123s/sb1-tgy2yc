import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

interface Scene3DProps {
  children: React.ReactNode;
  width?: number;
  height?: number;
}

export function Scene3D({ children, width = 400, height = 300 }: Scene3DProps) {
  return (
    <div style={{ width, height }} className="bg-slate-800/40 rounded-lg overflow-hidden">
      <Canvas camera={{ position: [5, 5, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        {children}
        <OrbitControls />
      </Canvas>
    </div>
  );
}