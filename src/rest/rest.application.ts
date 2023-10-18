import {Logger} from '../shared/libs/logger/index.js';
import {Config, RestSchema} from '../shared/libs/config/index.js';
import {inject, injectable} from 'inversify';
import {Components} from '../shared/types/index.js';
import {DatabaseClient} from '../shared/libs/database-client/index.js';
import {getMongoURI} from '../shared/helpers/index.js';
import express, {Express} from 'express';
import {Controller} from '../shared/libs/rest/index.js';

@injectable()
export class RestApplication {
  private server: Express;

  constructor(
    @inject(Components.Logger) private readonly logger: Logger,
    @inject(Components.Config) private readonly config: Config<RestSchema>,
    @inject(Components.DatabaseClient) private readonly databaseClient: DatabaseClient,
    @inject(Components.UserController) private readonly userController: Controller,
    @inject(Components.CommentController) private readonly commentController: Controller,
    @inject(Components.OfferController) private readonly offerController: Controller,
  ) {
    this.server = express();
  }

  private initDb() {
    const mongoUri = getMongoURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );

    return this.databaseClient.connect(mongoUri);
  }

  private async initServer() {
    const port = this.config.get('PORT');
    this.server.listen(port);
  }

  private async initControllers() {
    this.server.use('/offers', this.offerController.router);
    this.server.use('/users', this.userController.router);
    this.server.use('/comments', this.commentController.router);
  }

  private async initMiddleware() {
    this.server.use(express.json());
  }

  public async init(): Promise<void> {
    this.logger.info('Application Initialization');

    this.logger.info('Initializing the database...');
    await this.initDb();
    this.logger.info('Database is initialized');

    this.logger.info('Init app-level middleware');
    await this.initMiddleware();
    this.logger.info('Controller initialization completed');

    this.logger.info('Initializing controllers...');
    await this.initControllers();
    this.logger.info('Controller initialization completed');

    this.logger.info('Try to init server...');
    await this.initServer();
    this.logger.info(`Server started on http://localhost:${this.config.get('PORT')}`);
  }
}
