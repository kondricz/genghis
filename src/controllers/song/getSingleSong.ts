import { Request, Response, NextFunction } from 'express';

import Song from '../../model/song';
import { devLogger } from '../../utils';
import { EnvTypes, environment } from '../../constants/constants';

const development = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { songID } = res.locals;
  devLogger('FINDING SINGLE SONG', songID);
  try {
    const doc = await Song.findById(songID);
    if (!doc) {
      return next({
        message: `${songID} could not have been found.`,
      });
    }
    res.locals.httpReply = {
      message: `${songID} has been retrieved`,
      data: doc,
    };
    return next();
  } catch (err) {
    return next(err);
  }
};

const production = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { songID } = res.locals;
  devLogger('FINDING SINGLE SONG', songID);
  try {
    const doc = await Song.findById(songID);
    if (!doc) {
      return next({
        message: `${songID} could not have been found.`,
      });
    }
    res.locals.httpReply = {
      message: `${songID} has been retrieved`,
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
