import {IsEmail, IsString,} from 'class-validator';

import {LoginUserValidationMessages} from './login-user.messages.js';

export class LoginUserDto {
  @IsEmail({}, {message: LoginUserValidationMessages.Email.invalidFormat})
  public email: string;

  @IsString({message: LoginUserValidationMessages.Password.invalidFormat})
  public password: string;
}
