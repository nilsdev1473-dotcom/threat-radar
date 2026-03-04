'use client'

import { useThreat } from '@/context/ThreatContext'
import type { RegionFilter, SeverityFilter, ThreatTypeFilter } from '@/context/ThreatContext'
import type { Region, Severity, ThreatType } from '@/data/threats'

const REGIONS: RegionFilter[] = ['All', 'Europe', 'Middle East', 'Asia-Pacific', 'Africa', 'Americas']
const SEVERITIES: SeverityFilter[] = ['All', 'critical', 'high', 'medium', 'low']
const THREAT_TYPES: ThreatTypeFilter[] = ['All', 'armed-conflict', 'naval', 'cyber', 'aerospace', 'nuclear']

const SEVERITY_LABELS: Record<Severity, string> = {
  critical: 'CRITICAL',
  high: 'HIGH',
  medium: 'MEDIUM',
  low: 'LOW',
}

const THREAT_TYPE_LABELS: Record<ThreatType, string> = {
  'armed-conflict': 'ARMED',
  naval: 'NAVAL',
  cyber: 'CYBER',
  aerospace: 'AERO',
  nuclear: 'NUCLEAR',
}

const SEVERITY_COLORS: Record<Severity, string> = {
  critical: '#ff2d2d',
  high: '#ff8c00',
  medium: '#ffd700',
  low: '#00ff41',
}

interface PillProps {
  label: string
  active: boolean
  onClick: () => void
  color?: string
}

function Pill({ label, active, onClick, color = '#00ff41' }: PillProps) {
  return (
    <button
      onClick={onClick}
      className="px-2 py-0.5 font-mono text-[10px] tracking-widest border transition-all duration-150"
      style={{
        borderColor: active ? color : 'rgba(255,255,255,0.1)',
        backgroundColor: active ? `${color}22` : 'transparent',
        color: active ? color : 'rgba(255,255,255,0.35)',
        boxShadow: active ? `0 0 6px ${color}44` : 'none',
      }}
    >
      {label}
    </button>
  )
}

export default function FilterBar() {
  const { filters, setRegionFilter, setSeverityFilter, setThreatTypeFilter } = useThreat()

  return (
    <div className="glass-panel border-b border-neon-green/10 px-4 py-2 flex items-center gap-6 flex-wrap shrink-0">
      {/* Region filter */}
      <div className="flex items-center gap-2">
        <span className="text-neon-green/30 font-mono text-[9px] tracking-widest whitespace-nowrap">
          REGION
        </span>
        <div className="flex items-center gap-1 flex-wrap">
          {REGIONS.map((r) => (
            <Pill
              key={r}
              label={r === 'All' ? 'ALL' : r.toUpperCase().replace(' ', '-')}
              active={filters.region === r}
              onClick={() => setRegionFilter(r as RegionFilter)}
            />
          ))}
        </div>
      </div>

      <div className="w-px h-5 bg-neon-green/10 shrink-0" />

      {/* Severity filter */}
      <div className="flex items-center gap-2">
        <span className="text-neon-green/30 font-mono text-[9px] tracking-widest whitespace-nowrap">
          SEVERITY
        </span>
        <div className="flex items-center gap-1">
          {SEVERITIES.map((s) => (
            <Pill
              key={s}
              label={s === 'All' ? 'ALL' : SEVERITY_LABELS[s as Severity]}
              active={filters.severity === s}
              onClick={() => setSeverityFilter(s as SeverityFilter)}
              color={s === 'All' ? '#00ff41' : SEVERITY_COLORS[s as Severity]}
            />
          ))}
        </div>
      </div>

      <div className="w-px h-5 bg-neon-green/10 shrink-0" />

      {/* Threat type filter */}
      <div className="flex items-center gap-2">
        <span className="text-neon-green/30 font-mono text-[9px] tracking-widest whitespace-nowrap">
          TYPE
        </span>
        <div className="flex items-center gap-1 flex-wrap">
          {THREAT_TYPES.map((t) => (
            <Pill
              key={t}
              label={t === 'All' ? 'ALL' : THREAT_TYPE_LABELS[t as ThreatType]}
              active={filters.threatType === t}
              onClick={() => setThreatTypeFilter(t as ThreatTypeFilter)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
