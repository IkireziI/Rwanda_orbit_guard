'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface EarthProps {
  radius?: number;
  rotationSpeed?: number;
}

export function Earth({ radius = 1, rotationSpeed = 0.001 }: EarthProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed;
    }
  });

  return (
    <group>
      {/* Earth */}
      <Sphere ref={meshRef} args={[radius, 64, 64]}>
        <meshStandardMaterial
          color="#1e40af"
          roughness={0.7}
          metalness={0.1}
        />
      </Sphere>

      {/* Atmosphere glow */}
      <Sphere args={[radius * 1.02, 64, 64]}>
        <meshBasicMaterial
          color="#60a5fa"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Ambient glow */}
      <pointLight position={[0, 0, 0]} intensity={0.2} distance={radius * 3} />
    </group>
  );
}
