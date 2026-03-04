'use client'

import { useThreat } from '@/context/ThreatContext'
import GlobeComponent from '@/components/organisms/GlobeComponent'
import TopBar from '@/components/organisms/TopBar'
import type { ThreatZone } from '@/data/threats'

export default function MainDashboard() {
  const { selectedThreat, setSelectedThreat } = useThreat()

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

      {/* Zone 2: Main Content — Globe + Sidebar */}
      <section className="flex-1 flex overflow-hidden" style={{ minHeight: 0 }}>
        {/* Globe area */}
        <div className="flex-1 relative overflow-hidden">
          <GlobeComponent
            selectedThreatId={selectedThreat?.id ?? null}
            onMarkerClick={handleMarkerClick}
          />
          {/* Selected threat indicator */}
          {selectedThreat && (
            <div className="absolute bottom-4 left-4 glass-panel px-3 py-2 text-xs font-mono text-neon-green">
              SELECTED: {selectedThreat.name.toUpperCase()}
            </div>
          )}
        </div>

        {/* Threat Feed Sidebar placeholder */}
        <aside className="w-80 glass-panel border-l border-neon-green border-opacity-20 flex flex-col shrink-0">
          <div className="p-3 border-b border-neon-green border-opacity-10">
            <span className="text-neon-green font-mono text-xs tracking-widest">
              ■ LIVE THREAT FEED
            </span>
            <span className="cursor-blink text-neon-green ml-1">_</span>
          </div>
          <div className="flex-1 p-3 overflow-y-auto">
            <p className="text-neon-green text-opacity-30 text-xs font-mono">FEED LOADING...</p>
          </div>
        </aside>
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
