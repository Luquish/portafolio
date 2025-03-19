import { useEffect, useState, Suspense } from "react"
import Link from "next/link"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, PresentationControls, useGLTF } from "@react-three/drei"

// Componente del modelo 3D
function DuckModel() {
  const duck = useGLTF("/duck.glb")
  return (
    <primitive 
      object={duck.scene} 
      scale={2.5} 
      position={[0, -1, 0]} 
      rotation={[0, -0.5, 0]}
    />
  )
}

// Header component that will be positioned over the hero section
function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-10 px-6 py-4 flex justify-between items-center">
      <Link href="/" className="text-white text-xl font-medium">
        Luca Mazzarello
      </Link>
      <nav className="hidden md:block">
        <ul className="flex space-x-8">
          {["Projects", "Skills", "About", "Experience", "Contact"].map((item) => (
            <li key={item}>
              <Link href={`#${item.toLowerCase()}`} className="text-white hover:opacity-80 transition-opacity">
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

// Hero text overlay
function HeroText() {
  return (
    <div className="absolute inset-0 flex flex-col justify-end items-start p-10 sm:p-16 z-10 pointer-events-none">
      <h1 className="text-4xl sm:text-6xl font-bold text-white mb-4 max-w-2xl">
        Engineering the future
        <br />
        through open source
      </h1>
      <div className="flex gap-2 mt-6">
        <span className="w-12 h-12 rounded-md bg-white/20 backdrop-blur-sm"></span>
        <span className="w-12 h-12 rounded-md bg-white/20 backdrop-blur-sm"></span>
        <span className="w-12 h-12 rounded-md bg-white/20 backdrop-blur-sm"></span>
      </div>
    </div>
  )
}

// Counter in the bottom right
function Counter() {
  return (
    <div className="absolute bottom-10 right-10 text-white text-xl">
      01/04
    </div>
  )
}

// Animated background
function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#8A8D7A] to-[#5D5F4D]"></div>
      <div className="absolute w-[500px] h-[500px] rounded-full bg-[#AF8F6F]/10 blur-3xl -top-64 -right-64 animate-slow-pulse"></div>
      <div className="absolute w-[300px] h-[300px] rounded-full bg-[#74512D]/10 blur-3xl bottom-20 -left-20 animate-slow-pulse animation-delay-2000"></div>
    </div>
  )
}

// Main Hero Section component
export default function HeroSection() {
  return (
    <section className="relative h-screen w-full">
      <AnimatedBackground />
      <Header />
      
      {/* Aquí iría el modelo 3D que estamos omitiendo */}
      
      <HeroText />
      <Counter />
    </section>
  )
}

