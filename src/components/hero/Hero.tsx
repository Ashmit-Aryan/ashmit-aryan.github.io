// BUILD_TEST_1790117270
'use client'
import React from 'react'
import { Link } from 'react-scroll'
import { ArrowRight, Download, GitBranch, User, Code, Mail, Copy, ExternalLink } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { personalInfo } from '@/data/constants'
import { useToastActions } from '@/components/ui/Toaster'

const socialLinks = [
  { href: personalInfo.social.github, label: 'GitHub', icon: GitBranch },
  { href: personalInfo.social.linkedin, label: 'LinkedIn', icon: User },
  { href: personalInfo.social.leetcode, label: 'LeetCode', icon: Code },
]

const taglines = [
  'Software Developer',
  'Tech Community Leader',
  'Systems Engineer',
]

export function Hero() {
  const { success: toastSuccess } = useToastActions()
  const [typingText, setTypingText] = React.useState('')
  const [isDeleting, setIsDeleting] = React.useState(false)
  const currentTaglineRef = React.useRef(0)

  React.useEffect(() => {
    const type = () => {
      const fullText = taglines[currentTaglineRef.current]
      if (!isDeleting) {
        setTypingText(fullText.slice(0, typingText.length + 1))
        if (typingText.length === fullText.length) {
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        setTypingText(fullText.slice(0, typingText.length - 1))
        if (typingText.length === 0) {
          setIsDeleting(false)
          currentTaglineRef.current = (currentTaglineRef.current + 1) % taglines.length
        }
      }
    }
    const interval = setInterval(type, isDeleting ? 50 : 100)
    return () => clearInterval(interval)
  }, [typingText, isDeleting])

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toastSuccess('Copied!', `${label} copied to clipboard`)
  }

  const metaItems = [
    { label: 'Location', value: personalInfo.location, icon: null, copyable: false },
    { label: 'Focus', value: 'Systems, API Design, DevOps', icon: null, copyable: false },
    { label: 'Communities', value: 'TechStars, JHMUN, IIMUN', icon: null, copyable: false },
    { label: 'Code', value: 'github.com/ashmit-aryan', icon: ExternalLink, copyable: true, href: personalInfo.social.github },
    { label: 'Email', value: personalInfo.email, icon: Mail, copyable: true },
  ]

  return (
    <section id="hero" className="hero relative min-h-screen flex items-center justify-center overflow-hidden" aria-labelledby="hero-title">
      <div className="hero-content relative z-10 max-w-5xl mx-auto px-6 py-8">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hero-badge inline-flex items-center gap-3 text-sm font-medium text-fg-secondary bg-bg-glass border border-border-secondary px-4 py-2 rounded-full mb-8 backdrop-blur-md"
        >
          <span className="hero-badge-dot w-2 h-2 bg-accent-primary rounded-full animate-pulse" aria-hidden="true" />
          <span>Available for internships, collaborations & open source</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          id="hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hero-title font-display text-5xl font-bold leading-[1.05] mb-6 tracking-tight"
        >
          <span className="block overflow-hidden">
            <motion.span
              className="hero-title-word block"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              Hi, I&apos;m
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="hero-title-word hero-title-word--highlight block bg-gradient-to-r from-fg-primary via-accent-primary to-accent-secondary bg-clip-text text-transparent cursor-pointer select-none hover:opacity-80 transition-opacity"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {personalInfo.name}
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="hero-title-word block"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentTaglineRef.current}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="typing inline-block min-w-[280px]"
                >
                  {typingText}
                </motion.span>
              </AnimatePresence>
            </motion.span>
          </span>
        </motion.h1>

        {/* Meta - Key Value Pairs */}
        <motion.dl
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="hero-meta grid gap-3 md:grid-cols-2 lg:grid-cols-3 max-w-3xl mx-auto mb-10 text-left"
        >
          {metaItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.7 + index * 0.08 }}
              className="flex flex-col gap-1 group"
            >
              <dt className="font-mono text-xs text-fg-tertiary uppercase tracking-wider">{item.label}</dt>
              <dd className="flex items-center gap-2 text-fg-secondary font-medium">
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent-primary transition-colors"
                  >
                    {item.value}
                  </a>
                ) : (
                  <span className="flex items-center gap-2">
                    {item.value}
                    {item.copyable && (
                      <button
                        onClick={() => copyToClipboard(item.value, item.label)}
                        className="p-1 rounded hover:bg-accent-primary-dim transition-colors opacity-0 group-hover:opacity-100"
                        aria-label={`Copy ${item.label}`}
                      >
                        <Copy className="w-4 h-4 text-fg-tertiary hover:text-accent-primary" />
                      </button>
                    )}
                  </span>
                )}
              </dd>
            </motion.div>
          ))}
        </motion.dl>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="hero-actions flex flex-wrap justify-center gap-4 mb-10"
        >
          <Link
            to="projects"
            smooth={true}
            duration={500}
            offset={-80}
            className="btn btn-primary group"
            aria-label="View my projects"
          >
            <span className="btn-text">View Projects</span>
            <ArrowRight className="btn-icon w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </Link>
          <a
            href={personalInfo.resumeUrl}
            download
            className="btn btn-secondary"
            aria-label="Download resume"
          >
            <Download className="w-5 h-5 mr-2" aria-hidden="true" />
            Download Resume
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="hero-social flex justify-center gap-5 mb-16"
        >
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link group"
              aria-label={social.label}
            >
              <social.icon className="w-5 h-5 transition-transform group-hover:scale-110" aria-hidden="true" />
            </a>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-fg-tertiary text-xs font-medium uppercase tracking-widest"
        style={{ animation: 'scrollBounce 3s ease-in-out infinite' }}
        aria-hidden="true"
      >
        <span>Scroll</span>
        <div className="hero-scroll-mouse w-[26px] h-[42px] border-2 border-fg-tertiary rounded-full flex justify-center pt-2">
          <div className="hero-scroll-wheel w-1 h-2 bg-accent-primary rounded-full" style={{ animation: 'wheelScroll 1.5s ease-in-out infinite' }} />
        </div>
      </motion.div>
    </section>
  )
}export const BUILD_MARKER = 'test-1790116658';