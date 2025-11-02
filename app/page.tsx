"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Satellite, AlertCircle, BarChart3, Zap } from "lucide-react"

export default function HomePage() {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <main
      style={{
        backgroundImage: "url('/space-orbital-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
      className="min-h-screen relative"
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b border-border">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Satellite className="w-6 h-6 text-primary" />
              </div>
              <span className="text-xl font-bold text-white">Rwanda Orbit Guard</span>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/dashboard" className="text-gray-300 hover:text-primary transition">
                Sign in
              </Link>
              <Link
                href="/login"
                className="px-6 py-2 rounded-lg bg-primary text-black font-semibold hover:bg-primary/90 transition"
              >
                Get Started
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="pt-32 pb-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-7xl font-bold text-white mb-6 leading-tight">
              Protecting Rwanda's
              <span className="text-primary"> Space Assets</span>
            </h1>

            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              AI-powered satellite tracking and space debris monitoring platform for Rwanda Space Agency, researchers,
              and students
            </p>

            <div className="flex gap-4 justify-center mb-16">
              <Link
                href="/login"
                className="px-8 py-3 rounded-lg bg-primary text-black font-semibold hover:bg-primary/90 transition"
              >
                <span className="flex items-center gap-2">
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </span>
              </Link>
              <button className="px-8 py-3 rounded-lg border border-primary/50 text-primary hover:bg-primary/5 transition">
                Learn More
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12">
              <div className="p-6 rounded-lg border border-border bg-card/50 backdrop-blur">
                <div className="text-3xl font-bold text-primary mb-2">1,000+</div>
                <div className="text-gray-400">Active Satellites</div>
              </div>
              <div className="p-6 rounded-lg border border-border bg-card/50 backdrop-blur">
                <div className="text-3xl font-bold text-primary mb-2">Real-time</div>
                <div className="text-gray-400">Tracking</div>
              </div>
              <div className="p-6 rounded-lg border border-border bg-card/50 backdrop-blur">
                <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
                <div className="text-gray-400">Accuracy</div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-20 px-6 border-t border-border">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 text-white">Powerful Features</h2>

            <div className="grid grid-cols-2 gap-6">
              <div className="p-8 rounded-lg border border-border bg-card/30 hover:border-primary/50 transition group">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/30 transition">
                  <Satellite className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Satellite Tracking</h3>
                <p className="text-gray-400">
                  Monitor 1000+ satellites in real-time with precise orbit calculations and predictions.
                </p>
              </div>

              <div className="p-8 rounded-lg border border-border bg-card/30 hover:border-primary/50 transition group">
                <div className="w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center mb-4 group-hover:bg-red-500/30 transition">
                  <AlertCircle className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Collision Alerts</h3>
                <p className="text-gray-400">
                  Receive instant notifications and predictions for potential collision events.
                </p>
              </div>

              <div className="p-8 rounded-lg border border-border bg-card/30 hover:border-primary/50 transition group">
                <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center mb-4 group-hover:bg-green-500/30 transition">
                  <BarChart3 className="w-6 h-6 text-green-500" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Advanced Analytics</h3>
                <p className="text-gray-400">
                  Analyze orbital data with comprehensive visualizations and historical reports.
                </p>
              </div>

              <div className="p-8 rounded-lg border border-border bg-card/30 hover:border-primary/50 transition group">
                <div className="w-12 h-12 rounded-lg bg-yellow-500/20 flex items-center justify-center mb-4 group-hover:bg-yellow-500/30 transition">
                  <Zap className="w-6 h-6 text-yellow-500" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">ML-Powered Predictions</h3>
                <p className="text-gray-400">
                  Leverage machine learning for accurate collision and debris risk assessments.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-20 px-6 border-t border-border">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Monitor the Skies?</h2>
            <p className="text-gray-400 mb-8">
              Join the mission to protect Earth's orbital environment with advanced satellite monitoring technology.
            </p>
            <Link
              href="/login"
              className="inline-block px-8 py-3 rounded-lg bg-primary text-black font-semibold hover:bg-primary/90 transition"
            >
              Get Started Today
            </Link>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-border py-8 px-6 text-center text-gray-400">
          <p>&copy; 2025 Rwanda Orbit Guard. Advanced satellite monitoring for a safer space environment.</p>
        </footer>
      </div>
    </main>
  )
}
