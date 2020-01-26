import * as request from 'supertest';
import * as mongoose from 'mongoose';
import { testApp as app } from '../../server';
import { setupMongo, teardownMongo } from '../helpers';
import { exampleSongCorrect } from '../payloads';

import Song from '../../model/song';

describe('#SONG-CONTROLLER - GET ALL', () => {
  const songPromises = [
    new Song({
      _id: new mongoose.Types.ObjectId(),
      ...exampleSongCorrect,
    }).save(),
    new Song({
      _id: new mongoose.Types.ObjectId(),
      ...exampleSongCorrect,
    }).save(),
    new Song({
      _id: new mongoose.Types.ObjectId(),
      ...exampleSongCorrect,
    }).save(),
  ];
  beforeAll(async () => {
    await setupMongo();
    await Promise.all(songPromises);
  });

  it('Should return all the items from the database', async () => {
    const { status, body } = await request(app).get(`/songs`);

    expect(status).toEqual(200);
    expect(body.data).toHaveLength(3);
  });

  it('If no items, should return an empty array', async () => {
    await Song.deleteMany({});
    const { status, body } = await request(app).get(`/songs`);

    expect(status).toEqual(200);
    expect(body.data).toEqual([]);
  });

  afterAll(async () => {
    await teardownMongo();
  });
});
