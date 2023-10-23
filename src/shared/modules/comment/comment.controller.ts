import {Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import {inject, injectable} from 'inversify';

import {fillDTO} from '../../helpers/index.js';
import {Logger} from '../../libs/logger/index.js';
import {BaseController, HttpError, HttpMethods} from '../../libs/rest/index.js';
import {Components} from '../../types/index.js';
import {OfferService} from '../offer/index.js';
import {CommentService} from './comment-service.interface.js';
import {CommentRdo} from './rdo/comment.rdo.js';
import {CreateCommentRequest} from './types/create-comment-request.type.js';

@injectable()
export class CommentController extends BaseController {
  constructor(
    @inject(Components.Logger) protected readonly logger: Logger,
    @inject(Components.CommentService) protected readonly commentService: CommentService,
    @inject(Components.OfferService) protected readonly offerService: OfferService,
  ) {
    super(logger);

    this.logger.info('Register routes for CommentController...');

    this.addRoute({path: '/:offerId', method: HttpMethods.Post, handler: this.create});
  }

  public async create(
    {body}: CreateCommentRequest,
    res: Response
  ): Promise<void> {

    if(! await this.offerService.exists(body.offerId)){
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id: «${body.offerId} not exists»`,
        'CommentController'
      );
    }

    const comment = await this.commentService.create(body);
    await this.offerService.incCommentCount(body.offerId);
    this.created(res, fillDTO(CommentRdo, comment));
  }
}
