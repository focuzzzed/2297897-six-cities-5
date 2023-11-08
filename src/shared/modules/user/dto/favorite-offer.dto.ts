import {IsBoolean, IsMongoId} from 'class-validator';

import {FavoriteOfferValidationMessages} from './favorite-offer.messages.js';

export class FavoriteOfferDto {
  @IsMongoId({message: FavoriteOfferValidationMessages.OfferId.invalidFormat})
  public offerId: string;

  @IsBoolean({message: FavoriteOfferValidationMessages.IsPremium.invalidFormat})
  public isFavorite: boolean;
}
