import {types} from '@typegoose/typegoose';
import {Container} from 'inversify';

import {Controller} from '../../libs/rest/index.js';
import {Components} from '../../types/index.js';
import {DefaultOfferService} from './default-offer.service.js';
import {OfferController} from './offer.controller.js';
import {OfferEntity, OfferModel} from './offer.entity.js';
import {OfferService} from './offer-service.interface.js';

export function createOfferContainer() {
  const offerContainer = new Container();

  offerContainer.bind<OfferService>(Components.OfferService).to(DefaultOfferService).inSingletonScope();
  offerContainer.bind<types.ModelType<OfferEntity>>(Components.OfferModel).toConstantValue(OfferModel);
  offerContainer.bind<Controller>(Components.OfferController).to(OfferController).inSingletonScope();

  return offerContainer;
}
