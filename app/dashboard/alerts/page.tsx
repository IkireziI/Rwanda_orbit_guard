"use client"

import { useState } from "react"
import { AlertCircle, Clock, MapPin, TrendingUp, Download, Eye, Search } from "lucide-react"

interface CollisionAlert {
  id: string
  satellite1: string
  satellite2: string
  missDistance: number
  probability: number
  predictedTime: string
  severity: "critical" | "high" | "medium" | "low"
  riskWindow: string
}

interface PredictionResponse {
  status: 'RED ALERT' | 'GREEN LIGHT'
  miss_distance_km: number
  safety_threshold_km: number
  model_rmse_meters: number
}

const mockAlerts: CollisionAlert[] = [
  {
    id: "ALERT-001",
    satellite1: "SAT-025",
    satellite2: "DEB-892",
    missDistance: 0.8,
    probability: 62,
    predictedTime: "2025-11-05 14:30 UTC",
    severity: "critical",
    riskWindow: "±2 hours",
  },
  {
    id: "ALERT-002",
    satellite1: "SAT-087",
    satellite2: "DEB-156",
    missDistance: 2.3,
    probability: 15,
    predictedTime: "2025-11-06 09:15 UTC",
    severity: "low",
    riskWindow: "±4 hours",
  },
  {
    id: "ALERT-003",
    satellite1: "SAT-042",
    satellite2: "DEB-521",
    missDistance: 1.5,
    probability: 35,
    predictedTime: "2025-11-07 18:45 UTC",
    severity: "high",
    riskWindow: "±3 hours",
  },
  {
    id: "ALERT-004",
    satellite1: "SAT-156",
    satellite2: "DEB-234",
    missDistance: 3.2,
    probability: 8,
    predictedTime: "2025-11-08 11:20 UTC",
    severity: "low",
    riskWindow: "±5 hours",
  },
]

const severityColor = {
  critical: "bg-red-500/20 text-red-400 border-red-500/50",
  high: "bg-orange-500/20 text-orange-400 border-orange-500/50",
  medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/50",
  low: "bg-green-500/20 text-green-400 border-green-500/50",
}

export default function CollisionPredictionPage() {
  const [selectedAlert, setSelectedAlert] = useState<CollisionAlert | null>(null)
  const [filterSeverity, setFilterSeverity] = useState<"all" | "critical" | "high" | "medium" | "low">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [minDistance, setMinDistance] = useState(0)
  const [maxProbability, setMaxProbability] = useState(100)

  // Form state
  const [xs, setXs] = useState("")
  const [ys, setYs] = useState("")
  const [zs, setZs] = useState("")
  const [vx, setVx] = useState("")
  const [vy, setVy] = useState("")
  const [vz, setVz] = useState("")

  // Prediction state
  const [prediction, setPrediction] = useState<PredictionResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const filtered = mockAlerts.filter((alert) => {
    const matchesSeverity = filterSeverity === "all" || alert.severity === filterSeverity
    const matchesSearch =
      searchQuery === "" ||
      alert.satellite1.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.satellite2.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDistance = alert.missDistance >= minDistance
    const matchesProbability = alert.probability <= maxProbability

    return matchesSeverity && matchesSearch && matchesDistance && matchesProbability
  })

  const handlePredict = async () => {
    // Validate inputs
    if (!xs || !ys || !zs || !vx || !vy || !vz) {
      setError("Please fill in all fields")
      return
    }

    setIsLoading(true)
    setError(null)
    setPrediction(null)

    try {
      const response = await fetch('https://backend-rwanda-orbit-guard.onrender.com/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          x_start: parseFloat(xs),
          y_start: parseFloat(ys),
          z_start: parseFloat(zs),
          Vx_start: parseFloat(vx),
          Vy_start: parseFloat(vy),
          Vz_start: parseFloat(vz),
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: PredictionResponse = await response.json()
      setPrediction(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get prediction')
    } finally {
      setIsLoading(false)
    }
  }

  const getPredictionColor = (status: string) => {
    return status === 'RED ALERT' 
      ? 'bg-red-500/20 text-red-400 border-red-500/50' 
      : 'bg-green-500/20 text-green-400 border-green-500/50'
  }

  const getPredictionIcon = (status: string) => {
    return status === 'RED ALERT' ? '🚨' : '✅'
  }

  const getSeverityFromStatus = (status: string): "critical" | "low" => {
    return status === 'RED ALERT' ? 'critical' : 'low'
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-text-primary mb-2">Collision Prediction</h1>
        <p className="text-text-secondary">Predict potential orbital collisions and debris events</p>
      </div>

      {/* Prediction Form */}
      <div className="p-4 bg-surface rounded-lg border border-border">
        <h2 className="text-lg font-bold text-text-primary mb-4">Collision Prediction Input</h2>

        <div className="space-y-4">
          {/* Position Inputs */}
          <div>
            <h3 className="text-sm font-semibold text-primary mb-3">Position (meters)</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-text-primary font-medium text-sm mb-2">Xs (X Start)</label>
                <input
                  type="number"
                  value={xs}
                  onChange={(e) => setXs(e.target.value)}
                  placeholder="Enter X position"
                  className="w-full px-3 py-2 rounded-lg bg-surface-secondary border border-border text-text-primary placeholder-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
              </div>
              <div>
                <label className="block text-text-primary font-medium text-sm mb-2">Ys (Y Start)</label>
                <input
                  type="number"
                  value={ys}
                  onChange={(e) => setYs(e.target.value)}
                  placeholder="Enter Y position"
                  className="w-full px-3 py-2 rounded-lg bg-surface-secondary border border-border text-text-primary placeholder-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
              </div>
              <div>
                <label className="block text-text-primary font-medium text-sm mb-2">Zs (Z Start)</label>
                <input
                  type="number"
                  value={zs}
                  onChange={(e) => setZs(e.target.value)}
                  placeholder="Enter Z position"
                  className="w-full px-3 py-2 rounded-lg bg-surface-secondary border border-border text-text-primary placeholder-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
              </div>
            </div>
          </div>

          {/* Velocity Inputs */}
          <div>
            <h3 className="text-sm font-semibold text-primary mb-3">Velocity (m/s)</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-text-primary font-medium text-sm mb-2">Vx (Velocity X)</label>
                <input
                  type="number"
                  value={vx}
                  onChange={(e) => setVx(e.target.value)}
                  placeholder="Enter X velocity"
                  className="w-full px-3 py-2 rounded-lg bg-surface-secondary border border-border text-text-primary placeholder-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
              </div>
              <div>
                <label className="block text-text-primary font-medium text-sm mb-2">Vy (Velocity Y)</label>
                <input
                  type="number"
                  value={vy}
                  onChange={(e) => setVy(e.target.value)}
                  placeholder="Enter Y velocity"
                  className="w-full px-3 py-2 rounded-lg bg-surface-secondary border border-border text-text-primary placeholder-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
              </div>
              <div>
                <label className="block text-text-primary font-medium text-sm mb-2">Vz (Velocity Z)</label>
                <input
                  type="number"
                  value={vz}
                  onChange={(e) => setVz(e.target.value)}
                  placeholder="Enter Z velocity"
                  className="w-full px-3 py-2 rounded-lg bg-surface-secondary border border-border text-text-primary placeholder-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-400">
              {error}
            </div>
          )}

          {/* Prediction Result */}
          {prediction && (
            <div className={`p-4 rounded-lg border ${getPredictionColor(prediction.status)}`}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{getPredictionIcon(prediction.status)}</span>
                <div>
                  <h3 className="text-lg font-bold">{prediction.status}</h3>
                  <p className="text-sm opacity-80">
                    Miss Distance: {prediction.miss_distance_km.toFixed(2)} km
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="opacity-70">Safety Threshold</div>
                  <div className="font-medium">{prediction.safety_threshold_km} km</div>
                </div>
                <div>
                  <div className="opacity-70">Model Accuracy</div>
                  <div className="font-medium">{prediction.model_rmse_meters} m RMSE</div>
                </div>
                <div>
                  <div className="opacity-70">Risk Level</div>
                  <div className="font-medium capitalize">
                    {getSeverityFromStatus(prediction.status)}
                  </div>
                </div>
              </div>
            </div>
          )}

          <button 
            onClick={handlePredict}
            disabled={isLoading}
            className="w-full mt-4 px-4 py-2 rounded-lg bg-primary text-background font-medium hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Predicting...' : 'Predict Collision Risk'}
          </button>

          {/* Sample Data Helper */}
          <div className="text-sm text-text-secondary">
            <p className="mb-2">Try these sample values for testing:</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button 
                onClick={() => {
                  setXs("1000")
                  setYs("1000")
                  setZs("1000")
                  setVx("-0.907527")
                  setVy("-3.804930")
                  setVz("-2.024133")
                }}
                className="p-2 rounded border border-border hover:border-primary transition"
              >
                RED ALERT Sample
              </button>
              <button 
                onClick={() => {
                  setXs("-8843.131454")
                  setYs("13138.221690")
                  setZs("100000.0")
                  setVx("-0.907527")
                  setVy("-3.804930")
                  setVz("-2.024133")
                }}
                className="p-2 rounded border border-border hover:border-primary transition"
              >
                GREEN LIGHT Sample
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Existing Alerts Section */}
      <div className="space-y-4">
        {/* Severity Filter Buttons */}
        <div className="flex gap-2 flex-wrap">
          {(["all", "critical", "high", "medium", "low"] as const).map((severity) => (
            <button
              key={severity}
              onClick={() => setFilterSeverity(severity)}
              className={`px-4 py-2 rounded-lg transition ${
                filterSeverity === severity
                  ? "bg-primary text-background"
                  : "bg-surface border border-border text-text-secondary hover:border-primary"
              }`}
            >
              {severity === "all" ? "All" : severity.charAt(0).toUpperCase() + severity.slice(1)}
            </button>
          ))}
          <button className="px-4 py-2 rounded-lg bg-surface border border-border text-text-secondary hover:border-primary transition flex items-center gap-2 ml-auto">
            <Download className="w-5 h-5" />
            Export
          </button>
        </div>

        {/* Search and Filter Inputs */}
        <div className="grid grid-cols-3 gap-4 p-4 bg-surface rounded-lg border border-border">
          {/* Search Input */}
          <div>
            <label className="block text-text-primary font-medium text-sm mb-2">Search Objects</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search satellite or debris..."
                className="w-full pl-10 pr-3 py-2 rounded-lg bg-surface-secondary border border-border text-text-primary placeholder-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />
            </div>
          </div>

          {/* Min Distance Input */}
          <div>
            <label className="block text-text-primary font-medium text-sm mb-2">Min Distance (km)</label>
            <input
              type="number"
              value={minDistance}
              onChange={(e) => setMinDistance(Number.parseFloat(e.target.value))}
              placeholder="0"
              className="w-full px-3 py-2 rounded-lg bg-surface-secondary border border-border text-text-primary placeholder-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            />
          </div>

          {/* Max Probability Input */}
          <div>
            <label className="block text-text-primary font-medium text-sm mb-2">Max Probability (%)</label>
            <input
              type="number"
              value={maxProbability}
              onChange={(e) => setMaxProbability(Number.parseFloat(e.target.value))}
              placeholder="100"
              className="w-full px-3 py-2 rounded-lg bg-surface-secondary border border-border text-text-primary placeholder-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            />
          </div>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {filtered.length > 0 ? (
          filtered.map((alert) => (
            <div
              key={alert.id}
              className={`p-6 rounded-lg border ${severityColor[alert.severity]} bg-opacity-10 cursor-pointer hover:bg-opacity-20 transition`}
              onClick={() => setSelectedAlert(selectedAlert?.id === alert.id ? null : alert)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-current/20 flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-text-primary">{alert.id}</h3>
                      <span className="px-3 py-1 rounded text-xs font-medium bg-current/30">
                        {alert.severity.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-text-secondary">
                      {alert.satellite1} approaching {alert.satellite2}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-text-primary">{alert.probability}%</div>
                  <div className="text-text-secondary text-sm">Collision Probability</div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 pt-4 border-t border-current/20">
                <div className="flex items-center gap-2 text-text-secondary">
                  <MapPin className="w-4 h-4" />
                  <div>
                    <div className="text-xs text-text-secondary">Miss Distance</div>
                    <div className="text-text-primary font-medium">{alert.missDistance} km</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-text-secondary">
                  <Clock className="w-4 h-4" />
                  <div>
                    <div className="text-xs text-text-secondary">Predicted Time</div>
                    <div className="text-text-primary font-medium text-sm">{alert.predictedTime}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-text-secondary">
                  <TrendingUp className="w-4 h-4" />
                  <div>
                    <div className="text-xs text-text-secondary">Risk Window</div>
                    <div className="text-text-primary font-medium">{alert.riskWindow}</div>
                  </div>
                </div>
                <button className="px-4 py-2 rounded-lg bg-current/20 hover:bg-current/30 transition font-medium text-sm flex items-center gap-2 justify-center">
                  <Eye className="w-4 h-4" />
                  Details
                </button>
              </div>

              {selectedAlert?.id === alert.id && (
                <div className="mt-4 pt-4 border-t border-current/20 space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-text-secondary mb-1">Satellite Status</div>
                      <div className="text-sm text-text-primary">Active - Operational</div>
                    </div>
                    <div>
                      <div className="text-xs text-text-secondary mb-1">Debris Classification</div>
                      <div className="text-sm text-text-primary">Rocket Body - 250kg</div>
                    </div>
                    <div>
                      <div className="text-xs text-text-secondary mb-1">Recommended Action</div>
                      <div className="text-sm text-text-primary">Monitor - Prepare Maneuver</div>
                    </div>
                    <div>
                      <div className="text-xs text-text-secondary mb-1">Last Updated</div>
                      <div className="text-sm text-text-primary">2 minutes ago</div>
                    </div>
                  </div>
                  <button className="w-full px-4 py-2 rounded-lg bg-current/30 hover:bg-current/40 transition font-medium text-sm">
                    Request Collision Avoidance Maneuver
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center p-8 rounded-lg border border-border bg-surface">
            <p className="text-text-secondary">No events match your filter criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}