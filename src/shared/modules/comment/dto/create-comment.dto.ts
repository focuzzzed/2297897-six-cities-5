import {IsInt, IsMongoId, IsString, Length, Max, Min} from 'class-validator';

import {COMMENT_CONSTANT_VALUES} from '../comment.constant.js';
import {CREATE_COMMENT_VALIDATION_MESSAGES} from './create-comment.message.js';

export class CreateCommentDto {
  @IsString({message: CREATE_COMMENT_VALIDATION_MESSAGES.Description.invalidFormat})
  @Length(COMMENT_CONSTANT_VALUES.Description.minLength, COMMENT_CONSTANT_VALUES.Description.maxLength, {message: CREATE_COMMENT_VALIDATION_MESSAGES.Description.lengthField})
  public description: string;

  @IsInt({message: CREATE_COMMENT_VALIDATION_MESSAGES.Rating.invalidFormat})
  @Min(COMMENT_CONSTANT_VALUES.Rating.minValue, {message: CREATE_COMMENT_VALIDATION_MESSAGES.Rating.minValue})
  @Max(COMMENT_CONSTANT_VALUES.Rating.maxValue, {message: CREATE_COMMENT_VALIDATION_MESSAGES.Rating.minValue})
  public rating: number;

  public authorId: string;

  @IsMongoId({message: CREATE_COMMENT_VALIDATION_MESSAGES.OfferId.invalidFormat})
  public offerId: string;
}
