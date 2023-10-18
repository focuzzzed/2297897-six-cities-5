import {Controller} from './controller.interface.js';
import {Response, Router} from 'express';
import {Logger} from '../../logger/index.js';
import {Route} from '../types/route.interface.js';
import {StatusCodes} from 'http-status-codes';
import {injectable} from 'inversify';
import {DEFAULT_CONTENT_TYPE} from './base-controller.constant.js';

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
    this._router[route.method](route.path, route.handler.bind(this));
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
