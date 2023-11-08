export enum Cities {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf',
}

export type Coordinates = {latitude: number, longitude: number};

export function isCity(value: unknown): asserts value is Cities {
  if (value === null || value === undefined || typeof value !== 'string' || !(value in Cities)) {
    throw new Error(`${value} is not available city`);
  }
}
