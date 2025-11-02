"use client"

import type React from "react"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface AuthGuardProps {
  children: React.ReactNode
  requiredRoles?: string[]
}

export function AuthGuard({ children, requiredRoles }: AuthGuardProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    } else if (!isLoading && user && requiredRoles && !requiredRoles.includes(user.role)) {
      router.push("/dashboard")
    }
  }, [user, isLoading, requiredRoles, router])

  if (isLoading) return <div className="p-4 text-center">Loading...</div>
  if (!user) return null
  if (requiredRoles && !requiredRoles.includes(user.role)) return null

  return <>{children}</>
}
