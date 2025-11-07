import { OrbitViewer } from "@/components/visualization/OrbitCanvas"

export default function VisualizationPage() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-balance">3D Orbital Visualization</h1>
        <p className="text-muted-foreground">Interactive view of satellites and space debris in Low Earth Orbit</p>
      </div>

      {/* Visualization */}
      <OrbitViewer />
    </div>
  )
}