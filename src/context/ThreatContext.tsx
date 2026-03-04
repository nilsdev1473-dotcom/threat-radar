'use client'

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'
import type { ThreatZone } from '@/data/threats'

interface ThreatContextValue {
  selectedThreat: ThreatZone | null
  setSelectedThreat: (threat: ThreatZone | null) => void
  clearSelection: () => void
}

const ThreatContext = createContext<ThreatContextValue | null>(null)

export function ThreatProvider({ children }: { children: ReactNode }) {
  const [selectedThreat, setSelectedThreat] = useState<ThreatZone | null>(null)

  const clearSelection = useCallback(() => setSelectedThreat(null), [])

  // Escape key clears selection
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') clearSelection()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [clearSelection])

  const handleSetSelectedThreat = useCallback(
    (threat: ThreatZone | null) => {
      // clicking the same marker deselects it
      setSelectedThreat((prev) => (prev?.id === threat?.id ? null : threat))
    },
    []
  )

  return (
    <ThreatContext.Provider
      value={{ selectedThreat, setSelectedThreat: handleSetSelectedThreat, clearSelection }}
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
