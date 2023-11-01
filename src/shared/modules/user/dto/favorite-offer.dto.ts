import {IsBoolean, IsMongoId} from 'class-validator';

import {FAVORITE_OFFER_MESSAGES} from './favorite-offer.messages.js';

export class FavoriteOfferDto {
  @IsMongoId({message: FAVORITE_OFFER_MESSAGES.OfferId.invalidFormat})
  public offerId: string;

  @IsBoolean({message: FAVORITE_OFFER_MESSAGES.IsPremium.invalidFormat})
  public isFavorite: boolean;
}
