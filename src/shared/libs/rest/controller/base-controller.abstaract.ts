import {Response, Router} from 'express';
import expressAsyncHandler from 'express-async-handler';
import {StatusCodes} from 'http-status-codes';
import {injectable} from 'inversify';

import {Logger} from '../../logger/index.js';
import {Route} from '../types/index.js';
import {DEFAULT_CONTENT_TYPE} from './base-controller.constant.js';
import {Controller} from './controller.interface.js';

@injectable()
export abstract class BaseController implements Controller {
  private readonly _router: Router;

  constructor(
    protected readonly logger: Logger
  ) {
    this._router = Router();
  }

  get router() {
    return this._router;
  }

  public addRoute(route: Route) {
    const wrapperAsyncHandler = expressAsyncHandler(route.handler.bind(this));
    this._router[route.method](route.path, wrapperAsyncHandler);
    this.logger.info(`Route path registered: ${route.method.toUpperCase()} ${route.path}`);
  }

  public send<T>(res: Response, statusCode: number, data: T): void {
    res
      .type(DEFAULT_CONTENT_TYPE)
      .status(statusCode)
      .json(data);
  }

  public created<T>(res: Response, data: T) {
    this.send(res, StatusCodes.CREATED, data);
  }

  public notFound<T>(res: Response, data: T) {
    this.send(res, StatusCodes.NOT_FOUND, data);
  }

  public noContent<T>(res: Response, data: T) {
    this.send(res, StatusCodes.NO_CONTENT, data);
  }

  public ok<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.OK, data);
  }
}
