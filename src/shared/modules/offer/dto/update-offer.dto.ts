import {Cities, Conveniences, Coordinates, PlacesTypes} from '../../../types/index.js';

export class UpdateOfferDto {
  public name?: string;
  public description?: string;
  public postDate?: string;
  public city?: Cities;
  public previewImage?: string;
  public placeImages?: string[];
  public isPremium?: boolean;
  public isFavorite?: boolean;
  public rating?: number;
  public type?: PlacesTypes;
  public roomsAmount?: number;
  public guestsAmount?: number;
  public price?: number;
  public conveniences?: Conveniences[];
  public authorId?: string;
  public location?: Coordinates;
}
