"use client"

import { useState } from "react"
import { Search, Filter, Download, Eye } from "lucide-react"

interface Satellite {
  id: string
  name: string
  country: string
  launchDate: string
  purpose: string
  status: "active" | "inactive"
  altitude: number
}

const mockSatellites: Satellite[] = [
  {
    id: "SAT-001",
    name: "Earth Observer 1",
    country: "Rwanda",
    launchDate: "2023-06-15",
    purpose: "Climate Monitoring",
    status: "active",
    altitude: 800,
  },
  {
    id: "SAT-002",
    name: "AfriSat Communications",
    country: "Rwanda",
    launchDate: "2023-08-22",
    purpose: "Telecommunications",
    status: "active",
    altitude: 35786,
  },
  {
    id: "SAT-003",
    name: "Regional Survey Sat",
    country: "East Africa Region",
    launchDate: "2023-10-10",
    purpose: "Land Surveying",
    status: "active",
    altitude: 450,
  },
  {
    id: "SAT-004",
    name: "Archive Sat 2020",
    country: "Rwanda",
    launchDate: "2020-03-05",
    purpose: "Data Archive",
    status: "inactive",
    altitude: 400,
  },
]

export default function SatellitesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive">("all")

  const filtered = mockSatellites.filter((sat) => {
    const matchesSearch =
      sat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sat.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || sat.status === filterStatus
    return matchesSearch && matchesStatus
  })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-text-primary mb-2">Satellites</h1>
        <p className="text-text-secondary">Manage and monitor all tracked satellites</p>
      </div>

      {/* Controls */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
          <input
            type="text"
            placeholder="Search satellites..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-surface border border-border text-text-primary placeholder-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <button className="px-4 py-2 rounded-lg bg-surface border border-border text-text-secondary hover:border-primary transition flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filter
        </button>
        <button className="px-4 py-2 rounded-lg bg-primary text-background font-medium hover:bg-primary-dark transition flex items-center gap-2">
          <Download className="w-5 h-5" />
          Export
        </button>
      </div>

      {/* Status Filter */}
      <div className="flex gap-2">
        {(["all", "active", "inactive"] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-lg transition ${
              filterStatus === status
                ? "bg-primary text-background"
                : "bg-surface border border-border text-text-secondary hover:border-primary"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border bg-surface overflow-hidden">
        <table className="w-full">
          <thead className="bg-surface-secondary border-b border-border">
            <tr>
              <th className="text-left py-3 px-6 text-text-secondary font-medium">ID</th>
              <th className="text-left py-3 px-6 text-text-secondary font-medium">Name</th>
              <th className="text-left py-3 px-6 text-text-secondary font-medium">Country</th>
              <th className="text-left py-3 px-6 text-text-secondary font-medium">Launch Date</th>
              <th className="text-left py-3 px-6 text-text-secondary font-medium">Altitude (km)</th>
              <th className="text-left py-3 px-6 text-text-secondary font-medium">Status</th>
              <th className="text-left py-3 px-6 text-text-secondary font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((sat) => (
              <tr key={sat.id} className="border-b border-border hover:bg-surface-secondary transition">
                <td className="py-4 px-6 text-text-primary font-medium">{sat.id}</td>
                <td className="py-4 px-6 text-text-primary">{sat.name}</td>
                <td className="py-4 px-6 text-text-secondary">{sat.country}</td>
                <td className="py-4 px-6 text-text-secondary">{sat.launchDate}</td>
                <td className="py-4 px-6 text-text-primary">{sat.altitude}</td>
                <td className="py-4 px-6">
                  <span
                    className={`px-3 py-1 rounded text-xs font-medium ${
                      sat.status === "active"
                        ? "bg-accent-success/20 text-accent-success"
                        : "bg-text-secondary/20 text-text-secondary"
                    }`}
                  >
                    {sat.status.charAt(0).toUpperCase() + sat.status.slice(1)}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <button className="p-2 rounded-lg hover:bg-surface-secondary transition text-text-secondary hover:text-primary">
                    <Eye className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
