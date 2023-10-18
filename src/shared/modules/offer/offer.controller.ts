import {Request, Response} from 'express';
import {inject, injectable} from 'inversify';

import {fillDTO} from '../../helpers/index.js';
import {Logger} from '../../libs/logger/index.js';
import {BaseController, HttpMethods} from '../../libs/rest/index.js';
import {Components} from '../../types/index.js';
import {CreateOfferRequest} from './create-offer-request.type.js';
import {OfferService} from './offer-service.interface.js';
import {OfferRdo} from './rdo/offer.rdo.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Components.Logger) protected readonly logger: Logger,
    @inject(Components.OfferService) protected readonly offerService: OfferService,
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController...');

    this.addRoute({path: '/', method: HttpMethods.Get, handler: this.index});
    this.addRoute({path: '/', method: HttpMethods.Post, handler: this.create});
  }

  public async index(_req: Request, res: Response) {
    const offers = await this.offerService.find();
    this.ok(res, fillDTO(OfferRdo, offers));
  }

  public async create(
    {body}: CreateOfferRequest,
    res: Response
  ) {
    const result = await this.offerService.create(body);
    this.created(res, fillDTO(OfferRdo, result));
  }
}
