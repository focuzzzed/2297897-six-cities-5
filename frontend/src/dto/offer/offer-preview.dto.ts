import {Cities, PlacesTypes} from '../../types';
import {Coordinates} from '../../types';

export class OfferPreviewDto {
  public id!: string;

  public name!: string;

  public postDate!: string;

  public city!: Cities;

  public previewImage!: string;

  public isPremium!: boolean;

  public isFavorite!: boolean;

  public rating!: number;

  public type!: PlacesTypes;

  public price!: number;

  public location!: Coordinates;
}
