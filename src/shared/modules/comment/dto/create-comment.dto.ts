import {IsInt, IsMongoId, IsString, Length, Max, Min} from 'class-validator';

import {COMMENT_CONSTANT_VALUES} from '../comment.constant.js';
import {CreateCommentValidationMessages} from './create-comment.message.js';

export class CreateCommentDto {
  @IsString({message: CreateCommentValidationMessages.Description.invalidFormat})
  @Length(COMMENT_CONSTANT_VALUES.Description.minLength, COMMENT_CONSTANT_VALUES.Description.maxLength, {message: CreateCommentValidationMessages.Description.lengthField})
  public description: string;

  @IsInt({message: CreateCommentValidationMessages.Rating.invalidFormat})
  @Min(COMMENT_CONSTANT_VALUES.Rating.minValue, {message: CreateCommentValidationMessages.Rating.minValue})
  @Max(COMMENT_CONSTANT_VALUES.Rating.maxValue, {message: CreateCommentValidationMessages.Rating.minValue})
  public rating: number;

  public authorId: string;

  @IsMongoId({message: CreateCommentValidationMessages.OfferId.invalidFormat})
  public offerId: string;
}
