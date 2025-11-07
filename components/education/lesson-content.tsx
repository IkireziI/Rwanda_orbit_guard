import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen } from "lucide-react"

interface LessonContentProps {
  title: string
  content: string[]
  keyPoints?: string[]
}

export function LessonContent({ title, content, keyPoints }: LessonContentProps) {
  return (
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

        {keyPoints && keyPoints.length > 0 && (
          <div className="p-4 rounded-lg border border-primary/30 bg-primary/5 space-y-3">
            <h4 className="font-semibold flex items-center gap-2">
              <span className="text-primary">Key Takeaways</span>
            </h4>
            <ul className="space-y-2">
              {keyPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <Badge variant="outline" className="mt-0.5 h-5 w-5 p-0 flex items-center justify-center">
                    {index + 1}
                  </Badge>
                  <span className="text-muted-foreground">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
