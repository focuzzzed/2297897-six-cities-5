import {Response, Router} from 'express';
import expressAsyncHandler from 'express-async-handler';
import {StatusCodes} from 'http-status-codes';
import {inject, injectable} from 'inversify';

import {Components} from '../../../types/index.js';
import {Logger} from '../../logger/index.js';
import {PathTransformer} from '../transform/path-transformer.js';
import {Route} from '../types/index.js';
import {DEFAULT_CONTENT_TYPE} from './base-controller.constant.js';
import {Controller} from './controller.interface.js';

@injectable()
export abstract class BaseController implements Controller {
  public readonly router: Router = Router();

  @inject(Components.PathTransformer)
  private pathTransformer: PathTransformer;

  constructor(
    protected readonly logger: Logger
  ) {
  }

  public addRoute(route: Route) {
    const wrapperAsyncHandler = expressAsyncHandler(route.handler.bind(this));
    const middlewareHandlers = route.middlewares?.map(
      (item) => expressAsyncHandler(item.execute.bind(item))
    );

    const allHandlers = middlewareHandlers ? [...middlewareHandlers, wrapperAsyncHandler] : wrapperAsyncHandler;

    this.router[route.method](route.path, allHandlers);
    this.logger.info(`Route path registered: ${route.method.toUpperCase()} ${route.path}`);
  }

  public send<T>(res: Response, statusCode: number, data: T): void {
    const modifiedData = this.pathTransformer.execute(data as Record<string, unknown>);
    res
      .type(DEFAULT_CONTENT_TYPE)
      .status(statusCode)
      .json(modifiedData);
  }

  public created<T>(res: Response, data: T) {
    this.send(res, StatusCodes.CREATED, data);
  }

  public noContent<T>(res: Response, data: T) {
    this.send(res, StatusCodes.NO_CONTENT, data);
  }

  public ok<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.OK, data);
  }
}
