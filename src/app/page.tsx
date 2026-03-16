"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { THREATS, getDefconLevel, type Threat } from "@/lib/threats";
import ThreatCard from "@/components/ThreatCard";
import ThreatDetail from "@/components/ThreatDetail";
import StatusBar from "@/components/StatusBar";
import NewsTicker from "@/components/NewsTicker";
import LiveNewsFeed from "@/components/LiveNewsFeed";

const ThreatGlobe = dynamic(() => import("@/components/ThreatGlobe"), {
  ssr: false,
  loading: () => (
    <div className="globe-container flex items-center justify-center">
      <div className="mono text-[var(--text-muted)] text-sm animate-pulse">
        INITIALIZING THREAT GLOBE...
      </div>
    </div>
  ),
});

export default function Home() {
  const [selectedThreat, setSelectedThreat] = useState<Threat | null>(null);
  const defcon = getDefconLevel(THREATS);

  return (
    <div className="min-h-screen grid-bg font-[family-name:var(--font-space-grotesk)]" style={{ background: "var(--bg-primary)", color: "var(--text-primary)" }}>
      {/* Header */}
      <header className="sticky top-0 z-30 border-b" style={{ borderColor: "var(--border)", background: "var(--bg-primary)" }}>
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="h-2 w-2 rounded-full"
              style={{ background: "var(--threat-critical)" }}
            />
            <h1 className="text-sm font-bold tracking-[0.2em] uppercase" style={{ color: "var(--accent)" }}>
              Threat Radar
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span
              className="mono text-[10px] font-bold px-2 py-0.5 rounded"
              style={{
                color: defcon <= 2 ? "var(--threat-critical)" : "var(--threat-high)",
                backgroundColor: defcon <= 2 ? "var(--threat-critical)" + "20" : "var(--threat-high)" + "20",
              }}
            >
              DEFCON {defcon}
            </span>
            <span className="mono text-[10px] text-[var(--text-muted)] hidden sm:block">
              2026-03-16 10:00 UTC
            </span>
          </div>
        </div>
        <NewsTicker />
      </header>

      {/* Main Content */}
      <main className="relative">
        {/* Globe Section */}
        <section className="border-b" style={{ borderColor: "var(--border)" }}>
          <ThreatGlobe onSelectThreat={setSelectedThreat} />
        </section>

        {/* Status Bar */}
        <StatusBar />

        {/* Threat Cards */}
        <section className="px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-bold tracking-[0.15em] uppercase" style={{ color: "var(--text-secondary)" }}>
              Active Threats
            </h2>
            <span className="mono text-[10px] px-2 py-1 rounded animate-glow-pulse" style={{ background: "var(--bg-elevated)", color: "var(--accent)" }}>
              {THREATS.length} TRACKED
            </span>
          </div>
          <div className="grid gap-3">
            {THREATS.map((threat, i) => (
              <ThreatCard
                key={threat.id}
                threat={threat}
                index={i}
                onSelect={setSelectedThreat}
              />
            ))}
          </div>
        </section>

        {/* Live GDELT News Feed */}
        <LiveNewsFeed />

        {/* Footer */}
        <footer className="px-4 py-6 border-t border-[var(--border)]">
          <div className="flex items-center justify-between">
            <span className="mono text-[10px] text-[var(--text-muted)]">
              THREAT RADAR v1.0 • UNCLASSIFIED // FOUO
            </span>
            <span className="mono text-[10px] text-[var(--text-muted)]">
              Sources: GDELT • OSINT • DoD
            </span>
          </div>
        </footer>
      </main>

      {/* Threat Detail Modal */}
      <ThreatDetail
        threat={selectedThreat}
        onClose={() => setSelectedThreat(null)}
      />
    </div>
  );
}
