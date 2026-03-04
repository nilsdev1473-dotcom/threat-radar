import { ThreatProvider } from '@/context/ThreatContext'
import MainDashboard from '@/components/organisms/MainDashboard'

export default function Home() {
  return (
    <ThreatProvider>
      <MainDashboard />
    </ThreatProvider>
  )
}
