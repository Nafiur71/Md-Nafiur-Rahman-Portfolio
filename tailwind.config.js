/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./script.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        darkBg: '#0b0f19',
        darkCard: '#111827',
        accentCyan: '#06b6d4',
        accentBlue: '#2563eb',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
        'gradient-glow': 'linear-gradient(135deg, #06b6d4 0%, #2563eb 100%)',
        'gradient-btn': 'linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)',
      }
    },
  },
  safelist: [
    'translate-y-0',
    'opacity-100',
    'translate-y-24',
    'opacity-0',
    'pointer-events-none',
    'scale-100',
    'scale-95',
    'bg-emerald-950/60',
    'text-emerald-400',
    'border-emerald-800/50',
    'bg-red-950/60',
    'text-red-400',
    'border-red-800/50'
  ],
  plugins: [],
}
