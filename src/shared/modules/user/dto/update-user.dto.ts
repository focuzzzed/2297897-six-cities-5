import {IsEmail, IsEnum, IsOptional, IsString, Length, MaxLength} from 'class-validator';

import {UserTypes} from '../../../types/index.js';
import {CreateUserValidationMessage} from './create-user.messages.js';

export class UpdateUserDto {
  @IsOptional()
  @IsString({message: CreateUserValidationMessage.name.invalidFormat})
  @Length(1, 15, {message: CreateUserValidationMessage.name.lengthField})
  public name: string;

  @IsOptional()
  @IsEmail({}, {message: CreateUserValidationMessage.email.invalidFormat})
  public email: string;

  @MaxLength(256, {message: CreateUserValidationMessage.avatarUrl.maxLength})
  @IsOptional()
  public avatarUrl?: string;

  @IsOptional()
  @IsEnum(UserTypes, {message: CreateUserValidationMessage.type.invalidFormat})
  public type: UserTypes;

  @IsOptional()
  @IsString({message: CreateUserValidationMessage.password.invalidFormat})
  @Length(6, 12, {message: CreateUserValidationMessage.password.lengthField})
  public password: string;
}
