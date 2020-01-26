import { Request, Response, ErrorRequestHandler } from 'express';

import { devLogger } from '../../utils';
import { EnvTypes, environment } from '../../constants/constants';

const development = (err: ErrorRequestHandler, _req: Request, res: Response): Response => {
  devLogger('SEND BACK ERROR', JSON.stringify(err));
  return res.status(500).send(err);
};

const production = (err: ErrorRequestHandler, _req: Request, res: Response): Response => {
  devLogger('SEND BACK ERROR', JSON.stringify(err));
  return res.status(500).send(err);
};

const middleware = {
  [EnvTypes.PROD]: production,
  [EnvTypes.DEV]: development,
  [EnvTypes.TEST]: development,
};

export default middleware[environment];
