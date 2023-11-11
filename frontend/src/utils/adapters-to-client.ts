import {CommentDto, OfferDto, OfferPreviewDto, UserDto} from '../dto';
import {Comment, Offer, OfferPreview, PlacesTypes, Type, User} from '../types';
import {CityLocation} from '../const';

const adaptPlaceType = (type: PlacesTypes): Type => {
  switch (type){
    case PlacesTypes.Apartment:
      return 'apartment';
    case PlacesTypes.House:
      return 'house';
    case PlacesTypes.Room:
      return 'room';
    case PlacesTypes.Hotel:
      return 'hotel';
    default:
      throw new Error(`Unknown type ${type}`);
  }
};

export const adaptUserToClient = (user: UserDto): User => ({
  name: user.name,
  avatarUrl: user.avatarUrl,
  type: user.type,
  email: user.email,
});

export const adaptOfferToClient = (offer: OfferDto): Offer => ({
  id: offer.id,
  price: offer.price,
  rating: offer.rating,
  title: offer.name,
  isPremium: offer.isPremium,
  isFavorite: offer.isFavorite,
  city: {
    name: offer.city,
    location: CityLocation[offer.city]
  },
  location: offer.location,
  previewImage: offer.previewImage,
  type: adaptPlaceType(offer.type),
  bedrooms: offer.roomsAmount,
  description: offer.description,
  goods: offer.conveniences,
  host: offer.author,
  images: offer.placeImages,
  maxAdults: offer.guestsAmount,
});

export const adaptOfferPreviewToClient = (offer: OfferPreviewDto): OfferPreview => ({
  id: offer.id,
  price: offer.price,
  rating: offer.rating,
  title: offer.name,
  isPremium: offer.isPremium,
  isFavorite: offer.isFavorite,
  city: {
    name: offer.city,
    location: CityLocation[offer.city]
  },
  previewImage: offer.previewImage,
  type: adaptPlaceType(offer.type),
  location: offer.location,
});

export const adaptOffersToClient = (offers: OfferPreviewDto[]): OfferPreview[] =>
  offers.map((offer) => adaptOfferPreviewToClient(offer));

export const adaptCommentToClient = (comment: CommentDto): Comment => ({
  id: comment.id,
  comment: comment.description,
  date: comment.postDate,
  rating: comment.rating,
  user: comment.author,
});

export const adaptCommentsToClient = (comments: CommentDto[]): Comment[] =>
  comments.map((comment) => adaptCommentToClient(comment));
