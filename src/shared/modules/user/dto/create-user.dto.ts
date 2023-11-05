import {IsArray, IsEmail, IsEnum, IsString, Length} from 'class-validator';

import {UserTypes} from '../../../types/index.js';
import {USER_CONSTANT_VALUES} from '../user.constant.js';
import {CREATE_USER_VALIDATION_MESSAGES} from './create-user.messages.js';

export class CreateUserDto {
  @IsString({message: CREATE_USER_VALIDATION_MESSAGES.Name.invalidFormat})
  @Length(USER_CONSTANT_VALUES.Name.minLength, USER_CONSTANT_VALUES.Name.maxLength, {message: CREATE_USER_VALIDATION_MESSAGES.Name.lengthField})
  public name: string;

  @IsEmail({}, {message: CREATE_USER_VALIDATION_MESSAGES.Email.invalidFormat})
  public email: string;

  @IsEnum(UserTypes, {message: CREATE_USER_VALIDATION_MESSAGES.Type.invalidFormat})
  public type: UserTypes;

  @IsString({message: CREATE_USER_VALIDATION_MESSAGES.Password.invalidFormat})
  @Length(USER_CONSTANT_VALUES.Password.minLength, USER_CONSTANT_VALUES.Password.maxLength, {message: CREATE_USER_VALIDATION_MESSAGES.Password.lengthField})
  public password: string;

  @IsArray({message: CREATE_USER_VALIDATION_MESSAGES.FavoriteOffers.invalidFormat})
  public favoriteOffers: [];
}
