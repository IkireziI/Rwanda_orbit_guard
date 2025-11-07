"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { LessonContent } from "@/components/education/lesson-content"
import { Quiz } from "@/components/education/quiz"
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react'
import { sampleLesson, sampleQuiz, modules } from "@/lib/education-data"
import Link from "next/link"
import { useParams } from 'next/navigation'

export default function ModulePage() {
  const params = useParams()
  const moduleId = params.id as string

  const module = modules.find((m) => m.id === moduleId)

  const [currentLesson, setCurrentLesson] = useState(1)
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const totalLessons = module?.lessons || 5

  const handleQuizComplete = (score: number) => {
    setQuizCompleted(true)
  }

  const progress = (currentLesson / totalLessons) * 100

  if (!module) {
    return (
      <div className="p-8 space-y-4">
        <h1 className="text-2xl font-bold">Module not found</h1>
        <Link href="/dashboard/education">
          <Button>Back to Modules</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <Link href="/dashboard/education">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Modules
          </Button>
        </Link>
        <div>
          <h1 className="text-4xl font-bold text-balance mb-2">{module.title}</h1>
          <p className="text-muted-foreground">
            {showQuiz ? "Knowledge Check" : `Lesson ${currentLesson} of ${totalLessons}`}
          </p>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Course Progress</span>
            <span className="font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Content */}
      {!showQuiz ? (
        <div className="space-y-6">
          <LessonContent {...sampleLesson} />

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentLesson(Math.max(1, currentLesson - 1))}
              disabled={currentLesson === 1}
              className="bg-transparent"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous Lesson
            </Button>
            {currentLesson === totalLessons ? (
              <Button onClick={() => setShowQuiz(true)}>
                Take Quiz
                <CheckCircle2 className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={() => setCurrentLesson(Math.min(totalLessons, currentLesson + 1))}>
                Next Lesson
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <Quiz questions={sampleQuiz} onComplete={handleQuizComplete} />
          {quizCompleted && (
            <div className="flex justify-center">
              <Link href="/dashboard/education">
                <Button size="lg">Return to Modules</Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  )
}