"use client";

import { useEffect, useRef, useState, useCallback } from "react";
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
      globe.controls().enableZoom = false;
      globe.pointOfView({ lat: 30, lng: 30, altitude: 2.2 }, 1000);
    }
  }, [GlobeComponent]);

  const handlePointClick = useCallback((d: unknown) => {
    const point = d as { threat: Threat };
    // Zoom to the threat location
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = false;
      globeRef.current.pointOfView(
        { lat: point.threat.lat, lng: point.threat.lng, altitude: 1.2 },
        1200
      );
      // Resume auto-rotate after 6 seconds
      setTimeout(() => {
        if (globeRef.current) {
          globeRef.current.controls().autoRotate = true;
        }
      }, 6000);
    }
    onSelectThreat(point.threat);
  }, [onSelectThreat]);

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
    <div ref={containerRef} className="globe-container">
      <GlobeComponent
        ref={globeRef}
        width={dimensions.width}
        height={dimensions.height}
        globeImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-night.jpg"
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
      {/* Scan line overlay */}
      <div className="globe-scanline" />
    </div>
  );
}
