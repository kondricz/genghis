import { Request, Response, NextFunction } from 'express';

import Song from '../../model/song';
import { devLogger } from '../../utils';
import { EnvTypes, environment } from '../../constants/constants';

const development = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  devLogger('FINDING ALL SONGS', '');
  try {
    const doc = await Song.find();
    if (!doc) {
      return next({
        message: 'There are no songs',
      });
    }
    res.locals.httpReply = {
      message: 'All songs have been retrieved',
      data: doc,
    };
    return next();
  } catch (err) {
    return next(err);
  }
};

const production = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  devLogger('FINDING ALL SONGS', '');
  try {
    const doc = await Song.find();
    if (!doc) {
      return next({
        message: 'There are no songs',
      });
    }
    res.locals.httpReply = {
      message: 'All songs have been retrieved',
      data: doc,
    };
    return next();
  } catch (err) {
    return next(err);
  }
};

const middleware = {
  [EnvTypes.PROD]: production,
  [EnvTypes.DEV]: development,
  [EnvTypes.TEST]: development,
};

export default middleware[environment];
