import {BaseController, HttpMethods} from '../../libs/rest/index.js';
import {Components} from '../../types/index.js';
import {inject, injectable} from 'inversify';
import {Logger} from '../../libs/logger/index.js';
import {Request, Response} from 'express';
import {UserService} from './user-service.interface.js';
import {fillDTO} from '../../helpers/index.js';
import {UserRdo} from './rdo/user.rdo.js';
import {CreateUserDto} from './dto/create-user.dto.js';
import {StatusCodes} from 'http-status-codes';
import {Config, RestSchema} from '../../libs/config/index.js';

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
    this.addRoute({path: '/', method: HttpMethods.Post, handler: this.create});
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
    {body}: Request<Record<string, unknown>, Record<string, unknown>, CreateUserDto>,
    res: Response
  ): Promise<void> {
    const existUser = await this.userService.findByEmail(body.email);

    if(existUser) {
      const existsUserError = new Error(`User with email: ${body.email} already exists`);
      this.send(
        res,
        StatusCodes.UNPROCESSABLE_ENTITY,
        {error: existsUserError.message}
      );

      return this.logger.error(existsUserError, existsUserError.message);
    }

    const result = await this.userService.create(body, this.config.get('SALT'));
    this.created(res, fillDTO(UserRdo, result));
  }
}
