'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { threats } from '@/data/threats'
import { natoBases, carrierGroups } from '@/data/military'
import type { ThreatZone, Severity } from '@/data/threats'

// react-globe.gl uses browser APIs — must be dynamically imported with ssr:false
const Globe = dynamic(() => import('react-globe.gl'), { ssr: false })

interface CountryFeature {
  type: string
  properties: Record<string, unknown>
  geometry: unknown
}

interface GeoData {
  features: CountryFeature[]
}

export interface GlobeComponentProps {
  width?: number
  height?: number
  visibleThreatIds?: number[]
  selectedThreatId?: number | null
  onMarkerClick?: (threat: ThreatZone) => void
  showNatoAssets?: boolean
}

const SEVERITY_COLORS: Record<Severity, string> = {
  critical: '#ff2d2d',
  high: '#ff8c00',
  medium: '#ffd700',
  low: '#00ff41',
}

const SEVERITY_SIZES: Record<Severity, number> = {
  critical: 0.8,
  high: 0.55,
  medium: 0.4,
  low: 0.28,
}

function severityToRingColor(severity: Severity) {
  const colors: Record<Severity, (t: number) => string> = {
    critical: (t: number) => `rgba(255,45,45,${1 - t})`,
    high: (t: number) => `rgba(255,140,0,${1 - t})`,
    medium: (t: number) => `rgba(255,215,0,${1 - t})`,
    low: (t: number) => `rgba(0,255,65,${1 - t})`,
  }
  return colors[severity]
}

interface GlobePoint {
  lat: number
  lng: number
  color: string
  radius: number
  pointType: 'threat' | 'base' | 'carrier'
  label: string
  originalThreat?: ThreatZone
}

export default function GlobeComponent({
  width,
  height,
  visibleThreatIds,
  selectedThreatId,
  onMarkerClick,
  showNatoAssets = false,
}: GlobeComponentProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [countries, setCountries] = useState<GeoData>({ features: [] })
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        })
      }
    }
    updateSize()
    const observer = new ResizeObserver(updateSize)
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    fetch(
      'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson'
    )
      .then((r) => r.json())
      .then((data: GeoData) => setCountries(data))
      .catch(() => {
        // fallback: empty features — globe still renders without country borders
      })
  }, [])

  const visibleThreats = visibleThreatIds
    ? threats.filter((t) => visibleThreatIds.includes(t.id))
    : threats

  // Build combined points array
  const allPoints: GlobePoint[] = [
    ...visibleThreats.map((t): GlobePoint => ({
      lat: t.lat,
      lng: t.lng,
      color: selectedThreatId === t.id ? '#ffffff' : SEVERITY_COLORS[t.severity],
      radius: selectedThreatId === t.id ? SEVERITY_SIZES[t.severity] * 1.8 : SEVERITY_SIZES[t.severity],
      pointType: 'threat',
      label: t.name,
      originalThreat: t,
    })),
    ...(showNatoAssets ? [
      ...natoBases.map((b): GlobePoint => ({
        lat: b.lat,
        lng: b.lng,
        color: '#00bfff',
        radius: 0.25,
        pointType: 'base',
        label: `${b.name} (${b.country})`,
      })),
      ...carrierGroups.map((c): GlobePoint => ({
        lat: c.lat,
        lng: c.lng,
        color: '#00ffff',
        radius: 0.45,
        pointType: 'carrier',
        label: `${c.name} — ${c.vessel}`,
      })),
    ] : []),
  ]

  const w = width ?? dimensions.width
  const h = height ?? dimensions.height

  return (
    <div ref={containerRef} className="w-full h-full">
      {w > 0 && h > 0 && (
        <Globe
          width={w}
          height={h}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
          backgroundColor="rgba(0,0,0,0)"
          atmosphereColor="#00ff41"
          atmosphereAltitude={0.1}
          showAtmosphere={true}
          // Country border polygons
          polygonsData={countries.features}
          polygonCapColor={() => 'rgba(0, 0, 0, 0)'}
          polygonSideColor={() => 'rgba(0, 0, 0, 0)'}
          polygonStrokeColor={() => 'rgba(0, 255, 65, 0.4)'}
          polygonAltitude={0.001}
          // Combined points (threats + military assets)
          pointsData={allPoints}
          pointLat={(d) => (d as GlobePoint).lat}
          pointLng={(d) => (d as GlobePoint).lng}
          pointColor={(d) => (d as GlobePoint).color}
          pointRadius={(d) => (d as GlobePoint).radius}
          pointAltitude={0.01}
          pointResolution={12}
          pointLabel={(d) => {
            const p = d as GlobePoint
            if (p.pointType !== 'threat') return `<div style="font-family:monospace;font-size:10px;color:#fff;background:rgba(0,0,0,0.8);padding:4px 8px;border:1px solid rgba(0,191,255,0.4)">${p.label}</div>`
            return ''
          }}
          onPointClick={(point) => {
            const p = point as GlobePoint
            if (p.pointType === 'threat' && p.originalThreat && onMarkerClick) {
              onMarkerClick(p.originalThreat)
            }
          }}
          // Pulsing ring animation around threat markers only
          ringsData={visibleThreats}
          ringLat={(d) => (d as ThreatZone).lat}
          ringLng={(d) => (d as ThreatZone).lng}
          ringColor={(d: object) => severityToRingColor((d as ThreatZone).severity)}
          ringMaxRadius={(d) => SEVERITY_SIZES[(d as ThreatZone).severity] * 5}
          ringPropagationSpeed={1.5}
          ringRepeatPeriod={1200}
          animateIn={true}
        />
      )}
    </div>
  )
}
