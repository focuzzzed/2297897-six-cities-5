import {Cities, Conveniences, Offer, PlacesTypes, UserTypes} from '../types/index.js';
import {getBooleanFromString} from './common.js';

export function createOffer(offerData: string): Offer {
  const [
    name, description, date,
    city, previewImage, placeImages,
    isPremium, isFavorite, rating,
    type, roomsAmount, guestsAmount,
    price, conveniences, authorName,
    email, avatarUrl, password,
    userType, latitude, longitude
  ] = offerData.replace('\n', '').split('\t');

  const author = {
    name: authorName,
    email,
    avatarUrl,
    password,
    type: userType as UserTypes,
    favoriteOffers: []
  };

  return {
    name,
    description,
    postDate: date,
    city: city as Cities,
    previewImage,
    placeImages: placeImages.split(';'),
    isPremium: getBooleanFromString(isPremium),
    isFavorite: getBooleanFromString(isFavorite),
    rating: Number(rating),
    type: type as PlacesTypes,
    roomsAmount: Number(roomsAmount),
    guestsAmount: Number(guestsAmount),
    price: Number(price),
    conveniences: conveniences.split(';') as Conveniences[],
    author,
    location: {latitude: Number(latitude), longitude: Number(longitude)},
  };
}
