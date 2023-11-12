import {CreateCommentDto, CreateOfferDto, FavoriteOfferDto, UpdateOfferDto} from '../dto';
import {CommentAuth, HouseTypes, NewOffer, PlacesTypes, Type} from '../types';
import {getCurrentTime, isCity, isConveniences} from '../utils';

export const adaptCommentAuthToServer = (newCommentData: CommentAuth): CreateCommentDto => ({
  description: newCommentData.comment,
  rating: newCommentData.rating,
  offerId: newCommentData.id,
});

export const adaptPostFavoriteToServer = (isFavoriteStatus: boolean): FavoriteOfferDto => ({
  isFavorite: isFavoriteStatus,
});

const adaptHouseType = (type: Type): PlacesTypes => {
  switch (type){
    case HouseTypes.Apartment:
      return PlacesTypes.Apartment;
    case HouseTypes.House:
      return PlacesTypes.House;
    case HouseTypes.Room:
      return PlacesTypes.Room;
    case HouseTypes.Hotel:
      return PlacesTypes.Hotel;
    default:
      throw new Error(`Unknown type ${type}`);
  }
};

export const adaptNewOfferToServer = (newOfferData: NewOffer): CreateOfferDto => {
  isCity(newOfferData.city.name);
  isConveniences(newOfferData.goods);

  return ({
    name: newOfferData.title,
    description: newOfferData.description,
    postDate: getCurrentTime(),
    city: newOfferData.city.name,
    previewImage: newOfferData.previewImage,
    placeImages: newOfferData.images,
    isPremium: newOfferData.isPremium,
    isFavorite: false,
    type: adaptHouseType(newOfferData.type),
    roomsAmount: newOfferData.bedrooms,
    guestsAmount: newOfferData.maxAdults,
    price: newOfferData.price,
    conveniences: newOfferData.goods,
    location: newOfferData.location,
  });
};

export const adaptEditOfferToServer = (newOfferData: NewOffer): UpdateOfferDto => {
  isCity(newOfferData.city.name);
  isConveniences(newOfferData.goods);

  return ({
    name: newOfferData.title,
    description: newOfferData.description,
    city: newOfferData.city.name,
    previewImage: newOfferData.previewImage,
    placeImages: newOfferData.images,
    isPremium: newOfferData.isPremium,
    isFavorite: false,
    type: adaptHouseType(newOfferData.type),
    roomsAmount: newOfferData.bedrooms,
    guestsAmount: newOfferData.maxAdults,
    price: newOfferData.price,
    conveniences: newOfferData.goods,
    location: newOfferData.location,
  });
};
