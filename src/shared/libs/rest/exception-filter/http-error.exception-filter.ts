import {NextFunction, Request, Response} from 'express';
import {inject, injectable} from 'inversify';
import {Error} from 'mongoose';

import {createErrorObject} from '../../../helpers/index.js';
import {Components} from '../../../types/index.js';
import {Logger} from '../../logger/index.js';
import {HttpError} from '../errors/index.js';
import {ApplicationErrors} from '../types/index.js';
import {ExceptionFilter} from './exception-filter.interface.js';

@injectable()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    @inject(Components.Logger) private readonly logger: Logger,
  ) {
    this.logger.info('Init HttpErrorExceptionFilter');
  }

  public catch(error: Error, req: Request, res: Response, next: NextFunction) {
    if(!(error instanceof HttpError)) {
      return next(error);
    }

    this.logger.error(error, `[HttpErrorException]: ${req.path} # ${error.message}`);

    res
      .status(error.httpStatusCode)
      .json(createErrorObject(ApplicationErrors.CommonError, error.message));
  }
}
