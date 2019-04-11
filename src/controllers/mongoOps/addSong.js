import mongoose from 'mongoose';

import Song from '../../model/song';
import { devLogger } from '../../utils';
import { production, development, environment } from '../../constants';

const dev = (req, res, next) => {
  const songID = new mongoose.Types.ObjectId();
  devLogger('CREATING A NEW SONG', songID);
  const song = new Song({
    _id: songID,
    ...res.locals.body
  });
  return song
    .save()
    .then(doc => {
      res.locals.httpReply = {
        message: 'DOCUMENT HAS CREATED SUCCESSFULLY',
        data: doc._id
      };
      return next();
    })
    .catch(err => next(err));
};

const prod = (req, res, next) => {
  const songID = new mongoose.Types.ObjectId();
  devLogger('CREATING A NEW SONG', songID);
  const song = new Song({
    _id: songID,
    ...res.locals.body
  });
  return song
    .save()
    .then(doc => {
      console.log(doc);
      res.locals.httpReply = {
        message: 'DOCUMENT HAS CREATED SUCCESSFULLY',
        data: doc._id
      };
      return next();
    })
    .catch(err => next(err));
};

const middleware = {
  [production]: prod,
  [development]: dev
};

export default middleware[environment];
