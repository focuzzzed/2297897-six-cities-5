import {createSecretKey} from 'node:crypto';

import {NextFunction, Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import {jwtVerify} from 'jose';

import {isTokenPayload} from '../../../helpers/index.js';
import {HttpError} from '../errors/index.js';
import {Middleware} from './middleware.interface.js';

export class ParseTokenMiddleware implements Middleware {
  constructor(private readonly jwtSecret: string) {}

  public async execute(req: Request, _res: Response, next: NextFunction) {
    const authorizationHeader = req.headers?.authorization?.split(' ');
    if (!authorizationHeader) {
      return next();
    }

    const [, token] = authorizationHeader;

    try{
      const {payload} = await jwtVerify(token, createSecretKey(this.jwtSecret, 'utf-8'));

      if(isTokenPayload(payload)) {
        req.tokenPayload = {...payload};
        return next();
      }
    } catch {
      return next(new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Invalid token',
        'AuthenticateMiddleware'
      ));
    }
  }
}
