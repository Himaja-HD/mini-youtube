import mongoose from 'mongoose';

const channelSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  name: { type: String, required: true, trim: true },
  handle: { type: String, required: true, unique: true, trim: true },
  description: { type: String, default: '' },
  banner: { type: String },
  avatar: { type: String },
  subscribers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  subscribersCount: { type: Number, default: 0 },
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
}, { timestamps: true });

const Channel = mongoose.model('Channel', channelSchema);
export default Channel;
