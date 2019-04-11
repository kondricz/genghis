import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import { development, production, environment } from './src/constants';

import * as CTR from './src/controllers';
import * as MW from './src/middlewares';
import * as route from './src/routes';

const PORT = {
  [development]: 3000,
  [production]: 8080
};

// const uri = MONGOURL

const app = express();
mongoose.connect(uri, { useNewUrlParser: true });
app.use(bodyParser.json());

const withHttpWrapper = middlewares => ([
  MW.httpGetProperties,
  ...middlewares,
  MW.httpFormReply
]);

app.route(route.SONGS)
  .post(withHttpWrapper([CTR.addSong]))
  .get(withHttpWrapper([CTR.getAllSongs]));

app.route(route.SINGLE_SONG)
  .put(withHttpWrapper([CTR.updateSong]))
  .get(withHttpWrapper([CTR.getSingleSong]))
  .delete(withHttpWrapper([CTR.deleteSong]));

app.use(MW.httpError);

app.listen(PORT[environment], () => console.log(
  `Genghis initialized succesfully.
   Genghis has decided to use port ${PORT[environment]}
   Genghis is currently running in ${environment}
    `
));
