import {CommentDto, OfferDto, OfferPreviewDto,} from '../dto';
import {Comment, HouseTypes, Offer, OfferPreview, PlacesTypes, Type} from '../types';
import {CityLocation} from '../const';

const adaptPlaceType = (type: PlacesTypes): Type => {
  switch (type){
    case PlacesTypes.Apartment:
      return HouseTypes.Apartment;
    case PlacesTypes.House:
      return HouseTypes.Room;
    case PlacesTypes.Room:
      return HouseTypes.Room;
    case PlacesTypes.Hotel:
      return HouseTypes.Hotel;
    default:
      throw new Error(`Unknown type ${type}`);
  }
};

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
