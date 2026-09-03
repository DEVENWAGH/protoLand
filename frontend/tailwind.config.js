/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gov: {
          navy: '#0F172A',
          blue: '#1E40AF',
          cobalt: '#2563EB',
          dark: '#0B0F19',
          card: '#1E293B',
          border: '#334155'
        },
        cyber: {
          cyan: '#06B6D4',
          glow: 'rgba(6, 182, 212, 0.15)'
        },
        ledger: {
          green: '#10B981',
          emerald: '#059669',
          amber: '#F59E0B',
          rose: '#EF4444'
        }
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
