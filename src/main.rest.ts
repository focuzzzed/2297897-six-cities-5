import 'reflect-metadata';

import {Container} from 'inversify';

import {createRestApplicationContainer, RestApplication} from './rest/index.js';
import {createCommentContainer} from './shared/modules/comment/index.js';
import {createOfferContainer} from './shared/modules/offer/index.js';
import {createUserContainer} from './shared/modules/user/index.js';
import {Components} from './shared/types/index.js';

async function bootstrap(): Promise<void> {
  const appContainer = Container.merge(
    createRestApplicationContainer(),
    createUserContainer(),
    createOfferContainer(),
    createCommentContainer()
  );

  const application = appContainer.get<RestApplication>(Components.RestApplication);
  await application.init();
}

bootstrap();
