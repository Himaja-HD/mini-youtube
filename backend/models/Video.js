import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  videoId: { type: String, required: true, unique: true, index: true },
  title: { type: String, required: true, trim: true, maxlength: 150 },
  description: { type: String, trim: true, maxlength: 5000 },
  videoUrl: { type: String, required: true },
  thumbnailUrl: { type: String, required: true },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
  hashTags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
  channel: { type: mongoose.Schema.Types.ObjectId, ref: 'Channel', required: true },
  uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  views: { type: Number, default: 0 },
  likesCount: { type: Number, default: 0 },
  dislikesCount: { type: Number, default: 0 },
  commentsCount: { type: Number, default: 0 },
  commentsStatus: { type: Boolean, default: true },
  viewsEnabled: { type: Boolean, default: true },
  isDraft: { type: Boolean, default: true },
  privacySettings: { type: String, enum: ['public', 'private', 'unlisted'], default: 'public' },
  uploadDate: { type: Date }
}, { timestamps: true });

export default mongoose.model('Video', videoSchema);
