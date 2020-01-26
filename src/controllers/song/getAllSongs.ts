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
  devLogger('FINDING ALL SONGS', '');
  try {
    const doc = await Song.find();
    if (!doc) {
      return errorHandler(res, 404, ErrorMessages.NO_DOCUMENTS);
    }
    res.locals.httpReply = {
      message: SuccessMessages.ALL_DOCUMENTS_RETRIEVED,
      data: doc,
    };
    return next();
  } catch (err) {
    return errorHandler(res, 500, JSON.stringify(err));
  }
};

const production = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  devLogger('FINDING ALL SONGS', '');
  try {
    const doc = await Song.find();
    if (!doc) {
      return errorHandler(res, 404, ErrorMessages.NO_DOCUMENTS);
    }
    res.locals.httpReply = {
      message: SuccessMessages.ALL_DOCUMENTS_RETRIEVED,
      data: doc,
    };
    return next();
  } catch (err) {
    return errorHandler(res, 500, JSON.stringify(err));
  }
};

const middleware = {
  [EnvTypes.PROD]: production,
  [EnvTypes.DEV]: development,
  [EnvTypes.TEST]: development,
};

export default middleware[environment];
