import * as mongoose from 'mongoose';

interface InterfaceSong extends mongoose.Document {
  _id: string;
  title: string;
  author: string;
  genre: string[];
  length: number;
}

const SongSchema: mongoose.Schema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: String,
  author: String,
  genre: [String],
  length: Number,
});

export default mongoose.model<InterfaceSong>('Song', SongSchema);
