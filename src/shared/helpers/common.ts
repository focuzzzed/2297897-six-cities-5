export function getRandomInt (min: number, max: number, numsAfterDigit = 0) {
  return Number((Math.random() * (max - min + 1) + min).toFixed(numsAfterDigit));
}

export function getRandomItem<T> (items: T[]) {
  return items[getRandomInt(0, items.length - 1)];
}

export function getRandomItems<T>(items: T[], amount = -1): T[] {
  let startPosition = getRandomInt(0, items.length - 1);
  let endPosition = startPosition + getRandomInt(startPosition, items.length);
  let randomItems = items.slice(startPosition, endPosition);

  if(amount !== -1) {
    while(randomItems.length < amount) {
      startPosition = getRandomInt(0, items.length - 1);
      endPosition = startPosition + getRandomInt(startPosition, items.length);
      randomItems = items.slice(startPosition, endPosition);
    }

    return randomItems;
  }

  return randomItems;
}
