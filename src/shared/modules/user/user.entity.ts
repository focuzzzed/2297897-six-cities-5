import {defaultClasses, getModelForClass, modelOptions, prop, Ref} from '@typegoose/typegoose';

import {createSHA} from '../../helpers/hash.js';
import {User, UserTypes} from '../../types/index.js';
import {OfferEntity} from '../offer/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users',
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({
    required: true,
    minlength: [1, 'Minimal name length is 1'],
    default: ''
  })
  public name!: string;

  @prop({
    required: true,
    unique: true,
    default: ''
  })
  public email!: string;

  @prop({
    required: false,
    default: ''
  })
  public avatarUrl?: string;

  @prop({
    required: true,
    default: ''
  })
  private password?: string;

  @prop({
    required: true,
    default: ''
  })
  public type!: UserTypes;

  @prop({
    ref: 'OfferEntity',
    default: [],
    required: true
  })
  public favoriteOffers: Ref<OfferEntity>[];

  constructor(userData: User) {
    super();

    this.name = userData.name;
    this.email = userData.email;
    this.type = userData.type;
    this.avatarUrl = userData.avatarUrl;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA(password, salt);
  }

  public verifyPassword(password: string, salt: string) {
    const hashPassword = createSHA(password, salt);
    return hashPassword === this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
