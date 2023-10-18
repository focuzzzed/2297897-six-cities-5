import {UserTypes} from '../../../types/index.js';
import {Expose} from 'class-transformer';

export class UserRdo {
  @Expose()
  public name: string;

  @Expose()
  public email: string;

  @Expose()
  public avatarUrl?: string;

  @Expose()
  public type: UserTypes;
}
