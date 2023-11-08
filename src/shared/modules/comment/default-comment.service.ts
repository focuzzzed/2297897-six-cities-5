import {DocumentType, types} from '@typegoose/typegoose';
import {inject, injectable} from 'inversify';

import {Logger} from '../../libs/logger/index.js';
import {Components, SortType} from '../../types/index.js';
import {DEFAULT_COMMENT_COUNT} from './comment.constant.js';
import {CommentEntity} from './comment.entity.js';
import {CommentService} from './comment-service.interface.js';
import {CreateCommentDto} from './dto/create-comment.dto.js';

@injectable()
export class DefaultCommentService implements CommentService{
  constructor(
    @inject(Components.Logger) private readonly logger: Logger,
    @inject(Components.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>,
  ) {}

  public async exists(documentId: string): Promise<boolean> {
    return (!!await this.commentModel.exists({_id: documentId}));
  }

  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const comment = await this.commentModel.create(dto);
    this.logger.info(`New comment for offer «${dto.offerId}» created.`);
    return comment.populate('authorId');
  }

  public async findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel
      .find({offerId})
      .sort({createdAt: SortType.Down})
      .limit(DEFAULT_COMMENT_COUNT)
      .populate('authorId');
  }

  public async deleteByOfferId(offerId:string): Promise<number> {
    const result = await this.commentModel
      .deleteMany({offerId})
      .exec();

    return result.deletedCount;
  }
}
