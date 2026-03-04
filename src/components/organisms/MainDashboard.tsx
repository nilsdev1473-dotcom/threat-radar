'use client'

import { useThreat } from '@/context/ThreatContext'
import GlobeComponent from '@/components/organisms/GlobeComponent'
import TopBar from '@/components/organisms/TopBar'
import ThreatFeed from '@/components/organisms/ThreatFeed'
import FilterBar from '@/components/organisms/FilterBar'
import ThreatDetailCard from '@/components/organisms/ThreatDetailCard'
import StatsPanel from '@/components/organisms/StatsPanel'
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
      <StatsPanel />
    </main>
  )
}
