import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as rateLimiter from 'express-rate-limit';

import { EnvTypes, environment } from './constants/constants';

import * as CTR from './controllers';
import * as MW from './middlewares';
import * as route from './routes';

const PORT: { [key: string]: number } = {
  [EnvTypes.DEV]: 3000,
  [EnvTypes.PROD]: 8080,
};

const app = express();

if (environment !== EnvTypes.TEST) {
  mongoose.connect('mongoURL', { useNewUrlParser: true });
  app.use(
    rateLimiter({
      windowMs: 15 * 60 * 1000,
      max: 100,
    })
  );
}

app.use(bodyParser.json());

const withHttpWrapper = (middlewares: express.RequestHandler[]): express.RequestHandler[] => [
  ...MW.validateUserInput,
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

app.listen(PORT[environment], () =>
  console.log(
    `Server initialized succesfully.
   Server has decided to use port ${PORT[environment]}
   Server is currently running in ${environment}
    `
  )
);

export const testApp = app;
