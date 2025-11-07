"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, XCircle } from 'lucide-react'

interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

interface QuizProps {
  questions: Question[]
  answers: Record<string, number>
  onAnswerChange: (questionId: string, answer: number) => void
  showResults: boolean
  onSubmit: () => void
  correctAnswers?: number
  totalQuestions?: number
  quizPercentage?: number
}

export function Quiz({
  questions,
  answers,
  onAnswerChange,
  showResults,
  onSubmit,
  correctAnswers = 0,
  totalQuestions = 0,
  quizPercentage = 0,
}: QuizProps) {
  const isComplete = Object.keys(answers).length === questions.length

  if (showResults) {
    return (
      <div className="space-y-6">
        {/* Results Summary */}
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm p-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Quiz Complete!</h2>
            <div className="flex items-center justify-center gap-2">
              <span className="text-5xl font-bold text-chart-5">{quizPercentage}%</span>
              <span className="text-xl text-muted-foreground">({correctAnswers}/{totalQuestions} correct)</span>
            </div>
            <div className="pt-4">
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
              >
                Retake Quiz
              </Button>
            </div>
          </div>
        </Card>

        {/* Detailed Results */}
        <div className="space-y-4">
          {questions.map((q, idx) => {
            const userAnswer = answers[q.id]
            const isCorrect = userAnswer === q.correctAnswer

            return (
              <Card key={q.id} className="border-border/50 bg-card/50 backdrop-blur-sm p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="font-semibold text-lg">{idx + 1}. {q.question}</p>
                    </div>
                    {isCorrect ? (
                      <CheckCircle2 className="h-6 w-6 text-chart-5 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-6 w-6 text-destructive flex-shrink-0" />
                    )}
                  </div>

                  <div className="space-y-2">
                    {q.options.map((option, optIdx) => (
                      <div
                        key={optIdx}
                        className={`p-3 rounded-lg border-2 transition-colors ${
                          optIdx === q.correctAnswer
                            ? "border-chart-5 bg-chart-5/10"
                            : optIdx === userAnswer && !isCorrect
                              ? "border-destructive bg-destructive/10"
                              : "border-border/50 bg-background/30"
                        }`}
                      >
                        <p className="font-medium">{option}</p>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 rounded-lg bg-background/50 border border-border/50">
                    <p className="font-semibold mb-2 text-sm">Explanation</p>
                    <p className="text-sm text-muted-foreground">{q.explanation}</p>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {questions.map((q, idx) => (
        <Card key={q.id} className="border-border/50 bg-card/50 backdrop-blur-sm p-8">
          <div className="space-y-4">
            <p className="font-semibold text-lg">
              {idx + 1}. {q.question}
            </p>

            <div className="space-y-2">
              {q.options.map((option, optIdx) => (
                <button
                  key={optIdx}
                  onClick={() => onAnswerChange(q.id, optIdx)}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                    answers[q.id] === optIdx
                      ? "border-primary bg-primary/10"
                      : "border-border/50 bg-background/30 hover:border-border"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-4 w-4 rounded border-2 flex items-center justify-center ${
                        answers[q.id] === optIdx
                          ? "border-primary bg-primary"
                          : "border-border/50"
                      }`}
                    >
                      {answers[q.id] === optIdx && (
                        <span className="text-white text-xs">✓</span>
                      )}
                    </div>
                    <span className="font-medium">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </Card>
      ))}

      <Card className="border-border/50 bg-card/50 backdrop-blur-sm p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {Object.keys(answers).length} of {questions.length} questions answered
          </p>
          <Button onClick={onSubmit} disabled={!isComplete}>
            Submit Quiz
          </Button>
        </div>
      </Card>
    </div>
  )
}