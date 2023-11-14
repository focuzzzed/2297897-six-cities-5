import {Request} from 'express';
import {StatusCodes} from 'http-status-codes';
import multer from 'multer';

import {HttpError} from '../libs/rest/index.js';
import {ALLOWED_IMAGE_EXTENSIONS} from '../modules/auth/index.js';

export function filterUploadMiddlewareFile(_req: Request, file: Express.Multer.File, callback: multer.FileFilterCallback) {
  if(ALLOWED_IMAGE_EXTENSIONS.includes(file.mimetype)){
    return callback(null, true);
  } else {
    const error = new HttpError(
      StatusCodes.BAD_REQUEST,
      'Can upload files with only jpeg, jpg, png extensions',
      'UploadSingleFileMiddleware'
    );
    return callback(error);
  }
}
