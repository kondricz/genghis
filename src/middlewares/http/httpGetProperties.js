import { devLogger } from '../../utils';
import { production, development, test, environment } from '../../constants';

const dev = (req, res, next) => {
  devLogger('PLACE VARIABLES IN RES.LOCALS', {
    params: req.params,
    body: req.body
  });
  res.locals.body = {};
  if (Object.keys(req.params).length) {
    Object.keys(req.params).forEach(key => {
      res.locals[key] = req.params[key];
    });
  }
  if (Object.keys(req.body).length) {
    Object.keys(req.body).forEach(key => {
      res.locals.body[key] = req.body[key];
    });
  }
  return next();
};

const prod = (req, res, next) => {
  devLogger('PLACE VARIABLES IN RES.LOCALS', {
    params: req.params,
    body: req.body
  });
  res.locals.body = {};
  if (Object.keys(req.params).length) {
    Object.keys(req.params).forEach(key => {
      res.locals[key] = req.params[key];
    });
  }
  if (Object.keys(req.body).length) {
    Object.keys(req.body).forEach(key => {
      res.locals.body[key] = req.body[key];
    });
  }
  return next();
};

const middleware = {
  [production]: prod,
  [development]: dev,
  [test]: dev
};

export default middleware[environment];
