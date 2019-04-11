import Song from '../../model/song';
import { devLogger } from '../../utils';
import { production, development, environment } from '../../constants';

const dev = (req, res, next) => {
  const { songID, body } = res.locals;
  devLogger('UPDATE A SINGLE SONG', songID);
  return Song.findOneAndUpdate({ _id: songID }, body)
    .then(doc => {
      if (!doc) {
        return next({
          message: `${songID} could not have been found.`
        });
      }
      res.locals.httpReply = {
        message: `${songID} has been updated`,
        data: doc
      };
      return next();
    })
    .catch(err => next(err));
};

const prod = (req, res, next) => {
  const { songID, body } = res.locals;
  devLogger('UPDATE A SINGLE SONG', songID);
  return Song.findOneAndUpdate({ _id: songID }, body)
    .then(doc => {
      if (!doc) {
        return next({
          message: `${songID} could not have been found.`
        });
      }
      res.locals.httpReply = {
        message: `${songID} has been updated`,
        data: doc
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
