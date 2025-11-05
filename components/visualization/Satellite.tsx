'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Billboard, Text } from '@react-three/drei';
import * as THREE from 'three';
import type { SatelliteData } from '@/lib/types/visualization';

interface SatelliteProps {
  data: SatelliteData;
  scale?: number;
  onSelect?: (satellite: SatelliteData) => void;
}

const typeColors: Record<SatelliteData['type'], string> = {
  communication: '#10b981',
  weather: '#3b82f6',
  navigation: '#8b5cf6',
  research: '#f59e0b',
  military: '#ef4444',
};

const statusColors: Record<SatelliteData['status'], string> = {
  active: '#22c55e',
  inactive: '#6b7280',
  deorbiting: '#dc2626',
};

export function Satellite({ data, scale = 1, onSelect }: SatelliteProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useFrame(({ clock }) => {
    if (meshRef.current && hovered) {
      const pulse = 1 + Math.sin(clock.elapsedTime * 3) * 0.2;
      meshRef.current.scale.setScalar(scale * pulse);
    }
  });

  const handleClick = () => {
    setShowTooltip(!showTooltip);
    onSelect?.(data);
  };

  const position: [number, number, number] = [
    data.position.x / 10000,
    data.position.y / 10000,
    data.position.z / 10000,
  ];

  return (
    <group position={position}>
      {/* Satellite marker */}
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.02 * scale, 16, 16]} />
        <meshStandardMaterial
          color={typeColors[data.type]}
          emissive={typeColors[data.type]}
          emissiveIntensity={hovered ? 1 : 0.5}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>

      {/* Status indicator */}
      <mesh position={[0, 0.03 * scale, 0]}>
        <sphereGeometry args={[0.005 * scale, 8, 8]} />
        <meshBasicMaterial color={statusColors[data.status]} />
      </mesh>

      {/* Always-visible name label (billboard) */}
      <Billboard position={[0.05, 0.05, 0]}>
        <Text
          fontSize={0.035 * scale}
          color="#dbeafe"
          outlineWidth={0.004}
          outlineColor="#0b1220"
        >
          {data.name}
        </Text>
      </Billboard>

      {/* Click tooltip with details */}
      {showTooltip && (
        <Html
          position={[0.05, 0.05, 0]}
          center
          distanceFactor={10}
          style={{ pointerEvents: 'none' }}
        >
          <div className="bg-background/95 border border-border rounded-lg p-3 shadow-lg backdrop-blur-sm min-w-[200px]">
            <h4 className="font-semibold text-sm mb-1">{data.name}</h4>
            <div className="text-xs space-y-0.5 text-muted-foreground">
              <p>Type: <span className="text-foreground">{data.type}</span></p>
              <p>Status: <span className="text-foreground">{data.status}</span></p>
              <p>Country: <span className="text-foreground">{data.country}</span></p>
              <p>Altitude: <span className="text-foreground">{Math.round(data.orbit.semiMajorAxis - 6371)} km</span></p>
              <p>Inclination: <span className="text-foreground">{data.orbit.inclination.toFixed(1)}°</span></p>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}
