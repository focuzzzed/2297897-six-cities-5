import {IsArray, IsEmail, IsEnum, IsOptional, IsString, Length, MaxLength} from 'class-validator';

import {UserTypes} from '../../../types/index.js';
import {USER_CONSTANT_VALUES} from '../user.constant.js';
import {CreateUserValidationMessages} from './create-user.messages.js';

export class UpdateUserDto {
  @IsOptional()
  @IsString({message: CreateUserValidationMessages.Name.invalidFormat})
  @Length(USER_CONSTANT_VALUES.Name.minLength, USER_CONSTANT_VALUES.Name.maxLength, {message: CreateUserValidationMessages.Name.lengthField})
  public name?: string;

  @IsOptional()
  @IsEmail({}, {message: CreateUserValidationMessages.Email.invalidFormat})
  public email?: string;

  @MaxLength(USER_CONSTANT_VALUES.AvatarUrl.maxLength, {message: CreateUserValidationMessages.AvatarUrl.maxLength})
  @IsOptional()
  public avatarUrl?: string;

  @IsOptional()
  @IsEnum(UserTypes, {message: CreateUserValidationMessages.Type.invalidFormat})
  public type?: UserTypes;

  @IsOptional()
  @IsString({message: CreateUserValidationMessages.Password.invalidFormat})
  @Length(USER_CONSTANT_VALUES.Password.minLength, USER_CONSTANT_VALUES.Password.maxLength, {message: CreateUserValidationMessages.Password.lengthField})
  public password?: string;

  @IsOptional()
  @IsArray({message: CreateUserValidationMessages.FavoriteOffers.invalidFormat})
  public favoriteOffers?: string[];
}
