import {DocumentType} from '@typegoose/typegoose';

import {DocumentExists} from '../../types/index.js';
import {CommentEntity} from './comment.entity.js';
import {CreateCommentDto} from './dto/create-comment.dto.js';

export interface CommentService extends DocumentExists{
  create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>>;
  findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]>;
  deleteByOfferId(offerId: string): Promise<number | null>;
  exists(documentId: string): Promise<boolean>;
}
