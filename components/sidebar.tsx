"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Satellite,
  BarChart3,
  AlertCircle,
  FileText,
  BookOpen,
  MessageSquare,
  Users,
  SatelliteIcon,
  LogOut,
} from "lucide-react"
import { useState } from "react"
import { useAuth } from "@/lib/auth-context"

interface NavItem {
  name: string
  href: string
  icon: React.ReactNode
  requiredRoles?: string[]
}

export default function Sidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const { user, logout } = useAuth()

  const navItems: NavItem[] = [
    {
      name: "Overview",
      href: "/dashboard",
      icon: <BarChart3 className="w-5 h-5" />,
      requiredRoles: ["admin", "researcher"],
    },
    {
      name: "Satellites",
      href: "/dashboard/satellites",
      icon: <SatelliteIcon className="w-5 h-5" />,
      requiredRoles: ["admin", "researcher"],
    },
    {
      name: "3D Visualization",
      href: "/dashboard/visualization",
      icon: <Satellite className="w-5 h-5" />,
      requiredRoles: ["admin", "researcher", "student", "guest"],
    },
    {
      name: "Collision Prediction",
      href: "/dashboard/alerts",
      icon: <AlertCircle className="w-5 h-5" />,
      requiredRoles: ["admin", "researcher"],
    },
    {
      name: "Reports",
      href: "/dashboard/reports",
      icon: <FileText className="w-5 h-5" />,
      requiredRoles: ["admin", "researcher", "student"],
    },
    {
      name: "Education",
      href: "/dashboard/education",
      icon: <BookOpen className="w-5 h-5" />,
      requiredRoles: ["admin", "researcher", "student"],
    },
    {
      name: "Feedback",
      href: "/dashboard/feedback",
      icon: <MessageSquare className="w-5 h-5" />,
      requiredRoles: ["admin", "researcher", "student", "guest"],
    },
    {
      name: "Users",
      href: "/dashboard/users",
      icon: <Users className="w-5 h-5" />,
      requiredRoles: ["admin"],
    },
  ]

  const filteredItems = navItems.filter(
    (item) => !item.requiredRoles || (user && item.requiredRoles.includes(user.role)),
  )

  const handleLogout = () => {
    logout()
  }

  return (
    <aside
      className={`${isCollapsed ? "w-20" : "w-64"} bg-surface border-r border-border transition-all duration-300 flex flex-col`}
    >
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
            <Satellite className="w-6 h-6 text-primary" />
          </div>
          {!isCollapsed && <span className="font-bold text-primary">Rwanda Orbit Guard</span>}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {filteredItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              pathname === item.href
                ? "bg-primary/20 text-primary border border-primary/50"
                : "text-text-secondary hover:bg-surface-secondary hover:text-text-primary"
            }`}
            title={isCollapsed ? item.name : undefined}
          >
            {item.icon}
            {!isCollapsed && <span className="font-medium">{item.name}</span>}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border space-y-3">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full px-4 py-2 rounded-lg bg-surface-secondary text-text-secondary hover:text-text-primary transition text-sm"
        >
          {isCollapsed ? "→" : "←"} {!isCollapsed && "Collapse"}
        </button>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2 rounded-lg bg-accent-danger/10 text-accent-danger hover:bg-accent-danger/20 transition"
        >
          <LogOut className="w-5 h-5" />
          {!isCollapsed && "Logout"}
        </button>
      </div>
    </aside>
  )
}
