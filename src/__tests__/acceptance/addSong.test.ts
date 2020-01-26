import * as request from 'supertest';
import { app } from '../../server';
import { setupMongo, teardownMongo } from '../helpers';
import { exampleSongCorrect, exampleSongFaulty } from '../payloads';

describe('#SONG-CONTROLLER - ADD', () => {
  beforeAll(async () => {
    await setupMongo();
  });

  it('Should add an item to the database', async () => {
    const { status, body } = await request(app)
      .post('/songs')
      .send(exampleSongCorrect);
    expect(status).toEqual(200);
    expect(body.message).toEqual('DOCUMENT HAS CREATED SUCCESSFULLY');
    expect(body.data).toBeDefined();
  });

  /*it('Should give an error adding an item to the database, if schema is wrong', async () => {
    const res = await request(app)
      .post('/songs')
      .send(exampleSongFaulty);
    expect(res.status).toEqual(500);
  });*/

  afterAll(async () => {
    await teardownMongo();
  });
});
