'use client';

import { useRef, useState } from 'react';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import type { DebrisData } from '@/lib/types/visualization';

interface DebrisProps {
  data: DebrisData;
  scale?: number;
  onSelect?: (debris: DebrisData) => void;
}

const sizeScale: Record<DebrisData['size'], number> = {
  small: 0.005,
  medium: 0.01,
  large: 0.015,
};

const sizeColors: Record<DebrisData['size'], string> = {
  small: '#9ca3af',
  medium: '#f59e0b',
  large: '#dc2626',
};

export function Debris({ data, scale = 1, onSelect }: DebrisProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = () => {
    setShowTooltip(!showTooltip);
    onSelect?.(data);
  };

  // Scale km to scene units where Earth radius (6371km) = 1 unit
  const SCALE = 1 / 6371;
  const position: [number, number, number] = [
    data.position.x * SCALE,
    data.position.y * SCALE,
    data.position.z * SCALE,
  ];

  const debrisSize = sizeScale[data.size] * scale;

  return (
    <group position={position}>
      {/* Debris marker */}
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[debrisSize, debrisSize, debrisSize]} />
        <meshStandardMaterial
          color={sizeColors[data.size]}
          emissive={sizeColors[data.size]}
          emissiveIntensity={hovered ? 0.8 : 0.3}
          roughness={0.8}
          metalness={0.2}
          opacity={0.8}
          transparent
        />
      </mesh>

      {/* Tooltip */}
      {showTooltip && (
        <Html
          position={[0.03, 0.03, 0]}
          center
          distanceFactor={10}
          style={{ pointerEvents: 'none' }}
        >
          <div className="bg-background/95 border border-border rounded-lg p-3 shadow-lg backdrop-blur-sm min-w-[180px]">
            <h4 className="font-semibold text-sm mb-1">{data.name}</h4>
            <div className="text-xs space-y-0.5 text-muted-foreground">
              <p>Size: <span className="text-foreground">{data.size}</span></p>
              <p>Source: <span className="text-foreground">{data.source}</span></p>
              <p>Confidence: <span className="text-foreground">{(data.trackingConfidence * 100).toFixed(0)}%</span></p>
              <p>Altitude: <span className="text-foreground">{Math.round(data.orbit.semiMajorAxis - 6371)} km</span></p>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}
