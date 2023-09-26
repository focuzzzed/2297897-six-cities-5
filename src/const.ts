import {Cities} from './shared/types/index.js';

export const CITIES_COORDINATES = { //На дальнейшую реализацию
  [Cities.Paris]: {latitude: 48.85661, longitude: 2.351499},
  [Cities.Cologne]: {latitude: 50.938361, longitude: 6.959974},
  [Cities.Brussels]: {latitude: 50.846557, longitude: 4.351697},
  [Cities.Amsterdam]: {latitude: 52.370216, longitude: 4.895168},
  [Cities.Hamburg]: {latitude: 53.550341, longitude: 10.000654},
  [Cities.Dusseldorf]: {latitude: 51.225402, longitude: 6.776314},
} as const;
