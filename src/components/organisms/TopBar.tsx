'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { threats } from '@/data/threats'

const DEFCON_LEVEL = 3

const DEFCON_COLORS: Record<number, string> = {
  1: '#ff0000',
  2: '#ff8c00',
  3: '#ffd700',
  4: '#00cc44',
  5: '#0088ff',
}

const DEFCON_LABELS: Record<number, string> = {
  1: 'MAXIMUM',
  2: 'FAST PACE',
  3: 'INCREASED',
  4: 'NORMAL',
  5: 'MINIMUM',
}

function formatTimestamp(date: Date): string {
  return date.toISOString().replace('T', ' ').slice(0, 19) + ' UTC'
}

export default function TopBar() {
  const [lastUpdated, setLastUpdated] = useState<string>('')
  const [displayedThreats, setDisplayedThreats] = useState(0)
  const [displayedCritical, setDisplayedCritical] = useState(0)

  const activeThreats = threats.length
  const criticalCount = threats.filter((t) => t.severity === 'critical').length

  useEffect(() => {
    setLastUpdated(formatTimestamp(new Date()))
    const interval = setInterval(() => {
      setLastUpdated(formatTimestamp(new Date()))
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  // Count-up animation on mount
  useEffect(() => {
    let frame: number
    let start: number | null = null
    const duration = 800
    const step = (ts: number) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      setDisplayedThreats(Math.round(progress * activeThreats))
      setDisplayedCritical(Math.round(progress * criticalCount))
      if (progress < 1) frame = requestAnimationFrame(step)
    }
    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [activeThreats, criticalCount])

  return (
    <header className="glass-panel border-b border-neon-green/20 px-6 py-3 shrink-0">
      <div className="flex items-center justify-between gap-6">
        {/* Logo / Title */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-neon-red text-xs">●</span>
            <span className="text-neon-green font-mono text-sm tracking-widest font-bold">
              THREAT RADAR
            </span>
          </div>
          <span className="text-neon-green/30 text-xs font-mono hidden lg:block">
            GLOBAL CONFLICT MONITOR v2.4.1
          </span>
        </div>

        {/* DEFCON Indicator */}
        <div className="flex items-center gap-3">
          <span className="text-neon-green/50 font-mono text-xs tracking-widest">DEFCON</span>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((level) => {
              const isActive = level === DEFCON_LEVEL
              const isPast = level < DEFCON_LEVEL
              return (
                <div
                  key={level}
                  className="flex flex-col items-center gap-0.5"
                  title={`DEFCON ${level}: ${DEFCON_LABELS[level]}`}
                >
                  <div
                    className="w-7 h-7 border flex items-center justify-center text-xs font-mono font-bold transition-all duration-200"
                    style={{
                      borderColor: isActive ? DEFCON_COLORS[level] : 'rgba(255,255,255,0.1)',
                      backgroundColor: isActive
                        ? `${DEFCON_COLORS[level]}22`
                        : isPast
                          ? `${DEFCON_COLORS[level]}08`
                          : 'transparent',
                      color: isActive
                        ? DEFCON_COLORS[level]
                        : isPast
                          ? `${DEFCON_COLORS[level]}55`
                          : 'rgba(255,255,255,0.2)',
                      boxShadow: isActive ? `0 0 8px ${DEFCON_COLORS[level]}66` : 'none',
                    }}
                  >
                    {level}
                  </div>
                </div>
              )
            })}
          </div>
          <span
            className="text-xs font-mono font-bold ml-1"
            style={{ color: DEFCON_COLORS[DEFCON_LEVEL] }}
          >
            {DEFCON_LABELS[DEFCON_LEVEL]}
          </span>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6 text-xs font-mono">
          <div className="flex flex-col items-center">
            <span className="text-neon-green/40 tracking-widest text-[10px]">ACTIVE</span>
            <motion.span
              className="text-neon-red font-bold text-lg leading-tight tabular-nums"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {displayedThreats}
            </motion.span>
          </div>
          <div className="w-px h-8 bg-neon-green/10" />
          <div className="flex flex-col items-center">
            <span className="text-neon-green/40 tracking-widest text-[10px]">CRITICAL</span>
            <motion.span
              className="text-neon-red font-bold text-lg leading-tight tabular-nums"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {displayedCritical}
            </motion.span>
          </div>
          <div className="w-px h-8 bg-neon-green/10" />
          <div className="flex flex-col items-center">
            <span className="text-neon-green/40 tracking-widest text-[10px]">UPDATED</span>
            <span className="text-neon-green/70 text-[11px] leading-tight tabular-nums">
              {lastUpdated || '—'}
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
