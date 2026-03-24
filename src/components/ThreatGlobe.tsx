"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { THREATS, THREAT_LEVEL_COLORS, type Threat } from "@/lib/threats";

interface GlobeApi {
  controls: () => { autoRotate: boolean; autoRotateSpeed: number; enableZoom: boolean };
  pointOfView: (pov: { lat: number; lng: number; altitude: number }, ms?: number) => void;
}

interface ThreatGlobeProps {
  onSelectThreat: (threat: Threat) => void;
}

export default function ThreatGlobe({ onSelectThreat }: ThreatGlobeProps) {
  const globeRef = useRef<GlobeApi | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [GlobeComponent, setGlobeComponent] = useState<React.ComponentType<Record<string, unknown>> | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [focusedThreat, setFocusedThreat] = useState<Threat | null>(null);
  const zoomTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    import("react-globe.gl").then((mod) => {
      setGlobeComponent(() => mod.default);
    });
  }, []);

  const updateDimensions = useCallback(() => {
    if (containerRef.current) {
      setDimensions({
        width: containerRef.current.clientWidth,
        height: containerRef.current.clientHeight,
      });
    }
  }, []);

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [updateDimensions]);

  useEffect(() => {
    if (globeRef.current) {
      const globe = globeRef.current;
      globe.controls().autoRotate = true;
      globe.controls().autoRotateSpeed = 0.3;
      globe.controls().enableZoom = true;
      globe.pointOfView({ lat: 30, lng: 30, altitude: 2.2 }, 1000);
    }
  }, [GlobeComponent]);

  const handlePointClick = useCallback((d: unknown) => {
    const point = d as { threat: Threat };

    // Clear any pending zoom-out timeout
    if (zoomTimeoutRef.current) {
      clearTimeout(zoomTimeoutRef.current);
    }

    // Set focused threat for HUD
    setFocusedThreat(point.threat);

    if (globeRef.current) {
      globeRef.current.controls().autoRotate = false;
      // Zoom in close to the marker
      globeRef.current.pointOfView(
        { lat: point.threat.lat, lng: point.threat.lng, altitude: 0.6 },
        1200
      );
      // Zoom back out after 8 seconds
      zoomTimeoutRef.current = setTimeout(() => {
        if (globeRef.current) {
          globeRef.current.pointOfView(
            { lat: point.threat.lat, lng: point.threat.lng, altitude: 2.2 },
            1500
          );
          setTimeout(() => {
            if (globeRef.current) {
              globeRef.current.controls().autoRotate = true;
            }
            setFocusedThreat(null);
          }, 1500);
        }
      }, 8000);
    }
    onSelectThreat(point.threat);
  }, [onSelectThreat]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (zoomTimeoutRef.current) clearTimeout(zoomTimeoutRef.current);
    };
  }, []);

  const pointsData = THREATS.map((t) => ({
    lat: t.lat,
    lng: t.lng,
    size: t.level === "CRITICAL" ? 0.8 : t.level === "HIGH" ? 0.5 : 0.3,
    color: THREAT_LEVEL_COLORS[t.level],
    threat: t,
  }));

  const ringsData = THREATS.filter((t) => t.level === "CRITICAL" || t.level === "HIGH").map((t) => ({
    lat: t.lat,
    lng: t.lng,
    maxR: t.level === "CRITICAL" ? 6 : 4,
    propagationSpeed: t.level === "CRITICAL" ? 3 : 2,
    repeatPeriod: t.level === "CRITICAL" ? 700 : 1200,
    color: () => THREAT_LEVEL_COLORS[t.level],
  }));

  if (!GlobeComponent || dimensions.width === 0) {
    return (
      <div ref={containerRef} className="globe-container flex items-center justify-center">
        <div className="mono text-[var(--text-muted)] text-sm animate-pulse">
          INITIALIZING THREAT GLOBE...
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="globe-container relative">
      <GlobeComponent
        ref={globeRef}
        width={dimensions.width}
        height={dimensions.height}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundColor="rgba(0,0,0,0)"
        atmosphereColor="#FF6B00"
        atmosphereAltitude={0.18}
        pointsData={pointsData}
        pointLat="lat"
        pointLng="lng"
        pointAltitude="size"
        pointColor="color"
        pointRadius={0.45}
        pointsMerge={false}
        pointLabel={(d: unknown) => {
          const point = d as { threat: Threat };
          return `<div style="font-family: JetBrains Mono, monospace; background: rgba(17,17,19,0.92); border: 1px solid rgba(255,107,0,0.2); padding: 8px 12px; border-radius: 6px; font-size: 11px; color: #E5E5E5; backdrop-filter: blur(12px); box-shadow: 0 4px 12px rgba(0,0,0,0.5);"><strong style="color: ${THREAT_LEVEL_COLORS[point.threat.level]}">[${point.threat.level}]</strong> ${point.threat.name}<br/><span style="color: #888; font-size: 10px;">${point.threat.location}</span></div>`;
        }}
        onPointClick={handlePointClick}
        ringsData={ringsData}
        ringColor="color"
        ringMaxRadius="maxR"
        ringPropagationSpeed="propagationSpeed"
        ringRepeatPeriod="repeatPeriod"
      />

      {/* Focused threat HUD overlay */}
      <AnimatePresence>
        {focusedThreat && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute top-3 left-3 z-10 pointer-events-none"
          >
            <div
              className="rounded-lg px-3 py-2.5"
              style={{
                background: "rgba(17,17,19,0.85)",
                backdropFilter: "blur(16px) saturate(180%)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: `0 4px 20px rgba(0,0,0,0.5), 0 0 12px ${THREAT_LEVEL_COLORS[focusedThreat.level]}20`,
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="mono text-[9px] font-bold px-1.5 py-0.5 rounded uppercase"
                  style={{
                    color: THREAT_LEVEL_COLORS[focusedThreat.level],
                    backgroundColor: THREAT_LEVEL_COLORS[focusedThreat.level] + "20",
                  }}
                >
                  {focusedThreat.level}
                </span>
                <span className="mono text-[11px] font-bold text-[#E5E5E5]">
                  {focusedThreat.name}
                </span>
              </div>
              <div className="mono text-[10px] text-[#888]">
                {focusedThreat.lat.toFixed(4)}°N {focusedThreat.lng.toFixed(4)}°E • {focusedThreat.location}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scan line overlay */}
      <div className="globe-scanline" />
    </div>
  );
}
