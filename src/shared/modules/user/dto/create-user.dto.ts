import {IsEmail, IsEnum, IsOptional, IsString, Length, MaxLength} from 'class-validator';

import {UserTypes} from '../../../types/index.js';
import {USER_CONSTANT_VALUES} from '../user.constant.js';
import {CreateUserValidationMessages} from './create-user.messages.js';

export class CreateUserDto {
  @IsString({message: CreateUserValidationMessages.Name.invalidFormat})
  @Length(USER_CONSTANT_VALUES.Name.minLength, USER_CONSTANT_VALUES.Name.maxLength, {message: CreateUserValidationMessages.Name.lengthField})
  public name: string;

  @IsEmail({}, {message: CreateUserValidationMessages.Email.invalidFormat})
  public email: string;

  @IsEnum(UserTypes, {message: CreateUserValidationMessages.Type.invalidFormat})
  public type: UserTypes;

  @MaxLength(USER_CONSTANT_VALUES.AvatarUrl.maxLength, {message: CreateUserValidationMessages.AvatarUrl.maxLength})
  @IsOptional()
  public avatarUrl?: string;

  @IsString({message: CreateUserValidationMessages.Password.invalidFormat})
  @Length(USER_CONSTANT_VALUES.Password.minLength, USER_CONSTANT_VALUES.Password.maxLength, {message: CreateUserValidationMessages.Password.lengthField})
  public password: string;
}
