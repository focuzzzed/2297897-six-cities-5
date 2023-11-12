import {generateRandomValue, getRandomBoolean, getRandomItem, getRandomItems} from '../../helpers/index.js';
import {MockServerData} from '../../types/index.js';
import {
  AMOUNT_OF_PLACE_IMAGES,
  AvailablePlaceRooms, DEFAULT_OFFER_FAVORITE_STATUS, DEFAULT_OFFER_RATING,
  PlaceGuestsAmount,
  PlaceRentPrices, PREMIUM_OFFER_STATUS_REVEAL
} from './const.js';
import {OfferGenerator} from './offer-generator.interface.js';


export class TSVOfferGenerator implements OfferGenerator {
  constructor(
    private readonly mockData: MockServerData,
  ) {}

  public generate(): string {
    const name = getRandomItem(this.mockData.names);
    const description = getRandomItem(this.mockData.descriptions);
    const date = new Date().toISOString();
    const city = getRandomItem(this.mockData.cities);
    const previewImage = getRandomItem(this.mockData.previewImages);
    const placeImages = getRandomItems(this.mockData.placeImages, AMOUNT_OF_PLACE_IMAGES).join(';');
    const isPremium = getRandomBoolean(PREMIUM_OFFER_STATUS_REVEAL);
    const isFavorite = DEFAULT_OFFER_FAVORITE_STATUS;
    const rating = DEFAULT_OFFER_RATING;
    const placeType = getRandomItem(this.mockData.placesTypes);
    const roomsAmount = generateRandomValue(AvailablePlaceRooms.Min, AvailablePlaceRooms.Max);
    const guestsAmount = generateRandomValue(PlaceGuestsAmount.Min, PlaceGuestsAmount.Max);
    const price = generateRandomValue(PlaceRentPrices.Min, PlaceRentPrices.Max);
    const conveniences = getRandomItems(this.mockData.conveniences).join(';');
    const username = getRandomItem(this.mockData.usernames);
    const email = getRandomItem(this.mockData.emails);
    const avatar = getRandomItem(this.mockData.avatars);
    const password = getRandomItem(this.mockData.passwords);
    const userType = getRandomItem(this.mockData.userTypes);
    const latitude = getRandomItem(this.mockData.coordinates);
    const longitude = getRandomItem(this.mockData.coordinates);

    return [
      name, description, date, city,
      previewImage, placeImages, isPremium,
      isFavorite, rating, placeType,
      roomsAmount, guestsAmount, price,
      conveniences, username, email,
      avatar, password, userType, latitude,
      longitude
    ].join('\t');
  }
}
