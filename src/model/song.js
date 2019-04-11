import mongoose from 'mongoose';

const SongSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: String,
  author: String,
  genre: [String],
  length: Number
});

export default mongoose.model('Song', SongSchema);
