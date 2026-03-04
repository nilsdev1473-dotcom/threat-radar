import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'neon-green': '#00ff41',
        'neon-red': '#ff2d2d',
        'dark-navy': '#0a0e1a',
        'neon-orange': '#ff8c00',
        'neon-yellow': '#ffd700',
        'neon-blue': '#00bfff',
        'neon-cyan': '#00ffff',
      },
      fontFamily: {
        mono: ['Courier New', 'Courier', 'monospace'],
      },
      backgroundImage: {
        'grid-pattern': `
          linear-gradient(rgba(0, 255, 65, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 255, 65, 0.03) 1px, transparent 1px)
        `,
      },
      backgroundSize: {
        'grid': '40px 40px',
      },
    },
  },
  plugins: [],
}

export default config
