import { Request, Response, NextFunction } from 'express';

import { devLogger } from '../../utils';
import { EnvTypes, environment } from '../../constants/environments';

const development = (req: Request, res: Response, next: NextFunction): void => {
  devLogger(
    'PLACE VARIABLES IN RES.LOCALS',
    JSON.stringify({
      params: req.params,
      body: req.body,
    })
  );
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

const production = (req: Request, res: Response, next: NextFunction): void => {
  devLogger(
    'PLACE VARIABLES IN RES.LOCALS',
    JSON.stringify({
      params: req.params,
      body: req.body,
    })
  );
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
  [EnvTypes.PROD]: production,
  [EnvTypes.DEV]: development,
  [EnvTypes.TEST]: development,
};

export default middleware[environment];
