import { Request, Response, NextFunction } from 'express';

import Song from '../../model/song';
import { devLogger } from '../../utils';
import { EnvTypes, environment } from '../../constants/constants';

const development = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { songID, body } = res.locals;
  devLogger('UPDATE A SINGLE SONG', songID);
  try {
    const doc = await Song.findOneAndUpdate({ _id: songID }, body);
    if (!doc) {
      return next({
        message: `${songID} could not have been found.`,
      });
    }
    res.locals.httpReply = {
      message: `${songID} has been updated`,
      data: doc,
    };
    return next();
  } catch (err) {
    return next(err);
  }
};

const production = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { songID, body } = res.locals;
  devLogger('UPDATE A SINGLE SONG', songID);
  try {
    const doc = await Song.findOneAndUpdate({ _id: songID }, body);
    if (!doc) {
      return next({
        message: `${songID} could not have been found.`,
      });
    }
    res.locals.httpReply = {
      message: `${songID} has been updated`,
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
