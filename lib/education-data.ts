export const modules = [
  {
    id: "intro-space",
    title: "Introduction to Space Technology",
    description: "Learn the fundamentals of space technology, satellite operations, and orbital mechanics.",
    duration: "2 hours",
    difficulty: "beginner" as const,
    lessons: 5,
    progress: 0,
  },
  {
    id: "satellite-ops",
    title: "Satellite Operations",
    description: "Understand how satellites work, their components, and operational procedures.",
    duration: "3 hours",
    difficulty: "intermediate" as const,
    lessons: 7,
    progress: 45,
  },
  {
    id: "orbital-mechanics",
    title: "Orbital Mechanics",
    description: "Deep dive into the physics of orbital motion, trajectories, and maneuvering.",
    duration: "4 hours",
    difficulty: "advanced" as const,
    lessons: 8,
    progress: 0,
    locked: true,
  },
  {
    id: "space-debris",
    title: "Space Debris Management",
    description: "Learn about space debris, tracking methods, and mitigation strategies.",
    duration: "2.5 hours",
    difficulty: "intermediate" as const,
    lessons: 6,
    progress: 100,
  },
  {
    id: "collision-avoidance",
    title: "Collision Avoidance",
    description: "Master collision prediction, risk assessment, and avoidance maneuvers.",
    duration: "3 hours",
    difficulty: "advanced" as const,
    lessons: 7,
    progress: 20,
  },
  {
    id: "rwanda-space",
    title: "Rwanda's Space Program",
    description: "Explore Rwanda's journey into space, RwaSat-1, and future missions.",
    duration: "1.5 hours",
    difficulty: "beginner" as const,
    lessons: 4,
    progress: 75,
  },
]

export const sampleLesson = {
  title: "Understanding Low Earth Orbit (LEO)",
  content: [
    "Low Earth Orbit (LEO) is the region of space within 2,000 km above Earth's surface. This orbital region is home to the majority of operational satellites, including communication satellites, Earth observation satellites, and the International Space Station.",
    "Satellites in LEO experience significant atmospheric drag, which causes their orbits to decay over time. This means they require periodic orbital adjustments to maintain their altitude. The advantage of LEO is that satellites can achieve high-resolution imaging and lower communication latency due to their proximity to Earth.",
    "The orbital period in LEO is approximately 90 minutes, meaning satellites complete about 16 orbits per day. This rapid orbital motion allows for frequent revisits to specific locations on Earth, making LEO ideal for Earth observation and monitoring applications.",
    "Rwanda's RwaSat-1 operates in LEO at an altitude of approximately 575 km. At this altitude, the satellite can capture detailed images of Rwanda and surrounding regions while maintaining a stable orbit with manageable fuel requirements for station-keeping.",
  ],
  keyPoints: [
    "LEO extends from 160 km to 2,000 km above Earth's surface",
    "Satellites in LEO complete one orbit approximately every 90 minutes",
    "LEO is ideal for Earth observation due to proximity and high resolution",
    "Atmospheric drag requires periodic orbital adjustments",
    "Most operational satellites, including RwaSat-1, operate in LEO",
  ],
}

export const sampleQuiz = [
  {
    id: "q1",
    question: "What is the approximate altitude range of Low Earth Orbit (LEO)?",
    options: ["0-160 km", "160-2,000 km", "2,000-35,786 km", "Above 35,786 km"],
    correctAnswer: 1,
    explanation:
      "LEO extends from approximately 160 km to 2,000 km above Earth's surface, where most operational satellites orbit.",
  },
  {
    id: "q2",
    question: "How long does it take for a satellite in LEO to complete one orbit around Earth?",
    options: ["30 minutes", "90 minutes", "24 hours", "7 days"],
    correctAnswer: 1,
    explanation:
      "Satellites in LEO typically complete one orbit in approximately 90 minutes, allowing for about 16 orbits per day.",
  },
  {
    id: "q3",
    question: "What is the primary advantage of operating satellites in LEO?",
    options: [
      "No atmospheric drag",
      "Geostationary position",
      "High-resolution imaging and low latency",
      "Unlimited fuel supply",
    ],
    correctAnswer: 2,
    explanation:
      "LEO's proximity to Earth enables high-resolution imaging and lower communication latency, making it ideal for Earth observation and communication applications.",
  },
]