export type City = {
  name: string;
  lat: number;
  lng: number;
  zoom: number;
};

export const CITIES: City[] = [
  {
    name: 'Paris',
    lat: 48.85341,
    lng: 2.3488,
    zoom: 11
  },
  {
    name: 'Cologne',
    lat: 50.9333,
    lng: 6.95,
    zoom: 11
  },
  {
    name: 'Brussels',
    lat: 50.85045,
    lng: 4.34878,
    zoom: 11
  },
  {
    name: 'Amsterdam',
    lat: 52.377956,
    lng: 4.897070,
    zoom: 11
  },
  {
    name: 'Hamburg',
    lat: 53.57532,
    lng: 10.01534,
    zoom: 11
  },
  {
    name: 'Dusseldorf',
    lat: 51.22172,
    lng: 6.77616,
    zoom: 11
  },
];
