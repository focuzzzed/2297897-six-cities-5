import {Type} from 'class-transformer';
import {IsLatitude, IsLongitude, IsNumber} from 'class-validator';

import {CreateOfferValidationMessages} from './create-offer.messages.js';

export class OfferCoordinatesDto {
  @IsNumber()
  @Type(() => Number)
  @IsLatitude({ message: CreateOfferValidationMessages.Location.invalidFormat })
  public latitude: number;

  @IsNumber()
  @Type(() => Number)
  @IsLongitude({ message: CreateOfferValidationMessages.Location.invalidFormat })
  public longitude: number;
}
