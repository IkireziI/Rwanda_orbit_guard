"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Satellite, BookOpen, MessageSquare, Globe } from "lucide-react"

export default function SignupPage() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  if (!user) return null

  const getWelcomeMessage = () => {
    switch (user.role) {
      case "guest":
        return "Welcome, Guest! You have access to limited features for exploring our platform."
      case "student":
        return "Welcome, Student! Access educational resources, reports, 3D visualization, and feedback."
      case "researcher":
        return "Welcome, Researcher! Full access to all dashboards and monitoring tools."
      case "admin":
        return "Welcome, Administrator! Full system access and user management capabilities."
      default:
        return "Welcome!"
    }
  }

  const getRoleFeatures = () => {
    switch (user.role) {
      case "guest":
        return [
          { icon: Globe, name: "Home Page", description: "Explore the Rwanda Orbit Guard platform" },
          { icon: Satellite, name: "3D Visualization", description: "View interactive orbit visualization" },
          { icon: MessageSquare, name: "Feedback", description: "Share your feedback with us" },
        ]
      case "student":
        return [
          { icon: Satellite, name: "3D Visualization", description: "Interactive orbit visualization" },
          { icon: BookOpen, name: "Education Module", description: "Learning materials and courses" },
          { icon: Satellite, name: "Reports", description: "Download and analyze reports" },
          { icon: MessageSquare, name: "Feedback", description: "Provide system feedback" },
        ]
      case "researcher":
        return [
          { icon: Satellite, name: "Dashboard Overview", description: "Real-time monitoring and analytics" },
          { icon: Satellite, name: "Satellites", description: "Detailed satellite catalog" },
          { icon: Satellite, name: "Collision Alerts", description: "Monitor collision events" },
          { icon: Globe, name: "3D Visualization", description: "Advanced orbit visualization" },
          { icon: Satellite, name: "Reports", description: "Generate custom reports" },
          { icon: MessageSquare, name: "Feedback", description: "System feedback and suggestions" },
        ]
      case "admin":
        return [
          { icon: Satellite, name: "All Features", description: "Complete system access" },
          { icon: Satellite, name: "User Management", description: "Manage system users" },
        ]
      default:
        return []
    }
  }

  const handleContinue = () => {
    router.push("/dashboard")
  }

  return (
    <div
      style={{ background: "linear-gradient(to bottom, #0f1419, #1a2332, #0f1419)" }}
      className="min-h-screen flex items-center justify-center px-6 py-12"
    >
      <div className="w-full max-w-2xl">
        {/* Welcome Card */}
        <Card className="mb-8">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-lg bg-primary/20 flex items-center justify-center">
                <Satellite className="w-8 h-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-3xl">Welcome to Rwanda Orbit Guard!</CardTitle>
            <CardDescription className="text-lg mt-2">{getWelcomeMessage()}</CardDescription>
          </CardHeader>
        </Card>

        {/* User Info Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Your Account</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div>
                <div className="text-lg font-semibold text-text-primary">{user.name}</div>
                <div className="text-text-secondary">{user.email}</div>
                <div className="text-sm text-primary font-medium mt-1 uppercase">{user.role} Account</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Your Access</CardTitle>
            <CardDescription>Features available for your role</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {getRoleFeatures().map((feature, idx) => (
                <div key={idx} className="p-4 rounded-lg border border-border bg-surface-secondary">
                  <div className="flex items-start gap-3">
                    <feature.icon className="w-6 h-6 text-primary flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-text-primary">{feature.name}</div>
                      <div className="text-sm text-text-secondary">{feature.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Continue Button */}
        <div className="text-center">
          <button
            onClick={handleContinue}
            className="px-8 py-3 rounded-lg bg-primary text-background font-semibold hover:bg-primary-dark transition"
          >
            Continue to Dashboard
          </button>
        </div>
      </div>
    </div>
  )
}
