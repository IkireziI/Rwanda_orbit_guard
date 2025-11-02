'use client';

import { useState, useEffect, useMemo } from 'react';
import { VisualizationCanvas } from '@/components/visualization/VisualizationCanvas';
import { VisualizationControls } from '@/components/visualization/VisualizationControls';
import { generateMockSatellites, generateMockDebris, generateMockCollisions, updatePositions } from '@/lib/data/mockVisualizationData';
import type { SatelliteData, DebrisData, CollisionPrediction, ViewMode, VisualizationFilters } from '@/lib/types/visualization';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AlertTriangle, Satellite as SatelliteIcon, Clock } from 'lucide-react';

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

  // Filter collision predictions
  const filteredCollisions = useMemo(() => {
    return collisions.filter((collision) => filters.collisionSeverity.has(collision.severity));
  }, [collisions, filters.collisionSeverity]);

  // Calculate filtered counts
  const filteredSatelliteCount = satellites.filter((sat) => filters.satelliteTypes.has(sat.type)).length;
  const filteredDebrisCount = debris.filter((deb) => filters.debrisSize.has(deb.size)).length;

  return (
    <div className="h-full w-full p-6">
      <div className="flex flex-col gap-6 h-full">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">3D Orbit Visualization</h1>
          <p className="text-muted-foreground">
            Real-time satellite tracking and orbital debris monitoring with collision prediction
          </p>
        </div>

        {/* Main Content */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-0">
          {/* 3D Visualization Canvas */}
          <div className="lg:col-span-3 h-[600px] lg:h-full">
            <Card className="w-full h-full">
              <CardContent className="p-0 h-full">
                <VisualizationCanvas
                  satellites={satellites}
                  debris={debris}
                  collisions={filteredCollisions}
                  filters={filters}
                  viewMode={viewMode}
                  onSelectSatellite={setSelectedSatellite}
                  onSelectDebris={setSelectedDebris}
                />
              </CardContent>
            </Card>
          </div>

          {/* Controls Panel */}
          <div className="h-[600px] lg:h-full overflow-hidden">
            <ScrollArea className="h-full">
              <VisualizationControls
                filters={filters}
                viewMode={viewMode}
                satelliteCount={filteredSatelliteCount}
                debrisCount={filteredDebrisCount}
                collisionCount={filteredCollisions.length}
                onFiltersChange={setFilters}
                onViewModeChange={setViewMode}
              />
            </ScrollArea>
          </div>
        </div>

        {/* Bottom Information Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Selected Object Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <SatelliteIcon className="w-5 h-5" />
                Selected Object
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedSatellite ? (
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold mb-1">{selectedSatellite.name}</h4>
                    <Badge variant="outline" className="capitalize">
                      {selectedSatellite.type}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Status:</span>
                      <p className="font-medium capitalize">{selectedSatellite.status}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Country:</span>
                      <p className="font-medium">{selectedSatellite.country}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Altitude:</span>
                      <p className="font-medium">{Math.round(selectedSatellite.orbit.semiMajorAxis - 6371)} km</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Inclination:</span>
                      <p className="font-medium">{selectedSatellite.orbit.inclination.toFixed(2)}°</p>
                    </div>
                  </div>
                </div>
              ) : selectedDebris ? (
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold mb-1">{selectedDebris.name}</h4>
                    <Badge variant="outline" className="capitalize">
                      {selectedDebris.size} debris
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Source:</span>
                      <p className="font-medium">{selectedDebris.source}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Confidence:</span>
                      <p className="font-medium">{(selectedDebris.trackingConfidence * 100).toFixed(0)}%</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Altitude:</span>
                      <p className="font-medium">{Math.round(selectedDebris.orbit.semiMajorAxis - 6371)} km</p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">Click on a satellite or debris object to view details</p>
              )}
            </CardContent>
          </Card>

          {/* Collision Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                Collision Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px]">
                <div className="space-y-3">
                  {filteredCollisions.slice(0, 5).map((collision) => (
                    <div
                      key={collision.id}
                      className="p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="font-medium text-sm">
                          {collision.object1Name} ↔ {collision.object2Name}
                        </div>
                        <Badge
                          variant={collision.severity === 'critical' ? 'destructive' : 'outline'}
                          className="capitalize text-xs"
                        >
                          {collision.severity}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(collision.predictedTime).toLocaleString()}
                        </div>
                        <div>Probability: {(collision.probability * 100).toFixed(1)}%</div>
                        <div>Min Distance: {collision.minimumDistance.toFixed(2)} km</div>
                      </div>
                    </div>
                  ))}
                  {filteredCollisions.length === 0 && (
                    <p className="text-muted-foreground text-sm">No collision alerts match current filters</p>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
