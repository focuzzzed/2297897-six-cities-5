import {DocumentType, types} from '@typegoose/typegoose';
import {StatusCodes} from 'http-status-codes';
import {inject, injectable} from 'inversify';

import {Logger} from '../../libs/logger/index.js';
import {HttpError} from '../../libs/rest/index.js';
import {Components, SortType} from '../../types/index.js';
import {UserEntity} from '../user/index.js';
import {CreateOfferDto} from './dto/create-offer.dto.js';
import {UpdateOfferDto} from './dto/update-offer.dto.js';
import {DEFAULT_OFFER_COUNT} from './offer.constant.js';
import {OfferEntity} from './offer.entity.js';
import {OfferService} from './offer-service.interface.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Components.Logger) private readonly logger: Logger,
    @inject(Components.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>,
    @inject(Components.UserModel) private readonly userModel: types.ModelType<UserEntity>
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const foundedUser = await this.userModel.findById(dto.authorId);

    if(!foundedUser){
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        `User with id: «${dto.authorId}» not exists`,
        'DefaultOfferService'
      );
    }

    const result = await this.offerModel.create(dto);

    this.logger.info(`New offer created: ${dto.name}`);

    return result;
  }

  public async find(count?: number): Promise<DocumentType<OfferEntity>[]> {
    const limit = count ?? DEFAULT_OFFER_COUNT;

    const lookupUserOperation = {
      $lookup: {
        from: 'users',
        localField: 'authorId',
        foreignField: '_id',
        as: 'authorId',
      }
    };

    const unwindUserOperation = {
      $unwind: {
        path: '$authorId',
        preserveNullAndEmptyArrays: true,
      }
    };

    const lookupCommentsOperation = {
      $lookup: {
        from: 'comments',
        localField: '_id',
        foreignField: 'offerId',
        as: 'comments',
      },
    };

    const addFieldsOperation = {
      $addFields: {
        rating: {
          $divide: [
            {
              $reduce: {
                input: '$comments',
                initialValue: 0,
                in: { $add: ['$$value', '$$this.rating'] },
              },
            },
            {
              $cond: {
                if: {$ne: [{$size: '$comments'}, 0]},
                then: {$size: '$comments'},
                else: 1
              },
            },
          ],
        },
        commentsCount: { $size: '$comments' },
        id: {$toString: '$_id'}
      },
    };

    const removeCommentsOperation = { $unset: 'comments'};

    const limitOperation = { $limit: limit };

    const sortOperation = { $sort: { createdAt: SortType.Down } };

    return this.offerModel
      .aggregate([
        lookupCommentsOperation,
        addFieldsOperation,
        lookupUserOperation,
        unwindUserOperation,
        removeCommentsOperation,
        limitOperation,
        sortOperation
      ])
      .exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel.exists({_id: documentId}) !== null);
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findById(offerId)
      .populate('authorId')
      .exec();
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  public async updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    if(dto.authorId){
      const author = await this.userModel.findById(dto.authorId);

      if(!author){
        throw new HttpError(
          StatusCodes.BAD_REQUEST,
          `Author with id «${dto.authorId}» not exists`,
          'DefaultOfferService'
        );
      }
    }

    return this.offerModel
      .findByIdAndUpdate(offerId, dto, {new: true})
      .populate('authorId')
      .exec();
  }

  public async incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {'$inc': {
        commentsCount: 1,
      }}).exec();
  }

  public async findNew(count: number): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find()
      .sort({ createdAt: SortType.Down })
      .limit(count)
      .populate('authorId')
      .exec();
  }

  public async findPopular(count: number): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find()
      .sort({ commentsCount: SortType.Down })
      .limit(count)
      .populate('authorId')
      .exec();
  }
}
