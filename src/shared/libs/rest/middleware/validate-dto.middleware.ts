import {ClassConstructor, plainToInstance} from 'class-transformer';
import {validate} from 'class-validator';
import {NextFunction, Request, Response} from 'express';

import {reduceValidationErrors} from '../../../helpers/index.js';
import {ValidationError} from '../errors/index.js';
import {Middleware} from './middleware.interface.js';

export class ValidateDtoMiddleware implements Middleware{
  constructor(private dto: ClassConstructor<object>) {}

  public async execute({body, path}: Request, _res: Response, next: NextFunction) {
    const dtoInstance = plainToInstance(this.dto, body);
    const errors = await validate(dtoInstance);

    if(errors.length > 0) {
      throw new ValidationError(`Validation error: ${path}`, reduceValidationErrors(errors));
    }

    next();
  }
}
