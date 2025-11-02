"use client"

import { useState } from "react"
import { FileText, Download, Calendar, Plus, Eye, Trash2, Share2 } from "lucide-react"

interface Report {
  id: string
  name: string
  type: string
  generated: string
  status: "completed" | "processing" | "scheduled"
  size: string
  format: "PDF" | "CSV" | "JSON"
}

const mockReports: Report[] = [
  {
    id: "RPT-001",
    name: "Monthly Collision Risk Assessment",
    type: "Risk Analysis",
    generated: "2025-10-31",
    status: "completed",
    size: "2.4 MB",
    format: "PDF",
  },
  {
    id: "RPT-002",
    name: "Debris Population Analysis",
    type: "Population Study",
    generated: "2025-10-30",
    status: "completed",
    size: "1.8 MB",
    format: "PDF",
  },
  {
    id: "RPT-003",
    name: "System Performance Report",
    type: "Performance",
    generated: "2025-10-29",
    status: "completed",
    size: "956 KB",
    format: "CSV",
  },
  {
    id: "RPT-004",
    name: "Quarterly Satellite Health Review",
    type: "Health Assessment",
    generated: "2025-10-28",
    status: "completed",
    size: "3.1 MB",
    format: "PDF",
  },
  {
    id: "RPT-005",
    name: "Weekly Alert Summary",
    type: "Summary",
    generated: "2025-10-27",
    status: "processing",
    size: "--",
    format: "PDF",
  },
]

export default function ReportsPage() {
  const [showGenerateForm, setShowGenerateForm] = useState(false)
  const [filterType, setFilterType] = useState<string>("all")
  const [selectedReports, setSelectedReports] = useState<Set<string>>(new Set())

  const filtered = mockReports.filter((report) => filterType === "all" || report.type === filterType)

  const reportTypes = Array.from(new Set(mockReports.map((r) => r.type)))

  const toggleSelectReport = (id: string) => {
    const newSelected = new Set(selectedReports)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedReports(newSelected)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-text-primary mb-2">Reports</h1>
        <p className="text-text-secondary">Generate and download monitoring reports</p>
      </div>

      {/* Controls */}
      <div className="flex gap-4 flex-wrap">
        <button
          onClick={() => setShowGenerateForm(!showGenerateForm)}
          className="px-4 py-2 rounded-lg bg-primary text-background font-medium hover:bg-primary-dark transition flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Generate New Report
        </button>
        <button className="px-4 py-2 rounded-lg bg-surface border border-border text-text-secondary hover:border-primary transition flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Date Range
        </button>
        <button
          className="px-4 py-2 rounded-lg bg-surface border border-border text-text-secondary hover:border-primary transition flex items-center gap-2"
          disabled={selectedReports.size === 0}
        >
          <Share2 className="w-5 h-5" />
          Share ({selectedReports.size})
        </button>
      </div>

      {showGenerateForm && (
        <div className="p-6 rounded-lg border border-border bg-surface space-y-4">
          <h3 className="text-lg font-semibold text-text-primary">Generate New Report</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-text-primary font-medium mb-2">Report Type</label>
              <select className="w-full px-4 py-2 rounded-lg bg-surface-secondary border border-border text-text-primary focus:outline-none focus:ring-2 focus:ring-primary">
                <option>Risk Analysis</option>
                <option>Population Study</option>
                <option>Performance</option>
                <option>Health Assessment</option>
              </select>
            </div>
            <div>
              <label className="block text-text-primary font-medium mb-2">Format</label>
              <select className="w-full px-4 py-2 rounded-lg bg-surface-secondary border border-border text-text-primary focus:outline-none focus:ring-2 focus:ring-primary">
                <option>PDF</option>
                <option>CSV</option>
                <option>JSON</option>
              </select>
            </div>
            <div>
              <label className="block text-text-primary font-medium mb-2">Start Date</label>
              <input
                type="date"
                className="w-full px-4 py-2 rounded-lg bg-surface-secondary border border-border text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-text-primary font-medium mb-2">End Date</label>
              <input
                type="date"
                className="w-full px-4 py-2 rounded-lg bg-surface-secondary border border-border text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <button className="px-6 py-2 rounded-lg bg-primary text-background font-medium hover:bg-primary-dark transition flex-1">
              Generate Report
            </button>
            <button
              onClick={() => setShowGenerateForm(false)}
              className="px-6 py-2 rounded-lg bg-surface border border-border text-text-secondary hover:border-primary transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setFilterType("all")}
          className={`px-4 py-2 rounded-lg transition ${
            filterType === "all"
              ? "bg-primary text-background"
              : "bg-surface border border-border text-text-secondary hover:border-primary"
          }`}
        >
          All Types
        </button>
        {reportTypes.map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-4 py-2 rounded-lg transition ${
              filterType === type
                ? "bg-primary text-background"
                : "bg-surface border border-border text-text-secondary hover:border-primary"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Reports List */}
      <div className="space-y-3">
        {filtered.map((report) => (
          <div
            key={report.id}
            className="p-4 rounded-lg border border-border bg-surface hover:border-primary/50 transition flex items-start justify-between group"
          >
            <div className="flex items-start gap-4 flex-1">
              <input
                type="checkbox"
                checked={selectedReports.has(report.id)}
                onChange={() => toggleSelectReport(report.id)}
                className="mt-2 w-4 h-4 rounded cursor-pointer"
              />
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-text-primary font-semibold mb-1">{report.name}</h3>
                <div className="flex gap-3 text-text-secondary text-sm">
                  <span>{report.type}</span>
                  <span>•</span>
                  <span>{report.generated}</span>
                  <span>•</span>
                  <span className="px-2 py-0.5 rounded bg-primary/20 text-primary text-xs font-medium">
                    {report.format}
                  </span>
                  <span>•</span>
                  <span>{report.size}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`px-3 py-1 rounded text-xs font-medium ${
                  report.status === "completed"
                    ? "bg-accent-success/20 text-accent-success"
                    : report.status === "processing"
                      ? "bg-accent-warning/20 text-accent-warning"
                      : "bg-accent-warning/20 text-accent-warning"
                }`}
              >
                {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
              </span>
              <button className="p-2 rounded-lg hover:bg-surface-secondary transition text-text-secondary hover:text-primary opacity-0 group-hover:opacity-100">
                <Eye className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-lg hover:bg-surface-secondary transition text-text-secondary hover:text-primary opacity-0 group-hover:opacity-100">
                <Download className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-lg hover:bg-accent-danger/10 transition text-accent-danger opacity-0 group-hover:opacity-100">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
