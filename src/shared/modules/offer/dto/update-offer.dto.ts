import {Type} from 'class-transformer';
import {
  ArrayMaxSize, ArrayMinSize, ArrayNotEmpty,
  IsArray, IsBoolean, IsEnum,
  IsInt, IsOptional, Length, Max, MaxLength, Min,
  ValidateNested
} from 'class-validator';

import {Cities, Conveniences, PlacesTypes} from '../../../types/index.js';
import {OFFER_CONSTANT_VALUES} from '../offer.constant.js';
import {CreateOfferValidationMessages} from './create-offer.messages.js';
import {OfferCoordinatesDto} from './offer-coordinates.dto.js';

export class UpdateOfferDto {
  @IsOptional()
  @Length(OFFER_CONSTANT_VALUES.Name.minLength, OFFER_CONSTANT_VALUES.Name.maxLength, {message: CreateOfferValidationMessages.Name.lengthField})
  public name?: string;

  @IsOptional()
  @Length(OFFER_CONSTANT_VALUES.Description.minLength, OFFER_CONSTANT_VALUES.Description.maxLength, {message: CreateOfferValidationMessages.Description.lengthField})
  public description?: string;

  @IsOptional()
  @IsEnum(Cities, {message: CreateOfferValidationMessages.City.invalid})
  public city?: Cities;

  @IsOptional()
  @MaxLength(OFFER_CONSTANT_VALUES.PreviewImage.maxLength, {message: CreateOfferValidationMessages.PreviewImage.maxLength})
  public previewImage?: string;

  @IsOptional()
  @ArrayMaxSize(OFFER_CONSTANT_VALUES.PlaceImages.imagesCount, {message: CreateOfferValidationMessages.PlaceImages.invalidCount})
  @ArrayMinSize(OFFER_CONSTANT_VALUES.PlaceImages.imagesCount, {message: CreateOfferValidationMessages.PlaceImages.invalidCount})
  public placeImages?: string[];

  @IsOptional()
  @IsBoolean({message: CreateOfferValidationMessages.IsPremium.invalidFormat})
  public isPremium?: boolean;

  @IsOptional()
  @IsBoolean({message: CreateOfferValidationMessages.IsFavorite.invalidFormat})
  public isFavorite?: boolean;

  @IsOptional()
  @IsInt({message: CreateOfferValidationMessages.Rating.invalidFormat})
  @Min(OFFER_CONSTANT_VALUES.Rating.minValue, {message: CreateOfferValidationMessages.Rating.minValue})
  @Max(OFFER_CONSTANT_VALUES.Rating.maxValue, {message: CreateOfferValidationMessages.Rating.maxValue})
  public rating?: number;

  @IsOptional()
  @IsEnum(PlacesTypes, {message: CreateOfferValidationMessages.Type.invalid})
  public type?: PlacesTypes;

  @IsOptional()
  @IsInt({message: CreateOfferValidationMessages.RoomsAmount.invalidFormat})
  @Min(OFFER_CONSTANT_VALUES.RoomsAmount.minValue, {message: CreateOfferValidationMessages.RoomsAmount.minValue})
  @Max(OFFER_CONSTANT_VALUES.RoomsAmount.maxValue, {message: CreateOfferValidationMessages.RoomsAmount.maxValue})
  public roomsAmount?: number;

  @IsOptional()
  @IsInt({message: CreateOfferValidationMessages.GuestsAmount.invalidFormat})
  @Min(OFFER_CONSTANT_VALUES.GuestsAmount.minValue, {message: CreateOfferValidationMessages.GuestsAmount.minValue})
  @Max(OFFER_CONSTANT_VALUES.GuestsAmount.maxValue, {message: CreateOfferValidationMessages.GuestsAmount.maxValue})
  public guestsAmount?: number;

  @IsOptional()
  @IsInt({message: CreateOfferValidationMessages.Price.invalidFormat})
  @Min(OFFER_CONSTANT_VALUES.Price.minValue, {message: CreateOfferValidationMessages.Price.minValue})
  @Max(OFFER_CONSTANT_VALUES.Price.maxValue, {message: CreateOfferValidationMessages.Price.maxValue})
  public price?: number;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(Conveniences, {each: true, message: CreateOfferValidationMessages.Conveniences.invalid})
  public conveniences?: Conveniences[];

  @IsOptional()
  @ValidateNested()
  @Type(() => OfferCoordinatesDto)
  public location?: OfferCoordinatesDto;

  @IsOptional()
  public authorId?: string;
}
