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

// Per-module lesson content used by the LessonContent component
export const lessonsByModule: Record<string, { title: string; content: string[]; keyPoints?: string[] }> = {
  "intro-space": {
    title: "What Is Space Technology?",
    content: [
      "Space technology encompasses the tools and methods used to explore, observe, and utilize space—launch vehicles, spacecraft, satellites, ground stations, and data systems.",
      "Key application areas include Earth observation, communications, navigation, scientific exploration, and disaster management.",
      "This module introduces the space ecosystem and the lifecycle of a satellite mission—from concept to end-of-life disposal.",
    ],
    keyPoints: [
      "Space segment + ground segment + launch segment",
      "Common missions: EO, comms, PNT, science",
      "Mission lifecycle: design → build → launch → operate → deorbit",
    ],
  },
  "satellite-ops": {
    title: "Operating a Satellite",
    content: [
      "Satellite operations involve planning activities, executing commands, monitoring telemetry, and managing anomalies.",
      "Typical subsystems: power, ADCS (attitude), thermal, communications, payload, and propulsion.",
      "Operations teams coordinate passes over ground stations to upload commands and download data.",
    ],
    keyPoints: [
      "Uplink commands / downlink telemetry",
      "Health and safety of subsystems is priority #1",
      "Pass scheduling around ground station visibility",
    ],
  },
  "orbital-mechanics": {
    title: "Basics of Orbital Mechanics",
    content: [
      "Orbits are conic sections described by Keplerian elements; energy and angular momentum define motion.",
      "Common orbits: LEO, MEO, GEO, and Sun-synchronous; transfers use impulses such as Hohmann maneuvers.",
      "Perturbations (J2, drag, third-body) cause secular and periodic changes requiring station-keeping.",
    ],
    keyPoints: [
      "Six Keplerian elements describe an orbit",
      "Delta‑V budgets determine maneuverability",
      "SSO useful for Earth imaging",
    ],
  },
  "space-debris": {
    title: "Space Debris and Mitigation",
    content: [
      "Space debris includes defunct spacecraft, spent rocket stages, and fragments from breakups and collisions.",
      "Tracking networks maintain catalogs to predict conjunctions and assess risk.",
      "Mitigation: passivation, design-for-demise, end-of-life deorbit or graveyard relocation, and active debris removal.",
    ],
    keyPoints: [
      "Kessler syndrome risk from cascading collisions",
      "25‑year deorbit guideline in LEO",
      "Conjunction assessments drive avoidance maneuvers",
    ],
  },
  "collision-avoidance": {
    title: "Collision Avoidance Procedures",
    content: [
      "Conjunction Data Messages (CDMs) provide screening results with miss distance and covariance information.",
      "Risk assessment considers probability of collision (Pc), maneuver cost, and mission impacts.",
      "Avoidance maneuvers: along‑track speed changes or out‑of‑plane burns timed relative to TCA (time of closest approach).",
    ],
    keyPoints: [
      "Trigger thresholds for Pc and miss distance",
      "Maneuver design trades delta‑V vs. residual risk",
      "Post‑maneuver assessment confirms effectiveness",
    ],
  },
  "rwanda-space": {
    title: "Rwanda’s Space Efforts",
    content: [
      "RwaSat‑1 demonstrates Earth observation for agriculture and environmental monitoring.",
      "National initiatives focus on data use, capacity building, and international partnerships.",
      "Future missions target higher resolution imaging and communications services supporting development goals.",
    ],
    keyPoints: [
      "Earth observation enables agriculture insights",
      "Local skills and infrastructure are strategic",
      "Partnerships accelerate capability growth",
    ],
  },
}

// Per-module quizzes used by the Quiz component
export const quizzesByModule: Record<string, Array<{ id: string; question: string; options: string[]; correctAnswer: number; explanation: string }>> = {
  "intro-space": [
    {
      id: "q1",
      question: "Which segment sends commands to the spacecraft?",
      options: ["Space segment", "Ground segment", "Launch segment", "Payload segment"],
      correctAnswer: 1,
      explanation: "Operators on the ground segment uplink commands and receive telemetry.",
    },
    {
      id: "q2",
      question: "Which is NOT a common mission type?",
      options: ["Earth observation", "Navigation", "Underwater mapping", "Communications"],
      correctAnswer: 2,
      explanation: "Underwater mapping is not a space mission type; the others are common uses.",
    },
    {
      id: "q3",
      question: "What is the correct mission lifecycle order?",
      options: [
        "Build → operate → design → deorbit",
        "Design → build → launch → operate → deorbit",
        "Operate → launch → build → deorbit",
        "Design → operate → build → launch",
      ],
      correctAnswer: 1,
      explanation: "Missions move from design to build, launch, operations, then end‑of‑life.",
    },
  ],
  "satellite-ops": [
    {
      id: "q1",
      question: "During a ground pass, which actions commonly occur?",
      options: ["Fueling the spacecraft", "Uplink commands / downlink data", "Changing orbit inclination", "Replacing solar panels"],
      correctAnswer: 1,
      explanation: "Passes are used to send commands and receive telemetry or payload data.",
    },
    {
      id: "q2",
      question: "ADCS primarily controls a satellite’s…",
      options: ["Mass", "Attitude (orientation)", "Orbit period", "Thermal balance"],
      correctAnswer: 1,
      explanation: "The Attitude Determination and Control System manages orientation.",
    },
    {
      id: "q3",
      question: "Which is a top operational priority?",
      options: ["Add new features weekly", "Maximize downlink at all cost", "Maintain spacecraft health and safety", "Never perform maneuvers"],
      correctAnswer: 2,
      explanation: "Health and safety of subsystems come first; payload operations follow.",
    },
  ],
  "orbital-mechanics": [
    {
      id: "q1",
      question: "Which set describes the classical orbital elements?",
      options: [
        "Mass, thrust, temperature, power, delta‑V, drag",
        "Semi‑major axis, eccentricity, inclination, RAAN, argument of perigee, true anomaly",
        "LEO, MEO, GEO, HEO, SSO, GTO",
        "Periapsis, apoapsis, period, altitude, longitude, latitude",
      ],
      correctAnswer: 1,
      explanation: "The six Keplerian elements uniquely define an orbit at an epoch.",
    },
    {
      id: "q2",
      question: "A Hohmann transfer between circular orbits uses…",
      options: ["Continuous low thrust", "Two impulsive burns", "Aerobraking only", "No delta‑V"],
      correctAnswer: 1,
      explanation: "Two impulses: one to enter the transfer ellipse and one to circularize.",
    },
    {
      id: "q3",
      question: "Which perturbation dominates long‑term node regression in LEO?",
      options: ["Solar radiation pressure", "J2 oblateness", "Third‑body Moon", "Atmospheric tides"],
      correctAnswer: 1,
      explanation: "Earth’s J2 causes secular RAAN/argument drifts, key for SSO design.",
    },
  ],
  "space-debris": [
    {
      id: "q1",
      question: "Space debris primarily originates from…",
      options: ["Natural meteoroids only", "Breakups/collisions and spent stages", "Volcanic activity", "Solar flares"],
      correctAnswer: 1,
      explanation: "Most debris is anthropogenic: breakups and derelict hardware.",
    },
    {
      id: "q2",
      question: "The 25‑year guideline refers to…",
      options: ["Max mission duration", "Post‑mission deorbiting in LEO", "Telemetry retention", "Battery replacement"],
      correctAnswer: 1,
      explanation: "Objects in LEO should reenter within ~25 years after end of mission.",
    },
    {
      id: "q3",
      question: "Which action reduces breakup risk at end‑of‑life?",
      options: ["Spin up the spacecraft", "Passivation (venting energy sources)", "Raise perigee into LEO", "Disable tracking"],
      correctAnswer: 1,
      explanation: "Passivation removes stored energy in batteries/tanks to prevent explosions.",
    },
  ],
  "collision-avoidance": [
    {
      id: "q1",
      question: "CDM stands for…",
      options: ["Collision Design Model", "Conjunction Data Message", "Control Dynamics Matrix", "Critical Debris Metric"],
      correctAnswer: 1,
      explanation: "CDMs communicate screening results and state/covariance info.",
    },
    {
      id: "q2",
      question: "Which value is most associated with collision risk?",
      options: ["EIRP", "Probability of collision (Pc)", "RSSI", "SNR"],
      correctAnswer: 1,
      explanation: "Pc is derived from state/covariance overlaps at TCA.",
    },
    {
      id: "q3",
      question: "A common avoidance strategy in LEO is…",
      options: ["Instant reentry", "Out‑of‑plane plane change only", "Small along‑track delta‑V timed before TCA", "Solar sail deployment"],
      correctAnswer: 2,
      explanation: "Small prograde/retrograde burns adjust along‑track phasing to increase miss distance.",
    },
  ],
  "rwanda-space": [
    {
      id: "q1",
      question: "RwaSat‑1 primarily supports…",
      options: ["Deep‑space navigation", "Earth observation for national applications", "Interplanetary comms relay", "Crewed transport"],
      correctAnswer: 1,
      explanation: "RwaSat‑1 provides imaging data for agriculture and environment.",
    },
    {
      id: "q2",
      question: "A key enabler of sustainable national space capability is…",
      options: ["Only buying foreign images", "Local capacity building and partnerships", "Avoiding any regulations", "Exclusive focus on deep space"],
      correctAnswer: 1,
      explanation: "Workforce, infrastructure, and partnerships underpin long‑term value.",
    },
    {
      id: "q3",
      question: "Future missions for Rwanda are likely to target…",
      options: ["Higher‑resolution imaging and communications services", "Asteroid mining", "Crewed lunar landings", "Nuclear propulsion"],
      correctAnswer: 0,
      explanation: "Practical EO and communications missions align with national priorities.",
    },
  ],
}

// Generic fallbacks (used when a module has no custom content)
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
