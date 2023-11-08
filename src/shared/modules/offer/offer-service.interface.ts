import {DocumentType} from '@typegoose/typegoose';

import {Cities, DocumentExists, IsDocumentAuthor} from '../../types/index.js';
import {CreateOfferDto} from './dto/create-offer.dto.js';
import {UpdateOfferDto} from './dto/update-offer.dto.js';
import {OfferEntity} from './offer.entity.js';

export interface OfferService extends DocumentExists, IsDocumentAuthor{
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findById(offerId: string, userId?: string): Promise<DocumentType<OfferEntity> | null>;
  findPremiumByCity(city: Cities, userId?: string): Promise<DocumentType<OfferEntity>[]>
  find(count?: number, userId?: string): Promise<DocumentType<OfferEntity>[]>;
  findFavorites(authorId: string): Promise<DocumentType<OfferEntity>[] | null>;
  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null>;
  incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  exists(documentId: string): Promise<boolean>;
  isAuthor(userId: string, documentId: string): Promise<boolean>;
}
