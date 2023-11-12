import {Cities, Conveniences, PlacesTypes} from '../../types';
import {UserDto} from '../user';
import {Coordinates} from '../../types';

export class OfferDto {
  public id!: string;

  public name!: string;

  public description!: string;

  public postDate!: string;

  public city!: Cities;

  public previewImage!: string;

  public placeImages!: string[];

  public isPremium!: boolean;

  public isFavorite!: boolean;

  public rating!: number;

  public type!: PlacesTypes;

  public roomsAmount!: number;

  public guestsAmount!: number;

  public price!: number;

  public conveniences!: Conveniences[];

  public author!: UserDto;

  public location!: Coordinates;
}
