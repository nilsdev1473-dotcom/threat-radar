import type { Severity, Region } from './threats'

export interface Alert {
  id: number
  timestamp: string
  location: string
  region: Region
  severity: Severity
  description: string
}

export const alerts: Alert[] = [
  { id: 1, timestamp: '2026-03-04T13:47:22Z', location: 'Kyiv, Ukraine', region: 'Europe', severity: 'critical', description: 'Ballistic missile barrage intercepted over Kyiv; 3 S-300 missiles defeated by Patriot PAC-3.' },
  { id: 2, timestamp: '2026-03-04T13:31:05Z', location: 'Red Sea', region: 'Middle East', severity: 'high', description: 'Houthi anti-ship missile targeted USS Cole-class destroyer; intercepted at 12km.' },
  { id: 3, timestamp: '2026-03-04T13:15:44Z', location: 'Taiwan Strait', region: 'Asia-Pacific', severity: 'high', description: 'PLA carrier group Shandong detected 180nm west of Taiwan; US 7th Fleet responding.' },
  { id: 4, timestamp: '2026-03-04T12:58:11Z', location: 'Zaporizhzhia, Ukraine', region: 'Europe', severity: 'critical', description: 'Russian Shahed-136 drone swarm detected; 23 UAVs inbound, air defense engaging.' },
  { id: 5, timestamp: '2026-03-04T12:42:37Z', location: 'Gaza Strip', region: 'Middle East', severity: 'high', description: 'IDF reports tunnel complex destroyed in Khan Younis operation; 12 combatants neutralized.' },
  { id: 6, timestamp: '2026-03-04T12:26:59Z', location: 'South China Sea', region: 'Asia-Pacific', severity: 'medium', description: 'Chinese CCG vessel fires water cannon on Philippine BRP Sierra Madre supply boat at Second Thomas Shoal.' },
  { id: 7, timestamp: '2026-03-04T12:10:14Z', location: 'Khartoum, Sudan', region: 'Africa', severity: 'critical', description: 'RSF artillery strikes residential districts; estimated 40+ civilian casualties reported.' },
  { id: 8, timestamp: '2026-03-04T11:54:28Z', location: 'Eastern Ukraine', region: 'Europe', severity: 'high', description: 'Russian ground forces advance 2.3km near Chasiv Yar; Ukrainian counterattack ongoing.' },
  { id: 9, timestamp: '2026-03-04T11:38:55Z', location: 'Pyongyang, North Korea', region: 'Asia-Pacific', severity: 'high', description: 'DPRK launches Hwasong-18 ICBM; trajectory suggests test of new warhead separation system.' },
  { id: 10, timestamp: '2026-03-04T11:22:03Z', location: 'Mogadishu, Somalia', region: 'Africa', severity: 'medium', description: 'Al-Shabaab IED detonates near government checkpoint; 4 soldiers wounded.' },
  { id: 11, timestamp: '2026-03-04T11:05:41Z', location: 'Aleppo, Syria', region: 'Middle East', severity: 'medium', description: 'Clashes between HTS and Turkish-backed factions in northern Aleppo suburbs.' },
  { id: 12, timestamp: '2026-03-04T10:49:17Z', location: 'Yellow Sea', region: 'Asia-Pacific', severity: 'medium', description: 'North Korean naval vessels conduct live-fire exercise 45nm from maritime boundary.' },
  { id: 13, timestamp: '2026-03-04T10:32:44Z', location: 'Mandalay, Myanmar', region: 'Asia-Pacific', severity: 'high', description: 'Myanmar military junta conducts airstrike on civilian market; 28 killed, 65 wounded.' },
  { id: 14, timestamp: '2026-03-04T10:16:22Z', location: 'Bab-el-Mandeb Strait', region: 'Middle East', severity: 'high', description: 'Commercial tanker Stena Impero diverted route; Houthi drone launch detected 30nm away.' },
  { id: 15, timestamp: '2026-03-04T09:59:58Z', location: 'Burkina Faso', region: 'Africa', severity: 'medium', description: 'JNIM ambush kills 18 Burkina Faso soldiers on supply convoy near Djibo.' },
  { id: 16, timestamp: '2026-03-04T09:43:35Z', location: 'Lviv, Ukraine', region: 'Europe', severity: 'critical', description: 'Cruise missile strikes power infrastructure; 1.2 million without electricity in western Ukraine.' },
  { id: 17, timestamp: '2026-03-04T09:27:14Z', location: 'Aden, Yemen', region: 'Middle East', severity: 'medium', description: 'Houthi drone attacks Saudi Aramco facility near Aden; fire suppressed, 2 injured.' },
  { id: 18, timestamp: '2026-03-04T09:10:49Z', location: 'Donbas, Ukraine', region: 'Europe', severity: 'critical', description: 'Ukrainian HIMARS strikes confirmed on Russian logistics depot near Tokmak; secondary explosions.' },
  { id: 19, timestamp: '2026-03-04T08:54:23Z', location: 'East China Sea', region: 'Asia-Pacific', severity: 'medium', description: 'Chinese J-16 fighters intercept Japanese P-3C maritime patrol aircraft over disputed Senkaku/Diaoyu islands.' },
  { id: 20, timestamp: '2026-03-04T08:37:58Z', location: 'Darfur, Sudan', region: 'Africa', severity: 'critical', description: 'RSF mass atrocity event reported in Zalingei; UN peacekeepers denied access to area.' },
  { id: 21, timestamp: '2026-03-04T08:21:33Z', location: 'Korean DMZ', region: 'Asia-Pacific', severity: 'high', description: 'North Korea sends 500+ trash balloons carrying psychological leaflets across DMZ.' },
  { id: 22, timestamp: '2026-03-04T08:05:08Z', location: 'Gaza City', region: 'Middle East', severity: 'high', description: 'WHO reports Al-Ahli hospital operating at 340% capacity; medical supplies critically low.' },
  { id: 23, timestamp: '2026-03-04T07:48:45Z', location: 'Luzon Strait', region: 'Asia-Pacific', severity: 'medium', description: 'PLA submarine detected transiting Luzon Strait; USS Annapolis conducting surveillance.' },
  { id: 24, timestamp: '2026-03-04T07:32:21Z', location: 'Odessa, Ukraine', region: 'Europe', severity: 'high', description: 'Russian Kh-22 anti-ship missile targets grain storage facilities at Odessa port.' },
  { id: 25, timestamp: '2026-03-04T07:15:58Z', location: 'Deir ez-Zor, Syria', region: 'Middle East', severity: 'high', description: 'ISIS ambush kills 11 HTS fighters in Deir ez-Zor countryside; cell network resurging.' },
]
