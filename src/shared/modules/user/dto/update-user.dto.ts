import {UserTypes} from '../../../types/index.js';

export class UpdateUserDto {
  public name?: string;
  public email?: string;
  public avatarUrl?: string;
  public type?: UserTypes;
  public password?: string;
}
