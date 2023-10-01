import {Logger} from '../shared/libs/logger/index.js';
import {Config, RestSchema} from '../shared/libs/config/index.js';

export class RestApplication {
  constructor(
    private readonly logger: Logger,
    private readonly config: Config<RestSchema>,
  ) {}

  public async init(): Promise<void> {
    this.logger.info('Application Initialization');
    this.logger.info(`Get value from env $PORT: ${this.config.get('SALT')}`);
  }
}
