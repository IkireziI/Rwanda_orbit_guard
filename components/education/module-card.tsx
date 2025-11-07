import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { BookOpen, Clock, CheckCircle2, Lock } from 'lucide-react'
import Link from "next/link"

interface ModuleCardProps {
  id: string
  title: string
  description: string
  duration: string
  difficulty: "beginner" | "intermediate" | "advanced"
  progress?: number
  locked?: boolean
  lessons: number
}

export function ModuleCard({
  id,
  title,
  description,
  duration,
  difficulty,
  progress,
  locked,
  lessons,
}: ModuleCardProps) {
  const difficultyColors = {
    beginner: "bg-chart-5/10 text-chart-5",
    intermediate: "bg-secondary/10 text-secondary",
    advanced: "bg-destructive/10 text-destructive",
  }

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-colors">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <CardTitle className="text-xl">{title}</CardTitle>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className={difficultyColors[difficulty]}>
                {difficulty}
              </Badge>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="h-3 w-3" />
                {duration}
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <BookOpen className="h-3 w-3" />
                {lessons} lessons
              </div>
            </div>
          </div>
          {locked ? (
            <Lock className="h-5 w-5 text-muted-foreground" />
          ) : progress === 100 ? (
            <CheckCircle2 className="h-5 w-5 text-chart-5" />
          ) : null}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>

        {progress !== undefined && !locked && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        <Link href={locked ? "#" : `/dashboard/education/${id}`}>
          <Button className="w-full" disabled={locked}>
            {locked ? "Locked" : progress === 100 ? "Review" : progress ? "Continue" : "Start Learning"}
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}