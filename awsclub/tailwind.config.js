/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ═══ BRAND FOUNDATION — Semantic Tokens ═══
        brand: {
          void: '#050408',
          'void-light': '#090515',
          surface: '#0B0615',
          'surface-elevated': '#100920',
          'surface-hover': '#180D30',
        },

        // Purple Spectrum — Royal
        purple: {
          deepest: '#15082A',
          royal: '#32105E',
          primary: '#4C1D95',
          hover: '#5B21B6',
          accent: '#6D28D9',
          soft: '#7C3AED',
        },

        // Orange Spectrum — Warm Premium
        orange: {
          deepest: '#621F06',
          dark: '#8A2C08',
          primary: '#B83D0A',
          hover: '#D04A0C',
          accent: '#EA580C',
          soft: '#F97316',
        },

        // Text — Crisp Contrast
        content: {
          primary: '#FFFFFF',
          secondary: '#F8FAFC',
          muted: '#F1F5F9',
          subtle: '#CBD5E1',
        },

        // Legacy aliases (backward-compatible)
        background: '#050408',
        'background-secondary': '#090515',
        surface: '#0B0615',
        'surface-light': '#100920',
        'purple-deep': '#15082A',
        'purple-royal': '#32105E',
        'purple-primary': '#4C1D95',
        'purple-hover': '#5B21B6',
        accent: '#6D28D9',
        'accent-soft': '#7C3AED',
        'orange-deep': '#621F06',
        'orange-dark': '#8A2C08',
        primary: '#B83D0A',
        'primary-hover': '#D04A0C',
        'primary-accent': '#EA580C',
        'primary-subtle': '#F97316',
        'text-primary': '#FFFFFF',
        'text-secondary': '#F8FAFC',
        'text-muted': '#F1F5F9',
        'text-subtle': '#CBD5E1',
        'background-hover': '#180D30',
        accentDark: '#4C1D95',
        accentDeep: '#32105E',
        accentSoft: '#7C3AED',
        primaryHover: '#D04A0C',
        neonOrange: '#EA580C',
        void: '#050408',
        'void-light': '#090515',
        surfaceLight: '#100920',
        backgroundDeep: '#32105E',
        'circuit-purple': '#6D28D9',
        'core-orange': '#B83D0A',
      },
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        // Volumetric glow shadows — physics-based light displacement
        'volumetric': `0 24px 64px -12px rgba(0,0,0,0.7),
                       0 0 60px -10px rgba(76,29,149,0.15),
                       0 0 80px -15px rgba(184,61,10,0.08),
                       inset 0 1px 0 rgba(255,255,255,0.03)`,
        'volumetric-sm': `0 16px 48px -8px rgba(0,0,0,0.6),
                          0 0 40px -8px rgba(76,29,149,0.1),
                          0 0 60px -12px rgba(184,61,10,0.06),
                          inset 0 1px 0 rgba(255,255,255,0.02)`,
        'glass': '0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.02)',
        'glass-hover': '0 16px 48px rgba(0,0,0,0.6)',
        'glow-purple': '0 4px 20px rgba(76,29,149,0.15)',
        'glow-orange': '0 4px 20px rgba(184,61,10,0.15)',
        'glow-mixed': '0 4px 20px rgba(76,29,149,0.12), 0 8px 30px rgba(184,61,10,0.1)',
        'elevated': '0 20px 60px rgba(0,0,0,0.5), 0 4px 20px rgba(0,0,0,0.4)',
        'neon': '0 0 20px rgba(184,61,10,0.2)',
        'neon-purple': '0 0 20px rgba(76,29,149,0.2)',
      },
      animation: {
        // Zero-gravity floating — staggered durations
        'float-slow': 'zeroGravityFloat 10s ease-in-out infinite',
        'float-mid': 'zeroGravityFloat 8s ease-in-out infinite',
        'float-fast': 'zeroGravityFloat 6s ease-in-out infinite',
        // Texture animations
        'shimmer': 'shimmer 4s ease-in-out infinite alternate',
        'mesh-float': 'meshFloat 60s ease-in-out infinite alternate',
        'aurora-wave': 'auroraWave 120s ease-in-out infinite alternate',
        'noise-shift': 'noiseShift 10s steps(10) infinite',
        'separator-flow': 'separatorFlow 3s linear infinite',
        'progress-shimmer': 'progressShimmer 2s linear infinite',
        'glow-cycle': 'glowCycle 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'circuit-pulse': 'circuitPulse 1.2s ease-out forwards',
      },
      keyframes: {
        // Zero-Gravity Float — weightless cycle
        zeroGravityFloat: {
          '0%': { transform: 'translate3d(0, 0px, 0) rotate(0deg)' },
          '50%': { transform: 'translate3d(0, -6px, 0) rotate(0.5deg)' },
          '100%': { transform: 'translate3d(0, 0px, 0) rotate(0deg)' },
        },
        shimmer: {
          '0%': { transform: 'translate3d(-3%, 0, 0)', opacity: '0.85' },
          '100%': { transform: 'translate3d(3%, 0, 0)', opacity: '1' },
        },
        meshFloat: {
          '0%': { transform: 'scale(1) rotate(0deg)' },
          '50%': { transform: 'scale(1.05) rotate(2deg)' },
          '100%': { transform: 'scale(1) rotate(0deg)' },
        },
        auroraWave: {
          '0%': { transform: 'translate3d(0%, 0%, 0) scale(1)', opacity: '0.03' },
          '50%': { transform: 'translate3d(-2%, 2%, 0) scale(1.05)', opacity: '0.05' },
          '100%': { transform: 'translate3d(0%, 0%, 0) scale(1)', opacity: '0.03' },
        },
        noiseShift: {
          '0%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-2%, -2%)' },
          '20%': { transform: 'translate(2%, 2%)' },
          '30%': { transform: 'translate(-1%, 1%)' },
          '40%': { transform: 'translate(1%, -1%)' },
          '50%': { transform: 'translate(-2%, 1%)' },
          '60%': { transform: 'translate(2%, -1%)' },
          '70%': { transform: 'translate(-1%, -2%)' },
          '80%': { transform: 'translate(1%, 2%)' },
          '90%': { transform: 'translate(-2%, 2%)' },
          '100%': { transform: 'translate(0, 0)' },
        },
        separatorFlow: {
          '0%, 100%': { transform: 'scaleX(0.95)', opacity: '0.6' },
          '50%': { transform: 'scaleX(1.05)', opacity: '1' },
        },
        progressShimmer: {
          '0%, 100%': { transform: 'scaleX(0.98)', opacity: '0.7' },
          '50%': { transform: 'scaleX(1.02)', opacity: '1' },
        },
        glowCycle: {
          '0%, 100%': { boxShadow: '0 4px 20px rgba(76,29,149,0.1)' },
          '50%': { boxShadow: '0 8px 30px rgba(184,61,10,0.15)' },
        },
        circuitPulse: {
          '0%': { opacity: '0', maskPosition: '-100% 0', WebkitMaskPosition: '-100% 0' },
          '100%': { opacity: '1', maskPosition: '100% 0', WebkitMaskPosition: '100% 0' },
        },
      },
    },
  },
  plugins: [],
}