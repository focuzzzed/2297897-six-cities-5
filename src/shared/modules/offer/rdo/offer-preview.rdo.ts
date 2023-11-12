import {Expose} from 'class-transformer';

import {Cities, Coordinates, PlacesTypes} from '../../../types/index.js';

export class OfferPreviewRdo {
  @Expose()
  public id: string;

  @Expose()
  public name: string;

  @Expose()
  public postDate: string;

  @Expose()
  public city: Cities;

  @Expose()
  public previewImage: string;

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
  public price: number;

  @Expose()
  public location: Coordinates;
}
