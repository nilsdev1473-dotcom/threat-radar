'use client'

import { useThreat } from '@/context/ThreatContext'
import GlobeComponent from '@/components/organisms/GlobeComponent'
import TopBar from '@/components/organisms/TopBar'
import ThreatFeed from '@/components/organisms/ThreatFeed'
import FilterBar from '@/components/organisms/FilterBar'
import ThreatDetailCard from '@/components/organisms/ThreatDetailCard'
import type { ThreatZone } from '@/data/threats'

export default function MainDashboard() {
  const { selectedThreat, setSelectedThreat, filteredThreats } = useThreat()

  const handleMarkerClick = (threat: ThreatZone) => {
    setSelectedThreat(threat)
  }

  return (
    <main
      className="min-h-screen bg-black flex flex-col"
      style={{
        backgroundImage: `
          linear-gradient(rgba(0, 255, 65, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 255, 65, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
      }}
    >
      {/* Zone 1: Top Bar */}
      <TopBar />

      {/* Filter bar */}
      <FilterBar />

      {/* Zone 2: Main Content — Globe + Sidebar */}
      <section className="flex-1 flex overflow-hidden" style={{ minHeight: 0 }}>
        {/* Globe area */}
        <div className="flex-1 relative overflow-hidden">
          <GlobeComponent
            selectedThreatId={selectedThreat?.id ?? null}
            onMarkerClick={handleMarkerClick}
            visibleThreatIds={filteredThreats.map((t) => t.id)}
          />
          {/* Threat detail card */}
          <ThreatDetailCard />
        </div>

        {/* Threat Feed Sidebar */}
        <ThreatFeed />
      </section>

      {/* Zone 3: Stats Dashboard */}
      <section className="glass-panel border-t border-neon-green border-opacity-20 h-48 px-6 py-4 shrink-0">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-neon-green font-mono text-xs tracking-widest">
            ▶ THREAT ANALYTICS
          </span>
        </div>
        <div className="grid grid-cols-4 gap-4 h-28">
          {['BY REGION', 'BY SEVERITY', '30-DAY TREND', 'TOP ZONES'].map((label) => (
            <div
              key={label}
              className="border border-neon-green border-opacity-10 rounded flex items-center justify-center"
            >
              <span className="text-neon-green text-opacity-20 text-xs font-mono tracking-wider">
                {label}
              </span>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
