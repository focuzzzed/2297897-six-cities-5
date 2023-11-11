import {UserDto} from '../user';

export class CommentDto {
  public id!: string;

  public description!: string;

  public rating!: number;

  public author!: UserDto;

  public offerId!: string;

  public postDate!: string;
}
