"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, XCircle, HelpCircle } from 'lucide-react'

interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

interface QuizProps {
  questions: Question[]
  onComplete?: (score: number) => void
}

export function Quiz({ questions, onComplete }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [quizFinished, setQuizFinished] = useState(false)

  const handleAnswer = () => {
    if (selectedAnswer === null) return

    const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer
    if (isCorrect) setScore(score + 1)
    setShowResult(true)
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      const finalScore = Math.round(
        ((score + (selectedAnswer === questions[currentQuestion].correctAnswer ? 1 : 0)) / questions.length) * 100,
      )
      onComplete?.(finalScore)
      setQuizFinished(true)
    }
  }

  if (quizFinished) {
    const finalScore = Math.round(
      ((score + (selectedAnswer === questions[currentQuestion].correctAnswer ? 1 : 0)) / questions.length) * 100,
    )
    return (
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardContent className="p-8 text-center space-y-4">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Quiz Completed!</h2>
            <p className="text-muted-foreground">Great job completing this lesson!</p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="text-5xl font-bold text-chart-5">{finalScore}%</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  const question = questions[currentQuestion]
  const isCorrect = selectedAnswer === question.correctAnswer

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-primary" />
            Knowledge Check
          </CardTitle>
          <Badge variant="outline">
            Question {currentQuestion + 1} of {questions.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">{question.question}</h3>
          <div className="space-y-2">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => !showResult && setSelectedAnswer(index)}
                disabled={showResult}
                className={`w-full p-4 rounded-lg border text-left transition-colors ${
                  showResult
                    ? index === question.correctAnswer
                      ? "border-chart-5 bg-chart-5/10"
                      : index === selectedAnswer
                        ? "border-destructive bg-destructive/10"
                        : "border-border/50 bg-background/30"
                    : selectedAnswer === index
                      ? "border-primary bg-primary/10"
                      : "border-border/50 bg-background/30 hover:bg-background/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`h-6 w-6 rounded-full border-2 flex items-center justify-center ${
                      showResult && index === question.correctAnswer
                        ? "border-chart-5 bg-chart-5"
                        : showResult && index === selectedAnswer
                          ? "border-destructive bg-destructive"
                          : selectedAnswer === index
                            ? "border-primary bg-primary"
                            : "border-border"
                    }`}
                  >
                    {showResult && index === question.correctAnswer && <CheckCircle2 className="h-4 w-4 text-white" />}
                    {showResult && index === selectedAnswer && index !== question.correctAnswer && (
                      <XCircle className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <span className="text-sm">{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {showResult && (
          <div
            className={`p-4 rounded-lg border ${
              isCorrect ? "border-chart-5/30 bg-chart-5/5" : "border-destructive/30 bg-destructive/5"
            }`}
          >
            <div className="flex items-start gap-3">
              {isCorrect ? (
                <CheckCircle2 className="h-5 w-5 text-chart-5 flex-shrink-0 mt-0.5" />
              ) : (
                <XCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
              )}
              <div className="space-y-1">
                <p className="font-semibold">{isCorrect ? "Correct!" : "Incorrect"}</p>
                <p className="text-sm text-muted-foreground">{question.explanation}</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Score: {score} / {currentQuestion + (showResult ? 1 : 0)}
          </div>
          {showResult ? (
            <Button onClick={handleNext}>
              {currentQuestion < questions.length - 1 ? "Next Question" : "Complete Quiz"}
            </Button>
          ) : (
            <Button onClick={handleAnswer} disabled={selectedAnswer === null}>
              Submit Answer
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}