import {Request, Response} from 'express';
import {inject, injectable} from 'inversify';

import {fillDTO} from '../../helpers/index.js';
import {Logger} from '../../libs/logger/index.js';
import {
  BaseController, DocumentExistsMiddleware,
  HttpMethods, PrivateRouteMiddleware, ValidateObjectIdMiddleware
} from '../../libs/rest/index.js';
import {ValidateDtoMiddleware} from '../../libs/rest/index.js';
import {Components} from '../../types/index.js';
import {CommentService} from '../comment/index.js';
import {CommentRdo} from '../comment/rdo/comment.rdo.js';
import {CreateOfferDto} from './dto/create-offer.dto.js';
import {UpdateOfferDto} from './dto/update-offer.dto.js';
import {OfferService} from './offer-service.interface.js';
import {OfferRdo} from './rdo/offer.rdo.js';
import {CreateOfferRequest} from './types/create-offer-request.type.js';
import {ParamOfferId} from './types/param-offerid.type.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Components.Logger) protected readonly logger: Logger,
    @inject(Components.OfferService) protected readonly offerService: OfferService,
    @inject(Components.CommentService) protected readonly commentService: CommentService
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController...');

    this.addRoute({path: '/', method: HttpMethods.Get, handler: this.index});

    this.addRoute({
      path: '/',
      method: HttpMethods.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateOfferDto)
      ]
    });

    this.addRoute({
      path: '/:offerId',
      method: HttpMethods.Get,
      handler: this.show,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });

    this.addRoute({
      path: '/:offerId',
      method: HttpMethods.Delete,
      handler: this.delete,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });

    this.addRoute({
      path: '/:offerId',
      method: HttpMethods.Patch,
      handler: this.update,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
        new ValidateDtoMiddleware(UpdateOfferDto)
      ]
    });

    this.addRoute({
      path: '/:offerId/comments',
      method: HttpMethods.Get,
      handler: this.getComments,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });
  }

  public async index(_req: Request, res: Response) {
    const offers = await this.offerService.find();
    this.ok(res, fillDTO(OfferRdo, offers));
  }

  public async show({params}: Request<ParamOfferId>, res: Response) {
    const {offerId} = params;
    const offer = await this.offerService.findById(offerId);

    this.ok(res, fillDTO(OfferRdo, offer));
  }

  public async create(
    {body, tokenPayload}: CreateOfferRequest,
    res: Response
  ) {
    const result = await this.offerService.create({...body, authorId: tokenPayload.id });
    const offer = await this.offerService.findById(result.id);

    this.created(res, fillDTO(OfferRdo, offer));
  }

  public async delete(
    {params}: Request<ParamOfferId>,
    res: Response
  ) {
    const {offerId} = params;
    const offer = await this.offerService.deleteById(offerId);

    this.noContent(res, offer);
  }

  public async update(
    {params, body}: Request<ParamOfferId, unknown, UpdateOfferDto>,
    res: Response
  ){
    const {offerId} = params;
    const updatedOffer = await this.offerService.updateById(offerId, body);

    this.ok(res, fillDTO(OfferRdo, updatedOffer));
  }

  public async getComments({params}: Request<ParamOfferId>, res: Response) {
    const {offerId} = params;
    const comments = await this.commentService.findByOfferId(offerId);

    this.ok(res, fillDTO(CommentRdo, comments));
  }
}
