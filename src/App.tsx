import { Suspense, lazy, useMemo } from 'react'
import { Canvas3D } from '@/components/canvas/Canvas3D'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CursorFollower } from '@/components/ui/CursorFollower'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { ToastProvider } from '@/components/ui/Toaster'
import { personalInfo } from '@/data/constants'
import { projects } from '@/data/projects'

// Lazy load heavy sections
const HeroSection = lazy(() => import('@/components/hero/Hero').then(m => ({ default: m.Hero })))
const AboutSection = lazy(() => import('@/components/about/About').then(m => ({ default: m.About })))
const ProjectsSection = lazy(() => import('@/components/projects/Projects').then(m => ({ default: m.Projects })))
const SkillsSection = lazy(() => import('@/components/skills/Skills').then(m => ({ default: m.Skills })))
const ExperienceSection = lazy(() => import('@/components/experience/Experience').then(m => ({ default: m.Experience })))
const ContactSection = lazy(() => import('@/components/contact/Contact').then(m => ({ default: m.Contact })))

function LoadingFallback() {
  return (
    <div className="h-96 flex items-center justify-center">
      <div className="text-fg-tertiary font-mono text-sm">Loading...</div>
    </div>
  )
}

// Define scrollToSection at module level so it's always available
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    const headerOffset = 80
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.scrollY - headerOffset
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
  }
}

if (typeof window !== 'undefined') {
  (window as unknown as Window & { scrollToSection: typeof scrollToSection }).scrollToSection = scrollToSection
}

export default function App() {
  return (
    <ToastProvider>
      {/* 3D Canvas Background */}
      <Canvas3D />
      
      {/* Scroll Progress */}
      <ScrollProgress />
      
      {/* Custom Cursor */}
      <CursorFollower />
      
      {/* Navigation */}
      <Header />
      
      {/* Main Content */}
      <main id="main-content">
        <Suspense fallback={<LoadingFallback />}>
          <HeroSection />
        </Suspense>
        
        <Suspense fallback={<LoadingFallback />}>
          <AboutSection />
        </Suspense>
        
        <Suspense fallback={<LoadingFallback />}>
          <ProjectsSection />
        </Suspense>
        
        <Suspense fallback={<LoadingFallback />}>
          <SkillsSection />
        </Suspense>
        
        <Suspense fallback={<LoadingFallback />}>
          <ExperienceSection />
        </Suspense>
        
        <Suspense fallback={<LoadingFallback />}>
          <ContactSection />
        </Suspense>
      </main>
      
      {/* Footer */}
      <Footer />
    </ToastProvider>
  )
}