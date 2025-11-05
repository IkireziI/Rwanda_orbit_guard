"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Stars, Html } from "@react-three/drei"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, RotateCcw } from 'lucide-react'
import type * as THREE from "three"

interface OrbitalObject {
  id: string
  name: string
  type: "satellite" | "debris"
  altitude: number
  angle: number
  speed: number
  color: string
  status?: string
}

const mockObjects: OrbitalObject[] = [
  {
    id: "1",
    name: "RwaSat-1",
    type: "satellite",
    altitude: 575,
    angle: 0,
    speed: 0.5,
    color: "#60a5fa",
    status: "operational",
  },
  {
    id: "2",
    name: "ISS",
    type: "satellite",
    altitude: 408,
    angle: 120,
    speed: 0.6,
    color: "#34d399",
    status: "operational",
  },
  {
    id: "3",
    name: "Starlink-2847",
    type: "satellite",
    altitude: 550,
    angle: 240,
    speed: 0.55,
    color: "#fbbf24",
    status: "warning",
  },
  { id: "4", name: "Debris-A", type: "debris", altitude: 560, angle: 45, speed: 0.4, color: "#f87171" },
  { id: "5", name: "Debris-B", type: "debris", altitude: 420, angle: 180, speed: 0.45, color: "#f87171" },
  { id: "6", name: "Debris-C", type: "debris", altitude: 590, angle: 300, speed: 0.35, color: "#f87171" },
]

function Earth() {
  return (
    <mesh>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial
        color="#1e40af"
        emissive="#1e3a8a"
        emissiveIntensity={0.2}
        roughness={0.8}
        metalness={0.2}
      />
    </mesh>
  )
}

function OrbitRing({ radius, color }: { radius: number; color: string }) {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, 0.01, 16, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.3} />
    </mesh>
  )
}

function OrbitalObjectMesh({
  obj,
  isPlaying,
  onSelect,
}: {
  obj: OrbitalObject
  isPlaying: boolean
  onSelect: () => void
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [angle, setAngle] = useState(obj.angle)

  useFrame(() => {
    if (!meshRef.current || !isPlaying) return

    // Update angle
    setAngle((prev) => (prev + obj.speed * 0.5) % 360)

    // Calculate position
    const radius = 2 + obj.altitude * 0.01
    const radian = (angle * Math.PI) / 180
    meshRef.current.position.x = Math.cos(radian) * radius
    meshRef.current.position.z = Math.sin(radian) * radius
    meshRef.current.position.y = 0
  })

  const radius = 2 + obj.altitude * 0.01
  const radian = (angle * Math.PI) / 180
  const size = obj.type === "satellite" ? 0.15 : 0.1

  return (
    <group>
      <mesh
        ref={meshRef}
        position={[Math.cos(radian) * radius, 0, Math.sin(radian) * radius]}
        onClick={(e) => {
          e.stopPropagation()
          onSelect()
        }}
      >
        <sphereGeometry args={[size, 16, 16]} />
        <meshStandardMaterial color={obj.color} emissive={obj.color} emissiveIntensity={0.5} />
      </mesh>
      {obj.type === "satellite" && (
        <Html position={[Math.cos(radian) * radius, 0.3, Math.sin(radian) * radius]}>
          <div className="text-white text-xs whitespace-nowrap pointer-events-none">{obj.name}</div>
        </Html>
      )}
    </group>
  )
}

function Scene({
  objects,
  isPlaying,
  onSelectObject,
}: {
  objects: OrbitalObject[]
  isPlaying: boolean
  onSelectObject: (obj: OrbitalObject) => void
}) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      <Earth />

      {objects.map((obj) => {
        const radius = 2 + obj.altitude * 0.01
        return (
          <group key={obj.id}>
            <OrbitRing radius={radius} color={obj.color} />
            <OrbitalObjectMesh obj={obj} isPlaying={isPlaying} onSelect={() => onSelectObject(obj)} />
          </group>
        )
      })}

      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} minDistance={5} maxDistance={30} />
    </>
  )
}

export function OrbitViewer() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [selectedObject, setSelectedObject] = useState<OrbitalObject | null>(null)
  const [objects] = useState<OrbitalObject[]>(mockObjects)

  const handleReset = () => {
    setSelectedObject(null)
  }

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Visualization Canvas */}
      <Card className="lg:col-span-2 border-border/50 bg-card/50 backdrop-blur-sm p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Orbital View</h3>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" onClick={() => setIsPlaying(!isPlaying)}>
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <Button size="sm" variant="outline" onClick={handleReset}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="w-full h-[600px] bg-background/50 rounded-lg overflow-hidden">
            <Canvas camera={{ position: [0, 8, 12], fov: 50 }}>
              <Scene objects={objects} isPlaying={isPlaying} onSelectObject={setSelectedObject} />
            </Canvas>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-[#60a5fa]" />
              <span className="text-muted-foreground">Satellites</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-[#f87171]" />
              <span className="text-muted-foreground">Debris</span>
            </div>
            <p className="text-muted-foreground ml-auto">Use mouse to rotate, zoom, and pan</p>
          </div>
        </div>
      </Card>

      {/* Object Details Panel */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm p-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Object Details</h3>
          {selectedObject ? (
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-semibold text-xl">{selectedObject.name}</h4>
                  {selectedObject.status && (
                    <Badge variant={selectedObject.status === "operational" ? "secondary" : "destructive"}>
                      {selectedObject.status}
                    </Badge>
                  )}
                </div>
                <Badge variant="outline">{selectedObject.type}</Badge>
              </div>

              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-background/50">
                  <p className="text-sm text-muted-foreground">Altitude</p>
                  <p className="text-lg font-semibold">{selectedObject.altitude} km</p>
                </div>
                <div className="p-3 rounded-lg bg-background/50">
                  <p className="text-sm text-muted-foreground">Orbital Speed</p>
                  <p className="text-lg font-semibold">{(selectedObject.speed * 10000).toFixed(0)} km/h</p>
                </div>
                <div className="p-3 rounded-lg bg-background/50">
                  <p className="text-sm text-muted-foreground">Current Position</p>
                  <p className="text-lg font-semibold">{selectedObject.angle.toFixed(1)}°</p>
                </div>
              </div>

              {selectedObject.type === "satellite" && (
                <div className="pt-4 space-y-2">
                  <Button className="w-full bg-transparent" variant="outline">
                    View Trajectory
                  </Button>
                  <Button className="w-full bg-transparent" variant="outline">
                    Generate Report
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <p>Click on an object to view details</p>
            </div>
          )}
        </div>
      </Card>

      {/* Objects List */}
      <Card className="lg:col-span-3 border-border/50 bg-card/50 backdrop-blur-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Tracked Objects</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {objects.map((obj) => (
            <button
              key={obj.id}
              onClick={() => setSelectedObject(obj)}
              className={`p-4 rounded-lg border text-left transition-colors ${
                selectedObject?.id === obj.id
                  ? "border-primary bg-primary/10"
                  : "border-border/50 bg-background/30 hover:bg-background/50"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: obj.color }} />
                <span className="font-semibold">{obj.name}</span>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>Type: {obj.type}</p>
                <p>Altitude: {obj.altitude} km</p>
              </div>
            </button>
          ))}
        </div>
      </Card>
    </div>
  )
}
