import {DocumentType, types} from '@typegoose/typegoose';
import {inject, injectable} from 'inversify';

import {Logger} from '../../libs/logger/index.js';
import {Components} from '../../types/index.js';
import {CommentEntity} from './comment.entity.js';
import {CommentService} from './comment-service.interface.js';
import {CreateCommentDto} from './dto/create-comment.dto.js';

@injectable()
export class DefaultCommentService implements CommentService{
  constructor(
    @inject(Components.Logger) private readonly logger: Logger,
    @inject(Components.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>,
  ) {}

  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const result = await this.commentModel.create(dto);

    this.logger.info(`New comment created: ${result.description.slice(0, 15)}...`);

    return result;
  }

  public async findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel
      .find({offerId})
      .populate('userId');
  }

  public async deleteByOfferId(offerId:string): Promise<number> {
    const result = await this.commentModel
      .deleteMany({offerId})
      .exec();

    return result.deletedCount;
  }
}
