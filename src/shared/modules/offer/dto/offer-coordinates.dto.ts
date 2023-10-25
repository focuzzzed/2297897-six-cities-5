import {Type} from 'class-transformer';
import {IsLatitude, IsLongitude, IsNumber} from 'class-validator';

import {CREATE_OFFER_VALIDATION_MESSAGES} from './create-offer.messages.js';

export class OfferCoordinatesDto {
  @IsNumber()
  @Type(() => Number)
  @IsLatitude({ message: CREATE_OFFER_VALIDATION_MESSAGES.Location.invalidFormat })
  public latitude: number;

  @IsNumber()
  @Type(() => Number)
  @IsLongitude({ message: CREATE_OFFER_VALIDATION_MESSAGES.Location.invalidFormat })
  public longitude: number;
}
