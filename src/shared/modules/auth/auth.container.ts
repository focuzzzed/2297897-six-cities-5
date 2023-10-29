import {Container} from 'inversify';

import {ExceptionFilter} from '../../libs/rest/index.js';
import {Components} from '../../types/index.js';
import {AuthExceptionFilter} from './auth-exception-filter.js';
import {AuthService} from './auth-service.interface.js';
import {DefaultAuthService} from './default-auth.service.js';

export function createAuthContainer() {
  const authContainer = new Container();

  authContainer.bind<AuthService>(Components.AuthService).to(DefaultAuthService).inSingletonScope();
  authContainer.bind<ExceptionFilter>(Components.AuthExceptionFilter).to(AuthExceptionFilter).inSingletonScope();

  return authContainer;
}
