import Song from '../../model/song';
import { devLogger } from '../../utils';
import { production, development, environment } from '../../constants';

const dev = (req, res, next) => {
  const { songID } = res.locals;
  devLogger('DELETE A SINGLE SONG', songID);
  return Song.findOneAndRemove({ _id: songID })
    .then(doc => {
      if (!doc) {
        return next({
          message: `${songID} could not have been found.`
        });
      }
      res.locals.httpReply = {
        message: `${songID} has been removed`,
        data: {}
      };
      return next();
    })
    .catch(err => next(err));
};

const prod = (req, res, next) => {
  const { songID } = res.locals;
  devLogger('DELETE A SINGLE SONG', songID);
  return Song.findOneAndRemove({ _id: songID })
    .then(doc => {
      if (!doc) {
        return next({
          message: `${songID} could not have been found.`
        });
      }
      res.locals.httpReply = {
        message: `${songID} has been removed`,
        data: {}
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
