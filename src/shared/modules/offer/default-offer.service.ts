import {DocumentType, types} from '@typegoose/typegoose';
import {StatusCodes} from 'http-status-codes';
import {inject, injectable} from 'inversify';
import {Types} from 'mongoose';

import {Logger} from '../../libs/logger/index.js';
import {HttpError} from '../../libs/rest/index.js';
import {Components, SortType} from '../../types/index.js';
import {UserEntity} from '../user/index.js';
import {CreateOfferDto} from './dto/create-offer.dto.js';
import {UpdateOfferDto} from './dto/update-offer.dto.js';
import {DEFAULT_OFFER_COUNT} from './offer.constant.js';
import {OfferEntity} from './offer.entity.js';
import {OfferService} from './offer-service.interface.js';
import {OfferAggregationOperations} from './types/offer.aggregation-operations.js';

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
    const limitOperation = { $limit: limit };

    return this.offerModel
      .aggregate([
        OfferAggregationOperations.lookupCommentsOperation,
        OfferAggregationOperations.addFieldsOperation,
        OfferAggregationOperations.lookupUserOperation,
        OfferAggregationOperations.unwindUserOperation,
        OfferAggregationOperations.removeCommentsOperation,
        limitOperation,
        OfferAggregationOperations.sortOperation
      ])
      .exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (!!await this.offerModel.exists({_id: documentId}));
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    const offerMongoId = new Types.ObjectId(offerId);
    const findOperation = { $match: { _id: offerMongoId } };

    const [offer] = await this.offerModel
      .aggregate([
        findOperation,
        OfferAggregationOperations.lookupCommentsOperation,
        OfferAggregationOperations.addFieldsOperation,
        OfferAggregationOperations.lookupUserOperation,
        OfferAggregationOperations.unwindUserOperation,
        OfferAggregationOperations.removeCommentsOperation,
      ])
      .exec();
    return offer;
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
