import * as request from 'supertest';
import { testApp as app } from '../../server';
import { setupMongo, teardownMongo } from '../helpers';
import { exampleSongCorrect, exampleSongFaulty } from '../payloads';

import { SuccessMessages } from '../../constants/responses';

describe('#SONG-CONTROLLER - ADD', () => {
  beforeAll(async () => {
    await setupMongo();
  });

  it('Should add an item to the database', async () => {
    const { status, body } = await request(app)
      .post('/songs')
      .send(exampleSongCorrect);
    expect(status).toEqual(200);
    expect(body.message).toEqual(SuccessMessages.DOCUMENT_CREATED);
    expect(body.data).toBeDefined();
  });

  it('Should give an error adding an item to the database, if schema is wrong', async () => {
    const { status, body } = await request(app)
      .post('/songs')
      .send(exampleSongFaulty);

    expect(status).toEqual(403);
    expect(body.data).toBeDefined();
  });

  afterAll(async () => {
    await teardownMongo();
  });
});
