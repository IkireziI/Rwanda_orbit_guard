'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Eye,
  EyeOff,
  Orbit,
  Satellite as SatelliteIcon,
  AlertTriangle,
  Layers,
  Search,
} from 'lucide-react';
import type { ViewMode, VisualizationFilters, SatelliteData, DebrisData } from '@/lib/types/visualization';
import { Input } from '@/components/ui/input';

interface VisualizationControlsProps {
  filters: VisualizationFilters;
  viewMode: ViewMode;
  satelliteCount: number;
  debrisCount: number;
  collisionCount: number;
  onFiltersChange: (filters: VisualizationFilters) => void;
  onViewModeChange: (mode: ViewMode) => void;
}

export function VisualizationControls({
  filters,
  viewMode,
  satelliteCount,
  debrisCount,
  collisionCount,
  onFiltersChange,
  onViewModeChange,
}: VisualizationControlsProps) {
  const updateFilters = (updates: Partial<VisualizationFilters>) => {
    onFiltersChange({ ...filters, ...updates });
  };

  const toggleSatelliteType = (type: SatelliteData['type']) => {
    const newTypes = new Set(filters.satelliteTypes);
    if (newTypes.has(type)) {
      newTypes.delete(type);
    } else {
      newTypes.add(type);
    }
    updateFilters({ satelliteTypes: newTypes });
  };

  const toggleDebrisSize = (size: DebrisData['size']) => {
    const newSizes = new Set(filters.debrisSize);
    if (newSizes.has(size)) {
      newSizes.delete(size);
    } else {
      newSizes.add(size);
    }
    updateFilters({ debrisSize: newSizes });
  };

  return (
    <Card className="w-full h-full overflow-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Layers className="w-5 h-5" />
          Visualization Controls
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Statistics */}
        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
            <SatelliteIcon className="w-4 h-4 mb-1 text-blue-500" />
            <span className="text-2xl font-bold">{satelliteCount}</span>
            <span className="text-xs text-muted-foreground">Satellites</span>
          </div>
          <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
            <AlertTriangle className="w-4 h-4 mb-1 text-orange-500" />
            <span className="text-2xl font-bold">{debrisCount}</span>
            <span className="text-xs text-muted-foreground">Debris</span>
          </div>
          <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
            <AlertTriangle className="w-4 h-4 mb-1 text-red-500" />
            <span className="text-2xl font-bold">{collisionCount}</span>
            <span className="text-xs text-muted-foreground">Alerts</span>
          </div>
        </div>

        <Separator />

        {/* View Mode */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">View Mode</Label>
          <div className="grid grid-cols-3 gap-2">
            {(['perspective', 'orbit', 'top-down'] as const).map((mode) => (
              <Button
                key={mode}
                variant={viewMode === mode ? 'default' : 'outline'}
                size="sm"
                onClick={() => onViewModeChange(mode)}
                className="capitalize"
              >
                {mode.replace('-', ' ')}
              </Button>
            ))}
          </div>
        </div>

        <Separator />

        {/* Visibility Toggles */}
        <Tabs defaultValue="display" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="display">Display</TabsTrigger>
            <TabsTrigger value="filters">Filters</TabsTrigger>
          </TabsList>

          <TabsContent value="display" className="space-y-4 mt-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="show-satellites" className="flex items-center gap-2">
                  <SatelliteIcon className="w-4 h-4" />
                  Show Satellites
                </Label>
                <Switch
                  id="show-satellites"
                  checked={filters.showSatellites}
                  onCheckedChange={(checked) => updateFilters({ showSatellites: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="show-debris" className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Show Debris
                </Label>
                <Switch
                  id="show-debris"
                  checked={filters.showDebris}
                  onCheckedChange={(checked) => updateFilters({ showDebris: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="show-orbits" className="flex items-center gap-2">
                  <Orbit className="w-4 h-4" />
                  Show Orbits
                </Label>
                <Switch
                  id="show-orbits"
                  checked={filters.showOrbits}
                  onCheckedChange={(checked) => updateFilters({ showOrbits: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="show-collisions" className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Show Collision Alerts
                </Label>
                <Switch
                  id="show-collisions"
                  checked={filters.showCollisions}
                  onCheckedChange={(checked) => updateFilters({ showCollisions: checked })}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="filters" className="space-y-4 mt-4">
            <div className="space-y-3">
              <div>
                <Label className="text-sm font-medium mb-2 block">Satellite Types</Label>
                <div className="flex flex-wrap gap-2">
                  {(['communication', 'weather', 'navigation', 'research', 'military'] as const).map((type) => (
                    <Badge
                      key={type}
                      variant={filters.satelliteTypes.has(type) ? 'default' : 'outline'}
                      className="cursor-pointer capitalize"
                      onClick={() => toggleSatelliteType(type)}
                    >
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <Label className="text-sm font-medium mb-2 block">Debris Size</Label>
                <div className="flex flex-wrap gap-2">
                  {(['small', 'medium', 'large'] as const).map((size) => (
                    <Badge
                      key={size}
                      variant={filters.debrisSize.has(size) ? 'default' : 'outline'}
                      className="cursor-pointer capitalize"
                      onClick={() => toggleDebrisSize(size)}
                    >
                      {size}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <Separator />

        {/* Quick Actions */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Quick Actions</Label>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                updateFilters({
                  showSatellites: true,
                  showDebris: true,
                  showOrbits: true,
                  showCollisions: true,
                  satelliteTypes: new Set(['communication', 'weather', 'navigation', 'research', 'military']),
                  debrisSize: new Set(['small', 'medium', 'large']),
                  collisionSeverity: new Set(['low', 'medium', 'high', 'critical']),
                });
              }}
            >
              <Eye className="w-4 h-4 mr-1" />
              Show All
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                updateFilters({
                  showSatellites: false,
                  showDebris: false,
                  showOrbits: false,
                  showCollisions: false,
                });
              }}
            >
              <EyeOff className="w-4 h-4 mr-1" />
              Hide All
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
