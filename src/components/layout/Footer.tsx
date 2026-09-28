'use client'
import React from 'react'
import { Link } from 'react-scroll'
import { GitBranch, User, Code, Mail, Coffee } from 'lucide-react'
import { personalInfo, siteConfig } from '@/data/constants'
import { cn } from '@/utils'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className="bg-bg-primary border-t border-border-secondary py-16"
      role="contentinfo"
    >
      <div className="container">
        <div className="grid gap-12 md:grid-cols-[2fr_3fr] mb-12">
          {/* Brand */}
          <div className="footer-brand">
            <Link
              to="hero"
              smooth={true}
              duration={500}
              className="inline-flex mb-4"
              aria-label="Go to top"
            >
              <span className="font-display text-2xl font-bold bg-gradient-to-r from-fg-primary via-accent-primary to-accent-secondary bg-clip-text text-transparent">
                AA
              </span>
            </Link>
            <p className="text-fg-tertiary max-w-xs mb-6">
              {personalInfo.tagline}
            </p>
            <div className="flex gap-3">
              <a
                href={personalInfo.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'footer-social-link w-10 h-10 flex items-center justify-center',
                  'bg-bg-tertiary border border-border-secondary rounded-lg text-fg-tertiary',
                  'hover:bg-accent-primary-dim hover:border-accent-primary hover:text-accent-primary',
                  'transition-all duration-250'
                )}
                aria-label="GitHub"
              >
                <GitBranch className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href={personalInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'footer-social-link w-10 h-10 flex items-center justify-center',
                  'bg-bg-tertiary border border-border-secondary rounded-lg text-fg-tertiary',
                  'hover:bg-accent-primary-dim hover:border-accent-primary hover:text-accent-primary',
                  'transition-all duration-250'
                )}
                aria-label="LinkedIn"
              >
                <User className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href={personalInfo.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'footer-social-link w-10 h-10 flex items-center justify-center',
                  'bg-bg-tertiary border border-border-secondary rounded-lg text-fg-tertiary',
                  'hover:bg-accent-primary-dim hover:border-accent-primary hover:text-accent-primary',
                  'transition-all duration-250'
                )}
                aria-label="Twitter"
              >
                <Code className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className={cn(
                  'footer-social-link w-10 h-10 flex items-center justify-center',
                  'bg-bg-tertiary border border-border-secondary rounded-lg text-fg-tertiary',
                  'hover:bg-accent-primary-dim hover:border-accent-primary hover:text-accent-primary',
                  'transition-all duration-250'
                )}
                aria-label="Email"
              >
                <Mail className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <nav className="footer-nav grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-sm font-semibold text-fg-primary mb-4 uppercase tracking-wider">Navigate</h4>
              <ul className="list-none space-y-2">
                <li><Link to="about" smooth={true} duration={500} offset={-80} className="text-sm text-fg-tertiary hover:text-accent-primary transition-colors">About</Link></li>
                <li><Link to="projects" smooth={true} duration={500} offset={-80} className="text-sm text-fg-tertiary hover:text-accent-primary transition-colors">Projects</Link></li>
                <li><Link to="skills" smooth={true} duration={500} offset={-80} className="text-sm text-fg-tertiary hover:text-accent-primary transition-colors">Skills</Link></li>
                <li><Link to="experience" smooth={true} duration={500} offset={-80} className="text-sm text-fg-tertiary hover:text-accent-primary transition-colors">Experience</Link></li>
                <li><Link to="contact" smooth={true} duration={500} offset={-80} className="text-sm text-fg-tertiary hover:text-accent-primary transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-fg-primary mb-4 uppercase tracking-wider">Resources</h4>
              <ul className="list-none space-y-2">
                <li><a href={personalInfo.social.github} target="_blank" rel="noopener noreferrer" className="text-sm text-fg-tertiary hover:text-accent-primary transition-colors">GitHub</a></li>
                <li><a href={personalInfo.social.leetcode} target="_blank" rel="noopener noreferrer" className="text-sm text-fg-tertiary hover:text-accent-primary transition-colors">LeetCode</a></li>
                <li><a href="/blog" className="text-sm text-fg-tertiary hover:text-accent-primary transition-colors">Blog (Coming Soon)</a></li>
                <li><a href="/talks" className="text-sm text-fg-tertiary hover:text-accent-primary transition-colors">Talks (Coming Soon)</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-fg-primary mb-4 uppercase tracking-wider">Connect</h4>
              <ul className="list-none space-y-2">
                <li><a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2 text-sm text-fg-tertiary hover:text-accent-primary transition-colors truncate"><Mail className="w-4 h-4 flex-shrink-0" aria-hidden="true" />{personalInfo.email}</a></li>
                <li><a href={personalInfo.social.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-fg-tertiary hover:text-accent-primary transition-colors"><User className="w-4 h-4" aria-hidden="true" />LinkedIn</a></li>
                <li><a href={personalInfo.social.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-fg-tertiary hover:text-accent-primary transition-colors"><GitBranch className="w-4 h-4" aria-hidden="true" />GitHub</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-fg-primary mb-4 uppercase tracking-wider">Legal</h4>
              <ul className="list-none space-y-2">
                <li><a href="/privacy" className="text-sm text-fg-tertiary hover:text-accent-primary transition-colors">Privacy Policy</a></li>
                <li><a href="/terms" className="text-sm text-fg-tertiary hover:text-accent-primary transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </nav>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-border-secondary">
          <p className="text-sm text-fg-tertiary text-center md:text-left">
            &copy; {currentYear} {personalInfo.name}. Built with React, Three.js, TypeScript & a lot of{' '}
            <Coffee className="w-4 h-4 inline-block align-middle" aria-hidden="true" />
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="footer-tech-item font-mono text-xs text-fg-muted px-3 py-1 bg-bg-tertiary border border-border-secondary rounded-full">
              Performance: 95+
            </span>
            <span className="footer-tech-item font-mono text-xs text-fg-muted px-3 py-1 bg-bg-tertiary border border-border-secondary rounded-full">
              Accessibility: 100
            </span>
            <span className="footer-tech-item font-mono text-xs text-fg-muted px-3 py-1 bg-bg-tertiary border border-border-secondary rounded-full">
              SEO: 100
            </span>
            <span className="footer-tech-item font-mono text-xs text-fg-muted px-3 py-1 bg-bg-tertiary border border-border-secondary rounded-full">
              Best Practices: 100
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}