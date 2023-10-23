import {Type} from 'class-transformer';
import {IsLatitude, IsLongitude, IsNumber} from 'class-validator';

import {CreateOfferValidationMessage} from './create-offer.messages.js';

export class OfferCoordinatesDto {
  @IsNumber()
  @Type(() => Number)
  @IsLatitude({ message: CreateOfferValidationMessage.location.invalidFormat })
  public latitude: number;

  @IsNumber()
  @Type(() => Number)
  @IsLongitude({ message: CreateOfferValidationMessage.location.invalidFormat })
  public longitude: number;
}
