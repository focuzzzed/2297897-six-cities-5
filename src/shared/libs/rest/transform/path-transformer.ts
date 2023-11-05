import {inject, injectable} from 'inversify';

import {STATIC_ROUTES} from '../../../../rest/index.js';
import {getFullServerPath} from '../../../helpers/index.js';
import {Components} from '../../../types/index.js';
import {Config, RestSchema} from '../../config/index.js';
import {Logger} from '../../logger/index.js';
import {DEFAULT_STATIC_IMAGES, STATIC_RESOURCE_FIELDS} from './path-transformer.constant.js';


function isObject (value: unknown): value is Record<string, object> {
  return (typeof value === 'object' && value !== null);
}


@injectable()
export class PathTransformer {
  constructor(
    @inject(Components.Logger) private readonly logger: Logger,
    @inject(Components.Config) private readonly config: Config<RestSchema>,
  ) {
    this.logger.info('Path transformer initialized!');
  }

  private hasDefaultImage(value: string) {
    return DEFAULT_STATIC_IMAGES.includes(value);
  }

  private isStaticProperty(property: string) {
    return STATIC_RESOURCE_FIELDS.includes(property);
  }

  public execute(data: Record<string, unknown>): Record<string, unknown>{
    const stack = [data];
    while (stack.length > 0) {
      const current = stack.pop();

      for (const key in current) {
        if (Object.hasOwn(current, key)) {
          const value = current[key];

          if (isObject(value)) {
            stack.push(value);
            continue;
          }

          if (this.isStaticProperty(key) && typeof value === 'string') {
            const staticPath = STATIC_ROUTES.FILES;
            const uploadPath = STATIC_ROUTES.UPLOAD;

            const serverProtocol = this.config.get('PROTOCOL');
            const serverHost = this.config.get('HOST');
            const serverPort = this.config.get('PORT');

            const rootPath = this.hasDefaultImage(value) ? staticPath : uploadPath;
            current[key] = `${getFullServerPath(serverProtocol, serverHost, serverPort)}${rootPath}/${value}`;
          }
        }
      }
    }
    return data;
  }
}
