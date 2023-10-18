import {config} from 'dotenv';
import {inject, injectable} from 'inversify';

import {Components} from '../../types/index.js';
import {Logger} from '../logger/index.js';
import {Config} from './config.interface.js';
import {configRestSchema, RestSchema} from './rest.schema.js';

@injectable()
export class RestConfig implements Config<RestSchema> {
  private readonly config: RestSchema;

  constructor(
    @inject(Components.Logger) private readonly logger: Logger
  ) {
    const parsedOutput = config();

    if(parsedOutput.error){
      throw new Error('Can\'t parse .env file. Perhaps the file doesn\'t exists');
    }

    configRestSchema.load({});
    configRestSchema.validate({allowed: 'strict', output: this.logger.info});


    this.config = configRestSchema.getProperties();
    this.logger.info('.env found and successfully parsed!');
  }

  public get<T extends keyof RestSchema>(key: T): RestSchema[T] {
    return this.config[key];
  }
}
