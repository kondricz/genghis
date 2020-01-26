import { Request, Response, NextFunction } from 'express';

import Song from '../../model/song';
import { devLogger } from '../../utils';
import { EnvTypes, environment } from '../../constants/constants';

const development = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { songID } = res.locals;
  devLogger('DELETE A SINGLE SONG', songID);
  try {
    const doc = await Song.findOneAndRemove({ _id: songID });
    if (!doc) {
      return next({
        message: `${songID} could not have been found.`,
      });
    }
    res.locals.httpReply = {
      message: `${songID} has been removed`,
      data: {},
    };
    return next();
  } catch (err) {
    return next({
      message: `${songID} could not have been found.`,
    });
  }
};

const production = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { songID } = res.locals;
  devLogger('DELETE A SINGLE SONG', songID);
  try {
    const doc = await Song.findOneAndRemove({ _id: songID });
    if (!doc) {
      return next({
        message: `${songID} could not have been found.`,
      });
    }
    res.locals.httpReply = {
      message: `${songID} has been removed`,
      data: {},
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
