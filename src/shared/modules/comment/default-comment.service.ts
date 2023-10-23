import {DocumentType, types} from '@typegoose/typegoose';
import {StatusCodes} from 'http-status-codes';
import {inject, injectable} from 'inversify';

import {Logger} from '../../libs/logger/index.js';
import {HttpError} from '../../libs/rest/index.js';
import {Components} from '../../types/index.js';
import {OfferEntity} from '../offer/index.js';
import {CommentEntity} from './comment.entity.js';
import {CommentService} from './comment-service.interface.js';
import {CreateCommentDto} from './dto/create-comment.dto.js';

@injectable()
export class DefaultCommentService implements CommentService{
  constructor(
    @inject(Components.Logger) private readonly logger: Logger,
    @inject(Components.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>,
    @inject(Components.UserModel) private readonly userModel: types.ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const foundedUser = await this.userModel.findById(dto.authorId);

    if(!foundedUser){
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        `User with id: «${dto.authorId}» not found`,
        'DefaultCommentService'
      );
    }

    const comment = await this.commentModel.create(dto);

    this.logger.info(`New comment for offer «${dto.offerId}» created.`);

    return comment.populate('authorId');
  }

  public async findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel
      .find({offerId})
      .populate('authorId');
  }

  public async deleteByOfferId(offerId:string): Promise<number> {
    const result = await this.commentModel
      .deleteMany({offerId})
      .exec();

    return result.deletedCount;
  }
}
