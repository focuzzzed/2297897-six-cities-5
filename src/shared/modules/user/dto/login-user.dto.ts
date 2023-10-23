import {IsEmail, IsString,} from 'class-validator';

import {LoginUserValidationMessage} from './login-user.messages.js';

export class LoginUserDto {
  @IsEmail({}, {message: LoginUserValidationMessage.email.invalidFormat})
  public email: string;

  @IsString({message: LoginUserValidationMessage.password.invalidFormat})
  public password: string;
}
