import React from 'react';
import { Edges } from '@react-three/drei';

interface CubeProps {
  position?: [number, number, number];
  size?: [number, number, number];
  color?: string;
}

export function Cube({ 
  position = [0, 0, 0], 
  size = [1, 1, 1], 
  color = '#3b82f6' 
}: CubeProps) {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} opacity={0.5} transparent />
      <Edges />
    </mesh>
  );
}