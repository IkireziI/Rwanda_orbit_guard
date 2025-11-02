"use client"

import Link from "next/link"
import { Bell, Settings, Satellite } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export default function Navbar() {
  const { user } = useAuth()

  return (
    <nav className="h-16 bg-surface border-b border-border flex items-center justify-between px-6">
      <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
          <Satellite className="w-6 h-6 text-primary" />
        </div>
        <h2 className="text-text-primary font-semibold">Rwanda Orbit Guard</h2>
      </Link>

      <div className="flex items-center gap-6">
        {!user ? (
          <Link href="/login" className="text-primary hover:text-primary/80 transition font-medium">
            Sign Up
          </Link>
        ) : null}

        {/* Alerts */}
        <button className="relative p-2 rounded-lg hover:bg-surface-secondary transition text-text-secondary hover:text-primary">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-accent-danger rounded-full"></span>
        </button>

        {/* Settings */}
        <button className="p-2 rounded-lg hover:bg-surface-secondary transition text-text-secondary hover:text-primary">
          <Settings className="w-5 h-5" />
        </button>

        {user && (
          <div className="text-sm pl-3 border-l border-border">
            <div className="text-text-primary font-medium">{user?.name.split(" ")[0] || "User"}</div>
            <div className="text-text-secondary text-xs capitalize">{user?.role || "user"}</div>
          </div>
        )}
      </div>
    </nav>
  )
}
