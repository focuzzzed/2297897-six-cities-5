import {Cities, Conveniences, PlacesTypes} from '../../types';
import {Coordinates} from '../../types';

export class CreateOfferDto {
  public name!: string;

  public description!: string;

  public postDate!: string;

  public city!: Cities;

  public previewImage!: string;

  public placeImages!: string[];

  public isPremium!: boolean;

  public isFavorite!: boolean;

  public type!: PlacesTypes;

  public roomsAmount!: number;

  public guestsAmount!: number;

  public price!: number;

  public conveniences!: Conveniences[];

  public location!: Coordinates;

  public authorId?: string;
}
