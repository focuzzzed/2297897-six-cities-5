import {BaseController, HttpMethods} from '../../libs/rest/index.js';
import {inject} from 'inversify';
import {Components} from '../../types/index.js';
import {Logger} from '../../libs/logger/index.js';
import {Request, Response} from 'express';
import {CommentService} from './comment-service.interface.js';

export class CommentController extends BaseController {
  constructor(
    @inject(Components.Logger) protected readonly logger: Logger,
    @inject(Components.CommentService) protected readonly commentService: CommentService,
  ) {
    super(logger);

    this.logger.info('Register routes for CommentController...');

    this.addRoute({path: '/:offerId', method: HttpMethods.Get, handler: this.index});
    this.addRoute({path: '/', method: HttpMethods.Post, handler: this.create});
  }

  public async index(req: Request, res: Response) {
    const offerId = req.params.offerId;
    const comments = await this.commentService.findByOfferId(offerId);
    this.ok(res, comments);
  }

  public create(_req: Request, _res: Response) {
    //TODO: Доработать
  }
}
