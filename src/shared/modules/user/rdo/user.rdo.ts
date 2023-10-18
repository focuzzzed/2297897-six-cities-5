import {Expose} from 'class-transformer';

import {UserTypes} from '../../../types/index.js';

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
