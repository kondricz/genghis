import { Request, Response, ErrorRequestHandler } from 'express';

import { devLogger } from '../../utils';
import { EnvTypes, environment } from '../../constants/constants';

interface CustomError extends ErrorRequestHandler {
  status: number;
  data: string;
}

const development = (err: CustomError, _req: Request, res: Response): Response => {
  devLogger('SEND BACK ERROR', JSON.stringify(err));
  console.log('<<< ERROR MW BEING CALLED >>>');
  return res.status(err.status || 500).send(err.data);
};

const production = (err: CustomError, _req: Request, res: Response): Response => {
  devLogger('SEND BACK ERROR', JSON.stringify(err));
  return res.status(err.status || 500).send(err.data);
};

const middleware = {
  [EnvTypes.PROD]: production,
  [EnvTypes.DEV]: development,
  [EnvTypes.TEST]: development,
};

export default middleware[environment];
