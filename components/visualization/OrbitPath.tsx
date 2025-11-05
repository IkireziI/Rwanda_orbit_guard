'use client';

import { useMemo } from 'react';
import { Line } from '@react-three/drei';
import * as THREE from 'three';
import type { OrbitParams } from '@/lib/types/visualization';

interface OrbitPathProps {
  orbit: OrbitParams;
  color?: string;
  opacity?: number;
  segments?: number;
}

export function OrbitPath({
  orbit,
  color = '#60a5fa',
  opacity = 0.3,
  segments = 128,
}: OrbitPathProps) {
  const points = useMemo(() => {
    const { semiMajorAxis, eccentricity, inclination, rightAscension, argumentOfPerigee } = orbit;
    
    // Convert to radians
    const i = (inclination * Math.PI) / 180;
    const omega = (rightAscension * Math.PI) / 180;
    const w = (argumentOfPerigee * Math.PI) / 180;
    
    const orbitPoints: THREE.Vector3[] = [];
    
    for (let j = 0; j <= segments; j++) {
      const theta = (j / segments) * Math.PI * 2;
      
      // Position in orbital plane
      const r = (semiMajorAxis * (1 - eccentricity * eccentricity)) / (1 + eccentricity * Math.cos(theta));
      const xOrbit = r * Math.cos(theta);
      const yOrbit = r * Math.sin(theta);
      
      // Rotate to Earth-centered inertial frame
      const x = xOrbit * (Math.cos(omega) * Math.cos(w) - Math.sin(omega) * Math.sin(w) * Math.cos(i))
               - yOrbit * (Math.cos(omega) * Math.sin(w) + Math.sin(omega) * Math.cos(w) * Math.cos(i));
      
      const y = xOrbit * (Math.sin(omega) * Math.cos(w) + Math.cos(omega) * Math.sin(w) * Math.cos(i))
               + yOrbit * (Math.cos(omega) * Math.cos(w) * Math.cos(i) - Math.sin(omega) * Math.sin(w));
      
      const z = xOrbit * Math.sin(w) * Math.sin(i) + yOrbit * Math.cos(w) * Math.sin(i);
      
      // Scale km to scene units where Earth radius (6371km) = 1 unit
      const SCALE = 1 / 6371;
      orbitPoints.push(new THREE.Vector3(x * SCALE, y * SCALE, z * SCALE));
    }
    
    return orbitPoints;
  }, [orbit, segments]);

  return (
    <Line
      points={points}
      color={color}
      lineWidth={1}
      transparent
      opacity={opacity}
    />
  );
}
