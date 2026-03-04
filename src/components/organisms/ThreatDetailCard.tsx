'use client'

import { useThreat } from '@/context/ThreatContext'
import type { Severity } from '@/data/threats'

const SEVERITY_COLORS: Record<Severity, string> = {
  critical: '#ff2d2d',
  high: '#ff8c00',
  medium: '#ffd700',
  low: '#00ff41',
}

const NATO_STATUS_COLORS = {
  active: '#ff2d2d',
  monitoring: '#ffd700',
  elevated: '#ff8c00',
  standby: '#00bfff',
}

export default function ThreatDetailCard() {
  const { selectedThreat, clearSelection } = useThreat()

  if (!selectedThreat) return null

  const severityColor = SEVERITY_COLORS[selectedThreat.severity]
  const natoColor = NATO_STATUS_COLORS[selectedThreat.natoStatus]

  return (
    <div className="absolute top-4 right-4 bottom-4 w-80 z-10 flex flex-col glass-panel border border-neon-green/20 overflow-hidden">
      {/* Header */}
      <div
        className="px-4 py-3 border-b flex items-start justify-between gap-2 shrink-0"
        style={{ borderColor: `${severityColor}33` }}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span
              className="px-2 py-0.5 font-mono text-[10px] font-bold border"
              style={{
                color: severityColor,
                borderColor: `${severityColor}66`,
                backgroundColor: `${severityColor}11`,
              }}
            >
              {selectedThreat.severity.toUpperCase()}
            </span>
            <span className="text-neon-green/40 font-mono text-[10px]">
              {selectedThreat.region.toUpperCase()}
            </span>
          </div>
          <h2 className="text-neon-green font-mono text-sm font-bold leading-tight">
            {selectedThreat.name.toUpperCase()}
          </h2>
        </div>
        <button
          onClick={clearSelection}
          className="text-neon-green/50 hover:text-neon-green font-mono text-lg leading-none shrink-0 transition-colors"
          aria-label="Close"
        >
          ✕
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
        {/* Summary */}
        <div>
          <div className="text-neon-green/40 font-mono text-[9px] tracking-widest mb-1">THREAT SUMMARY</div>
          <p className="text-neon-green/80 font-mono text-xs leading-relaxed">
            {selectedThreat.summary}
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-neon-green/40 font-mono text-[9px] tracking-widest mb-0.5">CASUALTIES</div>
            <div className="text-neon-red font-mono text-sm font-bold">
              {selectedThreat.casualties.toLocaleString()}
            </div>
          </div>
          <div>
            <div className="text-neon-green/40 font-mono text-[9px] tracking-widest mb-0.5">DURATION</div>
            <div className="text-neon-green font-mono text-xs">
              {selectedThreat.duration}
            </div>
          </div>
        </div>

        {/* NATO Status */}
        <div>
          <div className="text-neon-green/40 font-mono text-[9px] tracking-widest mb-1">NATO STATUS</div>
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: natoColor, boxShadow: `0 0 4px ${natoColor}` }}
            />
            <span
              className="font-mono text-xs font-bold"
              style={{ color: natoColor }}
            >
              {selectedThreat.natoStatus.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Involved parties */}
        <div>
          <div className="text-neon-green/40 font-mono text-[9px] tracking-widest mb-1">INVOLVED PARTIES</div>
          <ul className="space-y-0.5">
            {selectedThreat.involvedParties.map((party) => (
              <li key={party} className="text-neon-green/70 font-mono text-xs flex items-center gap-2">
                <span className="text-neon-green/30">▷</span>
                {party}
              </li>
            ))}
          </ul>
        </div>

        {/* Threat types */}
        <div>
          <div className="text-neon-green/40 font-mono text-[9px] tracking-widest mb-1">THREAT TYPES</div>
          <div className="flex flex-wrap gap-1">
            {selectedThreat.threatTypes.map((type) => (
              <span
                key={type}
                className="px-2 py-0.5 border border-neon-green/20 text-neon-green/60 font-mono text-[9px] tracking-wider"
              >
                {type.toUpperCase().replace('-', ' ')}
              </span>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div>
          <div className="text-neon-green/40 font-mono text-[9px] tracking-widest mb-2">RECENT TIMELINE</div>
          <div className="space-y-2">
            {selectedThreat.timeline.map((event, idx) => (
              <div key={idx} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div
                    className="w-1.5 h-1.5 rounded-full mt-0.5 shrink-0"
                    style={{ backgroundColor: severityColor }}
                  />
                  {idx < selectedThreat.timeline.length - 1 && (
                    <div className="w-px flex-1 mt-1" style={{ backgroundColor: `${severityColor}30` }} />
                  )}
                </div>
                <div className="pb-2">
                  <div className="text-neon-green/40 font-mono text-[9px] tabular-nums">
                    {event.date}
                  </div>
                  <div className="text-neon-green/75 font-mono text-[10px] leading-relaxed">
                    {event.event}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
