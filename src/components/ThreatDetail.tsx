"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Shield, Users, MapPin, Clock, AlertTriangle, Radio } from "lucide-react";
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
            className="fixed inset-0 bg-black/60 z-40"
          />

          {/* Panel */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-[var(--bg-surface)] border-t border-[var(--border)] rounded-t-2xl max-h-[85vh] overflow-y-auto"
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-[var(--border)]" />
            </div>

            <div className="px-5 pb-8">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="mono text-[10px] font-bold px-2 py-0.5 rounded uppercase"
                      style={{
                        color: THREAT_LEVEL_COLORS[threat.level],
                        backgroundColor: THREAT_LEVEL_COLORS[threat.level] + "20",
                      }}
                    >
                      {threat.level}
                    </span>
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

              {/* Summary */}
              <p className="text-sm text-[var(--text-secondary)] mb-5 leading-relaxed">
                {threat.summary}
              </p>

              {/* Stats Grid */}
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
                  icon={<Clock size={14} />}
                  label="Since"
                  value={threat.startDate}
                  color="var(--text-secondary)"
                />
              </div>

              {/* Military Assets */}
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-3">
                  <Shield size={14} className="text-[var(--threat-info)]" />
                  <h3 className="mono text-xs font-bold text-[var(--threat-info)] uppercase">
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
                      className="flex items-center gap-2 bg-[var(--bg-elevated)] rounded px-3 py-2"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--threat-info)]" />
                      <span className="mono text-xs text-[var(--text-primary)]">{asset}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Intel Feed */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Radio size={14} className="text-[var(--accent)]" />
                  <h3 className="mono text-xs font-bold text-[var(--accent)] uppercase">
                    Intelligence Feed
                  </h3>
                </div>
                <div className="space-y-2">
                  {threat.news.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="bg-[var(--bg-elevated)] rounded px-3 py-2.5 border-l-2 border-[var(--accent)]"
                    >
                      <span className="mono text-[10px] text-[var(--text-muted)] block mb-1">
                        {timeAgo(item.timestamp)}
                      </span>
                      <span className="text-xs text-[var(--text-primary)]">{item.headline}</span>
                    </motion.div>
                  ))}
                </div>
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
    <div className="bg-[var(--bg-elevated)] rounded-lg p-3 border border-[var(--border)]">
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
