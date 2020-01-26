import * as request from 'supertest';
import * as mongoose from 'mongoose';
import { testApp as app } from '../../server';
import { setupMongo, teardownMongo } from '../helpers';
import {
  exampleSongCorrect,
  exampleSongUpdatedCorrect,
  exampleSongUpdatedFaulty,
} from '../payloads';

import Song from '../../model/song';

import { ErrorMessages, SuccessMessages } from '../../constants/responses';

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
    expect(body.message).toEqual(songID + SuccessMessages.DOCUMENT_UPDATED);
    expect(body.data.title).toEqual(exampleSongUpdatedCorrect.title);
  });

  it('Should give an error updating a non-existing item in the database', async () => {
    const { status, body } = await request(app)
      .put(`/song/${incorrectSongID}`)
      .send(exampleSongUpdatedCorrect);

    expect(status).toEqual(404);
    expect(body.data).toEqual(incorrectSongID + ErrorMessages.DOCUMENT_NOT_FOUND);
  });

  it('Should give an error updating with a non-valid property', async () => {
    const { status, body } = await request(app)
      .put(`/song/${songID}`)
      .send(exampleSongUpdatedFaulty);

    expect(status).toEqual(403);
    expect(body.data).toBeDefined();
  });

  afterAll(async () => {
    await teardownMongo();
  });
});
