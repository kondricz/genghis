import { devLogger } from '../../utils';
import { production, development, test, environment } from '../../constants';

const dev = (err, req, res, next) => {
  devLogger('SEND BACK ERROR', err);
  return res.status(404).send(err);
};

const prod = (err, req, res, next) => {
  devLogger('SEND BACK ERROR', err);
  return res.status(404).send(err);
};

const middleware = {
  [production]: prod,
  [development]: dev,
  [test]: dev
};

export default middleware[environment];
