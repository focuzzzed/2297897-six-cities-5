import {Expose, Type} from 'class-transformer';

import {Cities, Conveniences, Coordinates, PlacesTypes} from '../../../types/index.js';
import {UserRdo} from '../../user/rdo/user.rdo.js';

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
  public commentsCount: number;

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

  @Expose({name: 'authorId'})
  @Type(() => UserRdo)
  public author: UserRdo;

  @Expose()
  public location: Coordinates;
}
