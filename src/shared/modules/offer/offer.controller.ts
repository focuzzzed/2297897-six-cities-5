import {Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import {inject, injectable} from 'inversify';

import {fillDTO, isCity} from '../../helpers/index.js';
import {Config, RestSchema} from '../../libs/config/index.js';
import {Logger} from '../../libs/logger/index.js';
import {
  BaseController,
  DocumentExistsMiddleware,
  HttpError,
  HttpMethods,
  PrivateRouteMiddleware,
  UploadFileMiddleware,
  UploadFilesMiddleware,
  ValidateAuthorMiddleware,
  ValidateDtoMiddleware,
  ValidateObjectIdMiddleware,
} from '../../libs/rest/index.js';
import {Components} from '../../types/index.js';
import {CommentService} from '../comment/index.js';
import {CommentRdo} from '../comment/rdo/comment.rdo.js';
import {CreateOfferDto} from './dto/create-offer.dto.js';
import {UpdateOfferDto} from './dto/update-offer.dto.js';
import {OfferService} from './offer-service.interface.js';
import {OfferRdo} from './rdo/offer.rdo.js';
import {OfferPreviewRdo} from './rdo/offer-preview.rdo.js';
import {UploadPlaceImagesRdo} from './rdo/upload-place-images.rdo.js';
import {UploadPreviewImageRdo} from './rdo/upload-preview-image.rdo.js';
import {CreateOfferRequest} from './types/create-offer-request.type.js';
import {ParamOfferId} from './types/param-offerid.type.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Components.Logger) protected readonly logger: Logger,
    @inject(Components.Config) protected readonly config: Config<RestSchema>,
    @inject(Components.OfferService) protected readonly offerService: OfferService,
    @inject(Components.CommentService) protected readonly commentService: CommentService
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController...');

    this.addRoute({
      path: '/',
      method: HttpMethods.Get,
      handler: this.index
    });

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
      path: '/favorites',
      method: HttpMethods.Get,
      handler: this.findFavorites,
      middlewares: [
        new PrivateRouteMiddleware(),
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
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
        new ValidateAuthorMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });

    this.addRoute({
      path: '/:offerId',
      method: HttpMethods.Patch,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
        new ValidateAuthorMiddleware(this.offerService, 'Offer', 'offerId'),
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

    this.addRoute({
      path: '/:offerId/preview',
      method: HttpMethods.Patch,
      handler: this.uploadPreviewImage,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
        new ValidateAuthorMiddleware(this.offerService, 'Offer', 'offerId'),
        new UploadFileMiddleware(this.config.get('UPLOAD_DIRECTORY'), 'previewImage'),
      ]
    });

    this.addRoute({
      path: '/:offerId/images',
      method: HttpMethods.Patch,
      handler: this.uploadPlaceImages,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
        new ValidateAuthorMiddleware(this.offerService, 'Offer', 'offerId'),
        new UploadFilesMiddleware(this.config.get('UPLOAD_DIRECTORY'), 'placeImages'),
      ]
    });

    this.addRoute({
      path: '/premium/:city',
      method: HttpMethods.Get,
      handler: this.findPremiumByCity
    });
  }

  public async index({tokenPayload, query}: Request, res: Response) {
    const count = query.count ? Number(query.count) : undefined;
    const offers = tokenPayload
      ? await this.offerService.find(count, tokenPayload.id)
      : await this.offerService.find(count);
    this.ok(res, fillDTO(OfferPreviewRdo, offers));
  }

  public async show({params, tokenPayload}: Request<ParamOfferId>, res: Response) {
    const {offerId} = params;

    const offer = tokenPayload
      ? await this.offerService.findById(offerId, tokenPayload.id)
      : await this.offerService.findById(offerId);

    this.ok(res, fillDTO(OfferRdo, offer));
  }

  public async create(
    {body, tokenPayload}: CreateOfferRequest,
    res: Response
  ) {
    console.log(body);
    const result = await this.offerService.create({...body, authorId: tokenPayload.id });
    const createdOffer = await this.offerService.findById(result.id);

    this.created(res, fillDTO(OfferRdo, createdOffer));
  }

  public async delete(
    {params}: Request<ParamOfferId>,
    res: Response
  ) {
    const {offerId} = params;
    const offer = await this.offerService.deleteById(offerId);
    await this.commentService.deleteByOfferId(offerId);

    this.noContent(res, offer);
  }

  public async update(
    {params, body}: Request<ParamOfferId, unknown, UpdateOfferDto>,
    res: Response
  ){
    const {offerId} = params;
    await this.offerService.updateById(offerId, body);
    const updatedOffer = await this.offerService.findById(offerId);

    this.ok(res, fillDTO(OfferRdo, updatedOffer));
  }

  public async getComments({params}: Request<ParamOfferId>, res: Response) {
    const {offerId} = params;
    const comments = await this.commentService.findByOfferId(offerId);

    this.ok(res, fillDTO(CommentRdo, comments));
  }

  public async uploadPreviewImage({params, file}: Request<ParamOfferId>, res: Response) {
    if(!file) {
      throw new HttpError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        'No file selected for upload',
        'OfferController',
      );
    }

    const {offerId} = params;
    const updateDto = {previewImage: file.filename};
    await this.offerService.updateById(offerId, updateDto);
    this.created(res, fillDTO(UploadPreviewImageRdo, updateDto));
  }

  public async uploadPlaceImages({params, files}: Request<ParamOfferId>, res: Response) {
    if(!Array.isArray(files)) {
      throw new HttpError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        'No files selected for upload',
        'OfferController',
      );
    }

    const {offerId} = params;
    const updateDto = {placeImages: files.map((file) => file.filename)};
    await this.offerService.updateById(offerId, updateDto);

    this.created(res, fillDTO(UploadPlaceImagesRdo, updateDto));
  }

  public async findFavorites({tokenPayload}: Request, res: Response){
    const favoriteOffers = await this.offerService.findFavorites(tokenPayload.id);

    this.ok(res, fillDTO(OfferPreviewRdo, favoriteOffers));
  }

  public async findPremiumByCity({params, tokenPayload}: Request, res: Response) {
    const {city} = params;
    isCity(city);

    const premiumOffers = tokenPayload
      ? await this.offerService.findPremiumByCity(city, tokenPayload.id)
      : await this.offerService.findPremiumByCity(city);

    this.ok(res, fillDTO(OfferPreviewRdo, premiumOffers));
  }
}
