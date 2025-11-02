"use client"

import { Search, Plus, Edit, Trash2, Shield } from "lucide-react"
import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"

interface User {
  id: string
  name: string
  email: string
  role: "admin" | "researcher" | "student"
  joinDate: string
  status: "active" | "inactive"
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "Admin",
    email: "admin@orbitguard.rw",
    role: "admin",
    joinDate: "2023-06-01",
    status: "active",
  },
  {
    id: "2",
    name: "Researcher",
    email: "researcher@orbitguard.rw",
    role: "researcher",
    joinDate: "2023-07-15",
    status: "active",
  },
  {
    id: "3",
    name: "Alex Student",
    email: "student@orbitguard.rw",
    role: "student",
    joinDate: "2023-09-20",
    status: "active",
  },
]

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const { user } = useAuth()
  const router = useRouter()

  if (user?.role !== "admin") {
    return (
      <div className="p-6">
        <div className="p-6 rounded-lg border border-border bg-surface text-center">
          <Shield className="w-12 h-12 text-accent-danger mx-auto mb-4" />
          <h2 className="text-xl font-bold text-text-primary mb-2">Access Denied</h2>
          <p className="text-text-secondary">Only administrators can access this page.</p>
        </div>
      </div>
    )
  }

  const filtered = mockUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-text-primary mb-2">User Management</h1>
        <p className="text-text-secondary">Manage system users and permissions</p>
      </div>

      {/* Controls */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-surface border border-border text-text-primary placeholder-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <button className="px-4 py-2 rounded-lg bg-primary text-background font-medium hover:bg-primary-dark transition flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add User
        </button>
      </div>

      {/* Users Table */}
      <div className="rounded-lg border border-border bg-surface overflow-hidden">
        <table className="w-full">
          <thead className="bg-surface-secondary border-b border-border">
            <tr>
              <th className="text-left py-3 px-6 text-text-secondary font-medium">Name</th>
              <th className="text-left py-3 px-6 text-text-secondary font-medium">Email</th>
              <th className="text-left py-3 px-6 text-text-secondary font-medium">Role</th>
              <th className="text-left py-3 px-6 text-text-secondary font-medium">Join Date</th>
              <th className="text-left py-3 px-6 text-text-secondary font-medium">Status</th>
              <th className="text-left py-3 px-6 text-text-secondary font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.id} className="border-b border-border hover:bg-surface-secondary transition">
                <td className="py-4 px-6 text-text-primary font-medium">{u.name}</td>
                <td className="py-4 px-6 text-text-secondary">{u.email}</td>
                <td className="py-4 px-6">
                  <span className="px-3 py-1 rounded text-xs font-medium bg-primary/20 text-primary">
                    {u.role.charAt(0).toUpperCase() + u.role.slice(1)}
                  </span>
                </td>
                <td className="py-4 px-6 text-text-secondary">{u.joinDate}</td>
                <td className="py-4 px-6">
                  <span className="px-3 py-1 rounded text-xs font-medium bg-accent-success/20 text-accent-success">
                    {u.status.charAt(0).toUpperCase() + u.status.slice(1)}
                  </span>
                </td>
                <td className="py-4 px-6 flex gap-2">
                  <button className="p-2 rounded-lg hover:bg-surface-secondary transition text-text-secondary hover:text-primary">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-accent-danger/10 transition text-accent-danger">
                    <Trash2 className="w-4 h-4" />
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
