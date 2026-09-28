'use client'
import React from 'react'
import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mail, GitBranch, User, Code, Send, CheckCircle, AlertCircle, Loader2, Download, Copy, ExternalLink } from 'lucide-react'
import { personalInfo } from '@/data/constants'
import { Button } from '@/components/ui/Button'
import { useToastActions } from '@/components/ui/Toaster'
import { cn } from '@/utils'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>

const contactMethods = [
  {
    label: 'Email',
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
    icon: Mail,
    description: 'Best for project inquiries',
  },
  {
    label: 'GitHub',
    value: 'github.com/ashmit-aryan',
    href: personalInfo.social.github,
    icon: GitBranch,
    description: 'Open source & code',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/ashmitaryan',
    href: personalInfo.social.linkedin,
    icon: User,
    description: 'Professional network',
  },
  {
    label: 'LeetCode',
    value: 'leetcode.com/ashmitaryan',
    href: personalInfo.social.leetcode,
    icon: Code,
    description: 'Algorithms & DSA',
  },
]

const API_URL = "https://portfolio-api-three-eosin.vercel.app"

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [responseData, setResponseData] = useState<{ status: number; body: object } | null>(null)
  const { success: toastSuccess, error: toastError } = useToastActions()

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onBlur',
  })

  const formValues = watch()

  const requestPreview = useMemo(() => ({
    method: 'POST',
    url: `${API_URL}/api/contact`,
    headers: {
      'Content-Type': 'application/json',
    },
    body: formValues,
  }), [formValues])

  const copyCurl = () => {
    const curl = `curl -X POST ${API_URL}/api/contact \\
  -H "Content-Type: application/json" \\
  -d '${JSON.stringify(formValues).replace(/'/g, "\\'")}'`
    navigator.clipboard.writeText(curl)
    toastSuccess('Copied!', 'cURL command copied to clipboard')
  }

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email)
    toastSuccess('Copied!', 'Email copied to clipboard')
  }

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setResponseData(null)

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const responseBody = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(responseBody.detail || 'Failed to send message')
      }

      setSubmitStatus('success')
      setResponseData({ status: response.status, body: responseBody })
      toastSuccess('Message sent!', "I'll get back to you within 24 hours.")
      reset()
    } catch (err) {
      setSubmitStatus('error')
      setResponseData({ status: 500, body: { error: err instanceof Error ? err.message : 'Unknown error' } })
      toastError('Failed to send', err instanceof Error ? err.message : 'Please try again later')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="section bg-bg-secondary" aria-labelledby="contact-title">
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          className="section-header"
        >
          <span className="section-tag">05</span>
          <h2 id="contact-title" className="section-title">Let&apos;s Work Together</h2>
          <p className="section-subtitle">
            I&apos;m always open to discussing new projects, collaboration opportunities, or just saying hello.
            Whether you have a specific project in mind or want to connect, I&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
          >
            <div className="contact-methods space-y-4">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={method.label}
                  href={method.href}
                  target={method.href.startsWith('mailto') ? '_self' : '_blank'}
                  rel={method.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    'contact-method flex items-center gap-4 p-4 bg-bg-glass border border-border-secondary rounded-xl',
                    'backdrop-blur-md transition-all duration-250 group',
                    'hover:border-accent-primary hover:shadow-glow hover:-translate-x-1'
                  )}
                >
                  <div className={cn(
                    'contact-method-icon w-12 h-12 flex items-center justify-center rounded-lg flex-shrink-0',
                    'bg-accent-primary-dim text-accent-primary group-hover:scale-110 transition-transform'
                  )}>
                    <method.icon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div className="contact-method-content flex-1 min-w-0">
                    <span className="contact-method-label text-xs font-semibold uppercase tracking-wider text-fg-tertiary">
                      {method.label}
                    </span>
                    <span className="contact-method-value text-base font-medium text-fg-primary truncate block flex items-center gap-2">
                      {method.value}
                      {method.label === 'Email' && (
                        <button
                          onClick={copyEmail}
                          className="p-1 rounded hover:bg-accent-primary-dim transition-colors opacity-0 group-hover:opacity-100"
                          aria-label="Copy email"
                        >
                          <Copy className="w-4 h-4 text-fg-tertiary hover:text-accent-primary" />
                        </button>
                      )}
                    </span>
                    <span className="contact-method-desc text-xs text-fg-muted mt-0.5 block">
                      {method.description}
                    </span>
                  </div>
                  <ExternalLink className="w-5 h-5 text-fg-tertiary group-hover:text-accent-primary transition-colors" aria-hidden="true" />
                </motion.a>
              ))}
            </div>

            {/* Resume Download */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-10 pt-8 border-t border-border-secondary"
            >
              <a
                href={personalInfo.resumeUrl}
                download
                className="btn btn-secondary w-full sm:w-auto flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" aria-hidden="true" />
                Download Resume
              </a>
              <p className="text-sm text-fg-tertiary text-center sm:text-left mt-3">
                Last updated: August 2026
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form - API Style */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="contact-form bg-bg-glass border border-border-secondary rounded-2xl p-8 backdrop-blur-md"
              noValidate
            >
              {/* API Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-border-secondary">
                <div className="flex items-center gap-2">
                  <span className="kbd bg-accent-primary-dim text-accent-primary px-2 py-0.5 rounded font-mono text-xs">
                    POST
                  </span>
                  <code className="font-mono text-sm text-fg-primary">/api/contact</code>
                </div>
                <button
                  type="button"
                  onClick={copyCurl}
                  className="p-2 rounded hover:bg-bg-tertiary transition-colors text-fg-tertiary hover:text-fg-primary"
                  aria-label="Copy as cURL"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>

              {/* Live Request Preview */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-fg-tertiary uppercase tracking-wider">REQUEST PREVIEW</span>
                  <span className="kbd bg-bg-tertiary border border-border-secondary px-2 py-0.5 rounded font-mono text-xs">
                    Live
                  </span>
                </div>
                <pre className="api-block">
                  <code>{JSON.stringify(requestPreview, null, 2)}</code>
                </pre>
              </div>

              {/* Form Fields */}
              <div className="space-y-6">
                {/* Name */}
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    className={cn(
                      'form-input',
                      errors.name && 'border-accent-error focus:border-accent-error focus:ring-accent-error/20'
                    )}
                    {...register('name')}
                    aria-invalid={errors.name ? 'true' : 'false'}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    disabled={isSubmitting}
                  />
                  <span className="form-line" aria-hidden="true" />
                  {errors.name && (
                    <p id="name-error" className="text-sm text-accent-error mt-1" role="alert">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className={cn(
                      'form-input',
                      errors.email && 'border-accent-error focus:border-accent-error focus:ring-accent-error/20'
                    )}
                    {...register('email')}
                    aria-invalid={errors.email ? 'true' : 'false'}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    disabled={isSubmitting}
                  />
                  <span className="form-line" aria-hidden="true" />
                  {errors.email && (
                    <p id="email-error" className="text-sm text-accent-error mt-1" role="alert">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Subject */}
                <div className="form-group">
                  <label htmlFor="subject" className="form-label">
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    placeholder="Project inquiry, collaboration, etc."
                    className={cn(
                      'form-input',
                      errors.subject && 'border-accent-error focus:border-accent-error focus:ring-accent-error/20'
                    )}
                    {...register('subject')}
                    aria-invalid={errors.subject ? 'true' : 'false'}
                    aria-describedby={errors.subject ? 'subject-error' : undefined}
                    disabled={isSubmitting}
                  />
                  <span className="form-line" aria-hidden="true" />
                  {errors.subject && (
                    <p id="subject-error" className="text-sm text-accent-error mt-1" role="alert">
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Tell me about your project, idea, or just say hello..."
                    className={cn(
                      'form-textarea',
                      errors.message && 'border-accent-error focus:border-accent-error focus:ring-accent-error/20'
                    )}
                    {...register('message')}
                    aria-invalid={errors.message ? 'true' : 'false'}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    disabled={isSubmitting}
                  />
                  <span className="form-line" aria-hidden="true" />
                  {errors.message && (
                    <p id="message-error" className="text-sm text-accent-error mt-1" role="alert">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  loading={isSubmitting}
                  iconRight={isSubmitting ? null : <Send className="w-5 h-5" aria-hidden="true" />}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                      Sending...
                    </>
                  ) : submitStatus === 'success' ? (
                    <>
                      <CheckCircle className="w-5 h-5" aria-hidden="true" />
                      Sent Successfully!
                    </>
                  ) : (
                    'Send Message'
                  )}
                </Button>

                {/* Response Preview */}
                <AnimatePresence>
                  {responseData && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: 'auto' }}
                      exit={{ opacity: 0, y: -10, height: 0 }}
                      className="mt-6"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-xs text-fg-tertiary uppercase tracking-wider">RESPONSE</span>
                        <span className={cn(
                          'kbd px-2 py-0.5 rounded font-mono text-xs font-semibold',
                          submitStatus === 'success' 
                            ? 'bg-accent-primary-dim text-accent-primary' 
                            : 'bg-accent-error/10 text-accent-error'
                        )}>
                          {responseData.status} {submitStatus === 'success' ? 'OK' : 'ERROR'}
                        </span>
                      </div>
                      <pre className="api-block">
                        <code>{JSON.stringify(responseData.body, null, 2)}</code>
                      </pre>
                      {submitStatus === 'success' && (
                        <p className="text-sm text-accent-primary mt-2 flex items-center gap-1">
                          <CheckCircle className="w-4 h-4" />
                          Rate limit remaining: 59
                        </p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {submitStatus === 'success' && !responseData && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-center gap-2 text-sm text-accent-primary"
                    role="status"
                  >
                    <CheckCircle className="w-4 h-4" aria-hidden="true" />
                    Message sent! I&apos;ll get back to you within 24 hours.
                  </motion.p>
                )}

                {submitStatus === 'error' && !responseData && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-center gap-2 text-sm text-accent-error"
                    role="alert"
                  >
                    <AlertCircle className="w-4 h-4" aria-hidden="true" />
                    Failed to send. Please try again or email me directly.
                  </motion.p>
                )}

                <p className="form-note text-center text-sm text-fg-tertiary">
                  I typically respond within 24 hours
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}