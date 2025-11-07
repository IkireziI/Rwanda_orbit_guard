import { ModuleCard } from "@/components/education/module-card"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Award, TrendingUp } from 'lucide-react'
import { modules } from "@/lib/education-data"

export default function EducationPage() {
  const completedModules = modules.filter((m) => m.progress === 100).length
  const inProgressModules = modules.filter((m) => m.progress > 0 && m.progress < 100).length
  const totalLessons = modules.reduce((acc, m) => acc + m.lessons, 0)

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-balance">Educational Modules</h1>
        <p className="text-muted-foreground">
          Learn about satellite operations, orbital mechanics, and space debris management
        </p>
      </div>

      {/* Progress Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed Modules</p>
                <p className="text-3xl font-bold text-chart-5">{completedModules}</p>
              </div>
              <Award className="h-8 w-8 text-chart-5" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-3xl font-bold text-secondary">{inProgressModules}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-secondary" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Lessons</p>
                <p className="text-3xl font-bold text-primary">{totalLessons}</p>
              </div>
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modules Grid */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Available Courses</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => (
            <ModuleCard key={module.id} {...module} />
          ))}
        </div>
      </div>
    </div>
  )
}