import {types} from '@typegoose/typegoose';
import {Container} from 'inversify';

import {Controller} from '../../libs/rest/index.js';
import {Components} from '../../types/index.js';
import {CommentController} from './comment.controller.js';
import {CommentEntity, CommentModel} from './comment.entity.js';
import {CommentService} from './comment-service.interface.js';
import {DefaultCommentService} from './default-comment.service.js';

export function createCommentContainer() {
  const commentContainer = new Container();

  commentContainer.bind<CommentService>(Components.CommentService).to(DefaultCommentService);
  commentContainer.bind<types.ModelType<CommentEntity>>(Components.CommentModel).toConstantValue(CommentModel);
  commentContainer.bind<Controller>(Components.CommentController).to(CommentController).inSingletonScope();

  return commentContainer;
}
