import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  videoUrl: { type: String, required: true },
  thumbnail: String,
  category: { type: String, default: 'other' },
  channel: { type: mongoose.Schema.Types.ObjectId, ref: 'Channel', required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  unlikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  views: { type: Number, default: 0 },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }], 
}, {
  timestamps: true,
});

const Video = mongoose.model('Video', videoSchema);
export default Video;
