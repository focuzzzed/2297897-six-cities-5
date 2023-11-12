import {defaultClasses, getModelForClass, modelOptions, prop, Ref, Severity} from '@typegoose/typegoose';

import {Cities, Conveniences, Coordinates, PlacesTypes} from '../../types/index.js';
import {UserEntity} from '../user/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  },
  options: {
    allowMixed: Severity.ALLOW
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({
    trim: true,
    required: true
  })
  public name!: string;

  @prop({
    trim: true,
    required: true
  })
  public description!: string;

  @prop({required: true})
  public postDate!: Date;

  @prop({
    type: String,
    enum: Cities,
    required: true
  })
  public city!: Cities;

  @prop({required: true})
  public previewImage!: string;

  @prop({
    required: true,
    default: []
  })
  public placeImages!: string[];

  @prop({required: true})
  public isPremium!: boolean;

  @prop({required: true})
  public isFavorite!: boolean;

  @prop({
    required: true,
    default: 0
  })
  public rating!: number;

  @prop({
    type: () => String,
    enum: PlacesTypes,
    required: true
  })
  public type!: PlacesTypes;

  @prop({required: true})
  public roomsAmount!: number;

  @prop({required: true})
  public guestsAmount!: number;

  @prop({required: true})
  public price!: number;

  @prop({
    type: () => String,
    enum: Conveniences,
    required: true,
    default: []
  })
  public conveniences!: Conveniences[];

  @prop({
    ref: UserEntity,
    required: true
  })
  public authorId!: Ref<UserEntity>;

  @prop({
    required: true
  })
  public location!: Coordinates;

  @prop({default: 0})
  public commentsCount!: number;
}

export const OfferModel = getModelForClass(OfferEntity);
