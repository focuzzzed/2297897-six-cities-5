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
  HttpMethods,
  PrivateRouteMiddleware,
  UploadFileMiddleware,
  ValidateDtoMiddleware,
  ValidateObjectIdMiddleware
} from '../../libs/rest/index.js';
import {Components} from '../../types/index.js';
import {AuthService} from '../auth/index.js';
import {OfferService} from '../offer/index.js';
import {OfferRdo} from '../offer/rdo/offer.rdo.js';
import {ParamOfferId} from '../offer/types/param-offerid.type.js';
import {CreateUserDto} from './dto/create-user.dto.js';
import {FavoriteOfferDto} from './dto/favorite-offer.dto.js';
import {LoginUserDto} from './dto/login-user.dto.js';
import {UpdateUserDto} from './dto/update-user.dto.js';
import {LoginUserRequest} from './login-user-request.type.js';
import {LoggedUserRdo} from './rdo/logged-user.rdo.js';
import {UploadUserAvatarRdo} from './rdo/upload-user-avatar.rdo.js';
import {UserRdo} from './rdo/user.rdo.js';
import {CreateUserRequest} from './types/create-user-request.type.js';
import {ParamUserId} from './types/param-userid.types.js';
import {UserService} from './user-service.interface.js';

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(Components.Logger) protected readonly logger: Logger,
    @inject(Components.UserService) protected readonly userService: UserService,
    @inject(Components.OfferService) protected readonly offerService: OfferService,
    @inject(Components.Config) protected readonly config: Config<RestSchema>,
    @inject(Components.AuthService) protected readonly authService: AuthService
  ) {
    super(logger);

    this.logger.info('Register routes for UserController...');

    this.addRoute({
      path: '/favorite/:offerId',
      method: HttpMethods.Patch,
      handler: this.updateFavorites,
      middlewares: [
        new PrivateRouteMiddleware(),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
        new ValidateDtoMiddleware(FavoriteOfferDto)
      ]
    });

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
      path: '/:email',
      method: HttpMethods.Get,
      handler: this.show,
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
      middlewares: [
        new ValidateObjectIdMiddleware('userId'),
        new DocumentExistsMiddleware(this.userService, 'User', 'userId'),
        new UploadFileMiddleware(this.config.get('UPLOAD_DIRECTORY'), 'avatar'),
      ]
    });
  }

  public async show({params: {email}}: Request, res: Response) {
    const user = await this.userService.findByEmail(email);

    if(!user) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `User, with email «${email}», not exists`,
        'UserController'
      );
    }

    this.ok(res, fillDTO(UserRdo, user));
  }

  public async checkAuthenticate({tokenPayload: {email}}: Request, res: Response){
    const user = await this.userService.findByEmail(email);

    if(!user) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'UserController'
      );
    }

    this.ok(res, fillDTO(UserRdo, user));
  }

  public async create(
    {body, tokenPayload}: CreateUserRequest,
    res: Response
  ): Promise<void> {
    if(tokenPayload){
      throw new HttpError(
        StatusCodes.FORBIDDEN,
        'An authorized user cannot create a new one',
        'UserController'
      );
    }

    const existsUser = await this.userService.findByEmail(body.email);

    if(existsUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User, with email «${body.email}», already exists`,
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

    const responseData = fillDTO(LoggedUserRdo, Object.assign(user, {token}));

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

  public async uploadAvatar({params, file}: Request, res: Response) {
    if(!file) {
      throw new HttpError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        'No file selected for upload',
        'UserController',
      );
    }

    const {userId} = params;
    const updateDto = {avatarUrl: file.filename};
    await this.userService.updateById(userId, updateDto);
    this.created(res, fillDTO(UploadUserAvatarRdo, updateDto));
  }

  public async updateFavorites(
    {body, params, tokenPayload: {id, email}}: Request<ParamOfferId>,
    res: Response
  ) {
    const user = await this.userService.findByEmail(email);
    const favorites = new Set(user!.favoriteOffers.map((offer) => offer.toString()));

    if(body.isFavorite){
      favorites.add(params.offerId);
    } else {
      favorites.delete(params.offerId);
    }

    await this.userService.updateById(id, {favoriteOffers: [...favorites]});
    const updatedFavoriteOffer = await this.offerService.findById(params.offerId);

    this.ok(res, fillDTO(OfferRdo, updatedFavoriteOffer));
  }
}
