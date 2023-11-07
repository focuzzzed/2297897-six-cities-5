import {Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import {inject, injectable} from 'inversify';

import {CITIES_COORDINATES, fillDTO} from '../../helpers/index.js';
import {Config, RestSchema} from '../../libs/config/index.js';
import {Logger} from '../../libs/logger/index.js';
import {
  BaseController, DocumentExistsMiddleware, HttpError,
  HttpMethods, PrivateRouteMiddleware,
  UploadFileMiddleware, UploadFilesMiddleware, ValidateDtoMiddleware,
  ValidateObjectIdMiddleware
} from '../../libs/rest/index.js';
import {Components} from '../../types/index.js';
import {CommentService} from '../comment/index.js';
import {CommentRdo} from '../comment/rdo/comment.rdo.js';
import {CreateOfferDto} from './dto/create-offer.dto.js';
import {UpdateOfferDto} from './dto/update-offer.dto.js';
import {OfferService} from './offer-service.interface.js';
import {FullOfferRdo} from './rdo/full-offer.rdo.js';
import {OfferRdo} from './rdo/offer.rdo.js';
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

    this.addRoute({
      path: '/:offerId/preview',
      method: HttpMethods.Patch,
      handler: this.uploadPreviewImage,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
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
        new UploadFilesMiddleware(this.config.get('UPLOAD_DIRECTORY'), 'placeImages'),
      ]
    });
  }

  public async index({tokenPayload}: Request, res: Response) {
    const offers = tokenPayload
      ? await this.offerService.find(undefined, tokenPayload.id)
      : await this.offerService.find();
    this.ok(res, fillDTO(OfferRdo, offers));
  }

  public async show({params, tokenPayload}: Request<ParamOfferId>, res: Response) {
    const {offerId} = params;

    const offer = tokenPayload
      ? await this.offerService.findById(offerId, tokenPayload.id)
      : await this.offerService.findById(offerId);

    const offerForShow = {...offer, city: {name: offer!.city, cityCoordinates: CITIES_COORDINATES[offer!.city]}};

    this.ok(res, fillDTO(FullOfferRdo, offerForShow));
  }

  public async create(
    {body, tokenPayload}: CreateOfferRequest,
    res: Response
  ) {
    const result = await this.offerService.create({...body, authorId: tokenPayload.id });
    const offer = await this.offerService.findById(result.id);
    const createdOffer = {...offer, city: {name: offer!.city, cityCoordinates: CITIES_COORDINATES[offer!.city]}};

    this.created(res, fillDTO(FullOfferRdo, createdOffer));
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
    const offer = await this.offerService.updateById(offerId, body);
    const updatedOffer = {...offer, city: {name: offer!.city, cityCoordinates: CITIES_COORDINATES[offer!.city]}};
    this.ok(res, fillDTO(FullOfferRdo, updatedOffer));
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
}
