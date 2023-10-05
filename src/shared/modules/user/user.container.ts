import {Container} from 'inversify';
import {UserService} from './user-service.interface.js';
import {Components} from '../../types/index.js';
import {DefaultUserService} from './default-user.service.js';
import {types} from '@typegoose/typegoose';
import {UserEntity, UserModel} from './user.entity.js';

export function createUserContainer() {
  const userContainer = new Container();

  userContainer.bind<UserService>(Components.UserService).to(DefaultUserService).inSingletonScope();
  userContainer.bind<types.ModelType<UserEntity>>(Components.UserModel).toConstantValue(UserModel);

  return userContainer;
}
