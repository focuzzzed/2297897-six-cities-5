import {OfferGenerator} from './offer-generator.interface.js';
import {MockServerData} from '../../types/index.js';
import {getRandomItem, getRandomItems, getRandomInt} from '../../helpers/index.js';

const AMOUNT_OF_PLACE_IMAGES = 6;

const MIN_OFFER_RATING = 1;
const MAX_OFFER_RATING = 5;

const MIN_PLACE_ROOMS = 1;
const MAX_PLACE_ROOMS = 8;

const MIN_PLACE_GUESTS = 1;
const MAX_PLACE_GUESTS = 10;

const MIN_OFFER_PRICE = 100;
const MAX_OFFER_PRICE = 100000;

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
    const isPremium = Boolean(getRandomInt(0, 1));
    const isFavorite = Boolean(getRandomInt(0, 1));
    const rating = getRandomInt(MIN_OFFER_RATING, MAX_OFFER_RATING);
    const placeType = getRandomItem(this.mockData.placesTypes);
    const roomsAmount = getRandomInt(MIN_PLACE_ROOMS, MAX_PLACE_ROOMS);
    const guestsAmount = getRandomInt(MIN_PLACE_GUESTS, MAX_PLACE_GUESTS);
    const price = getRandomInt(MIN_OFFER_PRICE, MAX_OFFER_PRICE);
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
