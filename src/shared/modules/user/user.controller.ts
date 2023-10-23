import {Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import {inject, injectable} from 'inversify';

import {fillDTO} from '../../helpers/index.js';
import {Config, RestSchema} from '../../libs/config/index.js';
import {Logger} from '../../libs/logger/index.js';
import {BaseController, HttpError, HttpMethods} from '../../libs/rest/index.js';
import {ValidateDtoMiddleware} from '../../libs/rest/middleware/validate-dto.middleware.js';
import {Components} from '../../types/index.js';
import {CreateUserDto} from './dto/create-user.dto.js';
import {LoginUserDto} from './dto/login-user.dto.js';
import {UpdateUserDto} from './dto/update-user.dto.js';
import {LoginUserRequest} from './login-user-request.type.js';
import {UserRdo} from './rdo/user.rdo.js';
import {CreateUserRequest} from './types/create-user-request.type.js';
import {ParamUserId} from './types/param-userid.types.js';
import {UserService} from './user-service.interface.js';

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(Components.Logger) protected readonly logger: Logger,
    @inject(Components.UserService) protected readonly userService: UserService,
    @inject(Components.Config) protected readonly config: Config<RestSchema>,
  ) {
    super(logger);

    this.logger.info('Register routes for UserController...');

    this.addRoute({path: '/:email', method: HttpMethods.Get, handler: this.index});

    this.addRoute({
      path: '/register',
      method: HttpMethods.Post,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateUserDto)]
    });

    this.addRoute({
      path: '/login',
      method: HttpMethods.Post,
      handler: this.login,
      middlewares: [new ValidateDtoMiddleware(LoginUserDto)]
    });

    this.addRoute({
      path: '/:userId',
      method: HttpMethods.Patch,
      handler: this.update,
      middlewares: [new ValidateDtoMiddleware(UpdateUserDto)]
    });
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

  public async update(
    {body, params}: Request<ParamUserId, unknown, UpdateUserDto>,
    res: Response
  ){
    const {userId} = params;
    const updatedUser = await this.userService.updateById(userId, body);

    if(!updatedUser){
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        `User with id: «${userId}» not exists`,
        'UserController'
      );
    }

    this.ok(res, fillDTO(UserRdo, updatedUser));
  }
}
