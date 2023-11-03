import {NextFunction, Request, Response} from 'express';
import {inject, injectable} from 'inversify';

import {createErrorObject} from '../../../helpers/index.js';
import {Components} from '../../../types/index.js';
import {Logger} from '../../logger/index.js';
import {ValidationError} from '../errors/index.js';
import {ApplicationErrors} from '../types/index.js';

@injectable()
export class ValidationExceptionFilter {
  constructor(
    @inject(Components.Logger) private readonly logger: Logger,
  ) {
    this.logger.info('Init ValidationExceptionFilter');
  }

  public catch(error: unknown, _req: Request, res: Response, next: NextFunction) {
    if(!(error instanceof ValidationError)) {
      return next(error);
    }

    this.logger.error(error, `[ValidationException]: ${error.message}`);

    error.details.forEach(
      (errorField) => this.logger.warn(`[${errorField.property}] - ${errorField.messages}`)
    );

    res
      .status(error.httpStatusCode)
      .json(createErrorObject(ApplicationErrors.ValidationError, error.message, error.details));
  }
}
