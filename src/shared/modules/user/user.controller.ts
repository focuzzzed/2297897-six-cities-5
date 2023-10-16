import {BaseController, HttpMethods} from '../../libs/rest/index.js';
import {Components} from '../../types/index.js';
import {inject} from 'inversify';
import {Logger} from '../../libs/logger/index.js';
import {Request, Response} from 'express';
import {UserService} from './user-service.interface.js';

export class UserController extends BaseController {
  constructor(
    @inject(Components.Logger) protected readonly logger: Logger,
    @inject(Components.UserService) protected readonly userService: UserService
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

    this.ok(res, user);
  }

  public create(_req: Request, _res: Response): void {
    //TODO: Доработать
  }
}
