import * as mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const generateMemoryServer = async () => {
  const mongod = new MongoMemoryServer();
  const uri = await mongod.getUri();
  console.log('connected to local memory mongo server');
  return mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
};

export default generateMemoryServer;
