import {inject, injectable} from 'inversify';

import {STATIC_ROUTES} from '../../../../rest/index.js';
import {getFullServerPath, isExternalLink} from '../../../helpers/index.js';
import {Components} from '../../../types/index.js';
import {Config, RestSchema} from '../../config/index.js';
import {Logger} from '../../logger/index.js';
import {DEFAULT_STATIC_IMAGES, STATIC_RESOURCE_FIELDS} from './path-transformer.constant.js';


function isObject (value: unknown): value is Record<string, object> {
  return (typeof value === 'object' && value !== null && !Array.isArray(value));
}


@injectable()
export class PathTransformer {
  private readonly serverProtocol: string;
  private readonly serverHost: string;
  private readonly serverPort: string;

  constructor(
    @inject(Components.Logger) private readonly logger: Logger,
    @inject(Components.Config) private readonly config: Config<RestSchema>,
  ) {
    this.serverProtocol = this.config.get('PROTOCOL');
    this.serverHost = this.config.get('HOST');
    this.serverPort = this.config.get('PORT');

    this.logger.info('Path transformer initialized!');
  }

  private hasDefaultImage(value: string) {
    return DEFAULT_STATIC_IMAGES.includes(value);
  }

  private isStaticProperty(property: string) {
    return STATIC_RESOURCE_FIELDS.includes(property);
  }

  private transform(value: string) {
    const rootPath = this.hasDefaultImage(value) ? STATIC_ROUTES.FILES : STATIC_ROUTES.UPLOAD;
    return `${getFullServerPath(this.serverProtocol, this.serverHost, this.serverPort)}${rootPath}/${value}`;
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

          if (this.isStaticProperty(key)) {
            if (typeof value === 'string' && !isExternalLink(value)){
              current[key] = this.transform(value);
            }

            if (Array.isArray(value)) {
              current[key] = value.map(
                (currentImage) => typeof currentImage === 'string' && !isExternalLink(currentImage)
                  ? this.transform(currentImage)
                  : currentImage
              );
            }
          }
        }
      }
    }
    return data;
  }
}
