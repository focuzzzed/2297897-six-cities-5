import {IsBoolean} from 'class-validator';

import {FavoriteOfferValidationMessages} from './favorite-offer.messages.js';

export class FavoriteOfferDto {
  @IsBoolean({message: FavoriteOfferValidationMessages.IsPremium.invalidFormat})
  public isFavorite: boolean;
}
