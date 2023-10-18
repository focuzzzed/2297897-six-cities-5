import {types} from '@typegoose/typegoose';
import {Container} from 'inversify';

import {Controller} from '../../libs/rest/index.js';
import {Components} from '../../types/index.js';
import {DefaultUserService} from './default-user.service.js';
import {UserController} from './user.controller.js';
import {UserEntity, UserModel} from './user.entity.js';
import {UserService} from './user-service.interface.js';

export function createUserContainer() {
  const userContainer = new Container();

  userContainer.bind<UserService>(Components.UserService).to(DefaultUserService).inSingletonScope();
  userContainer.bind<types.ModelType<UserEntity>>(Components.UserModel).toConstantValue(UserModel);
  userContainer.bind<Controller>(Components.UserController).to(UserController).inSingletonScope();

  return userContainer;
}
