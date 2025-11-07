"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { LessonContent } from "@/components/education/lesson-content"
import { Quiz } from "@/components/education/quiz"
import { modules, sampleLesson, sampleQuiz } from "@/lib/education-data"
import { ChevronLeft, BookOpen } from 'lucide-react'
import Link from "next/link"

export default function ModuleDetailPage({ params }: { params: { id: string } }) {
  const module = modules.find((m) => m.id === params.id)
  const [currentTab, setCurrentTab] = useState<"lesson" | "quiz">("lesson")
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({})
  const [showResults, setShowResults] = useState(false)

  if (!module) {
    return (
      <div className="p-8">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Module Not Found</h1>
          <p className="text-muted-foreground">The module you're looking for doesn't exist.</p>
          <Link href="/dashboard/education">
            <Button>Back to Education</Button>
          </Link>
        </div>
      </div>
    )
  }

  const correctAnswers = sampleQuiz.filter((q, idx) => quizAnswers[q.id] === q.correctAnswer).length
  const quizPercentage = Math.round((correctAnswers / sampleQuiz.length) * 100)

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <Link href="/dashboard/education">
          <Button variant="outline" size="sm" className="gap-2">
            <ChevronLeft className="h-4 w-4" />
            Back to Modules
          </Button>
        </Link>

        <div className="space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-2">
              <h1 className="text-4xl font-bold text-balance">{module.title}</h1>
              <p className="text-muted-foreground">{module.description}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <Badge variant="outline">{module.difficulty}</Badge>
            <Badge variant="secondary" className="gap-1">
              <BookOpen className="h-3 w-3" />
              {module.lessons} Lessons
            </Badge>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm p-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Course Progress</span>
            <span className="text-sm font-semibold">{module.progress || 0}%</span>
          </div>
          <Progress value={module.progress || 0} className="h-2" />
        </div>
      </Card>

      {/* Content Tabs */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 border-b border-border/50">
          <Button
            variant={currentTab === "lesson" ? "default" : "ghost"}
            onClick={() => setCurrentTab("lesson")}
            className="rounded-b-none"
          >
            Lesson Content
          </Button>
          <Button
            variant={currentTab === "quiz" ? "default" : "ghost"}
            onClick={() => setCurrentTab("quiz")}
            className="rounded-b-none"
          >
            Quiz
          </Button>
        </div>

        {/* Lesson Tab */}
        {currentTab === "lesson" && (
          <LessonContent lesson={sampleLesson} />
        )}

        {/* Quiz Tab */}
        {currentTab === "quiz" && (
          <Quiz
            questions={sampleQuiz}
            answers={quizAnswers}
            onAnswerChange={(questionId, answer) => {
              if (!showResults) {
                setQuizAnswers((prev) => ({ ...prev, [questionId]: answer }))
              }
            }}
            showResults={showResults}
            onSubmit={() => setShowResults(true)}
            correctAnswers={correctAnswers}
            totalQuestions={sampleQuiz.length}
            quizPercentage={quizPercentage}
          />
        )}
      </div>
    </div>
  )
}