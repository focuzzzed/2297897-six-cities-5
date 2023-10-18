import {BaseController, HttpError, HttpMethods} from '../../libs/rest/index.js';
import {Components} from '../../types/index.js';
import {inject, injectable} from 'inversify';
import {Logger} from '../../libs/logger/index.js';
import {Request, Response} from 'express';
import {UserService} from './user-service.interface.js';
import {fillDTO} from '../../helpers/index.js';
import {UserRdo} from './rdo/user.rdo.js';
import {StatusCodes} from 'http-status-codes';
import {Config, RestSchema} from '../../libs/config/index.js';
import {CreateUserRequest} from './create-user-request.type.js';
import {LoginUserRequest} from './login-user-request.type.js';

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(Components.Logger) protected readonly logger: Logger,
    @inject(Components.UserService) protected readonly userService: UserService,
    @inject(Components.Config) protected readonly config: Config<RestSchema>, //Возможно лишнее
  ) {
    super(logger);

    this.logger.info('Register routes for UserController...');

    this.addRoute({path: '/:email', method: HttpMethods.Get, handler: this.index});
    this.addRoute({path: '/register', method: HttpMethods.Post, handler: this.create});
    this.addRoute({path: '/login', method: HttpMethods.Post, handler: this.login});
  }

  public async index(req: Request, res: Response): Promise<void> {
    const user = await this.userService.findByEmail(req.params.email);

    if(!user){
      this.notFound(res, 'User is not exists');
      return;
    }

    const responseData = fillDTO(UserRdo, user);
    this.ok(res, responseData);
  }

  public async create(
    {body}: CreateUserRequest,
    res: Response
  ): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);

    if(existsUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User, with email: «${body.email}», already exists`,
        'UserController'
      );
    }

    const result = await this.userService.create(body, this.config.get('SALT'));
    this.created(res, fillDTO(UserRdo, result));
  }

  public async login(
    {body}: LoginUserRequest,
    _res: Response
  ) {
    const existsUser = await this.userService.findByEmail(body.email);

    if(!existsUser){
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        `User with email ${body.email} not found.`,
        'UserController'
      );
    }

    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'UserController'
    );
  }
}
