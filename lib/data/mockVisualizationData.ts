import type { SatelliteData, DebrisData, CollisionPrediction, Vector3D, OrbitParams } from '@/lib/types/visualization';

const EARTH_RADIUS = 6371; // km

/**
 * Convert orbital elements to Cartesian coordinates
 * Simplified implementation for mock data
 */
function orbitToCartesian(orbit: OrbitParams, time: number = 0): Vector3D {
  const { semiMajorAxis, eccentricity, inclination, rightAscension, argumentOfPerigee, trueAnomaly } = orbit;
  
  // Convert to radians
  const i = (inclination * Math.PI) / 180;
  const omega = (rightAscension * Math.PI) / 180;
  const w = (argumentOfPerigee * Math.PI) / 180;
  const theta = ((trueAnomaly + time * 0.1) * Math.PI) / 180; // Simple time progression
  
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
  
  return { x, y, z };
}

/**
 * Generate mock satellite data
 */
export function generateMockSatellites(count: number = 50): SatelliteData[] {
  const types: SatelliteData['type'][] = ['communication', 'weather', 'navigation', 'research', 'military'];
  const statuses: SatelliteData['status'][] = ['active', 'active', 'active', 'inactive', 'deorbiting'];
  const countries = ['Rwanda', 'USA', 'China', 'Russia', 'EU', 'India', 'Japan', 'UK'];
  
  return Array.from({ length: count }, (_, i) => {
    const orbit: OrbitParams = {
      semiMajorAxis: EARTH_RADIUS + 400 + Math.random() * 35000, // LEO to GEO
      eccentricity: Math.random() * 0.1,
      inclination: Math.random() * 180,
      rightAscension: Math.random() * 360,
      argumentOfPerigee: Math.random() * 360,
      trueAnomaly: Math.random() * 360,
    };
    
    const position = orbitToCartesian(orbit);
    const velocity: Vector3D = {
      x: Math.random() * 8 - 4,
      y: Math.random() * 8 - 4,
      z: Math.random() * 8 - 4,
    };
    
    return {
      id: `sat-${i + 1}`,
      name: `SAT-${String(i + 1).padStart(4, '0')}`,
      type: types[Math.floor(Math.random() * types.length)],
      position,
      velocity,
      orbit,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      lastUpdate: new Date(Date.now() - Math.random() * 3600000),
      country: countries[Math.floor(Math.random() * countries.length)],
      launchDate: new Date(Date.now() - Math.random() * 10 * 365 * 24 * 3600000),
    };
  });
}

/**
 * Generate mock debris data
 */
export function generateMockDebris(count: number = 100): DebrisData[] {
  const sizes: DebrisData['size'][] = ['small', 'small', 'small', 'medium', 'large'];
  const sources = ['Rocket body', 'Satellite fragmentation', 'Collision', 'Mission-related', 'Unknown'];
  
  return Array.from({ length: count }, (_, i) => {
    const orbit: OrbitParams = {
      semiMajorAxis: EARTH_RADIUS + 300 + Math.random() * 2000, // Mostly LEO
      eccentricity: Math.random() * 0.3,
      inclination: Math.random() * 180,
      rightAscension: Math.random() * 360,
      argumentOfPerigee: Math.random() * 360,
      trueAnomaly: Math.random() * 360,
    };
    
    const position = orbitToCartesian(orbit);
    const velocity: Vector3D = {
      x: Math.random() * 10 - 5,
      y: Math.random() * 10 - 5,
      z: Math.random() * 10 - 5,
    };
    
    return {
      id: `debris-${i + 1}`,
      name: `DEBRIS-${String(i + 1).padStart(5, '0')}`,
      size: sizes[Math.floor(Math.random() * sizes.length)],
      position,
      velocity,
      orbit,
      source: sources[Math.floor(Math.random() * sources.length)],
      trackingConfidence: 0.4 + Math.random() * 0.6,
    };
  });
}

/**
 * Generate mock collision predictions
 */
export function generateMockCollisions(
  satellites: SatelliteData[],
  debris: DebrisData[],
  count: number = 10
): CollisionPrediction[] {
  const severities: CollisionPrediction['severity'][] = ['low', 'low', 'medium', 'high', 'critical'];
  const statuses: CollisionPrediction['status'][] = ['predicted', 'monitoring', 'resolved'];
  
  return Array.from({ length: count }, (_, i) => {
    const useSatellite1 = Math.random() > 0.5;
    const useSatellite2 = Math.random() > 0.3;
    
    const obj1 = useSatellite1
      ? satellites[Math.floor(Math.random() * satellites.length)]
      : debris[Math.floor(Math.random() * debris.length)];
    
    const obj2 = useSatellite2
      ? satellites[Math.floor(Math.random() * satellites.length)]
      : debris[Math.floor(Math.random() * debris.length)];
    
    const severity = severities[Math.floor(Math.random() * severities.length)];
    const probability = severity === 'critical' ? 0.7 + Math.random() * 0.3 :
                        severity === 'high' ? 0.4 + Math.random() * 0.3 :
                        severity === 'medium' ? 0.2 + Math.random() * 0.2 :
                        0.05 + Math.random() * 0.15;
    
    return {
      id: `collision-${i + 1}`,
      object1Id: obj1.id,
      object1Name: obj1.name,
      object1Type: useSatellite1 ? 'satellite' : 'debris',
      object2Id: obj2.id,
      object2Name: obj2.name,
      object2Type: useSatellite2 ? 'satellite' : 'debris',
      predictedTime: new Date(Date.now() + Math.random() * 7 * 24 * 3600000),
      probability,
      minimumDistance: Math.random() * 50,
      severity,
      status: statuses[Math.floor(Math.random() * statuses.length)],
    };
  });
}

/**
 * Update positions based on time (simple simulation)
 */
export function updatePositions(
  objects: (SatelliteData | DebrisData)[],
  deltaTime: number
): void {
  objects.forEach(obj => {
    // Simple orbital propagation (not physically accurate, for visualization only)
    obj.position = orbitToCartesian(obj.orbit, deltaTime);
  });
}
