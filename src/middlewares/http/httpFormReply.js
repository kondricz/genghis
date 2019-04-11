import { devLogger } from '../../utils';
import { production, development, test, environment } from '../../constants';

const dev = (req, res, next) => {
  const { httpReply } = res.locals;
  devLogger('SEND BACK THE RESOURCE', httpReply);
  return res.status(200).send(httpReply);
};

const prod = (req, res, next) => {
  const { httpReply } = res.locals;
  devLogger('SEND BACK THE RESOURCE', httpReply);
  return res.status(200).send(httpReply);
};

const middleware = {
  [production]: prod,
  [development]: dev,
  [test]: dev
};

export default middleware[environment];
