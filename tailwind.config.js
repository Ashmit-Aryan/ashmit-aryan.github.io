/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Dark theme - matching PRD design tokens
        bg: {
          primary: '#0a0e14',
          secondary: '#0f141b',
          tertiary: '#151c26',
          elevated: '#1a2330',
          glass: 'rgba(22, 30, 45, 0.7)',
          'glass-strong': 'rgba(22, 30, 45, 0.9)',
        },
        fg: {
          primary: '#f0f4f8',
          secondary: '#a8b3c4',
          tertiary: '#6b7c93',
          muted: '#4a5a70',
        },
        accent: {
          primary: '#EA580C',    // Orange 600
          'primary-dim': 'rgba(234, 88, 12, 0.15)',
          secondary: '#D97706',  // Amber 600
          'secondary-dim': 'rgba(217, 119, 6, 0.15)',
          tertiary: '#F97316',   // Orange 500
          'tertiary-dim': 'rgba(249, 115, 22, 0.15)',
          warning: '#fbbf24',
          error: '#ef4444',
        },
        border: {
          primary: 'rgba(100, 116, 139, 0.3)',
          secondary: 'rgba(100, 116, 139, 0.15)',
          focus: '#EA580C',
        },
      },
      fontFamily: {
        display: ['Syne', 'Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        body: ['Space Grotesk', 'sans-serif'],
      },
      fontSize: {
        'xs': ['clamp(0.7rem, 0.65rem + 0.25vw, 0.8rem)', '1.5'],
        'sm': ['clamp(0.8rem, 0.75rem + 0.25vw, 0.875rem)', '1.6'],
        'base': ['clamp(1rem, 0.95rem + 0.25vw, 1.125rem)', '1.7'],
        'lg': ['clamp(1.125rem, 1rem + 0.625vw, 1.25rem)', '1.6'],
        'xl': ['clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)', '1.5'],
        '2xl': ['clamp(1.5rem, 1.25rem + 1.25vw, 2rem)', '1.3'],
        '3xl': ['clamp(2rem, 1.5rem + 2.5vw, 3rem)', '1.2'],
        '4xl': ['clamp(2.5rem, 1.75rem + 3.75vw, 4rem)', '1.1'],
        '5xl': ['clamp(3rem, 2rem + 5vw, 5.5rem)', '1.05'],
      },
      spacing: {
        '1': '0.25rem',
        '2': '0.5rem',
        '3': '0.75rem',
        '4': '1rem',
        '5': '1.25rem',
        '6': '1.5rem',
        '8': '2rem',
        '10': '2.5rem',
        '12': '3rem',
        '16': '4rem',
        '20': '5rem',
        '24': '6rem',
        '32': '8rem',
      },
      borderRadius: {
        'sm': '0.375rem',
        'md': '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
        '2xl': '1.5rem',
        'full': '9999px',
      },
      boxShadow: {
        'sm': '0 1px 2px rgba(0, 0, 0, 0.3)',
        'md': '0 4px 12px rgba(0, 0, 0, 0.4)',
        'lg': '0 12px 32px rgba(0, 0, 0, 0.5)',
        'xl': '0 24px 64px rgba(0, 0, 0, 0.6)',
        'glow': '0 0 40px rgba(234, 88, 12, 0.15)',
        'glow-secondary': '0 0 40px rgba(217, 119, 6, 0.15)',
      },
      transitionDuration: {
        'fast': '150ms',
        'base': '250ms',
        'slow': '400ms',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'ease-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #EA580C 0%, #D97706 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #D97706 0%, #F97316 100%)',
        'gradient-hero': 'linear-gradient(180deg, rgba(10, 14, 20, 0.95) 0%, rgba(15, 20, 27, 0.98) 100%)',
        'gradient-glow': 'radial-gradient(ellipse at center, rgba(234, 88, 12, 0.15) 0%, transparent 70%)',
        'gradient-text': 'linear-gradient(135deg, #f0f4f8 0%, #EA580C 50%, #D97706 100%)',
      },
      zIndex: {
        'bg': '-1',
        'base': '1',
        'elevated': '10',
        'sticky': '100',
        'modal': '1000',
        'toast': '2000',
        'cursor': '9999',
      },
    },
  },
  plugins: [],
}