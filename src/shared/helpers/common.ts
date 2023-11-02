import {ClassConstructor, plainToInstance} from 'class-transformer';
import {ValidationError} from 'class-validator';

import {ValidationErrorField} from '../libs/rest/index.js';

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

export function createErrorObject(message: string) {
  return {
    error: message
  };
}

export function reduceValidationErrors(errors: ValidationError[]): ValidationErrorField[] {
  return errors.map(({property, value, constraints}) => ({
    property,
    value,
    messages: constraints ? Object.values(constraints) : []
  }));
}
