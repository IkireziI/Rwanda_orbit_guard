export type ViewMode = 'orbit' | 'top-down' | 'perspective';

export interface Vector3D {
  x: number;
  y: number;
  z: number;
}

export interface OrbitParams {
  semiMajorAxis: number; // km
  eccentricity: number;
  inclination: number; // degrees
  rightAscension: number; // degrees
  argumentOfPerigee: number; // degrees
  trueAnomaly: number; // degrees
}

export interface SatelliteData {
  id: string;
  name: string;
  type: 'communication' | 'weather' | 'navigation' | 'research' | 'military';
  position: Vector3D;
  velocity: Vector3D;
  orbit: OrbitParams;
  status: 'active' | 'inactive' | 'deorbiting';
  lastUpdate: Date;
  country?: string;
  launchDate?: Date;
}

export interface DebrisData {
  id: string;
  name: string;
  size: 'small' | 'medium' | 'large'; // < 10cm, 10cm-1m, > 1m
  position: Vector3D;
  velocity: Vector3D;
  orbit: OrbitParams;
  source?: string;
  trackingConfidence: number; // 0-1
}

export interface CollisionPrediction {
  id: string;
  object1Id: string;
  object1Name: string;
  object1Type: 'satellite' | 'debris';
  object2Id: string;
  object2Name: string;
  object2Type: 'satellite' | 'debris';
  predictedTime: Date;
  probability: number; // 0-1
  minimumDistance: number; // km
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'predicted' | 'monitoring' | 'resolved' | 'occurred';
}

export interface VisualizationFilters {
  showSatellites: boolean;
  showDebris: boolean;
  showOrbits: boolean;
  showCollisions: boolean;
  satelliteTypes: Set<SatelliteData['type']>;
  debrisSize: Set<DebrisData['size']>;
  collisionSeverity: Set<CollisionPrediction['severity']>;
}

export interface CameraPosition {
  position: Vector3D;
  target: Vector3D;
  zoom: number;
}
