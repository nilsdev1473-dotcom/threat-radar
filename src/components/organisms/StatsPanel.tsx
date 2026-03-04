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
} from 'recharts'
import { threats } from '@/data/threats'
import type { Region, Severity } from '@/data/threats'

const REGIONS: Region[] = ['Europe', 'Middle East', 'Asia-Pacific', 'Africa', 'Americas']
const SEVERITIES: Severity[] = ['critical', 'high', 'medium', 'low']

const SEVERITY_COLORS: Record<Severity, string> = {
  critical: '#ff2d2d',
  high: '#ff8c00',
  medium: '#ffd700',
  low: '#00ff41',
}

const chartStyle = {
  background: 'transparent',
}

interface TooltipProps {
  active?: boolean
  payload?: Array<{ value: number; name: string }>
  label?: string
}

function CustomTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null
  return (
    <div className="glass-panel px-3 py-2 text-xs font-mono border border-neon-green/20">
      <div className="text-neon-green/60 mb-1">{label}</div>
      <div className="text-neon-green font-bold">{payload[0].value} THREATS</div>
    </div>
  )
}

function PieTooltip({ active, payload }: TooltipProps) {
  if (!active || !payload?.length) return null
  return (
    <div className="glass-panel px-3 py-2 text-xs font-mono border border-neon-green/20">
      <div className="text-neon-green font-bold">{payload[0].name?.toUpperCase()}: {payload[0].value}</div>
    </div>
  )
}

export default function StatsPanel() {
  const regionData = useMemo(() => {
    return REGIONS.map((region) => ({
      name: region.replace(' ', '\n'),
      count: threats.filter((t) => t.region === region).length,
    }))
  }, [])

  const severityData = useMemo(() => {
    return SEVERITIES.map((severity) => ({
      name: severity,
      value: threats.filter((t) => t.severity === severity).length,
    }))
  }, [])

  return (
    <section className="glass-panel border-t border-neon-green/20 px-4 py-3 shrink-0" style={{ height: '200px' }}>
      <div className="flex items-center gap-2 mb-2 shrink-0">
        <span className="text-neon-green font-mono text-[10px] tracking-widest">▶ THREAT ANALYTICS</span>
      </div>

      <div className="grid grid-cols-2 gap-4 h-40">
        {/* Bar chart — threats by region */}
        <div>
          <div className="text-neon-green/30 font-mono text-[8px] tracking-widest mb-1">BY REGION</div>
          <ResponsiveContainer width="100%" height={120} style={chartStyle}>
            <BarChart data={regionData} margin={{ top: 0, right: 4, left: -20, bottom: 0 }}>
              <XAxis
                dataKey="name"
                tick={{ fill: 'rgba(0,255,65,0.4)', fontSize: 8, fontFamily: 'monospace' }}
                axisLine={{ stroke: 'rgba(0,255,65,0.1)' }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: 'rgba(0,255,65,0.4)', fontSize: 8, fontFamily: 'monospace' }}
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
        <div>
          <div className="text-neon-green/30 font-mono text-[8px] tracking-widest mb-1">BY SEVERITY</div>
          <div className="flex items-center gap-2 h-28">
            <ResponsiveContainer width="60%" height="100%" style={chartStyle}>
              <PieChart>
                <Pie
                  data={severityData}
                  cx="50%"
                  cy="50%"
                  innerRadius="55%"
                  outerRadius="85%"
                  dataKey="value"
                  strokeWidth={0}
                >
                  {severityData.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={SEVERITY_COLORS[entry.name as Severity]}
                      opacity={0.85}
                    />
                  ))}
                </Pie>
                <Tooltip content={<PieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            {/* Legend */}
            <div className="flex flex-col gap-1 justify-center">
              {severityData.map((entry) => (
                <div key={entry.name} className="flex items-center gap-1.5">
                  <div
                    className="w-2 h-2 rounded-sm"
                    style={{ backgroundColor: SEVERITY_COLORS[entry.name as Severity] }}
                  />
                  <span className="text-neon-green/50 font-mono text-[9px]">
                    {entry.name.toUpperCase()} ({entry.value})
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
