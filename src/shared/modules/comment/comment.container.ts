import {Container} from 'inversify';
import {types} from '@typegoose/typegoose';
import {CommentEntity, CommentModel} from './comment.entity.js';
import {Components} from '../../types/index.js';
import {CommentService} from './comment-service.interface.js';
import {DefaultCommentService} from './default-comment.service.js';
import {Controller} from '../../libs/rest/index.js';
import {CommentController} from './comment.controller.js';

export function createCommentContainer() {
  const commentContainer = new Container();

  commentContainer.bind<CommentService>(Components.CommentService).to(DefaultCommentService);
  commentContainer.bind<types.ModelType<CommentEntity>>(Components.CommentModel).toConstantValue(CommentModel);
  commentContainer.bind<Controller>(Components.CommentController).to(CommentController).inSingletonScope();

  return commentContainer;
}
