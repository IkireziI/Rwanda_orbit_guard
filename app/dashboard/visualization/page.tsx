'use client';

import OrbitCanvas from '@/components/visualization/OrbitCanvas';

export default function VisualizationPage() {
  return (
    <div className="p-6 space-y-4">
      <div>
        <h1 className="text-3xl font-bold mb-2">Orbital View</h1>
        <p className="text-muted-foreground">Real-time satellite tracking and orbital debris monitoring</p>
      </div>
      <div className="w-full rounded-lg border border-border overflow-hidden" style={{ height: 560 }}>
        <OrbitCanvas />
      </div>
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2"><span className="inline-block w-3 h-3 rounded-full bg-[#60a5fa]" /> Satellites</div>
          <div className="flex items-center gap-2"><span className="inline-block w-3 h-3 rounded-full bg-[#ef4444]" /> Debris</div>
        </div>
        <span className="text-muted-foreground">Use mouse to rotate, zoom, and pan</span>
      </div>
    </div>
  );
}
