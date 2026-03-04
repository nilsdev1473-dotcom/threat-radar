'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { threats } from '@/data/threats'
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

export default function GlobeComponent({
  width,
  height,
  visibleThreatIds,
  selectedThreatId,
  onMarkerClick,
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
          // Threat zone dot markers
          pointsData={visibleThreats}
          pointLat={(d) => (d as ThreatZone).lat}
          pointLng={(d) => (d as ThreatZone).lng}
          pointColor={(d) => {
            const threat = d as ThreatZone
            const baseColor = SEVERITY_COLORS[threat.severity]
            if (selectedThreatId === threat.id) return '#ffffff'
            return baseColor
          }}
          pointRadius={(d) => {
            const threat = d as ThreatZone
            const base = SEVERITY_SIZES[threat.severity]
            return selectedThreatId === threat.id ? base * 1.8 : base
          }}
          pointAltitude={0.01}
          pointResolution={12}
          onPointClick={(point) => {
            if (onMarkerClick) onMarkerClick(point as ThreatZone)
          }}
          // Pulsing ring animation around each marker
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
