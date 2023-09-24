import {Cities} from './cities.enum.js';
import {PlacesTypes} from './places-types.enum.js';
import {Conveniences} from './conveniences.enum.js';

export type MockServerData = {
  names: string[];
  descriptions: string[];
  previewImages: string[];
  placeImages: string[];
  cities: Cities[];
  placesTypes: PlacesTypes[];
  conveniences: Conveniences[];
  usernames: string[];
  emails: string[];
  avatars: string[];
  passwords: string[];
  userTypes: string[];
  coordinates: string[];
}
