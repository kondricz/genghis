import * as request from 'supertest';
import * as mongoose from 'mongoose';
import { testApp as app } from '../../server';
import { setupMongo, teardownMongo } from '../helpers';
import { exampleSongCorrect } from '../payloads';

import Song from '../../model/song';

import { ErrorMessages, SuccessMessages } from '../../constants/responses';

describe('#SONG-CONTROLLER - DELETE', () => {
  const songID = new mongoose.Types.ObjectId();
  const incorrectSongID = 'thissongdoesntexist';
  beforeAll(async () => {
    await setupMongo();
    await new Song({ _id: songID, ...exampleSongCorrect }).save();
  });

  it('Shoudld delete an item from the database', async () => {
    const { status, body } = await request(app).delete(`/song/${songID}`);

    expect(status).toEqual(200);
    expect(body.message).toEqual(songID + SuccessMessages.DOCUMENT_REMOVED);
  });

  it('Should give an error deleting a non-existing item in the database', async () => {
    const res = await request(app).delete(`/song/${incorrectSongID}`);

    expect(res.status).toEqual(404);
    expect(res.body.data).toEqual(incorrectSongID + ErrorMessages.DOCUMENT_NOT_FOUND);
  });

  afterAll(async () => {
    await teardownMongo();
  });
});
