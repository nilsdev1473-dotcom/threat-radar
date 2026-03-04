'use client'

import { useMemo } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
} from 'recharts'
import { threats } from '@/data/threats'
import type { Region, Severity } from '@/data/threats'

const REGIONS: Region[] = ['Europe', 'Middle East', 'Asia-Pacific', 'Africa', 'Americas']
const SEVERITIES: Severity[] = ['critical', 'high', 'medium', 'low']
const SEVERITY_ORDER: Record<Severity, number> = { critical: 0, high: 1, medium: 2, low: 3 }

const SEVERITY_COLORS: Record<Severity, string> = {
  critical: '#ff2d2d',
  high: '#ff8c00',
  medium: '#ffd700',
  low: '#00ff41',
}

// Generate 30-day mock trend data with an upward trend
const TREND_DATA = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  threats: Math.floor(6 + i * 0.3 + Math.sin(i * 0.7) * 1.5 + Math.random() * 2),
}))

interface TooltipProps {
  active?: boolean
  payload?: Array<{ value: number; name: string }>
  label?: string | number
}

function CustomTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null
  return (
    <div className="glass-panel px-2 py-1 text-[9px] font-mono border border-neon-green/20">
      <div className="text-neon-green/60">{label}</div>
      <div className="text-neon-green font-bold">{payload[0].value}</div>
    </div>
  )
}

function PieTooltip({ active, payload }: TooltipProps) {
  if (!active || !payload?.length) return null
  return (
    <div className="glass-panel px-2 py-1 text-[9px] font-mono border border-neon-green/20">
      <div className="text-neon-green font-bold">{String(payload[0].name).toUpperCase()}: {payload[0].value}</div>
    </div>
  )
}

export default function StatsPanel() {
  const regionData = useMemo(() => {
    return REGIONS.map((region) => ({
      name: region === 'Middle East' ? 'MidEast' : region === 'Asia-Pacific' ? 'Asia-Pac' : region,
      count: threats.filter((t) => t.region === region).length,
    }))
  }, [])

  const severityData = useMemo(() => {
    return SEVERITIES.map((severity) => ({
      name: severity,
      value: threats.filter((t) => t.severity === severity).length,
    }))
  }, [])

  const top5 = useMemo(() => {
    return [...threats]
      .sort((a, b) => {
        const severityDiff = SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity]
        if (severityDiff !== 0) return severityDiff
        return b.casualties - a.casualties
      })
      .slice(0, 5)
  }, [])

  const maxCasualties = Math.max(...top5.map((t) => t.casualties))

  return (
    <section className="glass-panel border-t border-neon-green/20 px-4 py-2 shrink-0" style={{ height: '200px' }}>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-neon-green font-mono text-[9px] tracking-widest">▶ THREAT ANALYTICS</span>
      </div>

      <div className="grid grid-cols-4 gap-3 h-44">
        {/* Bar chart — threats by region */}
        <div className="flex flex-col">
          <div className="text-neon-green/30 font-mono text-[7px] tracking-widest mb-0.5">BY REGION</div>
          <ResponsiveContainer width="100%" height={130}>
            <BarChart data={regionData} margin={{ top: 2, right: 2, left: -28, bottom: 0 }}>
              <XAxis
                dataKey="name"
                tick={{ fill: 'rgba(0,255,65,0.35)', fontSize: 7, fontFamily: 'monospace' }}
                axisLine={{ stroke: 'rgba(0,255,65,0.1)' }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: 'rgba(0,255,65,0.35)', fontSize: 7, fontFamily: 'monospace' }}
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" fill="#00ff41" opacity={0.8} radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Donut chart — severity distribution */}
        <div className="flex flex-col">
          <div className="text-neon-green/30 font-mono text-[7px] tracking-widest mb-0.5">BY SEVERITY</div>
          <div className="flex items-center gap-1 flex-1">
            <ResponsiveContainer width="55%" height={120}>
              <PieChart>
                <Pie
                  data={severityData}
                  cx="50%"
                  cy="50%"
                  innerRadius="50%"
                  outerRadius="85%"
                  dataKey="value"
                  strokeWidth={0}
                >
                  {severityData.map((entry) => (
                    <Cell key={entry.name} fill={SEVERITY_COLORS[entry.name as Severity]} opacity={0.85} />
                  ))}
                </Pie>
                <Tooltip content={<PieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col gap-0.5">
              {severityData.map((entry) => (
                <div key={entry.name} className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-sm" style={{ backgroundColor: SEVERITY_COLORS[entry.name as Severity] }} />
                  <span className="text-neon-green/40 font-mono text-[8px]">{entry.name.slice(0,4).toUpperCase()} {entry.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 30-day trend line */}
        <div className="flex flex-col">
          <div className="text-neon-green/30 font-mono text-[7px] tracking-widest mb-0.5">30-DAY TREND</div>
          <ResponsiveContainer width="100%" height={130}>
            <LineChart data={TREND_DATA} margin={{ top: 2, right: 4, left: -28, bottom: 0 }}>
              <CartesianGrid stroke="rgba(0,255,65,0.05)" strokeDasharray="3 3" />
              <XAxis
                dataKey="day"
                tick={{ fill: 'rgba(0,255,65,0.35)', fontSize: 7, fontFamily: 'monospace' }}
                axisLine={{ stroke: 'rgba(0,255,65,0.1)' }}
                tickLine={false}
                ticks={[1, 10, 20, 30]}
              />
              <YAxis
                tick={{ fill: 'rgba(0,255,65,0.35)', fontSize: 7, fontFamily: 'monospace' }}
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="threats"
                stroke="#00ff41"
                strokeWidth={1.5}
                dot={false}
                activeDot={{ r: 3, fill: '#00ff41' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top 5 critical zones */}
        <div className="flex flex-col">
          <div className="text-neon-green/30 font-mono text-[7px] tracking-widest mb-1">TOP 5 ZONES</div>
          <div className="space-y-1.5">
            {top5.map((threat, idx) => {
              const barWidth = maxCasualties > 0 ? (threat.casualties / maxCasualties) * 100 : 0
              const color = SEVERITY_COLORS[threat.severity]
              return (
                <div key={threat.id} className="flex items-center gap-1.5">
                  <span className="text-neon-green/30 font-mono text-[8px] w-3 shrink-0">{idx + 1}</span>
                  <div
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: color, boxShadow: `0 0 3px ${color}` }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-neon-green/70 font-mono text-[8px] truncate leading-tight">
                      {threat.name.split('-')[0].trim().toUpperCase()}
                    </div>
                    <div className="h-1 bg-neon-green/10 rounded-full mt-0.5">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${barWidth}%`, backgroundColor: color, opacity: 0.7 }}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
