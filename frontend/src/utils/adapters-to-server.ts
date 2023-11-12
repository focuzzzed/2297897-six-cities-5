import {CreateCommentDto} from '../dto';
import {CommentAuth} from '../types';

export const adaptCreateCommentToServer = (comment: CommentAuth): CreateCommentDto => ({
  description: comment.comment,
  rating: comment.rating,
  offerId: comment.id,
});
