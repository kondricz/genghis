import Song from '../../model/song';
import { devLogger } from '../../utils';
import { production, development, environment } from '../../constants';

const dev = (req, res, next) => {
  devLogger('FINDING ALL SONGS', {});
  return Song
    .find()
    .then(doc => {
      if (!doc) {
        return next({
          message: 'There are no songs'
        });
      }
      res.locals.httpReply = {
        message: 'All songs have been retrieved',
        data: doc
      };
      return next();
    })
    .catch(err => next(err));
};

const prod = (req, res, next) => {
  devLogger('FINDING ALL SONGS', {});
  return Song
    .find()
    .then(doc => {
      if (!doc) {
        return next({
          message: 'There are no songs'
        });
      }
      res.locals.httpReply = {
        message: 'All songs have been retrieved',
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
