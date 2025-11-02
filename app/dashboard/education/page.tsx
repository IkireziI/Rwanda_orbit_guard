"use client"

import { BookOpen, Play, Clock, Users, Star, ChevronRight } from "lucide-react"
import { useState } from "react"

interface Course {
  id: string
  title: string
  description: string
  duration: string
  students: number
  progress: number
  instructor: string
  level: "beginner" | "intermediate" | "advanced"
  rating: number
}

const mockCourses: Course[] = [
  {
    id: "COURSE-001",
    title: "Orbital Mechanics Fundamentals",
    description: "Learn the basics of orbital mechanics and satellite trajectories",
    duration: "4 hours",
    students: 234,
    progress: 65,
    instructor: "James Chen",
    level: "beginner",
    rating: 4.8,
  },
  {
    id: "COURSE-002",
    title: "Collision Risk Assessment",
    description: "Understanding collision probability and risk assessment methods",
    duration: "3 hours",
    students: 156,
    progress: 42,
    instructor: "Sarah Williams",
    level: "intermediate",
    rating: 4.6,
  },
  {
    id: "COURSE-003",
    title: "Space Debris Mitigation",
    description: "Best practices for debris tracking and mitigation strategies",
    duration: "2.5 hours",
    students: 89,
    progress: 28,
    instructor: "Michael Okonkwo",
    level: "advanced",
    rating: 4.9,
  },
  {
    id: "COURSE-004",
    title: "Satellite System Design",
    description: "Design and architecture of modern satellite systems",
    duration: "5 hours",
    students: 67,
    progress: 0,
    instructor: "Lisa Anderson",
    level: "advanced",
    rating: 4.7,
  },
]

const mockModules = [
  {
    id: "MOD-001",
    title: "Understanding Orbital Mechanics",
    lessons: 8,
    completed: 5,
  },
  {
    id: "MOD-002",
    title: "Collision Detection Systems",
    lessons: 6,
    completed: 3,
  },
  {
    id: "MOD-003",
    title: "Debris Tracking Technology",
    lessons: 7,
    completed: 0,
  },
]

export default function EducationPage() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [filterLevel, setFilterLevel] = useState<"all" | "beginner" | "intermediate" | "advanced">("all")

  const filtered = mockCourses.filter((course) => filterLevel === "all" || course.level === filterLevel)

  const getLevelColor = (level: Course["level"]) => {
    switch (level) {
      case "beginner":
        return "bg-green-500/20 text-green-400"
      case "intermediate":
        return "bg-yellow-500/20 text-yellow-400"
      case "advanced":
        return "bg-red-500/20 text-red-400"
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-text-primary mb-2">Education & Training</h1>
        <p className="text-text-secondary">Learn about satellite monitoring and orbital mechanics</p>
      </div>

      {/* Level Filter */}
      <div className="flex gap-2 flex-wrap">
        {(["all", "beginner", "intermediate", "advanced"] as const).map((level) => (
          <button
            key={level}
            onClick={() => setFilterLevel(level)}
            className={`px-4 py-2 rounded-lg transition ${
              filterLevel === level
                ? "bg-primary text-background"
                : "bg-surface border border-border text-text-secondary hover:border-primary"
            }`}
          >
            {level === "all" ? "All Levels" : level.charAt(0).toUpperCase() + level.slice(1)}
          </button>
        ))}
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-2 gap-6">
        {filtered.map((course) => (
          <div
            key={course.id}
            onClick={() => setSelectedCourse(selectedCourse?.id === course.id ? null : course)}
            className="p-6 rounded-lg border border-border bg-surface hover:border-primary/50 transition cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <button className="p-2 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 transition group-hover:scale-110 transition">
                <Play className="w-5 h-5" />
              </button>
            </div>

            <h3 className="text-lg font-semibold text-text-primary mb-2">{course.title}</h3>
            <p className="text-text-secondary text-sm mb-4">{course.description}</p>

            <div className="mb-4 pb-4 border-b border-border">
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-2 py-1 rounded text-xs font-medium ${getLevelColor(course.level)}`}>
                  {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                </span>
                <div className="flex items-center gap-1 ml-auto">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(course.rating)
                          ? "fill-accent-warning text-accent-warning"
                          : "text-text-secondary"
                      }`}
                    />
                  ))}
                  <span className="text-text-secondary text-xs ml-1">{course.rating}</span>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-xs text-text-secondary mb-2">
                <span>Progress</span>
                <span>{course.progress}%</span>
              </div>
              <div className="w-full h-2 bg-surface-secondary rounded-full overflow-hidden">
                <div className="h-full bg-primary transition-all" style={{ width: `${course.progress}%` }}></div>
              </div>
            </div>

            {/* Course Info */}
            <div className="flex gap-4 text-text-secondary text-sm pt-4 border-t border-border">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {course.duration}
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {course.students} students
              </div>
            </div>

            {selectedCourse?.id === course.id && (
              <div className="mt-4 pt-4 border-t border-border space-y-3">
                <div>
                  <div className="text-xs text-text-secondary mb-1">Instructor</div>
                  <div className="text-text-primary font-medium">{course.instructor}</div>
                </div>
                <button className="w-full px-4 py-2 rounded-lg bg-primary text-background font-medium hover:bg-primary-dark transition flex items-center justify-center gap-2">
                  {course.progress > 0 ? "Continue Course" : "Start Course"}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Learning Modules */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-text-primary mb-6">Learning Modules</h2>
        <div className="space-y-3">
          {mockModules.map((module) => (
            <div
              key={module.id}
              className="p-4 rounded-lg border border-border bg-surface hover:border-primary/50 transition"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">{module.title}</h3>
                    <p className="text-text-secondary text-sm">
                      {module.completed} of {module.lessons} lessons completed
                    </p>
                  </div>
                </div>
                <button className="px-4 py-2 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 transition">
                  Continue
                </button>
              </div>
              <div className="w-full h-2 bg-surface-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary"
                  style={{ width: `${(module.completed / module.lessons) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
