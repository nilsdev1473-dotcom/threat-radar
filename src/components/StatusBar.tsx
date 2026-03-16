"use client";

import { motion } from "framer-motion";
import { Shield, Activity, Wifi } from "lucide-react";
import { THREATS, getDefconLevel } from "@/lib/threats";

export default function StatusBar() {
  const defcon = getDefconLevel(THREATS);
  const criticalCount = THREATS.filter((t) => t.level === "CRITICAL").length;
  const totalThreats = THREATS.length;

  return (
    <div className="w-full bg-[var(--bg-surface)] border-b border-[var(--border)]">
      {/* Classification Banner */}
      <div className="bg-[var(--defcon-red)] text-white text-center py-1">
        <span className="mono text-[10px] font-bold tracking-[0.3em] uppercase">
          TOP SECRET // SI // NOFORN — THREAT INTELLIGENCE DASHBOARD
        </span>
      </div>

      {/* Status Row */}
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex items-center gap-1.5"
          >
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: defcon <= 2 ? "var(--threat-critical)" : "var(--threat-high)" }}
            />
            <span className="mono text-[11px] font-bold" style={{ color: defcon <= 2 ? "var(--threat-critical)" : "var(--threat-high)" }}>
              DEFCON {defcon}
            </span>
          </motion.div>

          <div className="flex items-center gap-1 text-[var(--text-secondary)]">
            <Shield size={12} />
            <span className="mono text-[11px]">{totalThreats} ACTIVE</span>
          </div>

          <div className="flex items-center gap-1 text-[var(--threat-critical)]">
            <Activity size={12} />
            <span className="mono text-[11px]">{criticalCount} CRITICAL</span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[var(--threat-low)]">
          <Wifi size={12} />
          <span className="mono text-[10px]">LIVE</span>
          <motion.div
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-[var(--threat-low)]"
          />
        </div>
      </div>
    </div>
  );
}
