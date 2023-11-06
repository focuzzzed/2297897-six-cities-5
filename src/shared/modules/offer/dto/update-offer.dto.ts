import {Type} from 'class-transformer';
import {
  ArrayMaxSize, ArrayMinSize, ArrayNotEmpty,
  IsArray, IsBoolean, IsDateString, IsEnum,
  IsInt, IsOptional, Length, Max, MaxLength, Min,
  ValidateNested
} from 'class-validator';

import {Cities, Conveniences, PlacesTypes} from '../../../types/index.js';
import {OFFER_CONSTANT_VALUES} from '../offer.constant.js';
import {CREATE_OFFER_VALIDATION_MESSAGES} from './create-offer.messages.js';
import {OfferCoordinatesDto} from './offer-coordinates.dto.js';

export class UpdateOfferDto {
  @IsOptional()
  @Length(OFFER_CONSTANT_VALUES.Name.minLength, OFFER_CONSTANT_VALUES.Name.maxLength, {message: CREATE_OFFER_VALIDATION_MESSAGES.Name.lengthField})
  public name?: string;

  @IsOptional()
  @Length(OFFER_CONSTANT_VALUES.Description.minLength, OFFER_CONSTANT_VALUES.Description.maxLength, {message: CREATE_OFFER_VALIDATION_MESSAGES.Description.lengthField})
  public description?: string;

  @IsOptional()
  @IsDateString({}, {message: CREATE_OFFER_VALIDATION_MESSAGES.PostDate.invalidFormat})
  public postDate?: string;

  @IsOptional()
  @IsEnum(Cities, {message: CREATE_OFFER_VALIDATION_MESSAGES.City.invalid})
  public city?: Cities;

  @IsOptional()
  @MaxLength(OFFER_CONSTANT_VALUES.PreviewImage.maxLength, {message: CREATE_OFFER_VALIDATION_MESSAGES.PreviewImage.maxLength})
  public previewImage?: string;

  @IsOptional()
  @ArrayMaxSize(OFFER_CONSTANT_VALUES.PlaceImages.imagesCount, {message: CREATE_OFFER_VALIDATION_MESSAGES.PlaceImages.invalidCount})
  @ArrayMinSize(OFFER_CONSTANT_VALUES.PlaceImages.imagesCount, {message: CREATE_OFFER_VALIDATION_MESSAGES.PlaceImages.invalidCount})
  public placeImages?: string[];

  @IsOptional()
  @IsBoolean({message: CREATE_OFFER_VALIDATION_MESSAGES.IsPremium.invalidFormat})
  public isPremium?: boolean;

  @IsOptional()
  @IsBoolean({message: CREATE_OFFER_VALIDATION_MESSAGES.IsFavorite.invalidFormat})
  public isFavorite?: boolean;

  @IsOptional()
  @IsInt({message: CREATE_OFFER_VALIDATION_MESSAGES.Rating.invalidFormat})
  @Min(OFFER_CONSTANT_VALUES.Rating.minValue, {message: CREATE_OFFER_VALIDATION_MESSAGES.Rating.minValue})
  @Max(OFFER_CONSTANT_VALUES.Rating.maxValue, {message: CREATE_OFFER_VALIDATION_MESSAGES.Rating.maxValue})
  public rating?: number;

  @IsOptional()
  @IsEnum(PlacesTypes, {message: CREATE_OFFER_VALIDATION_MESSAGES.Type.invalid})
  public type?: PlacesTypes;

  @IsOptional()
  @IsInt({message: CREATE_OFFER_VALIDATION_MESSAGES.RoomsAmount.invalidFormat})
  @Min(OFFER_CONSTANT_VALUES.RoomsAmount.minValue, {message: CREATE_OFFER_VALIDATION_MESSAGES.RoomsAmount.minValue})
  @Max(OFFER_CONSTANT_VALUES.RoomsAmount.maxValue, {message: CREATE_OFFER_VALIDATION_MESSAGES.RoomsAmount.maxValue})
  public roomsAmount?: number;

  @IsOptional()
  @IsInt({message: CREATE_OFFER_VALIDATION_MESSAGES.GuestsAmount.invalidFormat})
  @Min(OFFER_CONSTANT_VALUES.GuestsAmount.minValue, {message: CREATE_OFFER_VALIDATION_MESSAGES.GuestsAmount.minValue})
  @Max(OFFER_CONSTANT_VALUES.GuestsAmount.maxValue, {message: CREATE_OFFER_VALIDATION_MESSAGES.GuestsAmount.maxValue})
  public guestsAmount?: number;

  @IsOptional()
  @IsInt({message: CREATE_OFFER_VALIDATION_MESSAGES.Price.invalidFormat})
  @Min(OFFER_CONSTANT_VALUES.Price.minValue, {message: CREATE_OFFER_VALIDATION_MESSAGES.Price.minValue})
  @Max(OFFER_CONSTANT_VALUES.Price.maxValue, {message: CREATE_OFFER_VALIDATION_MESSAGES.Price.maxValue})
  public price?: number;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(Conveniences, {each: true, message: CREATE_OFFER_VALIDATION_MESSAGES.Conveniences.invalid})
  public conveniences?: Conveniences[];

  @IsOptional()
  @ValidateNested()
  @Type(() => OfferCoordinatesDto)
  public location?: OfferCoordinatesDto;

  @IsOptional()
  public authorId?: string;
}
