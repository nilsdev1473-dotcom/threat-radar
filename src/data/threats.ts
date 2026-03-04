export type Severity = 'critical' | 'high' | 'medium' | 'low'
export type Region = 'Europe' | 'Middle East' | 'Asia-Pacific' | 'Africa' | 'Americas'
export type ThreatType = 'armed-conflict' | 'naval' | 'cyber' | 'aerospace' | 'nuclear'
export type NatoStatus = 'active' | 'monitoring' | 'elevated' | 'standby'

export interface TimelineEvent {
  date: string
  event: string
}

export interface ThreatZone {
  id: number
  name: string
  lat: number
  lng: number
  severity: Severity
  region: Region
  threatTypes: ThreatType[]
  involvedParties: string[]
  casualties: number
  duration: string
  natoStatus: NatoStatus
  summary: string
  timeline: TimelineEvent[]
}

export const threats: ThreatZone[] = [
  {
    id: 1,
    name: 'Ukraine-Russia Conflict',
    lat: 49.0,
    lng: 32.0,
    severity: 'critical',
    region: 'Europe',
    threatTypes: ['armed-conflict', 'cyber', 'aerospace'],
    involvedParties: ['Ukraine', 'Russia', 'NATO (support)', 'EU (support)'],
    casualties: 487000,
    duration: '2+ years',
    natoStatus: 'active',
    summary:
      'Full-scale Russian invasion of Ukraine continues with intense fighting along eastern and southern front lines. Significant missile and drone strikes targeting civilian infrastructure.',
    timeline: [
      { date: '2024-02-10', event: 'Major Russian offensive push in Avdiivka sector' },
      { date: '2024-06-15', event: 'Ukraine strikes Russian Black Sea Fleet HQ in Sevastopol' },
      { date: '2024-08-06', event: 'Ukraine launches cross-border incursion into Kursk Oblast' },
      { date: '2024-10-21', event: 'Russia deploys North Korean troops to eastern front' },
      { date: '2025-01-14', event: 'Largest drone swarm attack on Ukrainian grid infrastructure' },
    ],
  },
  {
    id: 2,
    name: 'Gaza Strip',
    lat: 31.5,
    lng: 34.47,
    severity: 'critical',
    region: 'Middle East',
    threatTypes: ['armed-conflict', 'aerospace'],
    involvedParties: ['Israel (IDF)', 'Hamas', 'Islamic Jihad', 'Hezbollah (indirect)'],
    casualties: 52000,
    duration: '16+ months',
    natoStatus: 'monitoring',
    summary:
      'Ongoing Israeli military operations in Gaza following October 2023 Hamas attack. Severe humanitarian crisis with extensive urban warfare and airstrikes.',
    timeline: [
      { date: '2023-10-07', event: 'Hamas launches Operation Al-Aqsa Flood; 1,200 Israelis killed' },
      { date: '2023-10-27', event: 'IDF begins ground offensive in northern Gaza' },
      { date: '2024-05-07', event: 'IDF enters Rafah despite international pressure' },
      { date: '2024-09-22', event: 'Hezbollah pager bomb attacks escalate regional tensions' },
      { date: '2025-01-19', event: 'Ceasefire agreement reaches Phase 1 implementation' },
    ],
  },
  {
    id: 3,
    name: 'Red Sea / Bab-el-Mandeb',
    lat: 13.5,
    lng: 43.3,
    severity: 'high',
    region: 'Middle East',
    threatTypes: ['naval', 'aerospace', 'armed-conflict'],
    involvedParties: ['Houthi Forces (Yemen)', 'US Navy', 'UK Royal Navy', 'Commercial Shipping'],
    casualties: 4,
    duration: '14+ months',
    natoStatus: 'active',
    summary:
      'Houthi rebels conducting sustained drone and missile attacks on commercial shipping in Red Sea. Operation Prosperity Guardian established to protect maritime trade routes.',
    timeline: [
      { date: '2023-11-19', event: 'Houthis seize Galaxy Leader cargo vessel' },
      { date: '2024-01-12', event: 'US/UK launch Operation Prosperity Guardian strikes on Yemen' },
      { date: '2024-03-04', event: 'True Confidence bulk carrier struck; 3 crew killed' },
      { date: '2024-07-20', event: 'Houthi drone strikes Tel Aviv — first direct hit on Israel' },
      { date: '2024-11-18', event: 'Houthis sink Tutor cargo ship in Red Sea' },
    ],
  },
  {
    id: 4,
    name: 'South China Sea',
    lat: 14.0,
    lng: 115.0,
    severity: 'high',
    region: 'Asia-Pacific',
    threatTypes: ['naval', 'aerospace', 'cyber'],
    involvedParties: ['China (PLA Navy)', 'Philippines', 'Vietnam', 'US Navy (freedom of navigation)'],
    casualties: 0,
    duration: 'Ongoing (escalating 2024)',
    natoStatus: 'monitoring',
    summary:
      'China asserting maritime claims through coast guard and naval harassment of Philippine vessels near Scarborough Shoal and Second Thomas Shoal. Water cannon and laser incidents reported.',
    timeline: [
      { date: '2024-02-05', event: 'China coast guard fires water cannon on Philippine resupply mission' },
      { date: '2024-04-30', event: 'China seizes Philippine supplies with grappling hooks' },
      { date: '2024-07-08', event: 'US-Philippines joint naval patrols commence in West Philippine Sea' },
      { date: '2024-09-18', event: 'China intercepts US RC-135 recon aircraft over South China Sea' },
      { date: '2025-01-02', event: 'New Philippine-US defense agreement grants expanded base access' },
    ],
  },
  {
    id: 5,
    name: 'Taiwan Strait',
    lat: 24.5,
    lng: 121.5,
    severity: 'high',
    region: 'Asia-Pacific',
    threatTypes: ['aerospace', 'naval', 'cyber'],
    involvedParties: ['China (PLA)', 'Taiwan (ROC)', 'USA (diplomatic/military commitment)'],
    casualties: 0,
    duration: 'Chronic (intensified 2024)',
    natoStatus: 'elevated',
    summary:
      'China conducting regular military exercises and airspace incursions near Taiwan. PLA air and naval activities have intensified following Taiwan elections. Median line crossings increasing.',
    timeline: [
      { date: '2024-01-13', event: 'Taiwan presidential election; Lai Ching-te (DPP) wins' },
      { date: '2024-05-23', event: 'China launches Joint Sword-2024A military exercises encircling Taiwan' },
      { date: '2024-08-15', event: '23 PLA aircraft cross Taiwan Strait median line in single day' },
      { date: '2024-10-14', event: 'China launches Joint Sword-2024B exercises amid cross-strait tensions' },
      { date: '2025-01-20', event: 'PLA carrier group transits Taiwan Strait amid US transition' },
    ],
  },
  {
    id: 6,
    name: 'Sahel Region',
    lat: 15.0,
    lng: -2.0,
    severity: 'high',
    region: 'Africa',
    threatTypes: ['armed-conflict', 'cyber'],
    involvedParties: ['JNIM (al-Qaeda affiliate)', 'ISGS (ISIS affiliate)', 'Mali/Burkina Faso/Niger juntas', 'Wagner Group (Russia)'],
    casualties: 15000,
    duration: 'Decade-long crisis',
    natoStatus: 'standby',
    summary:
      'Jihadist insurgencies spreading across Sahel with Wagner Group replacing French forces. Multiple military coups have destabilized governance in Mali, Burkina Faso, and Niger.',
    timeline: [
      { date: '2023-07-26', event: 'Military coup in Niger; French and US forces face expulsion' },
      { date: '2024-01-27', event: 'Burkina Faso demands French military withdrawal' },
      { date: '2024-03-10', event: 'JNIM attacks kill 170+ in coordinated strikes across Mali' },
      { date: '2024-07-18', event: 'Wagner-backed forces suffer major ambush in Northern Mali' },
      { date: '2024-11-29', event: 'Alliance of Sahel States formally exits ECOWAS' },
    ],
  },
  {
    id: 7,
    name: 'Sudan Civil War',
    lat: 15.6,
    lng: 32.5,
    severity: 'critical',
    region: 'Africa',
    threatTypes: ['armed-conflict'],
    involvedParties: ['Sudanese Armed Forces (SAF)', 'Rapid Support Forces (RSF)', 'Civilian population'],
    casualties: 150000,
    duration: '20+ months',
    natoStatus: 'monitoring',
    summary:
      'Civil war between Sudan Armed Forces and RSF paramilitaries. One of the world\'s worst humanitarian crises with mass atrocities in Darfur region. 25 million displaced.',
    timeline: [
      { date: '2023-04-15', event: 'SAF-RSF fighting breaks out in Khartoum; war begins' },
      { date: '2023-06-08', event: 'El Fasher surrounded; mass atrocities in Darfur resume' },
      { date: '2024-03-26', event: 'UN declares Sudan world\'s largest displacement crisis' },
      { date: '2024-08-14', event: 'RSF besieges El Fasher; genocide warnings from UN' },
      { date: '2025-01-08', event: 'International donors pledge $800M amid dire humanitarian access' },
    ],
  },
  {
    id: 8,
    name: 'Myanmar Civil War',
    lat: 19.5,
    lng: 96.0,
    severity: 'high',
    region: 'Asia-Pacific',
    threatTypes: ['armed-conflict', 'aerospace'],
    involvedParties: ['Myanmar Military (Tatmadaw)', 'People\'s Defence Force (PDF)', 'Ethnic Armed Organizations', 'China (interests)'],
    casualties: 6000,
    duration: '3+ years',
    natoStatus: 'standby',
    summary:
      'Civil war following 2021 military coup. Resistance forces gaining ground in multiple states. Military conducting airstrikes on civilian areas.',
    timeline: [
      { date: '2024-01-29', event: 'Three Brotherhood Alliance captures Lashio; major symbolic victory' },
      { date: '2024-04-10', event: 'Myawaddy border town falls to resistance forces' },
      { date: '2024-06-15', event: 'Military conscription law announced; mass desertions reported' },
      { date: '2024-09-07', event: 'Resistance forces control 60%+ of territory per independent estimates' },
      { date: '2025-01-03', event: 'Military airstrikes kill 100+ at New Year celebration' },
    ],
  },
  {
    id: 9,
    name: 'Syria',
    lat: 35.0,
    lng: 38.0,
    severity: 'high',
    region: 'Middle East',
    threatTypes: ['armed-conflict', 'aerospace', 'cyber'],
    involvedParties: ['HTS (Hayat Tahrir al-Sham)', 'Former Assad forces', 'Turkey', 'Kurds (SDF)', 'ISIS remnants'],
    casualties: 8000,
    duration: 'Post-Assad transition (ongoing)',
    natoStatus: 'monitoring',
    summary:
      'Following Assad regime collapse in December 2024, Syria faces uncertain transition with multiple armed groups vying for control. ISIS resurging in eastern desert.',
    timeline: [
      { date: '2024-11-27', event: 'HTS launches major offensive from Idlib; captures Aleppo in days' },
      { date: '2024-12-08', event: 'Assad flees to Russia; Damascus falls to opposition forces' },
      { date: '2024-12-17', event: 'HTS leader Ahmad al-Sharaa declared transitional authority' },
      { date: '2025-01-05', event: 'ISIS attacks on HTS positions in Deir ez-Zor escalate' },
      { date: '2025-02-10', event: 'Turkey-backed forces clash with SDF in northern Syria' },
    ],
  },
  {
    id: 10,
    name: 'Somalia / Horn of Africa',
    lat: 5.0,
    lng: 46.0,
    severity: 'medium',
    region: 'Africa',
    threatTypes: ['armed-conflict', 'naval'],
    involvedParties: ['Al-Shabaab', 'Somali National Army', 'ATMIS (AU Mission)', 'US AFRICOM'],
    casualties: 2500,
    duration: 'Long-running (intensified)',
    natoStatus: 'standby',
    summary:
      'Al-Shabaab insurgency continues despite Somali government offensives. Group maintains control of rural areas and conducts bombings in Mogadishu. Piracy resurgence linked to Houthi activity.',
    timeline: [
      { date: '2024-01-20', event: 'Al-Shabaab captures several towns in central Somalia' },
      { date: '2024-03-14', event: 'Mogadishu car bomb kills 15 near presidential palace' },
      { date: '2024-07-04', event: 'US airstrike kills senior al-Shabaab commander in Jubaland' },
      { date: '2024-10-30', event: 'Somali forces begin major offensive in Lower Shabelle' },
      { date: '2025-01-11', event: 'Al-Shabaab attacks UN convoy near Kismayo' },
    ],
  },
  {
    id: 11,
    name: 'Yemen',
    lat: 15.5,
    lng: 47.0,
    severity: 'high',
    region: 'Middle East',
    threatTypes: ['armed-conflict', 'naval', 'aerospace'],
    involvedParties: ['Houthi Forces (Ansar Allah)', 'Saudi-led Coalition', 'Yemeni Government', 'Iran (backing)'],
    casualties: 377000,
    duration: '10+ years',
    natoStatus: 'monitoring',
    summary:
      'Yemen conflict continues despite fragile ceasefires. Houthi forces now most active internationally via Red Sea attacks. Saudi Arabia pursuing negotiated exit.',
    timeline: [
      { date: '2023-12-24', event: 'UN-brokered truce continues holding in Yemen proper' },
      { date: '2024-01-12', event: 'US/UK conduct first airstrikes on Houthi targets in Yemen' },
      { date: '2024-04-19', event: 'Houthis claim responsibility for 45+ ships attacked since Oct 2023' },
      { date: '2024-08-20', event: 'Saudi Arabia-Houthi peace talks advance in Oman' },
      { date: '2025-01-25', event: 'Houthi attacks resume after Gaza ceasefire delay; regional escalation' },
    ],
  },
  {
    id: 12,
    name: 'Korean Peninsula',
    lat: 38.5,
    lng: 127.5,
    severity: 'high',
    region: 'Asia-Pacific',
    threatTypes: ['nuclear', 'aerospace', 'cyber'],
    involvedParties: ['North Korea (DPRK)', 'South Korea (ROK)', 'USA', 'Japan'],
    casualties: 0,
    duration: 'Chronic / escalating 2024',
    natoStatus: 'elevated',
    summary:
      'North Korea significantly escalating missile tests and nuclear posturing. DPRK-Russia arms deal supplying artillery to Ukraine conflict. South Korea under political crisis.',
    timeline: [
      { date: '2024-01-24', event: 'Kim Jong-un declares South Korea "primary enemy"; constitution amended' },
      { date: '2024-04-02', event: 'North Korea fires multiple cruise missiles into Yellow Sea' },
      { date: '2024-09-13', event: 'Evidence confirms North Korea supplying shells to Russia for Ukraine' },
      { date: '2024-12-03', event: 'South Korean President Yoon declares martial law; reversed within hours' },
      { date: '2025-01-18', event: 'North Korea tests new ICBM capable of reaching continental US' },
    ],
  },
]
