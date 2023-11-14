import {Type} from 'class-transformer';
import {IsLatitude, IsLongitude, IsNumber} from 'class-validator';

import {CREATE_OFFER_VALIDATION_MESSAGES} from './create-offer.messages.js';

export class OfferCoordinatesDto {
  @IsNumber()
  @Type(() => Number)
  @IsLatitude({ message: CREATE_OFFER_VALIDATION_MESSAGES.LOCATION.INVALID_FORMAT })
  public latitude: number;

  @IsNumber()
  @Type(() => Number)
  @IsLongitude({ message: CREATE_OFFER_VALIDATION_MESSAGES.LOCATION.INVALID_FORMAT })
  public longitude: number;
}
