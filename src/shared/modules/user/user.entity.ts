import {User, UserTypes} from '../../types/index.js';
import {defaultClasses, getModelForClass, modelOptions, prop} from '@typegoose/typegoose';
import {createSHA} from '../../helpers/hash.js';

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
    minlength: [2, 'Minimal name length is 2'],
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

  public getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
