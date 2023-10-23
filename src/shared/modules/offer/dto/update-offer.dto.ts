import {Type} from 'class-transformer';
import {
  ArrayMaxSize, ArrayMinSize, ArrayNotEmpty,
  IsArray, IsBoolean, IsDateString, IsEnum,
  IsInt, IsMongoId, IsOptional, Length, Max, MaxLength, Min,
  ValidateNested
} from 'class-validator';

import {Cities, Conveniences, PlacesTypes} from '../../../types/index.js';
import {CreateOfferValidationMessage} from './create-offer.messages.js';
import {OfferCoordinatesDto} from './offer-coordinates.dto.js';

export class UpdateOfferDto {
  @IsOptional()
  @Length(10, 100, {message: CreateOfferValidationMessage.name.lengthField})
  public name?: string;

  @IsOptional()
  @Length(20, 1024, {message: CreateOfferValidationMessage.description.lengthField})
  public description?: string;

  @IsOptional()
  @IsDateString({}, {message: CreateOfferValidationMessage.postDate.invalidFormat})
  public postDate?: string;

  @IsOptional()
  @IsEnum(Cities, {message: CreateOfferValidationMessage.city.invalid})
  public city?: Cities;

  @IsOptional()
  @MaxLength(256, {message: CreateOfferValidationMessage.previewImage.maxLength})
  public previewImage?: string;

  @IsOptional()
  @ArrayMaxSize(6, {message: CreateOfferValidationMessage.placeImages.invalidCount})
  @ArrayMinSize(6, {message: CreateOfferValidationMessage.placeImages.invalidCount})
  public placeImages?: string[];

  @IsOptional()
  @IsBoolean({message: CreateOfferValidationMessage.isPremium.invalidFormat})
  public isPremium?: boolean;

  @IsOptional()
  @IsBoolean({message: CreateOfferValidationMessage.isFavorite.invalidFormat})
  public isFavorite?: boolean;

  @IsOptional()
  @IsInt({message: CreateOfferValidationMessage.rating.invalidFormat})
  @Min(1, {message: CreateOfferValidationMessage.rating.minValue})
  @Max(5, {message: CreateOfferValidationMessage.rating.maxValue})
  public rating?: number;

  @IsOptional()
  @IsEnum(PlacesTypes, {message: CreateOfferValidationMessage.type.invalid})
  public type?: PlacesTypes;

  @IsOptional()
  @IsInt({message: CreateOfferValidationMessage.roomsAmount.invalidFormat})
  @Min(1, {message: CreateOfferValidationMessage.roomsAmount.minValue})
  @Max(8, {message: CreateOfferValidationMessage.roomsAmount.maxValue})
  public roomsAmount?: number;

  @IsOptional()
  @IsInt({message: CreateOfferValidationMessage.guestsAmount.invalidFormat})
  @Min(1, {message: CreateOfferValidationMessage.guestsAmount.minValue})
  @Max(10, {message: CreateOfferValidationMessage.guestsAmount.maxValue})
  public guestsAmount?: number;

  @IsOptional()
  @IsInt({message: CreateOfferValidationMessage.price.invalidFormat})
  @Min(100, {message: CreateOfferValidationMessage.price.minValue})
  @Max(100000, {message: CreateOfferValidationMessage.price.maxValue})
  public price?: number;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(Conveniences, {each: true, message: CreateOfferValidationMessage.conveniences.invalid})
  public conveniences?: Conveniences[];

  @IsOptional()
  @ValidateNested()
  @Type(() => OfferCoordinatesDto)
  public location?: OfferCoordinatesDto;

  @IsOptional()
  @IsMongoId({message: CreateOfferValidationMessage.authorId.invalidFormat})
  public authorId?: string;
}
