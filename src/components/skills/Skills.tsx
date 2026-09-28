'use client'
import React from 'react'
import { Canvas } from '@react-three/fiber'
import { motion, AnimatePresence } from 'framer-motion'

import { skills, skillCategories, type Skill } from '@/data/skills'
import { cn } from '@/utils'
import { Code2, Server, Cloud, Terminal, Brain } from 'lucide-react'
import { Suspense } from 'react'

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  languages: Code2,
  frameworks: Server,
  devops: Cloud,
  tools: Terminal,
  concepts: Brain,
}

export function Skills() {
  const [activeCategory, setActiveCategory] = React.useState<'all' | Skill['category']>('all')

  return (
    <section id="skills" className="section bg-bg-secondary" aria-labelledby="skills-title">
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          className="section-header"
        >
          <span className="section-tag">03</span>
          <h2 id="skills-title" className="section-title">Technical Skills</h2>
          <p className="section-subtitle">Tools & technologies I work with</p>
        </motion.div>

        {/* Category Filter Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ delay: 0.1 }}
          className="skills-filter flex flex-wrap justify-center gap-3 mb-12"
          role="tablist"
          aria-label="Skill categories"
        >
          <button
            role="tab"
            aria-selected={activeCategory === 'all'}
            onClick={() => setActiveCategory('all')}
            className={cn(
              'filter-btn px-5 py-2 bg-bg-glass border border-border-secondary rounded-full',
              'font-display text-sm font-medium text-fg-secondary',
              'hover:bg-accent-primary-dim hover:border-accent-primary hover:text-accent-primary',
              'backdrop-blur-md transition-all duration-250',
              activeCategory === 'all'
                ? 'bg-accent-primary-dim border-accent-primary text-accent-primary'
                : ''
            )}
          >
            All
          </button>
          {skillCategories.map((cat) => (
            <button
              key={cat.key}
              role="tab"
              aria-selected={activeCategory === cat.key}
              onClick={() => setActiveCategory(cat.key as Skill['category'])}
              className={cn(
                'filter-btn px-5 py-2 bg-bg-glass border border-border-secondary rounded-full',
                'font-display text-sm font-medium text-fg-secondary',
                'hover:bg-accent-primary-dim hover:border-accent-primary hover:text-accent-primary',
                'backdrop-blur-md transition-all duration-250',
                activeCategory === cat.key
                  ? 'bg-accent-primary-dim border-accent-primary text-accent-primary'
                  : ''
              )}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Skills Categories - 2D List */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="skills-categories grid gap-6 mb-16"
            style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}
          >
            {skillCategories
              .filter(cat => activeCategory === 'all' || cat.key === activeCategory)
              .map((category, catIndex) => {
                const categorySkills = skills.filter((s) => s.category === category.key)
                const Icon = categoryIcons[category.key]
                return (
                  <motion.div
                    key={category.key}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: catIndex * 0.1 }}
                    className={cn(
                      'skill-category p-6 bg-bg-glass border border-border-secondary rounded-2xl backdrop-blur-md',
                      'transition-all duration-250',
                      'hover:border-accent-primary hover:shadow-glow'
                    )}
                  >
                    <div className="skill-category-header flex items-center gap-3 mb-6">
                      <div className="skill-category-icon w-12 h-12 flex items-center justify-center bg-accent-primary-dim rounded-lg text-accent-primary">
                        <Icon className="w-6 h-6" aria-hidden="true" />
                      </div>
                      <h3 className="font-display text-lg font-semibold text-fg-primary">{category.label}</h3>
                    </div>
                    <div className="skill-list flex flex-wrap gap-2">
                      {categorySkills.map((skill, skillIndex) => (
                        <motion.span
                          key={skill.name}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true, margin: '-50px' }}
                          transition={{ delay: skillIndex * 0.03 }}
                          className={cn(
                            'skill-item inline-flex items-center gap-2 px-4 py-2',
                            'bg-bg-tertiary border border-border-secondary rounded-full',
                            'text-sm font-medium text-fg-secondary transition-all duration-250',
                            'hover:border-accent-primary hover:text-fg-primary hover:-translate-y-0.5',
                            'relative overflow-hidden'
                          )}
                        >
                          <span>{skill.name}</span>
                          <div className="skill-item-level w-12 h-1 bg-bg-primary rounded-full overflow-hidden">
                            <motion.div
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: skill.level / 100 }}
                              transition={{ duration: 1, delay: skillIndex * 0.03 + 0.3, ease: [0.16, 1, 0.3, 1] }}
                              className="skill-item-level-bar h-full bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full"
                              style={{ transformOrigin: 'left center' }}
                            />
                          </div>
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                )
              })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}