import {Logger} from '../shared/libs/logger/index.js';
import {Config, RestSchema} from '../shared/libs/config/index.js';
import {inject, injectable} from 'inversify';
import {Components} from '../shared/types/index.js';

@injectable()
export class RestApplication {
  constructor(
    @inject(Components.Logger) private readonly logger: Logger,
    @inject(Components.Config) private readonly config: Config<RestSchema>,
  ) {}

  public async init(): Promise<void> {
    this.logger.info('Application Initialization');
    this.logger.info(`Get value from env $PORT: ${this.config.get('SALT')}`);
  }
}
