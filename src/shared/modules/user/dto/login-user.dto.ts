import {IsEmail, IsString,} from 'class-validator';

import {LOGIN_USER_VALIDATION_MESSAGES} from './login-user.messages.js';

export class LoginUserDto {
  @IsEmail({}, {message: LOGIN_USER_VALIDATION_MESSAGES.Email.invalidFormat})
  public email: string;

  @IsString({message: LOGIN_USER_VALIDATION_MESSAGES.Password.invalidFormat})
  public password: string;
}
