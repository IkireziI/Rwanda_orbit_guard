"use client"

import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stars } from "@react-three/drei"

function Earth() {
  return (
    <group>
      <mesh>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial color="#1e40af" roughness={0.8} metalness={0.2} />
      </mesh>
      <mesh>
        <sphereGeometry args={[2.04, 64, 64]} />
        <meshBasicMaterial color="#60a5fa" transparent opacity={0.12} />
      </mesh>
    </group>
  )
}

function Orbits() {
  const radii = [3.5, 4.2, 5.0]
  return (
    <group rotation={[Math.PI / 2, 0, 0]}>
      {radii.map((r, i) => (
        <mesh key={i}>
          <torusGeometry args={[r, 0.02, 8, 128]} />
          <meshBasicMaterial color={"#94a3b8"} transparent opacity={0.35} />
        </mesh>
      ))}
    </group>
  )
}

function Satellites() {
  const sats = [
    { r: 3.5, color: "#60a5fa" },
    { r: 4.2, color: "#34d399" },
    { r: 5.0, color: "#fbbf24" },
  ]
  return (
    <group>
      {sats.map((s, i) => (
        <mesh key={i} position={[s.r, 0, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color={s.color} emissive={s.color} emissiveIntensity={0.4} />
        </mesh>
      ))}
    </group>
  )
}

export default function OrbitCanvas() {
  return (
    <Canvas camera={{ position: [0, 6, 10], fov: 55 }} style={{ width: "100%", height: "100%" }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 8, 5]} intensity={1} />
        <Stars radius={100} depth={40} count={3000} factor={4} fade />
        <Earth />
        <Orbits />
        <Satellites />
        <OrbitControls enablePan enableZoom enableRotate minDistance={4} maxDistance={30} />
      </Suspense>
    </Canvas>
  )
}
