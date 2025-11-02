'use client';

import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { Earth } from './Earth';
import { Satellite } from './Satellite';
import { Debris } from './Debris';
import { OrbitPath } from './OrbitPath';
import type {
  SatelliteData,
  DebrisData,
  CollisionPrediction,
  ViewMode,
  VisualizationFilters,
} from '@/lib/types/visualization';
import { Loader2 } from 'lucide-react';

interface VisualizationCanvasProps {
  satellites: SatelliteData[];
  debris: DebrisData[];
  collisions: CollisionPrediction[];
  filters: VisualizationFilters;
  viewMode: ViewMode;
  onSelectSatellite?: (satellite: SatelliteData) => void;
  onSelectDebris?: (debris: DebrisData) => void;
}

function Scene({
  satellites,
  debris,
  collisions,
  filters,
  viewMode,
  onSelectSatellite,
  onSelectDebris,
}: VisualizationCanvasProps) {
  // Filter satellites based on filters
  const filteredSatellites = satellites.filter(
    (sat) => filters.showSatellites && filters.satelliteTypes.has(sat.type)
  );

  // Filter debris based on filters
  const filteredDebris = debris.filter(
    (deb) => filters.showDebris && filters.debrisSize.has(deb.size)
  );

  // Camera position based on view mode
  const getCameraPosition = (): [number, number, number] => {
    switch (viewMode) {
      case 'top-down':
        return [0, 5, 0];
      case 'orbit':
        return [3, 2, 3];
      case 'perspective':
      default:
        return [4, 3, 4];
    }
  };

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} />

      {/* Background stars */}
      <Stars radius={300} depth={50} count={5000} factor={4} fade speed={1} />

      {/* Earth */}
      <Earth radius={1} rotationSpeed={0.0005} />

      {/* Satellites */}
      {filteredSatellites.map((satellite) => (
        <Satellite
          key={satellite.id}
          data={satellite}
          onSelect={onSelectSatellite}
        />
      ))}

      {/* Debris */}
      {filteredDebris.map((debrisObj) => (
        <Debris
          key={debrisObj.id}
          data={debrisObj}
          onSelect={onSelectDebris}
        />
      ))}

      {/* Orbit paths */}
      {filters.showOrbits &&
        filteredSatellites.slice(0, 10).map((satellite) => (
          <OrbitPath
            key={`orbit-${satellite.id}`}
            orbit={satellite.orbit}
            color="#3b82f6"
            opacity={0.2}
          />
        ))}

      {/* Camera controls */}
      <OrbitControls
        enablePan
        enableZoom
        enableRotate
        minDistance={1.5}
        maxDistance={20}
        target={[0, 0, 0]}
      />
    </>
  );
}

function LoadingFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Loading visualization...</p>
      </div>
    </div>
  );
}

export function VisualizationCanvas(props: VisualizationCanvasProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <LoadingFallback />;
  }

  return (
    <Canvas
      camera={{
        position: [4, 3, 4],
        fov: 60,
      }}
      className="bg-black"
    >
      <Suspense fallback={null}>
        <Scene {...props} />
      </Suspense>
    </Canvas>
  );
}
