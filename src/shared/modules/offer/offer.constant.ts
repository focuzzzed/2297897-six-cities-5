export const DEFAULT_OFFER_COUNT = 60;

export const OFFER_CONSTANT_VALUES = {
  Name: {
    minLength: 10,
    maxLength: 100,
  },
  Description: {
    minLength: 20,
    maxLength: 1024,
  },
  PreviewImage: {
    maxLength: 256,
  },
  PlaceImages: {
    imagesCount: 6,
  },
  Rating: {
    minValue: 1,
    maxValue: 5,
  },
  RoomsAmount: {
    minValue: 1,
    maxValue: 8,
  },
  GuestsAmount: {
    minValue: 1,
    maxValue: 10,
  },
  Price: {
    minValue: 100,
    maxValue: 100000,
  }
} as const;

// export class CreateOfferDto {
//   @Length(10, 100, {message: CREATE_OFFER_VALIDATION_MESSAGES.Name.lengthField})
//   public name: string;
//
//   @Length(20, 1024, {message: CREATE_OFFER_VALIDATION_MESSAGES.Description.lengthField})
//   public description: string;
//
//   @IsDateString({}, {message: CREATE_OFFER_VALIDATION_MESSAGES.PostDate.invalidFormat})
//   public postDate: string;
//
//   @IsEnum(Cities, {message: CREATE_OFFER_VALIDATION_MESSAGES.City.invalid})
//   public city: Cities;
//
//   @MaxLength(256, {message: CREATE_OFFER_VALIDATION_MESSAGES.PreviewImage.maxLength})
//   public previewImage: string;
//
//   @ArrayMaxSize(6, {message: CREATE_OFFER_VALIDATION_MESSAGES.PlaceImages.invalidCount})
//   @ArrayMinSize(6, {message: CREATE_OFFER_VALIDATION_MESSAGES.PlaceImages.invalidCount})
//   public placeImages: string[];
//
//   @IsBoolean({message: CREATE_OFFER_VALIDATION_MESSAGES.IsPremium.invalidFormat})
//   public isPremium: boolean;
//
//   @IsBoolean({message: CREATE_OFFER_VALIDATION_MESSAGES.IsFavorite.invalidFormat})
//   public isFavorite: boolean;
//
//   @IsInt({message: CREATE_OFFER_VALIDATION_MESSAGES.Rating.invalidFormat})
//   @Min(1, {message: CREATE_OFFER_VALIDATION_MESSAGES.Rating.minValue})
//   @Max(5, {message: CREATE_OFFER_VALIDATION_MESSAGES.Rating.maxValue})
//   public rating: number;
//
//   @IsEnum(PlacesTypes, {message: CREATE_OFFER_VALIDATION_MESSAGES.Type.invalid})
//   public type: PlacesTypes;
//
//   @IsInt({message: CREATE_OFFER_VALIDATION_MESSAGES.RoomsAmount.invalidFormat})
//   @Min(1, {message: CREATE_OFFER_VALIDATION_MESSAGES.RoomsAmount.minValue})
//   @Max(8, {message: CREATE_OFFER_VALIDATION_MESSAGES.RoomsAmount.maxValue})
//   public roomsAmount: number;
//
//   @IsInt({message: CREATE_OFFER_VALIDATION_MESSAGES.GuestsAmount.invalidFormat})
//   @Min(1, {message: CREATE_OFFER_VALIDATION_MESSAGES.GuestsAmount.minValue})
//   @Max(10, {message: CREATE_OFFER_VALIDATION_MESSAGES.GuestsAmount.maxValue})
//   public guestsAmount: number;
//
//   @IsInt({message: CREATE_OFFER_VALIDATION_MESSAGES.Price.invalidFormat})
//   @Min(100, {message: CREATE_OFFER_VALIDATION_MESSAGES.Price.minValue})
//   @Max(100000, {message: CREATE_OFFER_VALIDATION_MESSAGES.Price.maxValue})
//   public price: number;
//
//   @IsArray()
//   @ArrayNotEmpty()
//   @IsEnum(Conveniences, {each: true, message: CREATE_OFFER_VALIDATION_MESSAGES.Conveniences.invalid})
//   public conveniences: Conveniences[];
//
//   @ValidateNested()
//   @Type(() => OfferCoordinatesDto)
//   public location: OfferCoordinatesDto;
//
//   @IsMongoId({message: CREATE_OFFER_VALIDATION_MESSAGES.AuthorId.invalidFormat})
//   public authorId: string;
// }
