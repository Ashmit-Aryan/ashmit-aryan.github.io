'use client'
import { motion } from 'framer-motion'
import { Calendar, Award, Users, Target } from 'lucide-react'
import {
  experiences,
  leadershipExperiences,
  educationExperiences,
} from '@/data/experience'
import { cn } from '@/utils'

export function Experience() {
  return (
    <section
      id="experience"
      className="section bg-bg-primary"
      aria-labelledby="experience-title"
    >
      <div className="container">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          className="section-header"
        >
          <span className="section-tag">04</span>

          <h2 id="experience-title" className="section-title">
            Experience & Leadership
          </h2>

          <p className="section-subtitle">
            My professional journey and community impact
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="timeline relative max-w-3xl mx-auto hidden md:block">

          {/* Timeline Line */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-border-secondary"
            aria-hidden="true"
          />

          {/* =========================================================
              LEADERSHIP & COMMUNITY
          ========================================================= */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            className="mb-16"
          >
            <h3 className="font-display text-xl font-semibold text-fg-primary mb-8 flex items-center gap-3">
              <Users
                className="w-6 h-6 text-accent-primary"
                aria-hidden="true"
              />

              Leadership & Community
            </h3>

            <div className="space-y-8">

              {leadershipExperiences.map((exp, index) => (

                <motion.div
                  key={exp.id}
                  initial={{
                    opacity: 0,
                    x: index % 2 === 0 ? -30 : 30,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className={cn(
                    'timeline-item relative flex',
                    index % 2 === 0
                      ? 'justify-end pr-[calc(50%+2rem)]'
                      : 'justify-start pl-[calc(50%+2rem)]'
                  )}
                >

                  {/* Timeline Marker */}
                  <div
                    className="timeline-marker absolute left-1/2 top-0 w-4 h-4 bg-bg-primary border-[3px] border-accent-primary rounded-full -translate-x-1/2 z-10 shadow-glow"
                    aria-hidden="true"
                  />

                  {/* Card */}
                  <div className="timeline-content w-full max-w-md bg-bg-glass border border-border-secondary rounded-xl p-6 backdrop-blur-md transition-all duration-250 hover:border-accent-primary hover:shadow-glow">

                    {/* Company Header */}
                    <div className="flex items-center gap-4 mb-4">

                      {/* Logo */}
                      <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-bg-tertiary border border-border-secondary flex items-center justify-center overflow-hidden">

                        {exp.logo ? (
                          <img
                            src={exp.logo}
                            alt={`${exp.company} logo`}
                            className="w-full h-full object-contain p-2"
                            loading="lazy"
                          />
                        ) : (
                          <span className="font-display text-xl font-bold text-accent-primary">
                            {exp.company.charAt(0).toUpperCase()}
                          </span>
                        )}

                      </div>

                      {/* Company + Period */}
                      <div className="min-w-0 flex-1">

                        <div className="timeline-meta flex items-center gap-3 flex-wrap">

                          <span className="timeline-company font-display text-lg font-semibold text-fg-primary">
                            {exp.company}
                          </span>

                          <span className="timeline-period font-mono text-xs text-accent-primary bg-accent-primary-dim px-3 py-1 rounded-full whitespace-nowrap">
                            <Calendar
                              className="w-3 h-3 inline mr-1"
                              aria-hidden="true"
                            />

                            {exp.period}
                          </span>

                        </div>

                        <h4 className="timeline-role text-base font-medium text-accent-primary mt-1">
                          {exp.role}
                        </h4>

                      </div>

                    </div>

                    {/* Description */}
                    <p className="timeline-description text-fg-secondary leading-relaxed mb-4">
                      {exp.description}
                    </p>

                    {/* Technologies / Skills */}
                    <div className="timeline-tech flex flex-wrap gap-2">

                      {exp.tech.map((t: string, i: number) => (
                        <span
                          key={i}
                          className="font-mono text-xs px-2 py-1 bg-bg-tertiary border border-border-secondary rounded text-fg-tertiary"
                        >
                          {t}
                        </span>
                      ))}

                    </div>

                    {/* Achievements */}
                    <div className="mt-4 space-y-2">

                      {exp.achievements.map(
                        (achievement: string, i: number) => (

                          <motion.div
                            key={i}
                            initial={{
                              opacity: 0,
                              x: -10,
                            }}
                            whileInView={{
                              opacity: 1,
                              x: 0,
                            }}
                            viewport={{ once: true }}
                            transition={{
                              delay: i * 0.05,
                            }}
                            className="flex items-start gap-2 text-sm text-fg-secondary"
                          >

                            <Target
                              className="w-4 h-4 text-accent-primary flex-shrink-0 mt-0.5"
                              aria-hidden="true"
                            />

                            <span>
                              {achievement}
                            </span>

                          </motion.div>

                        )
                      )}

                    </div>

                  </div>

                </motion.div>

              ))}

            </div>

          </motion.div>

          {/* =========================================================
              EDUCATION
          ========================================================= */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
          >

            <h3 className="font-display text-xl font-semibold text-fg-primary mb-8 flex items-center gap-3">

              <Award
                className="w-6 h-6 text-accent-secondary"
                aria-hidden="true"
              />

              Education

            </h3>

            <div className="space-y-8">

              {educationExperiences.map((exp, index) => (

                <motion.div
                  key={exp.id}
                  initial={{
                    opacity: 0,
                    x: index % 2 === 0 ? -30 : 30,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.15,
                  }}
                  className={cn(
                    'timeline-item relative flex',
                    index % 2 === 0
                      ? 'justify-end pr-[calc(50%+2rem)]'
                      : 'justify-start pl-[calc(50%+2rem)]'
                  )}
                >

                  {/* Timeline Marker */}
                  <div
                    className="timeline-marker absolute left-1/2 top-0 w-4 h-4 bg-bg-primary border-[3px] border-accent-secondary rounded-full -translate-x-1/2 z-10 shadow-[0_0_20px_rgba(99,102,241,0.3)]"
                    aria-hidden="true"
                  />

                  {/* Card */}
                  <div className="timeline-content w-full max-w-md bg-bg-glass border border-border-secondary rounded-xl p-6 backdrop-blur-md transition-all duration-250 hover:border-accent-secondary hover:shadow-[0_0_20px_rgba(99,102,241,0.15)]">

                    {/* Education Header */}
                    <div className="flex items-center gap-4 mb-4">

                      {/* Logo */}
                      <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-bg-tertiary border border-border-secondary flex items-center justify-center overflow-hidden">

                        {exp.logo ? (
                          <img
                            src={exp.logo}
                            alt={`${exp.company} logo`}
                            className="w-full h-full object-contain p-2"
                            loading="lazy"
                          />
                        ) : (
                          <span className="font-display text-xl font-bold text-accent-secondary">
                            {exp.company.charAt(0).toUpperCase()}
                          </span>
                        )}

                      </div>

                      {/* Institution + Period */}
                      <div className="min-w-0 flex-1">

                        <div className="timeline-meta flex items-center gap-3 flex-wrap">

                          <span className="timeline-company font-display text-lg font-semibold text-fg-primary">
                            {exp.company}
                          </span>

                          <span className="timeline-period font-mono text-xs text-accent-secondary bg-accent-secondary-dim px-3 py-1 rounded-full whitespace-nowrap">

                            <Calendar
                              className="w-3 h-3 inline mr-1"
                              aria-hidden="true"
                            />

                            {exp.period}

                          </span>

                        </div>

                        <h4 className="timeline-role text-base font-medium text-accent-secondary mt-1">
                          {exp.role}
                        </h4>

                      </div>

                    </div>

                    {/* Description */}
                    <p className="timeline-description text-fg-secondary leading-relaxed mb-4">
                      {exp.description}
                    </p>

                    {/* Technologies / Skills */}
                    <div className="timeline-tech flex flex-wrap gap-2">

                      {exp.tech.map((t: string, i: number) => (
                        <span
                          key={i}
                          className="font-mono text-xs px-2 py-1 bg-bg-tertiary border border-border-secondary rounded text-fg-tertiary"
                        >
                          {t}
                        </span>
                      ))}

                    </div>

                    {/* Achievements */}
                    <div className="mt-4 space-y-2">

                      {exp.achievements.map(
                        (achievement: string, i: number) => (

                          <motion.div
                            key={i}
                            initial={{
                              opacity: 0,
                              x: -10,
                            }}
                            whileInView={{
                              opacity: 1,
                              x: 0,
                            }}
                            viewport={{ once: true }}
                            transition={{
                              delay: i * 0.05,
                            }}
                            className="flex items-start gap-2 text-sm text-fg-secondary"
                          >

                            <Award
                              className="w-4 h-4 text-accent-secondary flex-shrink-0 mt-0.5"
                              aria-hidden="true"
                            />

                            <span>
                              {achievement}
                            </span>

                          </motion.div>

                        )
                      )}

                    </div>

                  </div>

                </motion.div>

              ))}

            </div>

          </motion.div>

        </div>

        {/* Mobile Horizontal Timeline */}
        <div className="md:hidden">
          <div className="flex gap-4 overflow-x-auto scroll-snap-x pb-6 px-2 -mx-2 scrollbar-hide" role="list" aria-label="Experience timeline">
            {/* Leadership Items */}
            {leadershipExperiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="timeline-item-mobile flex-shrink-0 w-[85%] scroll-snap-start bg-bg-glass border border-border-secondary rounded-xl p-6 backdrop-blur-md transition-all duration-250 hover:border-accent-primary hover:shadow-glow"
                role="listitem"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-bg-tertiary border border-border-secondary flex items-center justify-center overflow-hidden">
                    {exp.logo ? (
                      <img
                        src={exp.logo}
                        alt={`${exp.company} logo`}
                        className="w-full h-full object-contain p-2"
                        loading="lazy"
                      />
                    ) : (
                      <span className="font-display text-xl font-bold text-accent-primary">
                        {exp.company.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="timeline-meta flex items-center gap-3 flex-wrap">
                      <span className="timeline-company font-display text-lg font-semibold text-fg-primary">
                        {exp.company}
                      </span>
                      <span className="timeline-period font-mono text-xs text-accent-primary bg-accent-primary-dim px-3 py-1 rounded-full whitespace-nowrap">
                        <Calendar className="w-3 h-3 inline mr-1" aria-hidden="true" />
                        {exp.period}
                      </span>
                    </div>
                    <h4 className="timeline-role text-base font-medium text-accent-primary mt-1">
                      {exp.role}
                    </h4>
                  </div>
                </div>
                <p className="timeline-description text-fg-secondary leading-relaxed mb-4">
                  {exp.description}
                </p>
                <div className="timeline-tech flex flex-wrap gap-2 mb-4">
                  {exp.tech.map((t: string, i: number) => (
                    <span key={i} className="font-mono text-xs px-2 py-1 bg-bg-tertiary border border-border-secondary rounded text-fg-tertiary">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="space-y-2">
                  {exp.achievements.map((achievement: string, i: number) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-start gap-2 text-sm text-fg-secondary"
                    >
                      <Target className="w-4 h-4 text-accent-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{achievement}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
            {/* Education Items */}
            {educationExperiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="timeline-item-mobile flex-shrink-0 w-[85%] scroll-snap-start bg-bg-glass border border-border-secondary rounded-xl p-6 backdrop-blur-md transition-all duration-250 hover:border-accent-secondary hover:shadow-[0_0_20px_rgba(217,119,6,0.15)]"
                role="listitem"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-bg-tertiary border border-border-secondary flex items-center justify-center overflow-hidden">
                    {exp.logo ? (
                      <img
                        src={exp.logo}
                        alt={`${exp.company} logo`}
                        className="w-full h-full object-contain p-2"
                        loading="lazy"
                      />
                    ) : (
                      <span className="font-display text-xl font-bold text-accent-secondary">
                        {exp.company.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="timeline-meta flex items-center gap-3 flex-wrap">
                      <span className="timeline-company font-display text-lg font-semibold text-fg-primary">
                        {exp.company}
                      </span>
                      <span className="timeline-period font-mono text-xs text-accent-secondary bg-accent-secondary-dim px-3 py-1 rounded-full whitespace-nowrap">
                        <Calendar className="w-3 h-3 inline mr-1" aria-hidden="true" />
                        {exp.period}
                      </span>
                    </div>
                    <h4 className="timeline-role text-base font-medium text-accent-secondary mt-1">
                      {exp.role}
                    </h4>
                  </div>
                </div>
                <p className="timeline-description text-fg-secondary leading-relaxed mb-4">
                  {exp.description}
                </p>
                <div className="timeline-tech flex flex-wrap gap-2 mb-4">
                  {exp.tech.map((t: string, i: number) => (
                    <span key={i} className="font-mono text-xs px-2 py-1 bg-bg-tertiary border border-border-secondary rounded text-fg-tertiary">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="space-y-2">
                  {exp.achievements.map((achievement: string, i: number) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-start gap-2 text-sm text-fg-secondary"
                    >
                      <Award className="w-4 h-4 text-accent-secondary flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{achievement}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
          {/* Scroll hint */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-bg-primary to-transparent pointer-events-none" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}