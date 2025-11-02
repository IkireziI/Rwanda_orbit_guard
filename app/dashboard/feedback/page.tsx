"use client"

import type React from "react"

import { MessageSquare, Lightbulb, AlertTriangle, CheckCircle, Search } from "lucide-react"
import { useState } from "react"
import { useAuth } from "@/lib/auth-context"

type FeedbackType = "bug" | "feature" | "general" | "performance"

interface FeedbackItem {
  id: string
  type: FeedbackType
  message: string
  email: string
  userName: string
  timestamp: string
  status: "new" | "reviewed" | "resolved"
}

const MOCK_FEEDBACK_DATA: FeedbackItem[] = [
  {
    id: "1",
    type: "bug",
    message: "The 3D visualization is not loading properly on Safari browser",
    email: "student@rwandaorbitguard.rw",
    userName: "Alex Student",
    timestamp: "2024-01-15 10:30 AM",
    status: "new",
  },
  {
    id: "2",
    type: "feature",
    message: "Please add export functionality for collision reports",
    email: "researcher@rwandaorbitguard.rw",
    userName: "Researcher",
    timestamp: "2024-01-15 09:15 AM",
    status: "reviewed",
  },
  {
    id: "3",
    type: "performance",
    message: "Dashboard takes too long to load initial data",
    email: "guest@rwandaorbitguard.rw",
    userName: "Guest User",
    timestamp: "2024-01-14 04:45 PM",
    status: "resolved",
  },
  {
    id: "4",
    type: "general",
    message: "Great work on the collision prediction feature!",
    email: "student@rwandaorbitguard.rw",
    userName: "Alex Student",
    timestamp: "2024-01-14 02:20 PM",
    status: "reviewed",
  },
]

export default function FeedbackPage() {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<FeedbackType | "all">("all")
  const [filterStatus, setFilterStatus] = useState<"all" | "new" | "reviewed" | "resolved">("all")
  const [feedback, setFeedback] = useState("")
  const [feedbackType, setFeedbackType] = useState<FeedbackType>("general")
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const isAdmin = user?.role === "admin"

  const feedbackTypeConfig = {
    bug: {
      icon: AlertTriangle,
      label: "Bug Report",
      color: "text-accent-danger",
      bgColor: "bg-accent-danger/10",
    },
    feature: {
      icon: Lightbulb,
      label: "Feature Request",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    general: {
      icon: MessageSquare,
      label: "General Feedback",
      color: "text-accent-warning",
      bgColor: "bg-accent-warning/10",
    },
    performance: {
      icon: CheckCircle,
      label: "Performance Issue",
      color: "text-accent-success",
      bgColor: "bg-accent-success/10",
    },
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setFeedback("")
    setEmail("")
    setTimeout(() => setSubmitted(false), 4000)
  }

  const currentConfig = feedbackTypeConfig[feedbackType]
  const CurrentIcon = currentConfig.icon

  if (isAdmin) {
    const filteredFeedback = MOCK_FEEDBACK_DATA.filter((item) => {
      const matchesSearch =
        item.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = filterType === "all" || item.type === filterType
      const matchesStatus = filterStatus === "all" || item.status === filterStatus
      return matchesSearch && matchesType && matchesStatus
    })

    const stats = {
      total: MOCK_FEEDBACK_DATA.length,
      new: MOCK_FEEDBACK_DATA.filter((f) => f.status === "new").length,
      resolved: MOCK_FEEDBACK_DATA.filter((f) => f.status === "resolved").length,
      bugs: MOCK_FEEDBACK_DATA.filter((f) => f.type === "bug").length,
    }

    return (
      <div className="p-6 space-y-6 max-w-6xl">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">Received Feedback</h1>
          <p className="text-text-secondary">Manage and review user feedback submissions</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          <div className="p-4 rounded-lg bg-surface border border-border">
            <div className="text-2xl font-bold text-primary mb-1">{stats.total}</div>
            <div className="text-text-secondary text-sm">Total Feedback</div>
          </div>
          <div className="p-4 rounded-lg bg-surface border border-border">
            <div className="text-2xl font-bold text-accent-danger mb-1">{stats.new}</div>
            <div className="text-text-secondary text-sm">New Reviews</div>
          </div>
          <div className="p-4 rounded-lg bg-surface border border-border">
            <div className="text-2xl font-bold text-accent-success mb-1">{stats.resolved}</div>
            <div className="text-text-secondary text-sm">Resolved</div>
          </div>
          <div className="p-4 rounded-lg bg-surface border border-border">
            <div className="text-2xl font-bold text-accent-warning mb-1">{stats.bugs}</div>
            <div className="text-text-secondary text-sm">Bug Reports</div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="p-4 rounded-lg border border-border bg-surface space-y-4">
          <div>
            <label className="block text-text-primary font-medium mb-2">Search Feedback</label>
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-text-secondary" />
              <input
                type="text"
                placeholder="Search by message, user name, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-surface-secondary border border-border text-text-primary placeholder-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-text-primary font-medium mb-2">Feedback Type</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as FeedbackType | "all")}
                className="w-full px-4 py-2 rounded-lg bg-surface-secondary border border-border text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">All Types</option>
                <option value="bug">Bug Report</option>
                <option value="feature">Feature Request</option>
                <option value="general">General Feedback</option>
                <option value="performance">Performance Issue</option>
              </select>
            </div>

            <div>
              <label className="block text-text-primary font-medium mb-2">Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as "all" | "new" | "reviewed" | "resolved")}
                className="w-full px-4 py-2 rounded-lg bg-surface-secondary border border-border text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="reviewed">Reviewed</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          </div>
        </div>

        {/* Feedback List */}
        <div className="space-y-4">
          {filteredFeedback.length > 0 ? (
            filteredFeedback.map((feedback) => {
              const config = feedbackTypeConfig[feedback.type]
              const Config = config.icon
              const statusColors = {
                new: "bg-accent-danger/10 text-accent-danger border-accent-danger/30",
                reviewed: "bg-accent-warning/10 text-accent-warning border-accent-warning/30",
                resolved: "bg-accent-success/10 text-accent-success border-accent-success/30",
              }

              return (
                <div
                  key={feedback.id}
                  className="p-4 rounded-lg border border-border bg-surface hover:border-primary/50 transition"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg ${config.bgColor} flex items-center justify-center flex-shrink-0`}
                      >
                        <Config className={`w-5 h-5 ${config.color}`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-text-primary">{config.label}</h3>
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium border ${statusColors[feedback.status]}`}
                          >
                            {feedback.status.charAt(0).toUpperCase() + feedback.status.slice(1)}
                          </span>
                        </div>
                        <p className="text-text-secondary text-sm">{feedback.timestamp}</p>
                      </div>
                    </div>
                  </div>

                  <p className="text-text-primary mb-3">{feedback.message}</p>

                  <div className="flex items-center justify-between text-sm">
                    <div className="text-text-secondary">
                      <p>From: {feedback.userName}</p>
                      <p>{feedback.email}</p>
                    </div>
                    <button className="px-4 py-2 rounded-lg bg-primary text-background font-semibold hover:bg-primary-dark transition">
                      Mark Resolved
                    </button>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="p-8 rounded-lg border border-border bg-surface text-center">
              <MessageSquare className="w-12 h-12 text-text-secondary/50 mx-auto mb-3" />
              <p className="text-text-secondary">No feedback found matching your filters</p>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-text-primary mb-2">Feedback & Support</h1>
        <p className="text-text-secondary">Help us improve Rwanda Orbit Guard</p>
      </div>

      {/* Feedback Form */}
      <form onSubmit={handleSubmit} className="p-6 rounded-lg border border-border bg-surface space-y-4">
        {/* Feedback Type Selection */}
        <div>
          <label className="block text-text-primary font-medium mb-3">Feedback Type</label>
          <div className="grid grid-cols-2 gap-3">
            {(Object.entries(feedbackTypeConfig) as Array<[FeedbackType, typeof currentConfig]>).map(
              ([type, config]) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFeedbackType(type)}
                  className={`p-4 rounded-lg border transition flex items-center gap-3 ${
                    feedbackType === type ? `${config.bgColor} border-current` : "border-border hover:border-primary/50"
                  }`}
                >
                  <config.icon className={`w-5 h-5 ${config.color}`} />
                  <span className="text-text-primary font-medium text-sm">{config.label}</span>
                </button>
              ),
            )}
          </div>
        </div>

        {/* Feedback Text */}
        <div>
          <label className="block text-text-primary font-medium mb-2">Your Feedback</label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Please share your feedback, suggestions, or report issues..."
            className="w-full px-4 py-3 rounded-lg bg-surface-secondary border border-border text-text-primary placeholder-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary resize-none h-32"
            required
          ></textarea>
        </div>

        {/* Email */}
        <div>
          <label className="block text-text-primary font-medium mb-2">Email (Optional)</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full px-4 py-2 rounded-lg bg-surface-secondary border border-border text-text-primary placeholder-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full px-4 py-3 rounded-lg bg-primary text-background font-semibold hover:bg-primary-dark transition flex items-center justify-center gap-2"
        >
          Submit Feedback
        </button>

        {/* Success Message */}
        {submitted && (
          <div className="p-4 rounded-lg bg-accent-success/10 border border-accent-success/50 text-accent-success flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Thank you for your feedback! We will review it shortly.
          </div>
        )}
      </form>

      {/* Support Info */}
      <div className="grid grid-cols-2 gap-6">
        <div className="p-6 rounded-lg border border-border bg-surface">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
              <MessageSquare className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-3">Get Support</h3>
              <p className="text-text-secondary mb-3">
                Our support team is available to assist you. Contact us at support@orbitguard.rw
              </p>
              <div className="space-y-1 text-text-secondary text-sm">
                <p>Hours: Monday - Friday, 9:00 AM - 5:00 PM (UTC+2)</p>
                <p>Response time: Usually within 24 hours</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-lg border border-border bg-surface">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-3">Helpful Resources</h3>
              <ul className="space-y-2 text-text-secondary text-sm">
                <li>
                  <a href="#" className="hover:text-primary transition">
                    → Documentation & User Guide
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition">
                    → Frequently Asked Questions
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition">
                    → System Status & Updates
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
