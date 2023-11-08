export const DEFAULT_OFFER_COUNT = 60;

export const PREMIUM_OFFERS_COUNT = 3;

export const OFFER_CONSTANT_VALUES = {
  Name: {
    minLength: 10,
    maxLength: 100,
  },
  Description: {
    minLength: 20,
    maxLength: 1024,
  },
  PreviewImage: {
    maxLength: 256,
  },
  PlaceImages: {
    imagesCount: 6,
  },
  Rating: {
    minValue: 1,
    maxValue: 5,
  },
  RoomsAmount: {
    minValue: 1,
    maxValue: 8,
  },
  GuestsAmount: {
    minValue: 1,
    maxValue: 10,
  },
  Price: {
    minValue: 100,
    maxValue: 100000,
  }
} as const;
