import crypto from 'node:crypto';

import {NextFunction, Request, Response} from 'express';
import {extension} from 'mime-types';
import multer, {diskStorage} from 'multer';

import {filterUploadMiddlewareFile} from '../../../helpers/index.js';
import {Middleware} from './middleware.interface.js';

export class UploadFilesMiddleware implements Middleware {
  constructor(
    private uploadDirectory: string,
    private fieldName: string,
  ) {}

  public async execute(req: Request, res: Response, next: NextFunction) {
    const storage = diskStorage({
      destination: this.uploadDirectory,
      filename: (_req, file, callback) => {
        const fileExtension = extension(file.mimetype);
        const filename = crypto.randomUUID();
        callback(null, `${filename}.${fileExtension}`);
      },
    });

    const uploadMultipleFilesMiddleware = multer({
      storage,
      fileFilter: filterUploadMiddlewareFile
    })
      .array(this.fieldName, 6);

    uploadMultipleFilesMiddleware(req, res, next);

  }
}
