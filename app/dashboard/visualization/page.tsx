'use client';

import { OrbitViewer } from '@/components/visualization/OrbitViewer';

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
    <div className="p-6">
      <OrbitViewer />
    </div>
  );
}
