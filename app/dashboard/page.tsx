"use client"

import { useEffect, useState } from "react"
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { Satellite, AlertCircle, TrendingUp, Activity, RefreshCw } from "lucide-react"

interface DashboardStats {
  totalSatellites: number
  activeAlerts: number
  healthStatus: number // percentage 0-100
  predictionAccuracy: number // fraction 0-1
}

interface ChartData {
  time: string
  satellites: number
  debris: number
  collisions: number
}

const mockChartData: ChartData[] = [
  { time: "00:00", satellites: 980, debris: 2400, collisions: 0 },
  { time: "04:00", satellites: 990, debris: 2210, collisions: 1 },
  { time: "08:00", satellites: 995, debris: 2290, collisions: 2 },
  { time: "12:00", satellites: 1000, debris: 2000, collisions: 1 },
  { time: "16:00", satellites: 1002, debris: 2181, collisions: 3 },
  { time: "20:00", satellites: 1004, debris: 2500, collisions: 2 },
  { time: "24:00", satellites: 1004, debris: 2100, collisions: 0 },
]

const mockAlertDistribution = [
  { name: "Low Risk", value: 45 },
  { name: "Medium Risk", value: 35 },
  { name: "High Risk", value: 20 },
]

const mockOrbitalHealth = [
  { altitude: "LEO (200-2000km)", satellites: 450, health: 94 },
  { altitude: "MEO (2000-35786km)", satellites: 180, health: 98 },
  { altitude: "GEO (35786km)", satellites: 380, health: 99 },
  { altitude: "HEO (>35786km)", satellites: 40, health: 96 },
]

const COLORS = ["#2ed573", "#ffa502", "#ff4757"]

export default function DashboardPage() {
  const [stats] = useState<DashboardStats>({
    totalSatellites: 11700,
    activeAlerts: 2,
    healthStatus: 90.0,
    predictionAccuracy: 0.9678, // 96.78%
  })

  const [lastUpdated, setLastUpdated] = useState(new Date())

  // Keep timestamp fresh without randomizing the pinned values
  useEffect(() => {
    const interval = setInterval(() => setLastUpdated(new Date()), 60_000)
    return () => clearInterval(interval)
  }, [])

  const handleRefresh = () => {
    setLastUpdated(new Date())
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">Dashboard Overview</h1>
          <p className="text-text-secondary">Real-time satellite and orbital debris monitoring</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <button
            onClick={handleRefresh}
            className="p-2 rounded-lg bg-surface border border-border text-text-secondary hover:text-primary transition flex items-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
          <p className="text-text-secondary text-xs">Updated: {lastUpdated.toLocaleTimeString()}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-6">
        {/* Total Satellites */}
        <div className="p-6 rounded-lg border border-border bg-surface hover:border-primary/50 transition">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-text-secondary text-sm mb-1">Total Satellites</p>
              <h3 className="text-3xl font-bold text-text-primary">{stats.totalSatellites}</h3>
            </div>
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <Satellite className="w-6 h-6 text-primary" />
            </div>
          </div>
          <p className="text-xs text-text-secondary">Active in orbit</p>
        </div>

        {/* Active Alerts */}
        <div className="p-6 rounded-lg border border-border bg-surface hover:border-primary/50 transition">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-text-secondary text-sm mb-1">Active Alerts</p>
              <h3 className="text-3xl font-bold text-accent-danger">{stats.activeAlerts}</h3>
            </div>
            <div className="w-10 h-10 rounded-lg bg-accent-danger/20 flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-accent-danger" />
            </div>
          </div>
          <p className="text-xs text-text-secondary">Requiring attention</p>
        </div>

        {/* System Health */}
        <div className="p-6 rounded-lg border border-border bg-surface hover:border-primary/50 transition">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-text-secondary text-sm mb-1">System Health</p>
              <h3 className="text-3xl font-bold text-accent-success">{stats.healthStatus.toFixed(1)}%</h3>
            </div>
            <div className="w-10 h-10 rounded-lg bg-accent-success/20 flex items-center justify-center">
              <Activity className="w-6 h-6 text-accent-success" />
            </div>
          </div>
          <p className="text-xs text-text-secondary">All systems operational</p>
        </div>

        {/* Prediction Accuracy */}
        <div className="p-6 rounded-lg border border-border bg-surface hover:border-primary/50 transition">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-text-secondary text-sm mb-1">Prediction Accuracy</p>
              <h3 className="text-3xl font-bold text-primary">{(stats.predictionAccuracy * 100).toFixed(2)}%</h3>
            </div>
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
          </div>
          <p className="text-xs text-text-secondary">ML model accuracy</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-3 gap-6">
        {/* Satellite & Debris Trends */}
        <div className="col-span-2 p-6 rounded-lg border border-border bg-surface">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Satellite & Debris Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2d3b5e" />
              <XAxis dataKey="time" stroke="#a0aec0" />
              <YAxis stroke="#a0aec0" />
              <Tooltip
                contentStyle={{ backgroundColor: "#141829", border: "1px solid #2d3b5e", borderRadius: "8px" }}
              />
              <Line type="monotone" dataKey="satellites" stroke="#00d9ff" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="debris" stroke="#ff4757" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Alert Distribution */}
        <div className="p-6 rounded-lg border border-border bg-surface">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Alert Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={mockAlertDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name} ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {mockAlertDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: "#141829", border: "1px solid #2d3b5e", borderRadius: "8px" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="p-6 rounded-lg border border-border bg-surface">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Orbital Health by Altitude</h3>
        <div className="grid grid-cols-4 gap-4">
          {mockOrbitalHealth.map((orbit) => (
            <div key={orbit.altitude} className="p-4 rounded-lg bg-surface-secondary">
              <div className="text-sm text-text-secondary mb-2">{orbit.altitude}</div>
              <div className="text-2xl font-bold text-primary mb-2">{orbit.satellites}</div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-surface rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-accent-success"
                    style={{ width: `${orbit.health}%` }}
                  ></div>
                </div>
                <span className="text-xs text-text-secondary font-medium">{orbit.health}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Alerts Table */}
      <div className="p-6 rounded-lg border border-border bg-surface">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Recent Collision Alerts</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-text-secondary font-medium">Satellite ID</th>
                <th className="text-left py-3 px-4 text-text-secondary font-medium">Debris ID</th>
                <th className="text-left py-3 px-4 text-text-secondary font-medium">Miss Distance</th>
                <th className="text-left py-3 px-4 text-text-secondary font-medium">Probability</th>
                <th className="text-left py-3 px-4 text-text-secondary font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { satId: "SAT-001", debrisId: "DEB-450", distance: "2.3 km", probability: "15%", status: "Low" },
                { satId: "SAT-025", debrisId: "DEB-892", distance: "0.8 km", probability: "62%", status: "High" },
                { satId: "SAT-087", debrisId: "DEB-156", distance: "5.1 km", probability: "8%", status: "Low" },
              ].map((alert, idx) => (
                <tr key={idx} className="border-b border-border hover:bg-surface-secondary transition">
                  <td className="py-3 px-4 text-text-primary font-medium">{alert.satId}</td>
                  <td className="py-3 px-4 text-text-secondary">{alert.debrisId}</td>
                  <td className="py-3 px-4 text-text-primary">{alert.distance}</td>
                  <td className="py-3 px-4 text-text-primary">{alert.probability}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded text-xs font-medium ${
                        alert.status === "High"
                          ? "bg-accent-danger/20 text-accent-danger"
                          : "bg-accent-success/20 text-accent-success"
                      }`}
                    >
                      {alert.status} Risk
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
