import mongoose from 'mongoose';

const channelSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    name: { type: String, required: true, trim: true },
    handle: { type: String, required: true, unique: true, trim: true, lowercase: true, index: true },
    description: { type: String, default: '' },
    banner: { type: String, default: null },
    avatar: { type: String, default: null },
    subscribers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    subscribersCount: { type: Number, default: 0 },
    videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
  },
  { timestamps: true }
);

export default mongoose.model('Channel', channelSchema);
