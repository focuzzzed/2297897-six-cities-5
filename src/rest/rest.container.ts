import {Container} from 'inversify';
import {RestApplication} from './rest.application.js';
import {Components} from '../shared/types/index.js';
import {Logger, PinoLogger} from '../shared/libs/logger/index.js';
import {Config, RestConfig, RestSchema} from '../shared/libs/config/index.js';
import {DatabaseClient, MongoDatabaseClient} from '../shared/libs/database-client/index.js';

export function createRestApplicationContainer() {
  const restApplicationContainer = new Container();

  restApplicationContainer.bind<RestApplication>(Components.RestApplication).to(RestApplication).inSingletonScope();
  restApplicationContainer.bind<Logger>(Components.Logger).to(PinoLogger).inSingletonScope();
  restApplicationContainer.bind<Config<RestSchema>>(Components.Config).to(RestConfig).inSingletonScope();
  restApplicationContainer.bind<DatabaseClient>(Components.DatabaseClient).to(MongoDatabaseClient).inSingletonScope();

  return restApplicationContainer;
}
