'use client'
import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, GitBranch, ChevronDown, ChevronUp } from 'lucide-react'
import { projects, categories, type Project } from '@/data/projects'
import { cn } from '@/utils'

const categoryColors: Record<string, string> = {
  systems: 'border-accent-primary text-accent-primary',
  hackathons: 'border-accent-secondary text-accent-secondary',
  backend: 'border-accent-tertiary text-accent-tertiary',
  opensource: 'border-accent-warning text-accent-warning',
  fullstack: 'border-accent-primary text-accent-primary',
}

const projectApiSpecs: Record<string, { method: string; endpoint: string; body: object }> = {
  'deployguard': {
    method: 'POST',
    endpoint: '/api/deploy/validate',
    body: { environment: 'production', checks: ['health', 'config', 'dependencies', 'migrations'] }
  },
  'chatapp': {
    method: 'POST',
    endpoint: '/api/messages',
    body: { conversationId: 'uuid', content: 'Hello world', type: 'text' }
  },
  'hms': {
    method: 'POST',
    endpoint: '/api/appointments',
    body: { patientId: 'uuid', doctorId: 'uuid', date: '2026-01-15T10:00:00Z', type: 'consultation' }
  },
  'sms': {
    method: 'POST',
    endpoint: '/api/students',
    body: { name: 'John Doe', email: 'john@example.com', course: 'Computer Science', year: 2026 }
  },
  'attendance': {
    method: 'GET',
    endpoint: '/api/attendance/stats',
    body: { studentId: 'uuid', semester: '2026-1' }
  },
  'nasa': {
    method: 'GET',
    endpoint: '/api/apod',
    body: { date: '2026-01-15', hd: true }
  },
}

const projectMetrics: Record<string, { label: string; value: string }[]> = {
  'deployguard': [
    { label: 'Uptime', value: '99.9%' },
    { label: 'P99 Latency', value: '<200ms' },
    { label: 'Deployments', value: '500+' },
  ],
  'chatapp': [
    { label: 'Concurrent Users', value: '1000+' },
    { label: 'Message Latency', value: '<50ms' },
    { label: 'Uptime', value: '99.5%' },
  ],
  'hms': [
    { label: 'Patients Managed', value: '5000+' },
    { label: 'Appointments/Day', value: '200+' },
    { label: 'Departments', value: '12' },
  ],
  'sms': [
    { label: 'Students', value: '2000+' },
    { label: 'Courses', value: '50+' },
    { label: 'Faculty', value: '100+' },
  ],
  'attendance': [
    { label: 'Students Tracked', value: '500+' },
    { label: 'Accuracy', value: '98.5%' },
    { label: 'Reports Generated', value: '1000+' },
  ],
  'nasa': [
    { label: 'API Calls/Day', value: '100+' },
    { label: 'Cache Hit Rate', value: '95%' },
    { label: 'Offline Support', value: 'Yes' },
  ],
}

export function Projects() {
  const [activeCategory, setActiveCategory] = useState<'all' | Project['category']>('all')
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [openDrawer, setOpenDrawer] = useState<number | null>(null)

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') return projects
    return projects.filter((p) => p.category === activeCategory)
  }, [activeCategory])

  const visibleProjects = useMemo(() => {
    return filteredProjects.filter((p) => activeCategory === 'all' || p.featured || filteredProjects.length <= 6)
  }, [filteredProjects, activeCategory])

  const handleDrawerOpen = (projectId: number) => {
    setOpenDrawer(projectId)
  }

  const handleDrawerClose = () => {
    setOpenDrawer(null)
  }

  const getProjectSpec = (projectId: number) => {
    const project = projects.find(p => p.id === projectId)
    const key = project?.title.toLowerCase().replace(/\s+/g, '') || ''
    return projectApiSpecs[key] || { method: 'GET', endpoint: '/api/projects', body: {} }
  }

  const getProjectMetric = (projectId: number) => {
    const project = projects.find(p => p.id === projectId)
    const key = project?.title.toLowerCase().replace(/\s+/g, '') || ''
    return projectMetrics[key] || []
  }

  return (
    <section id="projects" className="section bg-bg-primary relative" aria-labelledby="projects-title">
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          className="section-header"
        >
          <span className="section-tag">02</span>
          <h2 id="projects-title" className="section-title">Selected Work</h2>
          <p className="section-subtitle">Projects that showcase my craft</p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ delay: 0.1 }}
          className="work-filter flex flex-wrap justify-center gap-3 mb-12"
          role="tablist"
          aria-label="Project categories"
        >
          {categories.map((cat) => (
            <button
              key={cat.value}
              role="tab"
              aria-selected={activeCategory === cat.value}
              aria-controls={`${cat.value}-panel`}
              id={`${cat.value}-tab`}
              onClick={() => { setActiveCategory(cat.value as typeof activeCategory); setOpenDrawer(null); }}
              className={cn(
                'filter-btn px-5 py-2 bg-bg-glass border border-border-secondary rounded-full',
                'font-display text-sm font-medium text-fg-secondary',
                'hover:bg-accent-primary-dim hover:border-accent-primary hover:text-accent-primary',
                'backdrop-blur-md transition-all duration-250',
                activeCategory === cat.value
                  ? 'bg-accent-primary-dim border-accent-primary text-accent-primary'
                  : ''
              )}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid - Bento Layout */}
        <div
          id={`${activeCategory}-panel`}
          role="tabpanel"
          aria-labelledby={`${activeCategory}-tab`}
          className="work-grid grid gap-6 relative"
          style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gridAutoFlow: 'dense',
          }}
        >
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={cn(
                  'work-card group relative bg-bg-secondary border border-border-secondary rounded-2xl overflow-hidden',
                  'transition-all duration-500',
                  'hover:-translate-y-2 hover:border-accent-primary hover:shadow-xl hover:shadow-glow',
                  project.featured && 'md:col-span-2',
                  openDrawer === project.id && 'z-20'
                )}
                onMouseEnter={() => setHoveredCard(project.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={openDrawer === project.id ? { zIndex: 20 } : undefined}
              >
                {/* Media */}
                <div className="work-card-media relative aspect-[16/10] overflow-hidden bg-bg-tertiary">

  <img
    src={project.image}
    alt={project.imageAlt}
    className="absolute inset-0 w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
    loading="lazy"
  />

  {/* Gradient overlay */}
  <div
    className="absolute inset-0 bg-gradient-to-t from-bg-primary/80 via-transparent to-transparent"
    aria-hidden="true"
  />

  {/* Overlay Links */}
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: hoveredCard === project.id ? 1 : 0 }}
    transition={{ duration: 0.2 }}
    className="work-card-overlay absolute inset-0 bg-gradient-to-t from-bg-primary/95 via-transparent to-transparent flex items-end p-6"
  >
    <div className="work-card-links flex gap-3 w-full">

      {project.links.demo && (
        <a
          href={project.links.demo}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'work-card-link flex-1 flex items-center justify-center gap-2 px-4 py-3',
            'bg-bg-glass border border-border-secondary rounded-lg text-fg-primary',
            'text-sm font-medium backdrop-blur-md transition-all duration-250',
            'hover:bg-accent-primary hover:border-accent-primary hover:text-bg-primary'
          )}
        >
          <ExternalLink className="w-4 h-4" />
          Live Demo
        </a>
      )}

      {project.links.code && (
        <a
          href={project.links.code}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'work-card-link flex-1 flex items-center justify-center gap-2 px-4 py-3',
            'bg-bg-glass border border-border-secondary rounded-lg text-fg-primary',
            'text-sm font-medium backdrop-blur-md transition-all duration-250',
            'hover:bg-accent-primary hover:border-accent-primary hover:text-bg-primary'
          )}
        >
          <GitBranch className="w-4 h-4" />
          Source Code
        </a>
      )}

    </div>
  </motion.div>

</div>

                {/* Content */}
                <div className="work-card-content p-6">
                  {/* Tags */}
                  <div className="work-card-tags flex flex-wrap gap-2 mb-3">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className={cn(
                          'work-card-tag font-mono text-xs px-3 py-1 bg-bg-tertiary rounded-full transition-all duration-200',
                          'border border-border-secondary text-fg-tertiary',
                          'group-hover:border-accent-primary group-hover:text-accent-primary'
                        )}
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="work-card-tag font-mono text-xs px-3 py-1 bg-bg-tertiary border border-border-secondary rounded-full text-fg-tertiary">
                        +{project.tags.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Title & Category */}
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="work-card-title font-display text-xl font-semibold text-fg-primary mb-3 leading-snug flex-1">
                      {project.title}
                    </h3>
                    <span className={cn(
                      'px-2 py-1 rounded font-medium text-xs uppercase tracking-wider flex-shrink-0',
                      categoryColors[project.category]
                    )}>
                      {categories.find((c) => c.value === project.category)?.label}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="work-card-description text-fg-secondary leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Meta */}
                  <div className="work-card-meta flex items-center gap-4 pt-4 border-t border-border-secondary text-sm text-fg-tertiary">
                    <span>{project.year}</span>
                    <button
                      onClick={() => handleDrawerOpen(project.id)}
                      className="ml-auto flex items-center gap-1 text-fg-tertiary hover:text-accent-primary transition-colors font-mono text-xs"
                      aria-label={`View ${project.title} specs`}
                    >
                      <span>Specs</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Specs Drawer */}
                <AnimatePresence>
                  {openDrawer === project.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="specs-drawer absolute left-0 right-0 bottom-0 bg-bg-primary/95 backdrop-blur-md border-t border-border-secondary p-6 z-10"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-display text-lg font-semibold text-fg-primary">{project.title}</h4>
                          <p className="text-sm text-fg-tertiary mt-1">{project.description}</p>
                        </div>
                        <button
                          onClick={handleDrawerClose}
                          className="p-1 rounded hover:bg-bg-tertiary transition-colors text-fg-tertiary hover:text-fg-primary"
                          aria-label="Close specs"
                        >
                          <ChevronUp className="w-5 h-5" />
                        </button>
                      </div>

                      {/* API Spec */}
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="kbd bg-accent-primary-dim text-accent-primary px-2 py-0.5 rounded font-mono text-xs">
                            {getProjectSpec(project.id).method}
                          </span>
                          <code className="font-mono text-sm text-fg-primary">{getProjectSpec(project.id).endpoint}</code>
                        </div>
                        <pre className="api-block">
                          <code>{JSON.stringify(getProjectSpec(project.id).body, null, 2)}</code>
                        </pre>
                      </div>

                      {/* Metrics */}
                      {getProjectMetric(project.id).length > 0 && (
                        <div className="mb-4">
                          <h5 className="font-mono text-xs text-fg-tertiary uppercase tracking-wider mb-2">METRICS</h5>
                          <div className="flex flex-wrap gap-3">
                            {getProjectMetric(project.id).map((metric, i) => (
                              <div key={i} className="flex items-center gap-2 px-3 py-2 bg-bg-tertiary border border-border-secondary rounded-lg">
                                <span className="font-mono text-xs text-fg-tertiary">{metric.label}</span>
                                <span className="font-display text-sm font-semibold text-accent-primary">{metric.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Tech Stack */}
                      <div className="mb-4">
                        <h5 className="font-mono text-xs text-fg-tertiary uppercase tracking-wider mb-2">TECH STACK</h5>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 bg-bg-tertiary border border-border-secondary rounded-full text-sm font-medium text-fg-secondary font-mono hover:border-accent-primary hover:text-accent-primary transition-colors"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-3 pt-4 border-t border-border-secondary">
                        {project.links.code && (
                          <a
                            href={project.links.code}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary text-sm"
                          >
                            <GitBranch className="w-4 h-4" />
                            View Code
                          </a>
                        )}
                        {project.links.demo && (
                          <a
                            href={project.links.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-secondary text-sm"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Live Demo
                          </a>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* View All CTA */}
        {activeCategory === 'all' && projects.length > visibleProjects.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            className="work-cta text-center mt-12"
          >
            <button className="btn btn-ghost group">
              <span>View All Projects</span>
              <ExternalLink className="btn-icon w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  )
}