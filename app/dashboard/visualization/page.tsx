'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { VisualizationCanvas } from '@/components/visualization/VisualizationCanvas';
import { generateMockSatellites, generateMockDebris, generateMockCollisions, updatePositions } from '@/lib/data/mockVisualizationData';
import type { SatelliteData, DebrisData, CollisionPrediction, ViewMode, VisualizationFilters } from '@/lib/types/visualization';
import { Card, CardContent } from '@/components/ui/card';
import { RotateCcw, LayoutGrid } from 'lucide-react';

export default function VisualizationPage() {
  // Initialize mock data
  const [satellites, setSatellites] = useState<SatelliteData[]>([]);
  const [debris, setDebris] = useState<DebrisData[]>([]);
  const [collisions, setCollisions] = useState<CollisionPrediction[]>([]);
  const [selectedSatellite, setSelectedSatellite] = useState<SatelliteData | null>(null);
  const [selectedDebris, setSelectedDebris] = useState<DebrisData | null>(null);

  // Visualization state
  const [viewMode, setViewMode] = useState<ViewMode>('perspective');
  const [filters, setFilters] = useState<VisualizationFilters>({
    showSatellites: true,
    showDebris: true,
    showOrbits: true,
    showCollisions: true,
    satelliteTypes: new Set(['communication', 'weather', 'navigation', 'research', 'military']),
    debrisSize: new Set(['small', 'medium', 'large']),
    collisionSeverity: new Set(['low', 'medium', 'high', 'critical']),
  });

  // Initialize data on mount
  useEffect(() => {
    const mockSatellites = generateMockSatellites(50);
    // Give a few recognizable names for clarity in the scene
    if (mockSatellites.length >= 3) {
      mockSatellites[0].name = 'RwaSat-1';
      mockSatellites[1].name = 'ISS';
      mockSatellites[2].name = 'Starlink-2847';
    }
    const mockDebris = generateMockDebris(100);
    const mockCollisions = generateMockCollisions(mockSatellites, mockDebris, 15);

    setSatellites(mockSatellites);
    setDebris(mockDebris);
    setCollisions(mockCollisions);
  }, []);

  // Real-time position updates
  useEffect(() => {
    const interval = setInterval(() => {
      const time = Date.now() / 1000;
      setSatellites((prev) => {
        updatePositions(prev, time);
        return [...prev];
      });
      setDebris((prev) => {
        updatePositions(prev, time);
        return [...prev];
      });
    }, 1000 / 30); // 30 FPS

    return () => clearInterval(interval);
  }, []);

  // Filter collision predictions (kept internally; not displayed)
  const filteredCollisions = useMemo(() => {
    return collisions.filter((collision) => filters.collisionSeverity.has(collision.severity));
  }, [collisions, filters.collisionSeverity]);

  // Controls ref for reset
  const controlsRef = useRef<any>(null);

  // Display lists
  const displaySats = useMemo(() => satellites.slice(0, 3), [satellites]);
  const displayDebris = useMemo(() => {
    const names = ['Debris-A', 'Debris-B', 'Debris-C'];
    return debris.slice(0, 3).map((d, i) => ({ ...d, name: names[i] }));
  }, [debris]);

  return (
    <div className="h-full w-full p-6">
      <div className="flex flex-col gap-6 h-full">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Orbital View</h1>
          <p className="text-muted-foreground">Real-time satellite tracking and orbital debris monitoring</p>
        </div>

        {/* 3D Canvas only */}
        <Card className="relative w-full overflow-hidden" style={{ height: 560 }}>
          {/* Top-right overlay controls */}
          <div className="absolute top-3 right-3 z-10 flex gap-2">
            <button
              onClick={() => setViewMode((m) => (m === 'perspective' ? 'top-down' : m === 'top-down' ? 'orbit' : 'perspective'))}
              className="p-2 rounded-md bg-black/40 text-white hover:bg-black/60 border border-white/10"
              title="Cycle view"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => controlsRef?.current?.reset?.()}
              className="p-2 rounded-md bg-black/40 text-white hover:bg-black/60 border border-white/10"
              title="Reset camera"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
          <CardContent className="p-0 h-full" style={{ height: '100%' }}>
            <VisualizationCanvas
              satellites={satellites}
              debris={debris}
              collisions={filteredCollisions}
              filters={filters}
              viewMode={viewMode}
              onSelectSatellite={setSelectedSatellite}
              onSelectDebris={setSelectedDebris}
              controlsRef={controlsRef}
            />
          </CardContent>
        </Card>

        {/* Legend + instruction */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded-full bg-blue-400" />
              <span className="text-sm text-muted-foreground">Satellites</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded-full bg-red-400" />
              <span className="text-sm text-muted-foreground">Debris</span>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">Use mouse to rotate, zoom, and pan</div>
        </div>

        {/* Tracked Objects */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Tracked Objects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displaySats.map((s) => (
              <div key={s.id} className="p-5 rounded-lg border border-border bg-surface">
                <div className="flex items-center gap-3 mb-2">
                  <span className="inline-block w-3 h-3 rounded-full bg-blue-400" />
                  <div className="text-lg font-semibold">{s.name}</div>
                </div>
                <div className="text-sm text-muted-foreground">Type: satellite</div>
                <div className="text-sm mt-1">Altitude: {Math.round(s.orbit.semiMajorAxis - 6371)} km</div>
              </div>
            ))}
            {displayDebris.map((d) => (
              <div key={d.id} className="p-5 rounded-lg border border-border bg-surface">
                <div className="flex items-center gap-3 mb-2">
                  <span className="inline-block w-3 h-3 rounded-full bg-red-400" />
                  <div className="text-lg font-semibold">{d.name}</div>
                </div>
                <div className="text-sm text-muted-foreground">Type: debris</div>
                <div className="text-sm mt-1">Altitude: {Math.round(d.orbit.semiMajorAxis - 6371)} km</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
