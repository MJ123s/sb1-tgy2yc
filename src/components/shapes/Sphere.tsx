import React from 'react';

interface SphereProps {
  position?: [number, number, number];
  radius?: number;
  color?: string;
}

export function Sphere({ 
  position = [0, 0, 0], 
  radius = 1, 
  color = '#3b82f6' 
}: SphereProps) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial color={color} opacity={0.5} transparent />
    </mesh>
  );
}