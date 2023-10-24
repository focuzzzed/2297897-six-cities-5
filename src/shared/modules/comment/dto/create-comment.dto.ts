import {IsInt, IsMongoId, IsString, Length, Max, Min} from 'class-validator';

import {CreateCommentValidationMessage} from './create-comment.message.js';

export class CreateCommentDto {
  @IsString({message: CreateCommentValidationMessage.description.invalidFormat})
  @Length(5, 1024, {message: CreateCommentValidationMessage.description.lengthField})
  public description: string;

  @IsInt({message: CreateCommentValidationMessage.rating.invalidFormat})
  @Min(1, {message: CreateCommentValidationMessage.rating.minValue})
  @Max(5, {message: CreateCommentValidationMessage.rating.minValue})
  public rating: number;

  @IsMongoId({message: CreateCommentValidationMessage.authorId.invalidFormat})
  public authorId: string;

  @IsMongoId({message: CreateCommentValidationMessage.offerId.invalidFormat})
  public offerId: string;
}
