'use client'
import { Canvas } from '@react-three/fiber'
import { HeroScene } from './HeroScene'
import { useReducedMotion } from '@/hooks'
import { Suspense } from 'react'

function CanvasContent() {
  const reducedMotion = useReducedMotion()

  // Only render 3D if not reduced motion
  if (reducedMotion) {
    return null
  }

  return (
    <Canvas
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        stencil: false,
        depth: true,
      }}
      camera={{ position: [0, 0, 50], fov: 60 }}
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, pointerEvents: 'none' }}
      onCreated={({ gl }) => {
        gl.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      }}
    >
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>
    </Canvas>
  )
}

export function Canvas3D() {
  const reducedMotion = useReducedMotion()

  // Don't render canvas at all if reduced motion
  if (reducedMotion) {
    return null
  }

  return (
    <>
      <CanvasContent />
      {/* Fallback CSS gradient for reduced motion or WebGL failure */}
      <div
        className="fixed inset-0 -z-10 bg-gradient-to-b from-bg-primary via-bg-secondary to-bg-primary"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--accent-primary-dim)_0%,transparent_70%)]" />
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full blur-[120px] opacity-20 bg-accent-primary animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full blur-[120px] opacity-20 bg-accent-secondary animate-float" style={{ animationDelay: '-7s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full blur-[120px] opacity-20 bg-accent-tertiary animate-float" style={{ animationDelay: '-14s' }} />
      </div>
    </>
  )
}