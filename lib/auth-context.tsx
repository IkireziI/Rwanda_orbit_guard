"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export type UserRole = "admin" | "researcher" | "student" | "guest"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const MOCK_USERS: Record<string, User & { password: string }> = {
  "admin@rwandaorbitguard.rw": {
    id: "1",
    name: "Admin",
    email: "admin@rwandaorbitguard.rw",
    role: "admin",
    password: "admin123",
  },
  "researcher@rwandaorbitguard.rw": {
    id: "2",
    name: "Researcher",
    email: "researcher@rwandaorbitguard.rw",
    role: "researcher",
    password: "researcher123",
  },
  "student@rwandaorbitguard.rw": {
    id: "3",
    name: "Alex Student",
    email: "student@rwandaorbitguard.rw",
    role: "student",
    password: "student123",
  },
  "guest@rwandaorbitguard.rw": {
    id: "4",
    name: "Guest User",
    email: "guest@rwandaorbitguard.rw",
    role: "guest",
    password: "guest123",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=guest",
  },
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem("rwandaorbitguard_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))

    const mockUser = MOCK_USERS[email]
    if (mockUser && mockUser.password === password) {
      const { password: _, ...userWithoutPassword } = mockUser
      setUser(userWithoutPassword)
      localStorage.setItem("rwandaorbitguard_user", JSON.stringify(userWithoutPassword))
    } else {
      throw new Error("Invalid email or password")
    }
    setIsLoading(false)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("rwandaorbitguard_user")
  }

  return <AuthContext.Provider value={{ user, isLoading, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
