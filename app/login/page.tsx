"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Satellite, Mail, Lock, ArrowRight } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

type UserRole = "admin" | "researcher" | "student" | "guest"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<UserRole>("guest")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const { login } = useAuth()
  const router = useRouter()

  const DEMO_CREDENTIALS = {
    admin: { email: "admin@rwandaorbitguard.rw", password: "admin123" },
    researcher: { email: "researcher@rwandaorbitguard.rw", password: "researcher123" },
    student: { email: "student@rwandaorbitguard.rw", password: "student123" },
    guest: { email: "guest@rwandaorbitguard.rw", password: "guest123" },
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      await login(email, password)
      router.push("/signup")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDemoLogin = (selectedRole: UserRole) => {
    const creds = DEMO_CREDENTIALS[selectedRole]
    setEmail(creds.email)
    setPassword(creds.password)
    setRole(selectedRole)
  }

  return (
    <main
      style={{ background: "linear-gradient(to bottom, #000814, #001a33, #000814)" }}
      className="min-h-screen flex items-center justify-center px-6"
    >
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-6 hover:opacity-80 transition">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <Satellite className="w-6 h-6 text-primary" />
            </div>
            <span className="text-xl font-bold text-white">Rwanda Orbit Guard</span>
          </Link>
          <h1 className="text-2xl font-bold text-white mb-2">Welcome</h1>
          <p className="text-gray-400">Sign in to your satellite monitoring system</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/50 text-red-400 text-sm">{error}</div>
          )}

          {/* Role Selection - Added Guest role option */}
          <div>
            <label className="block text-white font-medium mb-3">User Role</label>
            <div className="grid grid-cols-4 gap-3">
              {(["guest", "student", "researcher", "admin"] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => {
                    setRole(r)
                    handleDemoLogin(r)
                  }}
                  className={`py-2 px-3 rounded-lg font-medium transition text-sm ${
                    role === r
                      ? "bg-primary text-black"
                      : "bg-card border border-border text-gray-400 hover:border-primary"
                  }`}
                >
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-white font-medium mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-card border border-border text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-white font-medium mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-card border border-border text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-lg bg-primary text-black font-semibold hover:bg-primary/90 transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? "Signing in..." : "Sign In"}
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-400 text-sm mt-6">Demo credentials auto-fill when you select a role</p>

        <div className="text-center mt-8 pt-6 border-t border-gray-700">
          <p className="text-gray-400 text-sm mb-2">New to Rwanda Orbit Guard?</p>
          <Link
            href="/login"
            onClick={() => {
              setRole("guest")
              handleDemoLogin("guest")
            }}
            className="text-primary hover:text-primary/80 transition font-medium text-sm"
          >
            Sign up as Guest User
          </Link>
        </div>
      </div>
    </main>
  )
}
