import {ExceptionFilter} from './exception-filter.interface.js';
import {inject, injectable} from 'inversify';
import {Components} from '../../../types/index.js';
import {Logger} from '../../logger/index.js';
import {Error} from 'mongoose';
import {NextFunction, Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import {HttpError} from '../errors/index.js';
import {createErrorObject} from '../../../helpers/index.js';

@injectable()
export class DefaultExceptionFilter implements ExceptionFilter {
  constructor(
    @inject(Components.Logger) private readonly logger: Logger,
  ) {
    this.logger.info('Init DefaultExceptionFilter');
  }

  public handleHttpError(error: HttpError, _req: Request, res: Response, _next: NextFunction) {
    this.logger.error(error, `[${error.detail}]: ${error.httpStatusCode} - ${error.message}`);
    res
      .status(error.httpStatusCode)
      .json(createErrorObject(error.message));
  }

  public handleOtherError(error: Error, _req: Request, res: Response, _next: NextFunction) {
    this.logger.error(error, error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(createErrorObject(error.message));
  }

  public catch(error: Error, req: Request, res: Response, next: NextFunction) {
    if(error instanceof HttpError) {
      return this.handleHttpError(error, req, res, next);
    }

    this.handleOtherError(error, req, res, next);
  }
}
