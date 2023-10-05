import {UserTypes} from '../../../types/index.js';

export class CreateUserDto {
  public name: string;
  public email: string;
  public avatarUrl: string;
  public type: UserTypes;
  public password: string;
}
