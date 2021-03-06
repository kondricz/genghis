import * as request from 'supertest';
import * as mongoose from 'mongoose';
import { testApp as app } from '../../server';
import { setupMongo, teardownMongo } from '../helpers';
import { exampleSongCorrect } from '../payloads';

import Song from '../../model/song';

import { ErrorMessages, SuccessMessages } from '../../constants/responses';

describe('#SONG-CONTROLLER - GET SINGLE', () => {
  const songID = new mongoose.Types.ObjectId();
  const incorrectSongID = 'thissongdoesntexist';
  beforeAll(async () => {
    await setupMongo();
    await new Song({ _id: songID, ...exampleSongCorrect }).save();
  });

  it('Should return a single item from the database based on ID', async () => {
    const { status, body } = await request(app).get(`/song/${songID}`);

    expect(status).toEqual(200);
    expect(body.message).toEqual(songID + SuccessMessages.DOCUMENT_RETRIEVED);
    expect(body.data).toBeDefined();
  });

  it('Should give an error returning a non-existing item from the database', async () => {
    const res = await request(app).delete(`/song/${incorrectSongID}`);

    expect(res.status).toEqual(404);
    expect(res.body.data).toEqual(incorrectSongID + ErrorMessages.DOCUMENT_NOT_FOUND);
  });

  afterAll(async () => {
    await teardownMongo();
  });
});
