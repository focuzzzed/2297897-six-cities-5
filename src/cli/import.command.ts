import chalk from 'chalk';

import {createOffer, getErrorMessage, getMongoURI} from '../shared/helpers/index.js';
import {DatabaseClient, MongoDatabaseClient} from '../shared/libs/database-client/index.js';
import {TSVFileReader} from '../shared/libs/file-reader/index.js';
import {ConsoleLogger, Logger} from '../shared/libs/logger/index.js';
import {DefaultOfferService, OfferModel, OfferService} from '../shared/modules/offer/index.js';
import {DefaultUserService, UserModel, UserService} from '../shared/modules/user/index.js';
import {Offer} from '../shared/types/index.js';
import {DEFAULT_DB_PORT, DEFAULT_USER_PASSWORD} from './command.constant.js';
import {Command} from './command.interface.js';

export class ImportCommand implements Command {
  private readonly name = '--import';
  private readonly logger: Logger;
  private readonly offerService: OfferService;
  private readonly userService: UserService;
  private readonly databaseClient: DatabaseClient;
  private salt: string;

  constructor() {
    this.onImportedLine = this.onImportedLine.bind(this);
    this.onCompletedImport = this.onCompletedImport.bind(this);

    this.logger = new ConsoleLogger();
    this.offerService = new DefaultOfferService(this.logger, OfferModel, UserModel);
    this.userService = new DefaultUserService(this.logger, UserModel);
    this.databaseClient = new MongoDatabaseClient(this.logger);
  }

  public getName(): string {
    return this.name;
  }

  private async onImportedLine(line: string, resolve: () => void){
    const offer = createOffer(line);
    await this.saveOffer(offer);
    resolve();
  }

  private async onCompletedImport(count: number) {
    console.info(`${count} rows imported`);
    await this.databaseClient.disconnect();
  }

  private async saveOffer(offer: Offer) {
    const user = await this.userService.findOrCreate({
      ...offer.author,
      password: DEFAULT_USER_PASSWORD
    }, this.salt);

    await this.offerService.create({
      name: offer.name,
      description: offer.description,
      postDate: offer.postDate,
      city: offer.city,
      previewImage: offer.previewImage,
      placeImages: offer.placeImages,
      isPremium: offer.isPremium,
      isFavorite: offer.isFavorite,
      type: offer.type,
      roomsAmount: offer.roomsAmount,
      guestsAmount: offer.guestsAmount,
      price: offer.price,
      conveniences: offer.conveniences,
      authorId: user.id,
      location: offer.location
    });
  }

  public async execute(
    filename: string, login: string, password: string,
    host: string, dbName: string, salt: string
  ): Promise<void> {

    const uri = getMongoURI(login, password, host, DEFAULT_DB_PORT, dbName);
    this.salt = salt;

    await this.databaseClient.connect(uri);

    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompletedImport);

    try{
      await fileReader.read();
    } catch (error: unknown) {
      console.error(chalk.red(`Can't import data from file: ${filename}`));
      console.error(chalk.red(getErrorMessage(error)));
    }
  }
}
