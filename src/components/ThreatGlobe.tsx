"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { THREATS, THREAT_LEVEL_COLORS, type Threat } from "@/lib/threats";

interface ThreatGlobeProps {
  onSelectThreat: (threat: Threat) => void;
}

export default function ThreatGlobe({ onSelectThreat }: ThreatGlobeProps) {
  const globeRef = useRef<unknown>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [GlobeComponent, setGlobeComponent] = useState<React.ComponentType<Record<string, unknown>> | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

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
      const globe = globeRef.current as { controls: () => { autoRotate: boolean; autoRotateSpeed: number; enableZoom: boolean }; pointOfView: (pov: { lat: number; lng: number; altitude: number }, ms: number) => void };
      globe.controls().autoRotate = true;
      globe.controls().autoRotateSpeed = 0.3;
      globe.controls().enableZoom = false;
      globe.pointOfView({ lat: 30, lng: 30, altitude: 2.2 }, 1000);
    }
  }, [GlobeComponent]);

  const pointsData = THREATS.map((t) => ({
    lat: t.lat,
    lng: t.lng,
    size: t.level === "CRITICAL" ? 0.8 : t.level === "HIGH" ? 0.5 : 0.3,
    color: THREAT_LEVEL_COLORS[t.level],
    threat: t,
  }));

  const ringsData = THREATS.filter((t) => t.level === "CRITICAL").map((t) => ({
    lat: t.lat,
    lng: t.lng,
    maxR: 5,
    propagationSpeed: 2,
    repeatPeriod: 800,
    color: () => THREAT_LEVEL_COLORS[t.level],
  }));

  if (!GlobeComponent || dimensions.width === 0) {
    return (
      <div ref={containerRef} className="globe-container flex items-center justify-center">
        <div className="mono text-[var(--text-muted)] text-sm animate-pulse">
          INITIALIZING GLOBE...
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="globe-container">
      <GlobeComponent
        ref={globeRef}
        width={dimensions.width}
        height={dimensions.height}
        globeImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-night.jpg"
        backgroundColor="rgba(0,0,0,0)"
        atmosphereColor="#FF6B00"
        atmosphereAltitude={0.15}
        pointsData={pointsData}
        pointLat="lat"
        pointLng="lng"
        pointAltitude="size"
        pointColor="color"
        pointRadius={0.4}
        pointLabel={(d: unknown) => {
          const point = d as { threat: Threat };
          return `<div style="font-family: JetBrains Mono, monospace; background: #111113ee; border: 1px solid #2A2A2D; padding: 8px 12px; border-radius: 4px; font-size: 11px; color: #E5E5E5;"><strong style="color: ${THREAT_LEVEL_COLORS[point.threat.level]}">[${point.threat.level}]</strong> ${point.threat.name}</div>`;
        }}
        onPointClick={(d: unknown) => {
          const point = d as { threat: Threat };
          onSelectThreat(point.threat);
        }}
        ringsData={ringsData}
        ringColor="color"
        ringMaxRadius="maxR"
        ringPropagationSpeed="propagationSpeed"
        ringRepeatPeriod="repeatPeriod"
      />
      {/* Scan line effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[3]">
        <div className="absolute left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-20 animate-scan-line" />
      </div>
    </div>
  );
}
