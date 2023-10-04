import 'reflect-metadata';
import {Container} from 'inversify';
import {RestApplication} from './rest/index.js';
import {Logger, PinoLogger} from './shared/libs/logger/index.js';
import {RestConfig, Config, RestSchema} from './shared/libs/config/index.js';
import {Components} from './shared/types/index.js';
import {DatabaseClient, MongoDatabaseClient} from './shared/libs/database-client/index.js';

async function bootstrap(): Promise<void> {
  const container = new Container();

  container.bind<RestApplication>(Components.RestApplication).to(RestApplication).inSingletonScope();
  container.bind<Logger>(Components.Logger).to(PinoLogger).inSingletonScope();
  container.bind<Config<RestSchema>>(Components.Config).to(RestConfig).inSingletonScope();
  container.bind<DatabaseClient>(Components.DatabaseClient).to(MongoDatabaseClient).inSingletonScope();

  const application = container.get<RestApplication>(Components.RestApplication);
  await application.init();
}

bootstrap();
