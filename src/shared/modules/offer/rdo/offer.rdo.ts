import {Cities, Conveniences, Coordinates, PlacesTypes, User} from '../../../types/index.js';
import {Expose} from 'class-transformer';

export class OfferRdo {
  @Expose()
  public id: string;

  @Expose()
  public name: string;

  @Expose()
  public description: string;

  @Expose()
  public postDate: string;

  @Expose()
  public city: Cities;

  @Expose()
  public previewImage: string;

  @Expose()
  public placeImages: string[];

  @Expose()
  public isPremium: boolean;

  @Expose()
  public isFavorite: boolean;

  @Expose()
  public rating: number;

  @Expose()
  public type: PlacesTypes;

  @Expose()
  public roomsAmount: number;

  @Expose()
  public guestsAmount: number;

  @Expose()
  public price: number;

  @Expose()
  public conveniences: Conveniences[];

  @Expose()
  public author: User;

  @Expose()
  public location: Coordinates;
}
