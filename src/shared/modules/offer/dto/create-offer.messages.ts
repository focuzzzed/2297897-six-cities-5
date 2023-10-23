import {Cities, Conveniences, PlacesTypes} from '../../../types/index.js';

export const CreateOfferValidationMessage = {
  name: {
    lengthField: 'Min title length is 10, max is 100',
  },
  description: {
    lengthField: 'Min description length is 20 chars, max is 1024',
  },
  postDate: {
    invalidFormat: 'postDate must be a valid ISO8601 date'
  },
  city: {
    invalid: `City must be ${Object.values(Cities).join(' | ')}}`
  },
  previewImage: {
    maxLength: 'Too long for field «previewImage»'
  },
  placeImages: {
    invalidCount: 'Field «placeImages» must contain 6 images'
  },
  isPremium: {
    invalidFormat: 'isPremium must be a boolean'
  },
  isFavorite: {
    invalidFormat: 'isFavorite must be a boolean'
  },
  rating: {
    invalidFormat: 'Rating must be an integer',
    minValue: 'Min rating is 1',
    maxValue: 'Max rating is 5'
  },
  type: {
    invalid: `type must be ${Object.values(PlacesTypes).join(' | ')}`,
  },
  roomsAmount: {
    invalidFormat: 'Rooms amount must be an integer',
    minValue: 'Min rooms is 1',
    maxValue: 'Max rooms is 10'
  },
  guestsAmount: {
    invalidFormat: 'Guests amount must be an integer',
    minValue: 'Min quests is 1',
    maxValue: 'Max quests is 10'
  },
  price: {
    invalidFormat: 'Price must be an integer',
    minValue: 'Min price is 100',
    maxValue: 'Max price is 100000'
  },
  conveniences:{
    invalid: `Conveniences must be ${Object.values(Conveniences).join(' | ')}`
  },
  location: {
    invalidFormat: 'Location must be in: {latitude: number, longitude: number}'
  },
  authorId: {
    invalidFormat: 'authorId must be a valid id'
  }
} as const;
