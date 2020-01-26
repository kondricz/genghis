/* eslint-disable @typescript-eslint/no-explicit-any */
import * as mongoose from 'mongoose';
import Song from '../model/song';

export const setupMongo = async (): Promise<any> => {
  console.log('setting up mongodb memory server for this test suit...');
  return mongoose.connect(
    (global as any).__MONGO_URI__,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
    err => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    }
  );
};

export const teardownMongo = async (): Promise<any> => {
  console.log('disconnecting from mongodb memory server for this test suit...');
  await Song.deleteMany({});
  await mongoose.disconnect();
};
