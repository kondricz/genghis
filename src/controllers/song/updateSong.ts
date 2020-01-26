import { Request, Response, NextFunction } from 'express';

import Song from '../../model/song';
import { devLogger, errorHandler } from '../../utils';
import { EnvTypes, environment } from '../../constants/environments';
import { SuccessMessages, ErrorMessages } from '../../constants/responses';

const development = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const { songID, body } = res.locals;
  devLogger('UPDATE A SINGLE SONG', songID);
  try {
    const doc = await Song.findOneAndUpdate({ _id: songID }, body, { new: true });
    if (!doc) {
      return errorHandler(res, 404, songID + ErrorMessages.DOCUMENT_NOT_FOUND);
    }
    res.locals.httpReply = {
      message: songID + SuccessMessages.DOCUMENT_UPDATED,
      data: doc,
    };
    return next();
  } catch (err) {
    return errorHandler(res, 404, songID + ErrorMessages.DOCUMENT_NOT_FOUND);
  }
};

const production = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const { songID, body } = res.locals;
  devLogger('UPDATE A SINGLE SONG', songID);
  try {
    const doc = await Song.findOneAndUpdate({ _id: songID }, body, { new: true });
    if (!doc) {
      return errorHandler(res, 404, songID + ErrorMessages.DOCUMENT_NOT_FOUND);
    }
    res.locals.httpReply = {
      message: songID + SuccessMessages.DOCUMENT_UPDATED,
      data: doc,
    };
    return next();
  } catch (err) {
    return errorHandler(res, 404, songID + ErrorMessages.DOCUMENT_NOT_FOUND);
  }
};

const middleware = {
  [EnvTypes.PROD]: production,
  [EnvTypes.DEV]: development,
  [EnvTypes.TEST]: development,
};

export default middleware[environment];
