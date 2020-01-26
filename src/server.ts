import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as rateLimiter from 'express-rate-limit';

import { EnvTypes, environment } from './constants/environments';
import { memoryMongoServer } from './utils';

import * as CTR from './controllers';
import * as MW from './middlewares';
import * as route from './routes';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { apiVersion } = require('../package.json');

const PORT: { [key: string]: number } = {
  [EnvTypes.DEV]: 3000,
  [EnvTypes.PROD]: 8080,
};

const ROOT_URLS: { [key: string]: string } = {
  [EnvTypes.DEV]: 'http://localhost:',
  [EnvTypes.PROD]: 'http://localhost:',
};

const app = express();
const routeBuilder = (route: string): string => `/api/${apiVersion}/${route}`;

if (environment !== EnvTypes.TEST) {
  memoryMongoServer();

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
  .route(routeBuilder(route.SONGS))
  .post(withHttpWrapper([CTR.addSong]))
  .get(withHttpWrapper([CTR.getAllSongs]));

app
  .route(routeBuilder(route.SINGLE_SONG))
  .put(withHttpWrapper([CTR.updateSong]))
  .get(withHttpWrapper([CTR.getSingleSong]))
  .delete(withHttpWrapper([CTR.deleteSong]));

app.listen(PORT[environment], () =>
  console.log(
    `Server initialized succesfully.
   Server has decided to use port ${PORT[environment]}
   Server is currently running in ${environment}
   Make your first request at ${ROOT_URLS[environment]}${PORT[environment]}${routeBuilder(
      route.SONGS
    )}
    `
  )
);

export const testApp = app;
