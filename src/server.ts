import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';

import { EnvTypes, environment } from './constants/constants';

import * as CTR from './controllers';
import * as MW from './middlewares';
import * as route from './routes';

const PORT: { [key: string]: number } = {
  [EnvTypes.DEV]: 3000,
  [EnvTypes.PROD]: 8080,
};

const app = express();
mongoose.connect(
  'mongodb+srv://kondricz:TEBxVf3m9kZSGspX@cluster0-hswgq.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true }
);
app.use(bodyParser.json());

const withHttpWrapper = (middlewares: express.RequestHandler[]): express.RequestHandler[] => [
  MW.httpGetProperties,
  ...middlewares,
  MW.httpFormReply,
];

app
  .route(route.SONGS)
  .post(withHttpWrapper([CTR.addSong]))
  .get(withHttpWrapper([CTR.getAllSongs]));

app
  .route(route.SINGLE_SONG)
  .put(withHttpWrapper([CTR.updateSong]))
  .get(withHttpWrapper([CTR.getSingleSong]))
  .delete(withHttpWrapper([CTR.deleteSong]));

app.use(MW.httpError);

app.listen(PORT[environment], () =>
  console.log(
    `Server initialized succesfully.
   Server has decided to use port ${PORT[environment]}
   Server is currently running in ${environment}
    `
  )
);
