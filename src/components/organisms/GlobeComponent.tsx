'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'

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

interface GlobeComponentProps {
  width?: number
  height?: number
}

export default function GlobeComponent({ width, height }: GlobeComponentProps) {
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
          polygonsData={countries.features}
          polygonCapColor={() => 'rgba(0, 0, 0, 0)'}
          polygonSideColor={() => 'rgba(0, 0, 0, 0)'}
          polygonStrokeColor={() => 'rgba(0, 255, 65, 0.4)'}
          polygonAltitude={0.001}
          animateIn={true}
        />
      )}
    </div>
  )
}
