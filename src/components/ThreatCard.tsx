"use client";

import { motion } from "framer-motion";
import { MapPin, Users, Crosshair, Clock } from "lucide-react";
import {
  type Threat,
  THREAT_LEVEL_COLORS,
  THREAT_TYPE_LABELS,
  formatNumber,
  timeAgo,
} from "@/lib/threats";

interface ThreatCardProps {
  threat: Threat;
  index: number;
  onSelect: (threat: Threat) => void;
}

export default function ThreatCard({ threat, index, onSelect }: ThreatCardProps) {
  const levelClass = `threat-card-${threat.level.toLowerCase()}`;

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, type: "spring", stiffness: 300, damping: 30 }}
      onClick={() => onSelect(threat)}
      className={`threat-card ${levelClass} w-full text-left cursor-pointer`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1 min-w-0">
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
              {THREAT_TYPE_LABELS[threat.type]}
            </span>
          </div>
          <h3 className="text-sm font-semibold text-[var(--text-primary)] truncate">
            {threat.name}
          </h3>
        </div>
        <span className="mono text-[10px] text-[var(--text-muted)] whitespace-nowrap ml-2">
          {threat.id}
        </span>
      </div>

      <div className="flex items-center gap-1 mb-2 text-[var(--text-secondary)]">
        <MapPin size={11} />
        <span className="mono text-[11px] truncate">{threat.location}</span>
      </div>

      <div className="flex items-center gap-4">
        {threat.casualtiesConfirmed > 0 && (
          <div className="flex items-center gap-1">
            <Users size={11} className="text-[var(--threat-critical)]" />
            <span className="mono text-[11px] text-[var(--threat-critical)]">
              {formatNumber(threat.casualtiesConfirmed)}
            </span>
          </div>
        )}
        {threat.militaryAssets.length > 0 && (
          <div className="flex items-center gap-1">
            <Crosshair size={11} className="text-[var(--threat-info)]" />
            <span className="mono text-[11px] text-[var(--threat-info)]">
              {threat.militaryAssets.length} assets
            </span>
          </div>
        )}
        <div className="flex items-center gap-1 ml-auto">
          <Clock size={11} className="text-[var(--text-muted)]" />
          <span className="mono text-[10px] text-[var(--text-muted)]">
            {timeAgo(threat.lastUpdate)}
          </span>
        </div>
      </div>
    </motion.button>
  );
}
