import {Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import {inject, injectable} from 'inversify';

import {fillDTO} from '../../helpers/index.js';
import {Config, RestSchema} from '../../libs/config/index.js';
import {Logger} from '../../libs/logger/index.js';
import {
  BaseController,
  DocumentExistsMiddleware,
  HttpError,
  HttpMethods, PrivateRouteMiddleware, UploadFileMiddleware,
  ValidateDtoMiddleware, ValidateObjectIdMiddleware
} from '../../libs/rest/index.js';
import {Components} from '../../types/index.js';
import {AuthService} from '../auth/index.js';
import {CreateUserDto} from './dto/create-user.dto.js';
import {LoginUserDto} from './dto/login-user.dto.js';
import {UpdateUserDto} from './dto/update-user.dto.js';
import {LoginUserRequest} from './login-user-request.type.js';
import {LoggedUserRdo} from './rdo/logged-user.rdo.js';
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
    @inject(Components.AuthService) protected readonly authService: AuthService
  ) {
    super(logger);

    this.logger.info('Register routes for UserController...');

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
      path: '/login',
      method: HttpMethods.Get,
      handler: this.checkAuthenticate,
      middlewares: [
        new PrivateRouteMiddleware(),
      ]
    });

    this.addRoute({
      path: '/:userId',
      method: HttpMethods.Patch,
      handler: this.update,
      middlewares: [
        new ValidateDtoMiddleware(UpdateUserDto),
        new DocumentExistsMiddleware(this.userService, 'User', 'userId')
      ]
    });

    this.addRoute({
      path: '/:userId/avatar',
      method: HttpMethods.Patch,
      handler: this.uploadAvatar,
      middlewares: [ //TODO: Только авторизованным?
        new ValidateObjectIdMiddleware('userId'),
        new DocumentExistsMiddleware(this.userService, 'User', 'userId'),
        new UploadFileMiddleware(this.config.get('UPLOAD_DIRECTORY'), 'avatar'),
      ]
    });
  }


  public async checkAuthenticate({tokenPayload: {email}}: Request, res: Response){
    const foundedUser = await this.userService.findByEmail(email);

    if(!foundedUser) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'UserController'
      );
    }

    this.ok(res, fillDTO(UserRdo, foundedUser));
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
    res: Response
  ) {
    const user = await this.authService.verify(body);
    const token = await this.authService.authenticate(user);
    const responseData = fillDTO(LoggedUserRdo, {
      email: user.email,
      token
    });

    this.ok(res, responseData);
  }


  public async update(
    {body, params}: Request<ParamUserId, unknown, UpdateUserDto>,
    res: Response
  ){
    const {userId} = params;
    const updatedUser = await this.userService.updateById(userId, body);

    this.ok(res, fillDTO(UserRdo, updatedUser));
  }

  public async uploadAvatar(req: Request, res: Response) {
    this.created(res, {
      filepath: req.file?.path
    });
  }
}
