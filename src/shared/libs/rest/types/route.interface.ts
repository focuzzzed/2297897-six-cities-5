import {HttpMethods} from './http-methods.enum.js';
import {NextFunction, Request, Response} from 'express';

export interface Route {
  path: string;
  method: HttpMethods;
  handler: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
