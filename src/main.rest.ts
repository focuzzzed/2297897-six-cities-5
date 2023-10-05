import 'reflect-metadata';
import {Container} from 'inversify';
import {createRestApplicationContainer, RestApplication} from './rest/index.js';
import {Components} from './shared/types/index.js';
import {createUserContainer} from './shared/modules/user/index.js';

async function bootstrap(): Promise<void> {
  const appContainer = Container.merge(
    createRestApplicationContainer(),
    createUserContainer()
  );

  const application = appContainer.get<RestApplication>(Components.RestApplication);
  await application.init();
}

bootstrap();
