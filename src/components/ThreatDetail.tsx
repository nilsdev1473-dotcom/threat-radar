"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Shield, Users, MapPin, Clock, AlertTriangle, Radio, ExternalLink, Crosshair } from "lucide-react";
import {
  type Threat,
  THREAT_LEVEL_COLORS,
  THREAT_TYPE_LABELS,
  formatNumber,
  timeAgo,
} from "@/lib/threats";

interface ThreatDetailProps {
  threat: Threat | null;
  onClose: () => void;
}

export default function ThreatDetail({ threat, onClose }: ThreatDetailProps) {
  return (
    <AnimatePresence>
      {threat && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 z-40"
          />

          {/* Glass Panel */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-50 glass-panel rounded-t-2xl max-h-[88vh] overflow-y-auto"
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-1 sticky top-0 z-10">
              <div className="w-10 h-1 rounded-full bg-[var(--border)]" />
            </div>

            <div className="px-5 pb-8">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <motion.span
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="mono text-[10px] font-bold px-2 py-0.5 rounded uppercase"
                      style={{
                        color: THREAT_LEVEL_COLORS[threat.level],
                        backgroundColor: THREAT_LEVEL_COLORS[threat.level] + "20",
                        boxShadow: `0 0 8px ${THREAT_LEVEL_COLORS[threat.level]}30`,
                      }}
                    >
                      {threat.level}
                    </motion.span>
                    <span className="mono text-[10px] text-[var(--text-muted)] uppercase">
                      {threat.id} • {THREAT_TYPE_LABELS[threat.type]}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-[var(--text-primary)]">{threat.name}</h2>
                  <div className="flex items-center gap-1 mt-1 text-[var(--text-secondary)]">
                    <MapPin size={12} />
                    <span className="mono text-xs">{threat.location}</span>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-[var(--bg-elevated)] transition-colors"
                >
                  <X size={18} className="text-[var(--text-secondary)]" />
                </button>
              </div>

              {/* Coordinates */}
              <div className="mono text-[10px] text-[var(--text-muted)] mb-4 flex gap-4">
                <span>LAT {threat.lat.toFixed(4)}</span>
                <span>LNG {threat.lng.toFixed(4)}</span>
                <span>SINCE {threat.startDate}</span>
              </div>

              {/* Summary */}
              <p className="text-sm text-[var(--text-secondary)] mb-5 leading-relaxed">
                {threat.summary}
              </p>

              {/* Stats Grid — glass cards */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <StatBox
                  icon={<Users size={14} />}
                  label="Confirmed KIA"
                  value={formatNumber(threat.casualtiesConfirmed)}
                  color="var(--threat-critical)"
                />
                <StatBox
                  icon={<AlertTriangle size={14} />}
                  label="Estimated Total"
                  value={formatNumber(threat.casualtiesEstimated)}
                  color="var(--threat-high)"
                />
                <StatBox
                  icon={<Users size={14} />}
                  label="Displaced"
                  value={formatNumber(threat.displaced)}
                  color="var(--threat-medium)"
                />
                <StatBox
                  icon={<Crosshair size={14} />}
                  label="Assets"
                  value={String(threat.militaryAssets.length)}
                  color="var(--threat-info)"
                />
              </div>

              {/* Military Assets */}
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-3">
                  <Shield size={14} className="text-[var(--threat-info)]" />
                  <h3 className="mono text-xs font-bold text-[var(--threat-info)] uppercase tracking-wider">
                    Military Assets Deployed
                  </h3>
                </div>
                <div className="space-y-1.5">
                  {threat.militaryAssets.map((asset, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="glass-panel-elevated flex items-center gap-2 rounded-lg px-3 py-2.5"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--threat-info)]" />
                      <span className="mono text-xs text-[var(--text-primary)]">{asset}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Timeline / Intel Feed */}
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-3">
                  <Radio size={14} className="text-[var(--accent)]" />
                  <h3 className="mono text-xs font-bold text-[var(--accent)] uppercase tracking-wider">
                    Intelligence Timeline
                  </h3>
                </div>
                <div className="relative pl-4 border-l border-[var(--border)]">
                  {threat.news.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="relative mb-3 last:mb-0"
                    >
                      {/* Timeline dot */}
                      <div
                        className="absolute -left-[21px] top-2 w-2.5 h-2.5 rounded-full border-2"
                        style={{
                          borderColor: i === 0 ? "var(--accent)" : "var(--border)",
                          backgroundColor: i === 0 ? "var(--accent)" : "var(--bg-elevated)",
                        }}
                      />
                      <div className="glass-panel-elevated rounded-lg px-3 py-2.5">
                        <div className="flex items-center justify-between mb-1">
                          <span className="mono text-[10px] text-[var(--text-muted)]">
                            {timeAgo(item.timestamp)}
                          </span>
                          {i === 0 && (
                            <span className="mono text-[9px] px-1.5 py-0.5 rounded bg-[var(--accent)] text-white font-bold uppercase">
                              Latest
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-[var(--text-primary)] leading-relaxed">{item.headline}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Source Links */}
              <div className="mb-2">
                <div className="flex items-center gap-2 mb-3">
                  <ExternalLink size={14} className="text-[var(--text-secondary)]" />
                  <h3 className="mono text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">
                    Sources
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["GDELT Project", "Reuters", "OSINT Feeds", "DoD Reports"].map((src, i) => (
                    <span
                      key={i}
                      className="mono text-[10px] px-2.5 py-1 rounded-full text-[var(--text-secondary)] border border-[var(--border)] hover:border-[var(--accent)] transition-colors cursor-pointer"
                    >
                      {src}
                    </span>
                  ))}
                </div>
              </div>

              {/* Last Updated */}
              <div className="mt-4 pt-3 border-t border-[var(--border)] flex items-center gap-2">
                <Clock size={11} className="text-[var(--text-muted)]" />
                <span className="mono text-[10px] text-[var(--text-muted)]">
                  Last updated: {timeAgo(threat.lastUpdate)} • {threat.lastUpdate}
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function StatBox({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="glass-panel-elevated rounded-lg p-3">
      <div className="flex items-center gap-1.5 mb-1" style={{ color }}>
        {icon}
        <span className="mono text-[10px] uppercase">{label}</span>
      </div>
      <span className="mono text-lg font-bold" style={{ color }}>
        {value}
      </span>
    </div>
  );
}
