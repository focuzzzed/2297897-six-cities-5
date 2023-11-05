import {Container} from 'inversify';

import {Config, RestConfig, RestSchema} from '../shared/libs/config/index.js';
import {DatabaseClient, MongoDatabaseClient} from '../shared/libs/database-client/index.js';
import {Logger, PinoLogger} from '../shared/libs/logger/index.js';
import {
  AppExceptionFilter,
  ExceptionFilter,
  HttpExceptionFilter,
  ValidationExceptionFilter
} from '../shared/libs/rest/index.js';
import {PathTransformer} from '../shared/libs/rest/transform/path-transformer.js';
import {Components} from '../shared/types/index.js';
import {RestApplication} from './rest.application.js';

export function createRestApplicationContainer() {
  const restApplicationContainer = new Container();

  restApplicationContainer.bind<RestApplication>(Components.RestApplication).to(RestApplication).inSingletonScope();
  restApplicationContainer.bind<Logger>(Components.Logger).to(PinoLogger).inSingletonScope();
  restApplicationContainer.bind<Config<RestSchema>>(Components.Config).to(RestConfig).inSingletonScope();
  restApplicationContainer.bind<DatabaseClient>(Components.DatabaseClient).to(MongoDatabaseClient).inSingletonScope();
  restApplicationContainer.bind<ExceptionFilter>(Components.ExceptionFilter).to(AppExceptionFilter).inSingletonScope();
  restApplicationContainer.bind<ExceptionFilter>(Components.HttpExceptionFilter).to(HttpExceptionFilter).inSingletonScope();
  restApplicationContainer.bind<ExceptionFilter>(Components.ValidationExceptionFilter).to(ValidationExceptionFilter).inSingletonScope();
  restApplicationContainer.bind<PathTransformer>(Components.PathTransformer).to(PathTransformer).inSingletonScope();

  return restApplicationContainer;
}
