import {NextFunction, Request, Response} from 'express';
import {inject, injectable} from 'inversify';

import {Logger} from '../../libs/logger/index.js';
import {ExceptionFilter} from '../../libs/rest/index.js';
import {Components} from '../../types/index.js';
import {BaseAuthException} from './errors/index.js';

@injectable()
export class AuthExceptionFilter implements ExceptionFilter {
  constructor(
    @inject(Components.Logger) private readonly logger: Logger,
  ) {
    this.logger.info('Init AuthExceptionFilter');
  }

  public catch(error: unknown, _req: Request, res: Response, next: NextFunction) {
    if(!(error instanceof BaseAuthException)) {
      return next(error);
    }

    this.logger.error(error, `[AuthModule] ${error.message}`);
    res
      .status(error.httpStatusCode)
      .json({
        type: 'AUTHORIZATION',
        error: error.message
      });
  }
}
