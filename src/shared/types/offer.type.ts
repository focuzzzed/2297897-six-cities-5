import {Cities} from './cities.enum.js';
import {Conveniences} from './conveniences.enum.js';
import {Coordinates} from './coordinates.type.js';
import {PlacesTypes} from './places-types.enum.js';
import {User} from './user.type.js';

export type Offer = {
  name: string;
  description: string;
  postDate: string;
  city: Cities;
  previewImage: string;
  placeImages: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  type: PlacesTypes;
  roomsAmount: number;
  guestsAmount: number;
  price: number;
  conveniences: Conveniences[];
  author: User;
  location: Coordinates;
};
