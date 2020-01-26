import { Request, Response } from 'express';

import { devLogger } from '../../utils';
import { EnvTypes, environment } from '../../constants/environments';

const development = (_req: Request, res: Response): Response => {
  const { httpReply } = res.locals;
  devLogger('SEND BACK THE RESOURCE', httpReply);
  return res.status(200).send(httpReply);
};

const production = (_req: Request, res: Response): Response => {
  const { httpReply } = res.locals;
  devLogger('SEND BACK THE RESOURCE', httpReply);
  return res.status(200).send(httpReply);
};

const middleware = {
  [EnvTypes.PROD]: production,
  [EnvTypes.DEV]: development,
  [EnvTypes.TEST]: development,
};

export default middleware[environment];
