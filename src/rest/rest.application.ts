import cors from 'cors';
import express, {Express} from 'express';
import {inject, injectable} from 'inversify';

import {getFullServerPath, getMongoURI} from '../shared/helpers/index.js';
import {Config, RestSchema} from '../shared/libs/config/index.js';
import {DatabaseClient} from '../shared/libs/database-client/index.js';
import {Logger} from '../shared/libs/logger/index.js';
import {ExceptionFilter, ParseTokenMiddleware} from '../shared/libs/rest/index.js';
import {Controller} from '../shared/libs/rest/index.js';
import {Components} from '../shared/types/index.js';
import {STATIC_ROUTES} from './rest.constant.js';

@injectable()
export class RestApplication {
  private server: Express = express();

  constructor(
    @inject(Components.Logger) private readonly logger: Logger,
    @inject(Components.Config) private readonly config: Config<RestSchema>,
    @inject(Components.DatabaseClient) private readonly databaseClient: DatabaseClient,
    @inject(Components.UserController) private readonly userController: Controller,
    @inject(Components.CommentController) private readonly commentController: Controller,
    @inject(Components.OfferController) private readonly offerController: Controller,
    @inject(Components.ExceptionFilter) private readonly appExceptionFilter: ExceptionFilter,
    @inject(Components.AuthExceptionFilter) private readonly authExceptionFilter: ExceptionFilter,
    @inject(Components.HttpExceptionFilter) private readonly httpExceptionFilter: ExceptionFilter,
    @inject(Components.ValidationExceptionFilter) private readonly validationExceptionFilter: ExceptionFilter,
  ) {}

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
    const authenticateMiddleware = new ParseTokenMiddleware(this.config.get('JWT_SECRET'));

    this.server.use(express.json());
    this.server.use(
      STATIC_ROUTES.UPLOAD,
      express.static(this.config.get('UPLOAD_DIRECTORY')),
    );
    this.server.use(
      STATIC_ROUTES.FILES,
      express.static(this.config.get('STATIC_DIRECTORY_PATH'))
    );
    this.server.use(authenticateMiddleware.execute.bind(authenticateMiddleware));
    this.server.use(cors());
  }

  private async initExceptionFilter() {
    this.server.use(this.authExceptionFilter.catch.bind(this.authExceptionFilter));
    this.server.use(this.validationExceptionFilter.catch.bind(this.validationExceptionFilter));
    this.server.use(this.httpExceptionFilter.catch.bind(this.httpExceptionFilter));
    this.server.use(this.appExceptionFilter.catch.bind(this.appExceptionFilter));
  }

  public async init(): Promise<void> {
    this.logger.info('Application Initialization');

    this.logger.info('Initializing the database...');
    await this.initDb();
    this.logger.info('Database is initialized');

    this.logger.info('Initializing app-level middleware...');
    await this.initMiddleware();
    this.logger.info('App-level middleware initialization completed');

    this.logger.info('Initializing controllers...');
    await this.initControllers();
    this.logger.info('Controller initialization completed');

    this.logger.info('Initializing exception filters...');
    await this.initExceptionFilter();
    this.logger.info('Exception filters initialization completed');

    this.logger.info('Try to init server...');
    await this.initServer();
    this.logger.info(`Server started on ${getFullServerPath(this.config.get('PROTOCOL'), this.config.get('HOST'), this.config.get('PORT'))}`);
  }
}
