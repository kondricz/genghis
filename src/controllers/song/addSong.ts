import * as mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';

import Song from '../../model/song';
import { devLogger, errorHandler } from '../../utils';
import { EnvTypes, environment } from '../../constants/constants';

const development = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const songID = new mongoose.Types.ObjectId();
  const song = new Song({
    _id: songID,
    ...res.locals.body,
  });
  devLogger('CREATING A NEW SONG', JSON.stringify(songID));
  try {
    const doc = await song.save();
    res.locals.httpReply = {
      message: 'DOCUMENT HAS CREATED SUCCESSFULLY',
      data: doc._id,
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
  const songID = new mongoose.Types.ObjectId();
  const song = new Song({
    _id: songID,
    ...res.locals.body,
  });
  devLogger('CREATING A NEW SONG', JSON.stringify(songID));
  try {
    const doc = await song.save();
    res.locals.httpReply = {
      message: 'DOCUMENT HAS CREATED SUCCESSFULLY',
      data: doc._id,
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
