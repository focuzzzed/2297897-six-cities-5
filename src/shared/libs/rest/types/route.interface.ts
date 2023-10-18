import {NextFunction, Request, Response} from 'express';

import {HttpMethods} from './http-methods.enum.js';

export interface Route {
  path: string;
  method: HttpMethods;
  handler: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
