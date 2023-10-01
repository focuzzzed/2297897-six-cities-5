import 'reflect-metadata';
import {Container} from 'inversify';
import {RestApplication} from './rest/index.js';
import {Logger, PinoLogger} from './shared/libs/logger/index.js';
import {RestConfig, Config, RestSchema} from './shared/libs/config/index.js';
import {Components} from './shared/types/index.js';

async function bootstrap(): Promise<void> {
  const container = new Container();
  container.bind<RestApplication>(Components.RestApplication).to(RestApplication);
  container.bind<Logger>(Components.Logger).to(PinoLogger);
  container.bind<Config<RestSchema>>(Components.Config).to(RestConfig);

  const application = container.get<RestApplication>(Components.RestApplication);
  await application.init();
}

bootstrap();
