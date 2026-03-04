'use client'

import { useRef, useEffect, useMemo } from 'react'
import { alerts } from '@/data/alerts'
import { useThreat } from '@/context/ThreatContext'
import type { Severity } from '@/data/threats'

const SEVERITY_BADGE: Record<Severity, { label: string; color: string }> = {
  critical: { label: 'CRIT', color: '#ff2d2d' },
  high: { label: 'HIGH', color: '#ff8c00' },
  medium: { label: 'MED', color: '#ffd700' },
  low: { label: 'LOW', color: '#00ff41' },
}

function formatTime(isoString: string): string {
  return new Date(isoString).toISOString().slice(11, 19)
}

export default function ThreatFeed() {
  const feedRef = useRef<HTMLDivElement>(null)
  const { filters } = useThreat()

  const filteredAlerts = useMemo(() => {
    return alerts.filter((a) => {
      if (filters.region !== 'All' && a.region !== filters.region) return false
      if (filters.severity !== 'All' && a.severity !== filters.severity) return false
      return true
    })
  }, [filters])

  useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTop = 0
    }
  }, [filteredAlerts])

  return (
    <aside className="w-80 flex flex-col shrink-0 border-l border-neon-green/20 bg-black/90">
      {/* Panel header — terminal style */}
      <div className="px-3 py-2 border-b border-neon-green/10 flex items-center gap-2 shrink-0">
        <span className="text-neon-green font-mono text-xs tracking-widest">■ LIVE THREAT FEED</span>
        <span className="cursor-blink text-neon-green text-sm leading-none">_</span>
      </div>

      {/* Terminal prompt line */}
      <div className="px-3 py-1 border-b border-neon-green/5 shrink-0">
        <span className="text-neon-green/40 font-mono text-[10px]">
          {'>'} SHOWING {filteredAlerts.length}/{alerts.length} ALERTS
        </span>
      </div>

      {/* Alert list */}
      <div ref={feedRef} className="flex-1 overflow-y-auto">
        {filteredAlerts.length === 0 && (
          <div className="p-4 text-neon-green/30 font-mono text-xs">
            NO ALERTS MATCH CURRENT FILTERS
          </div>
        )}
        {filteredAlerts.map((alert, idx) => {
          const badge = SEVERITY_BADGE[alert.severity]
          return (
            <div
              key={alert.id}
              className="px-3 py-2 border-b border-neon-green/5 hover:bg-neon-green/5 transition-colors cursor-default"
              style={{ animationDelay: `${idx * 30}ms` }}
            >
              {/* Timestamp + severity badge */}
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-neon-green/50 font-mono text-[10px] tabular-nums">
                  {formatTime(alert.timestamp)}
                </span>
                <span
                  className="px-1 py-0 font-mono text-[9px] font-bold border"
                  style={{
                    color: badge.color,
                    borderColor: `${badge.color}66`,
                    backgroundColor: `${badge.color}11`,
                  }}
                >
                  {badge.label}
                </span>
                <span className="text-neon-green/60 font-mono text-[10px] truncate">
                  {alert.location.toUpperCase()}
                </span>
              </div>
              {/* Description */}
              <p className="text-neon-green/80 font-mono text-[11px] leading-relaxed">
                {alert.description}
              </p>
            </div>
          )
        })}
        <div className="h-4" />
      </div>
    </aside>
  )
}
