import * as request from 'supertest';
import * as mongoose from 'mongoose';
import { app } from '../../server';
import { setupMongo, teardownMongo } from '../helpers';
import { exampleSongCorrect, exampleSongUpdatedCorrect } from '../payloads';

import Song from '../../model/song';

describe('#SONG-CONTROLLER - UPDATE SINGLE', () => {
  const songID = new mongoose.Types.ObjectId();
  const incorrectSongID = 'thissongdoesntexist';
  beforeAll(async () => {
    await setupMongo();
    await new Song({ _id: songID, ...exampleSongCorrect }).save();
  });

  it('Should update an item in the database based on ID', async () => {
    const { status, body } = await request(app)
      .put(`/song/${songID}`)
      .send(exampleSongUpdatedCorrect);

    expect(status).toEqual(200);
    expect(body.message).toEqual(`${songID} has been updated`);
    expect(body.data.title).toEqual(exampleSongUpdatedCorrect.title);
  });

  /*it('Should give an error updating a non-existing item in the database', async () => {
    const res = await request(app).delete(`/song/${incorrectSongID}`);

    expect(res.status).toEqual(500);
    expect(res.body.message).toEqual(`${incorrectSongID} could not have been found.`);
  });*/

  /*it('Should give an error updating with a non-valid property', async () => {
    const res = await request(app).delete(`/song/${incorrectSongID}`);

    expect(res.status).toEqual(500);
    expect(res.body.message).toEqual(`${incorrectSongID} could not have been found.`);
  });*/

  afterAll(async () => {
    await teardownMongo();
  });
});
