import {ClassConstructor, plainToInstance} from 'class-transformer';
import {ValidationError} from 'class-validator';
import {StatusCodes} from 'http-status-codes';

import {ApplicationErrors, HttpError, ValidationErrorField} from '../libs/rest/index.js';
import {TokenPayload} from '../modules/auth/index.js';
import {Cities} from '../types/index.js';

export function generateRandomValue (min: number, max: number, numsAfterDigit = 0) {
  return Number((Math.random() * (max - min) + min).toFixed(numsAfterDigit));
}

export function getRandomItem<T> (items: T[]) {
  return items[generateRandomValue(0, items.length - 1)];
}

export function getRandomItems<T>(items: T[], amount = -1): T[] {
  let startPosition = generateRandomValue(0, items.length - 1);
  let endPosition = startPosition + generateRandomValue(startPosition, items.length);
  let randomItems = items.slice(startPosition, endPosition);

  if(amount !== -1) {
    while(randomItems.length < amount) {
      startPosition = generateRandomValue(0, items.length - 1);
      endPosition = startPosition + generateRandomValue(startPosition, items.length);
      randomItems = items.slice(startPosition, endPosition);
    }

    return randomItems;
  }

  return randomItems;
}

export function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : '';
}

export function fillDTO<T, V>(someRto: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(someRto, plainObject, {excludeExtraneousValues: true});
}

export function createErrorObject(errorType: ApplicationErrors, error: string, details: ValidationErrorField[] = []) {
  return {errorType, error, details};
}

export function reduceValidationErrors(errors: ValidationError[]): ValidationErrorField[] {
  return errors.map(({property, value, constraints}) => ({
    property,
    value,
    messages: constraints ? Object.values(constraints) : []
  }));
}

export function getFullServerPath(protocol: string, host: string, port: string): string {
  return `${protocol}://${host}:${port}`;
}

export function isTokenPayload(payload: unknown): payload is TokenPayload {
  return (
    (typeof payload === 'object' && payload !== null) &&
    ('email' in payload && typeof payload.email === 'string') &&
    ('name' in payload && typeof payload.name === 'string') &&
    ('id' in payload && typeof payload.id === 'string')
  );
}

export function isCity(value: unknown): asserts value is Cities {
  if (value === null || value === undefined || typeof value !== 'string' || !(value in Cities)) {
    throw new HttpError(
      StatusCodes.BAD_REQUEST,
      `${value} is not correct city`);
  }
}

export function getRandomBoolean(percentOfTrue: number): boolean {
  return Math.random() < percentOfTrue;
}

export function getBooleanFromString(value: string): boolean {
  return Boolean(value === 'true');
}

export function isExternalLink(link: string): boolean {
  return link.startsWith('http://') || link.startsWith('https://');
}
