export type ThreatLevel = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
export type ThreatType = "ARMED_CONFLICT" | "CYBER" | "TERRORISM" | "NATURAL_DISASTER" | "NAVAL" | "NUCLEAR";

export interface ThreatNews {
  timestamp: string;
  headline: string;
}

export interface Threat {
  id: string;
  name: string;
  location: string;
  lat: number;
  lng: number;
  level: ThreatLevel;
  type: ThreatType;
  summary: string;
  militaryAssets: string[];
  casualtiesConfirmed: number;
  casualtiesEstimated: number;
  displaced: number;
  startDate: string;
  lastUpdate: string;
  news: ThreatNews[];
}

export const THREATS: Threat[] = [
  {
    id: "TH-001",
    name: "Eastern European Front",
    location: "Ukraine-Russia Border",
    lat: 48.3794,
    lng: 31.1656,
    level: "CRITICAL",
    type: "ARMED_CONFLICT",
    summary: "Large-scale conventional warfare with active frontline engagements across 600km. Artillery exchanges, drone warfare, and armored offensives ongoing.",
    militaryAssets: ["3x Armored Divisions", "12x Artillery Battalions", "UAV Swarms", "Air Defense Systems"],
    casualtiesConfirmed: 48200,
    casualtiesEstimated: 125000,
    displaced: 6800000,
    startDate: "2022-02-24",
    lastUpdate: "2026-03-16T08:45:00Z",
    news: [
      { timestamp: "2026-03-16T08:30:00Z", headline: "New offensive reported along northern axis" },
      { timestamp: "2026-03-16T06:15:00Z", headline: "Air defense intercepts 14 drones overnight" },
      { timestamp: "2026-03-15T22:00:00Z", headline: "Civilian evacuation ordered in Kherson region" }
    ]
  },
  {
    id: "TH-002",
    name: "South China Sea Escalation",
    location: "Spratly Islands",
    lat: 10.72,
    lng: 115.83,
    level: "HIGH",
    type: "NAVAL",
    summary: "Naval standoff between multiple nations over territorial claims. Carrier groups repositioned. Maritime exclusion zone declared.",
    militaryAssets: ["2x Carrier Strike Groups", "Submarine Fleet", "Coast Guard Vessels", "Fighter Squadrons"],
    casualtiesConfirmed: 0,
    casualtiesEstimated: 0,
    displaced: 12000,
    startDate: "2025-11-03",
    lastUpdate: "2026-03-16T07:20:00Z",
    news: [
      { timestamp: "2026-03-16T07:00:00Z", headline: "Third carrier group en route to contested waters" },
      { timestamp: "2026-03-15T18:45:00Z", headline: "Diplomatic talks stall at ASEAN summit" }
    ]
  },
  {
    id: "TH-003",
    name: "Sahel Insurgency",
    location: "Mali-Burkina Faso-Niger",
    lat: 14.4974,
    lng: -1.3984,
    level: "HIGH",
    type: "TERRORISM",
    summary: "Jihadist insurgent groups expanding territorial control. Multiple coordinated attacks on military and civilian targets.",
    militaryAssets: ["Multinational Task Force", "Drone Surveillance", "Special Forces Units"],
    casualtiesConfirmed: 8700,
    casualtiesEstimated: 22000,
    displaced: 3200000,
    startDate: "2024-06-15",
    lastUpdate: "2026-03-16T05:30:00Z",
    news: [
      { timestamp: "2026-03-16T05:00:00Z", headline: "Convoy ambush kills 23 soldiers in central Mali" },
      { timestamp: "2026-03-15T14:30:00Z", headline: "UN calls for emergency humanitarian corridor" }
    ]
  },
  {
    id: "TH-004",
    name: "Taiwan Strait Tensions",
    location: "Taiwan Strait",
    lat: 24.15,
    lng: 119.50,
    level: "CRITICAL",
    type: "ARMED_CONFLICT",
    summary: "Military exercises intensifying with live-fire drills. Air incursions at record levels. Economic blockade preparations detected via satellite.",
    militaryAssets: ["4x Destroyer Groups", "Amphibious Assault Ships", "Missile Batteries", "Air Superiority Wings"],
    casualtiesConfirmed: 0,
    casualtiesEstimated: 0,
    displaced: 45000,
    startDate: "2026-01-08",
    lastUpdate: "2026-03-16T09:00:00Z",
    news: [
      { timestamp: "2026-03-16T08:55:00Z", headline: "42 aircraft detected in ADIZ in past 24hrs" },
      { timestamp: "2026-03-16T04:20:00Z", headline: "Semiconductor supply chain contingency activated" }
    ]
  },
  {
    id: "TH-005",
    name: "Global Ransomware Wave",
    location: "Global — Origin: Eastern Europe",
    lat: 55.7558,
    lng: 37.6173,
    level: "HIGH",
    type: "CYBER",
    summary: "Coordinated ransomware campaign targeting critical infrastructure across 40+ nations. Power grids, hospitals, and financial systems affected.",
    militaryAssets: ["Cyber Command Units", "NSA/GCHQ Response Teams", "Private Sector CERT"],
    casualtiesConfirmed: 47,
    casualtiesEstimated: 200,
    displaced: 0,
    startDate: "2026-02-28",
    lastUpdate: "2026-03-16T09:15:00Z",
    news: [
      { timestamp: "2026-03-16T09:10:00Z", headline: "Major hospital chain systems restored after 72hr outage" },
      { timestamp: "2026-03-16T01:30:00Z", headline: "Attribution points to state-sponsored APT group" }
    ]
  },
  {
    id: "TH-006",
    name: "Horn of Africa Crisis",
    location: "Ethiopia-Somalia",
    lat: 8.9806,
    lng: 38.7578,
    level: "MEDIUM",
    type: "ARMED_CONFLICT",
    summary: "Inter-state border conflict combined with internal insurgency. Humanitarian crisis deepening with famine conditions.",
    militaryAssets: ["Regional Forces", "AU Peacekeepers", "Drone Reconnaissance"],
    casualtiesConfirmed: 3400,
    casualtiesEstimated: 15000,
    displaced: 2100000,
    startDate: "2025-08-12",
    lastUpdate: "2026-03-15T22:45:00Z",
    news: [
      { timestamp: "2026-03-15T22:00:00Z", headline: "Ceasefire negotiations resume in Djibouti" },
      { timestamp: "2026-03-15T16:00:00Z", headline: "WFP reports 4.5M in acute food insecurity" }
    ]
  },
  {
    id: "TH-007",
    name: "Arctic Resource Standoff",
    location: "Arctic Circle — Svalbard",
    lat: 78.2232,
    lng: 15.6267,
    level: "LOW",
    type: "NAVAL",
    summary: "Multiple nations asserting territorial claims over newly accessible Arctic shipping routes and mineral deposits.",
    militaryAssets: ["Icebreaker Fleets", "Submarine Patrols", "Arctic Base Stations"],
    casualtiesConfirmed: 0,
    casualtiesEstimated: 0,
    displaced: 0,
    startDate: "2025-05-20",
    lastUpdate: "2026-03-15T20:00:00Z",
    news: [
      { timestamp: "2026-03-15T19:30:00Z", headline: "New military outpost detected via satellite imagery" },
      { timestamp: "2026-03-14T12:00:00Z", headline: "Norway protests unauthorized drilling operation" }
    ]
  },
  {
    id: "TH-008",
    name: "Middle East Flashpoint",
    location: "Israel-Lebanon Border",
    lat: 33.2774,
    lng: 35.2044,
    level: "CRITICAL",
    type: "ARMED_CONFLICT",
    summary: "Cross-border exchanges escalating with rocket barrages and airstrikes. Ground operation preparations observed.",
    militaryAssets: ["Iron Dome Batteries", "Armored Brigades", "Fighter-Bomber Squadrons", "Naval Blockade"],
    casualtiesConfirmed: 12800,
    casualtiesEstimated: 38000,
    displaced: 1500000,
    startDate: "2025-09-01",
    lastUpdate: "2026-03-16T09:30:00Z",
    news: [
      { timestamp: "2026-03-16T09:25:00Z", headline: "Heavy barrage targets northern cities overnight" },
      { timestamp: "2026-03-16T06:00:00Z", headline: "UN Security Council emergency session called" },
      { timestamp: "2026-03-15T21:15:00Z", headline: "Humanitarian aid convoy blocked at border crossing" }
    ]
  }
];

export const THREAT_LEVEL_COLORS: Record<ThreatLevel, string> = {
  CRITICAL: "#FF2D2D",
  HIGH: "#FF6B00",
  MEDIUM: "#FFB800",
  LOW: "#00FF88",
};

export const THREAT_TYPE_LABELS: Record<ThreatType, string> = {
  ARMED_CONFLICT: "Armed Conflict",
  CYBER: "Cyber Warfare",
  TERRORISM: "Terrorism",
  NATURAL_DISASTER: "Natural Disaster",
  NAVAL: "Naval Standoff",
  NUCLEAR: "Nuclear Threat",
};

export function getDefconLevel(threats: Threat[]): number {
  const criticalCount = threats.filter(t => t.level === "CRITICAL").length;
  if (criticalCount >= 3) return 1;
  if (criticalCount >= 2) return 2;
  if (criticalCount >= 1) return 3;
  return 4;
}

export function formatNumber(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return (n / 1000).toFixed(1) + "K";
  return n.toString();
}

export function timeAgo(dateStr: string): string {
  const now = new Date("2026-03-16T10:00:00Z");
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHrs = Math.floor(diffMins / 60);
  if (diffHrs < 24) return `${diffHrs}h ago`;
  const diffDays = Math.floor(diffHrs / 24);
  return `${diffDays}d ago`;
}
