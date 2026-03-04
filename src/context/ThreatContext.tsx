'use client'

import { createContext, useContext, useState, useCallback, useEffect, useMemo, type ReactNode } from 'react'
import { threats } from '@/data/threats'
import type { ThreatZone, Severity, Region, ThreatType } from '@/data/threats'

export type RegionFilter = Region | 'All'
export type SeverityFilter = Severity | 'All'
export type ThreatTypeFilter = ThreatType | 'All'

interface Filters {
  region: RegionFilter
  severity: SeverityFilter
  threatType: ThreatTypeFilter
}

interface ThreatContextValue {
  selectedThreat: ThreatZone | null
  setSelectedThreat: (threat: ThreatZone | null) => void
  clearSelection: () => void
  filters: Filters
  setRegionFilter: (r: RegionFilter) => void
  setSeverityFilter: (s: SeverityFilter) => void
  setThreatTypeFilter: (t: ThreatTypeFilter) => void
  filteredThreats: ThreatZone[]
  showNatoAssets: boolean
  toggleNatoAssets: () => void
}

const ThreatContext = createContext<ThreatContextValue | null>(null)

export function ThreatProvider({ children }: { children: ReactNode }) {
  const [selectedThreat, setSelectedThreatState] = useState<ThreatZone | null>(null)
  const [filters, setFilters] = useState<Filters>({
    region: 'All',
    severity: 'All',
    threatType: 'All',
  })
  const [showNatoAssets, setShowNatoAssets] = useState(false)

  const clearSelection = useCallback(() => setSelectedThreatState(null), [])
  const toggleNatoAssets = useCallback(() => setShowNatoAssets((v) => !v), [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') clearSelection()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [clearSelection])

  const setSelectedThreat = useCallback((threat: ThreatZone | null) => {
    setSelectedThreatState((prev) => (prev?.id === threat?.id ? null : threat))
  }, [])

  const setRegionFilter = useCallback((r: RegionFilter) => {
    setFilters((f) => ({ ...f, region: r }))
  }, [])
  const setSeverityFilter = useCallback((s: SeverityFilter) => {
    setFilters((f) => ({ ...f, severity: s }))
  }, [])
  const setThreatTypeFilter = useCallback((t: ThreatTypeFilter) => {
    setFilters((f) => ({ ...f, threatType: t }))
  }, [])

  const filteredThreats = useMemo(() => {
    return threats.filter((t) => {
      if (filters.region !== 'All' && t.region !== filters.region) return false
      if (filters.severity !== 'All' && t.severity !== filters.severity) return false
      if (filters.threatType !== 'All' && !t.threatTypes.includes(filters.threatType)) return false
      return true
    })
  }, [filters])

  return (
    <ThreatContext.Provider
      value={{
        selectedThreat,
        setSelectedThreat,
        clearSelection,
        filters,
        setRegionFilter,
        setSeverityFilter,
        setThreatTypeFilter,
        filteredThreats,
        showNatoAssets,
        toggleNatoAssets,
      }}
    >
      {children}
    </ThreatContext.Provider>
  )
}

export function useThreat() {
  const ctx = useContext(ThreatContext)
  if (!ctx) throw new Error('useThreat must be used within ThreatProvider')
  return ctx
}
