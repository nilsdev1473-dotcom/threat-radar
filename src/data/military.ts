export interface NatoBase {
  id: number
  name: string
  country: string
  lat: number
  lng: number
  type: 'airbase' | 'naval' | 'army' | 'headquarters'
}

export interface CarrierGroup {
  id: number
  name: string
  vessel: string
  lat: number
  lng: number
  status: string
}

export const natoBases: NatoBase[] = [
  {
    id: 1,
    name: 'Ramstein Air Base',
    country: 'Germany',
    lat: 49.44,
    lng: 7.6,
    type: 'airbase',
  },
  {
    id: 2,
    name: 'RAF Lakenheath',
    country: 'United Kingdom',
    lat: 52.41,
    lng: 0.56,
    type: 'airbase',
  },
  {
    id: 3,
    name: 'Incirlik Air Base',
    country: 'Turkey',
    lat: 37.0,
    lng: 35.43,
    type: 'airbase',
  },
  {
    id: 4,
    name: 'Aviano Air Base',
    country: 'Italy',
    lat: 46.03,
    lng: 12.6,
    type: 'airbase',
  },
  {
    id: 5,
    name: 'Camp Darby',
    country: 'Italy',
    lat: 43.67,
    lng: 10.37,
    type: 'army',
  },
  {
    id: 6,
    name: 'Naval Station Rota',
    country: 'Spain',
    lat: 36.64,
    lng: -6.35,
    type: 'naval',
  },
  {
    id: 7,
    name: 'SHAPE / NATO HQ',
    country: 'Belgium',
    lat: 50.45,
    lng: 4.45,
    type: 'headquarters',
  },
  {
    id: 8,
    name: 'Ämari Air Base',
    country: 'Estonia',
    lat: 59.26,
    lng: 24.21,
    type: 'airbase',
  },
  {
    id: 9,
    name: 'Powidz Air Base',
    country: 'Poland',
    lat: 52.38,
    lng: 17.85,
    type: 'airbase',
  },
  {
    id: 10,
    name: 'Mihail Kogalniceanu Air Base',
    country: 'Romania',
    lat: 44.36,
    lng: 28.49,
    type: 'airbase',
  },
  {
    id: 11,
    name: 'Souda Bay',
    country: 'Greece',
    lat: 35.53,
    lng: 24.15,
    type: 'naval',
  },
  {
    id: 12,
    name: 'Camp Bondsteel',
    country: 'Kosovo',
    lat: 42.36,
    lng: 21.35,
    type: 'army',
  },
  {
    id: 13,
    name: 'Sigonella Naval Air Station',
    country: 'Italy',
    lat: 37.4,
    lng: 14.92,
    type: 'naval',
  },
  {
    id: 14,
    name: 'Anderson Air Force Base',
    country: 'Guam (US)',
    lat: 13.58,
    lng: 144.93,
    type: 'airbase',
  },
  {
    id: 15,
    name: 'Kadena Air Base',
    country: 'Japan (Okinawa)',
    lat: 26.36,
    lng: 127.77,
    type: 'airbase',
  },
]

export const carrierGroups: CarrierGroup[] = [
  {
    id: 1,
    name: 'CSG-12 (Atlantic Operations)',
    vessel: 'USS Gerald R. Ford (CVN-78)',
    lat: 38.5,
    lng: -25.0,
    status: 'Patrol',
  },
  {
    id: 2,
    name: 'CSG-7 (Mediterranean)',
    vessel: 'USS Harry S. Truman (CVN-75)',
    lat: 36.0,
    lng: 18.0,
    status: 'Forward Deployed',
  },
  {
    id: 3,
    name: 'CSG-5 (Western Pacific)',
    vessel: 'USS Ronald Reagan (CVN-76)',
    lat: 20.0,
    lng: 135.0,
    status: 'Forward Deployed',
  },
  {
    id: 4,
    name: 'CSG-1 (Indian Ocean)',
    vessel: 'USS Abraham Lincoln (CVN-72)',
    lat: 10.0,
    lng: 65.0,
    status: 'Strike Ready',
  },
  {
    id: 5,
    name: 'CSG-9 (South China Sea)',
    vessel: 'USS Theodore Roosevelt (CVN-71)',
    lat: 12.5,
    lng: 118.0,
    status: 'Freedom of Navigation',
  },
]
