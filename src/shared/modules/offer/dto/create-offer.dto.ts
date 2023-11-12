import {Type} from 'class-transformer';
import {
  ArrayMaxSize, ArrayMinSize, ArrayNotEmpty, IsArray,
  IsBoolean, IsDateString, IsEnum, IsInt, Length,
  Max, MaxLength, Min, ValidateNested
} from 'class-validator';

import {Cities, Conveniences, PlacesTypes} from '../../../types/index.js';
import {OFFER_CONSTANT_VALUES} from '../offer.constant.js';
import {CreateOfferValidationMessages} from './create-offer.messages.js';
import {OfferCoordinatesDto} from './offer-coordinates.dto.js';

export class CreateOfferDto {
  @Length(OFFER_CONSTANT_VALUES.Name.minLength, OFFER_CONSTANT_VALUES.Name.maxLength, {message: CreateOfferValidationMessages.Name.lengthField})
  public name: string;

  @Length(OFFER_CONSTANT_VALUES.Description.minLength, OFFER_CONSTANT_VALUES.Description.maxLength, {message: CreateOfferValidationMessages.Description.lengthField})
  public description: string;

  @IsDateString({}, {message: CreateOfferValidationMessages.PostDate.invalidFormat})
  public postDate: string;

  @IsEnum(Cities, {message: CreateOfferValidationMessages.City.invalid})
  public city: Cities;

  @MaxLength(OFFER_CONSTANT_VALUES.PreviewImage.maxLength, {message: CreateOfferValidationMessages.PreviewImage.maxLength})
  public previewImage: string;

  @ArrayMaxSize(OFFER_CONSTANT_VALUES.PlaceImages.imagesCount, {message: CreateOfferValidationMessages.PlaceImages.invalidCount})
  @ArrayMinSize(OFFER_CONSTANT_VALUES.PlaceImages.imagesCount, {message: CreateOfferValidationMessages.PlaceImages.invalidCount})
  public placeImages: string[];

  @IsBoolean({message: CreateOfferValidationMessages.IsPremium.invalidFormat})
  public isPremium: boolean;

  @IsBoolean({message: CreateOfferValidationMessages.IsFavorite.invalidFormat})
  public isFavorite: boolean;

  @IsEnum(PlacesTypes, {message: CreateOfferValidationMessages.Type.invalid})
  public type: PlacesTypes;

  @IsInt({message: CreateOfferValidationMessages.RoomsAmount.invalidFormat})
  @Min(OFFER_CONSTANT_VALUES.RoomsAmount.minValue, {message: CreateOfferValidationMessages.RoomsAmount.minValue})
  @Max(OFFER_CONSTANT_VALUES.RoomsAmount.maxValue, {message: CreateOfferValidationMessages.RoomsAmount.maxValue})
  public roomsAmount: number;

  @IsInt({message: CreateOfferValidationMessages.GuestsAmount.invalidFormat})
  @Min(OFFER_CONSTANT_VALUES.GuestsAmount.minValue, {message: CreateOfferValidationMessages.GuestsAmount.minValue})
  @Max(OFFER_CONSTANT_VALUES.GuestsAmount.maxValue, {message: CreateOfferValidationMessages.GuestsAmount.maxValue})
  public guestsAmount: number;

  @IsInt({message: CreateOfferValidationMessages.Price.invalidFormat})
  @Min(OFFER_CONSTANT_VALUES.Price.minValue, {message: CreateOfferValidationMessages.Price.minValue})
  @Max(OFFER_CONSTANT_VALUES.Price.maxValue, {message: CreateOfferValidationMessages.Price.maxValue})
  public price: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(Conveniences, {each: true, message: CreateOfferValidationMessages.Conveniences.invalid})
  public conveniences: Conveniences[];

  @ValidateNested()
  @Type(() => OfferCoordinatesDto)
  public location: OfferCoordinatesDto;

  public authorId?: string;
}
