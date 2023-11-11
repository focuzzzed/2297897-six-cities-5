import {UserType} from '../../const';


export class CreateUserDto {
  public name!: string;

  public email!: string;

  public type!: UserType;

  public avatarUrl?: string;

  public password!: string;

  public favoriteOffers!: [];
}
