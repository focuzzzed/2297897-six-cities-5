import {Cities, Conveniences, PlacesTypes} from '../../../types/index.js';

export const CreateOfferValidationMessages = {
  Name: {
    lengthField: 'Min title length is 10, max is 100',
  },
  Description: {
    lengthField: 'Min description length is 20 chars, max is 1024',
  },
  PostDate: {
    invalidFormat: 'postDate must be a valid ISO8601 date'
  },
  City: {
    invalid: `City must be ${Object.values(Cities).join(' | ')}}`
  },
  PreviewImage: {
    maxLength: 'Too long for field «previewImage»'
  },
  PlaceImages: {
    invalidCount: 'Field «placeImages» must contain 6 images'
  },
  IsPremium: {
    invalidFormat: 'isPremium must be a boolean'
  },
  IsFavorite: {
    invalidFormat: 'isFavorite must be a boolean'
  },
  Rating: {
    invalidFormat: 'Rating must be an integer',
    minValue: 'Min rating is 1',
    maxValue: 'Max rating is 5'
  },
  Type: {
    invalid: `type must be ${Object.values(PlacesTypes).join(' | ')}`,
  },
  RoomsAmount: {
    invalidFormat: 'Rooms amount must be an integer',
    minValue: 'Min rooms is 1',
    maxValue: 'Max rooms is 10'
  },
  GuestsAmount: {
    invalidFormat: 'Guests amount must be an integer',
    minValue: 'Min quests is 1',
    maxValue: 'Max quests is 10'
  },
  Price: {
    invalidFormat: 'Price must be an integer',
    minValue: 'Min price is 100',
    maxValue: 'Max price is 100000'
  },
  Conveniences:{
    invalid: `Conveniences must be ${Object.values(Conveniences).join(' | ')}`
  },
  Location: {
    invalidFormat: 'Location must be in: {latitude: number, longitude: number}'
  },
  AuthorId: {
    invalidFormat: 'authorId must be a valid id'
  }
} as const;
