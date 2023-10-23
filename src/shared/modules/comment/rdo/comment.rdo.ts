import {Expose, Type} from 'class-transformer';

import {UserRdo} from '../../user/rdo/user.rdo.js';

export class CommentRdo {
  @Expose()
  public id: string;

  @Expose()
  public description: string;

  @Expose()
  public rating: number;

  @Expose({name: 'authorId'})
  @Type(() => UserRdo)
  public author: UserRdo;

  @Expose()
  public offerId: string;

  @Expose({name: 'createdAt'})
  public postDate: string;
}
