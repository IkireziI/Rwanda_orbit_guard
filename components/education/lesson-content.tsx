import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, CheckCircle2 } from 'lucide-react'

interface LessonContentProps {
  title: string
  content: string[]
  keyPoints?: string[]
}

export function LessonContent({ title, content, keyPoints }: LessonContentProps) {
  return (
    <div className="space-y-6">
      {/* Main Content */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {content.map((paragraph, index) => (
            <p key={index} className="text-muted-foreground leading-relaxed">
              {paragraph}
            </p>
          ))}
        </CardContent>
      </Card>

      {/* Key Points */}
      {keyPoints && keyPoints.length > 0 && (
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg">Key Takeaways</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {keyPoints.map((point, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-chart-5 flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{point}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  )
}