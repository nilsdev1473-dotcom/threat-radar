# Threat Radar — Design System

## Creative Vision
**"Bloomberg Terminal meets CIA Operations Center"** — Dense data, monospace readouts, pulsing threat indicators, dark command surfaces. Every pixel says "classified."

## Typography
- **Headings:** Space Grotesk (700)
- **Data/Numbers:** JetBrains Mono (monospace) — all stats, coordinates, timestamps
- **Body:** Space Grotesk (400)

## Colors (CSS Variables)
```
--bg-primary: #0A0A0B        /* near-black */
--bg-surface: #111113        /* card surfaces */
--bg-elevated: #1A1A1D       /* elevated panels */
--border: #2A2A2D            /* subtle borders */
--border-glow: #FF6B0033     /* threat glow */

--text-primary: #E5E5E5
--text-secondary: #888888
--text-muted: #555555

--threat-critical: #FF2D2D   /* red pulse */
--threat-high: #FF6B00       /* amber */
--threat-medium: #FFB800     /* yellow */
--threat-low: #00FF88        /* green */
--threat-info: #00B4FF       /* blue intel */

--accent: #FF6B00            /* primary accent amber */
--defcon-red: #FF0033
```

## Component Patterns
- **Cards:** `bg-surface` with 1px `border` and subtle `border-glow` on hover. Rounded-lg. Generous padding (16-20px).
- **Badges:** Monospace uppercase text, tight padding, background matching threat level with 20% opacity.
- **Data Rows:** Monospace, grid layout, alternating subtle backgrounds.
- **Globe Container:** Full-width, 50vh on mobile, with radial gradient overlay fading to bg-primary at edges.

## Animation Defaults
- Spring: `{ type: "spring", stiffness: 300, damping: 30 }`
- Stagger children: 0.05s delay
- Card entrance: fadeIn + translateY(20px)
- Pulse: CSS keyframe for threat markers (scale 1→1.5, opacity 1→0)
- Globe: autoRotateSpeed 0.3

## Layout
- Mobile-first: max-w-md centered
- Section spacing: 24px gap
- Card padding: 16px
- 8px grid system

## Anti-Patterns (NEVER)
- Pure black or pure white
- Default Tailwind colors
- Missing loading states
- Non-monospace data displays
- Static/boring elements without animation
