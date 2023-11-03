import {NextFunction, Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import {inject, injectable} from 'inversify';
import {Error} from 'mongoose';

import {createErrorObject} from '../../../helpers/index.js';
import {Components} from '../../../types/index.js';
import {Logger} from '../../logger/index.js';
import {ApplicationErrors} from '../types/index.js';
import {ExceptionFilter} from './exception-filter.interface.js';

@injectable()
export class AppExceptionFilter implements ExceptionFilter {
  constructor(
    @inject(Components.Logger) private readonly logger: Logger,
  ) {
    this.logger.info('Init AppExceptionFilter');
  }

  public catch(error: Error, _req: Request, res: Response, _next: NextFunction) {
    this.logger.error(error, error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(createErrorObject(ApplicationErrors.ServiceError, error.message));
  }
}
